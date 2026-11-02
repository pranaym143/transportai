import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PDF_MODULES, PDFModule } from './src/data/pdfKnowledge.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ---------------------------------------------------------
// RAG RETRIEVAL ENGINE FOR THE 14-PAGE PDF CURRICULUM
// ---------------------------------------------------------
interface KnowledgeChunk {
  pageNumber: number;
  title: string;
  category: string;
  text: string;
  keywords: string[];
}

const knowledgeChunks: KnowledgeChunk[] = PDF_MODULES.flatMap((mod) => {
  const points = mod.importantPoints.join(' ');
  const examples = mod.realWorldExamples.map(e => `${e.title}: ${e.description} (${e.impact})`).join(' ');
  const advantages = mod.advantages.join(', ');
  const limitations = mod.limitations.join(', ');
  const takeaways = mod.keyTakeaways.join(' ');

  return [
    {
      pageNumber: mod.pageNumber,
      title: mod.title,
      category: mod.category,
      text: `[Page ${mod.pageNumber}: ${mod.title}] Overview: ${mod.summary} Excerpt: ${mod.pdfExcerpt} Key Points: ${points} Real-World Examples: ${examples} Advantages: ${advantages} Limitations: ${limitations} Takeaways: ${takeaways}`,
      keywords: [
        ...mod.title.toLowerCase().split(/\s+/),
        ...mod.importantPoints.flatMap(p => p.toLowerCase().split(/\s+/)),
        ...mod.keyTakeaways.flatMap(t => t.toLowerCase().split(/\s+/)),
      ]
    }
  ];
});

function retrieveRelevantChunks(query: string, topK = 3): KnowledgeChunk[] {
  const queryWords = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2);
  
  const scored = knowledgeChunks.map((chunk) => {
    let score = 0;
    const lowerText = chunk.text.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();

    // Title match boost
    for (const word of queryWords) {
      if (lowerTitle.includes(word)) score += 10;
      if (lowerText.includes(word)) score += 2;
      if (chunk.keywords.includes(word)) score += 1.5;
    }

    // Direct module number check e.g. "page 5", "module 8"
    const pageMatch = query.match(/(?:page|module)\s*(\d{1,2})/i);
    if (pageMatch && parseInt(pageMatch[1], 10) === chunk.pageNumber) {
      score += 50;
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(s => s.chunk);
}

// ---------------------------------------------------------
// API ROUTES (Vercel serverless & local Express compatible)
// ---------------------------------------------------------
const apiRouter = express.Router();

// Health check
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
    pagesCount: PDF_MODULES.length
  });
});

// PDF Modules listing
apiRouter.get('/modules', (_req: Request, res: Response) => {
  res.json({ modules: PDF_MODULES });
});

// Single module
apiRouter.get('/modules/:idOrPage', (req: Request, res: Response) => {
  const param = req.params.idOrPage;
  const num = parseInt(param, 10);
  const mod = PDF_MODULES.find(m => m.moduleId === param || m.pageNumber === num);
  if (!mod) {
    return res.status(404).json({ error: 'Module not found' });
  }
  res.json({ module: mod });
});

async function callGeminiWithRetry(fn: () => Promise<any>, retries = 2, delay = 800): Promise<any> {
  try {
    return await fn();
  } catch (err: any) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, delay));
      return callGeminiWithRetry(fn, retries - 1, delay * 2);
    }
    throw err;
  }
}

// AI Chatbot with PDF RAG
apiRouter.post('/chat', async (req: Request, res: Response) => {
  const { message, history = [], mode = 'standard' } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Retrieve RAG context from the PDF knowledge base
  const retrieved = retrieveRelevantChunks(message, 4);
  const pdfContext = retrieved.map(c => c.text).join('\n\n---\n\n');
  const matchedPages = Array.from(new Set(retrieved.map(c => c.pageNumber))).sort((a, b) => a - b);
  const topModule = PDF_MODULES.find(m => m.pageNumber === matchedPages[0]) || PDF_MODULES[0];

  const modeInstructions: Record<string, string> = {
    standard: 'Provide a clear, educational, well-structured answer with headings, bullet points, and real-world examples.',
    short: 'Provide a concise, direct answer in 2-3 sentences. Focus strictly on the core point.',
    detailed: 'Explain step-by-step with deep technical mechanics, sensor details, operational stages, and advantages/disadvantages.',
    exam: 'Format as an exam-ready student answer: Definition/Overview, Key Technical Points (numbered), Real-World Example, and a "Summary for Exam Marks" tip.',
    definition: 'Provide a simple, crystal-clear definition followed by 2 bullet points on why it matters in transportation.'
  };

  const activeModePrompt = modeInstructions[mode] || modeInstructions.standard;

  const systemInstruction = `You are Transport AI, an intelligent educational assistant specializing in Artificial Intelligence in Transportation.
Your primary knowledge source is the user's uploaded "AI IN TRANSPORTATION.pdf" (14 pages).

Always adhere strictly to these rules:
1. Answer questions using the PDF context whenever relevant.
2. If the user asks a question covered by the PDF:
   - Answer based on the PDF.
   - Mention the relevant page or topic clearly using citation tags like [PDF Source: Page X - Title].
   - Explain in simple, crystal-clear educational language.
   - Give examples when useful.
3. If the user asks for a topic not covered in the PDF:
   - Clearly state that the information is "Additional Knowledge" (not in the primary 14-page PDF).
   - Give a helpful, accurate, and educational explanation.
   - Never pretend additional information was written in the PDF.
4. Mode instruction: ${activeModePrompt}
5. Tone: Encouraging, futuristic, pedagogically sound, and professional.
6. Never fabricate PDF references or page numbers.

PDF KNOWLEDGE BASE CONTEXT:
${pdfContext}
`;

  if (ai) {
    try {
      const conversationHistory = history.slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      }));

      const response = await callGeminiWithRetry(() =>
        ai!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            ...conversationHistory,
            {
              role: 'user',
              parts: [{ text: message }]
            }
          ],
          config: {
            systemInstruction,
          }
        })
      );

      const replyText = response.text || 'I could not generate an answer at this time.';

      return res.json({
        reply: replyText,
        sourcePages: matchedPages,
        mode,
        groundedInPdf: true
      });
    } catch (apiError: any) {
      console.warn('Gemini API call encountered transient delay, providing verified PDF knowledge fallback:', apiError?.message);
      // Fallback directly to verified curriculum knowledge
      let structuredReply = `**[PDF Source: Page ${topModule.pageNumber} - ${topModule.title}]**\n\n`;
      if (mode === 'short') {
        structuredReply += `${topModule.summary}\n\n*Key takeaway:* ${topModule.keyTakeaways[0] || ''}`;
      } else if (mode === 'definition') {
        structuredReply += `### Definition:\n${topModule.summary}\n\n- **Role in Transportation:** ${topModule.importantPoints[0]}\n- **Core Application:** ${topModule.importantPoints[1] || ''}`;
      } else if (mode === 'exam') {
        structuredReply += `### Model Exam Answer (Page ${topModule.pageNumber})\n` +
          `**1. Concept Overview:**\n${topModule.summary}\n\n` +
          `**2. Key Technical Points:**\n` + topModule.importantPoints.map((p, i) => `${i + 1}. ${p}`).join('\n') + `\n\n` +
          `**3. Real-World Implementation:**\n${topModule.realWorldExamples[0]?.title}: ${topModule.realWorldExamples[0]?.description}\n\n` +
          `💡 **Exam Tip:** ${topModule.sampleQuestions[0]?.examTip || 'Focus on sensor integration and collision reduction statistics.'}`;
      } else {
        structuredReply += `${topModule.summary}\n\n` +
          `### Key Facts from PDF (Page ${topModule.pageNumber}):\n` +
          topModule.importantPoints.map(p => `- ${p}`).join('\n') + `\n\n` +
          `### Real-World Example:\n` +
          topModule.realWorldExamples.map(e => `- **${e.title}:** ${e.description} *(Impact: ${e.impact})*`).join('\n') + `\n\n` +
          `### Advantages & Challenges:\n` +
          `- **Advantage:** ${topModule.advantages[0] || 'Enhanced safety'}\n` +
          `- **Challenge:** ${topModule.limitations[0] || 'System complexity'}`;
      }

      return res.json({
        reply: structuredReply,
        sourcePages: matchedPages,
        mode,
        groundedInPdf: true
      });
    }
  } else {
    // Fallback response if GEMINI_API_KEY is not set
    const fallbackReply = `**[PDF Source: Page ${topModule.pageNumber} - ${topModule.title}]**\n\n` +
      `${topModule.summary}\n\n` +
      `**Key Facts from PDF:**\n` +
      topModule.importantPoints.map(p => `- ${p}`).join('\n');

    return res.json({
      reply: fallbackReply,
      sourcePages: matchedPages,
      mode,
      groundedInPdf: true
    });
  }
});

// AI Notes Generator
apiRouter.post('/notes', async (req: Request, res: Response) => {
  try {
    const { moduleId, noteType = 'detailed' } = req.body;
    const moduleData = PDF_MODULES.find(m => m.moduleId === moduleId) || PDF_MODULES[0];

    const prompt = `Based strictly on Page ${moduleData.pageNumber} ("${moduleData.title}") of the "AI IN TRANSPORTATION.pdf":
PDF Context:
${moduleData.summary}
Excerpt: ${moduleData.pdfExcerpt}
Important Points: ${moduleData.importantPoints.join('; ')}
Real World: ${JSON.stringify(moduleData.realWorldExamples)}
Advantages: ${moduleData.advantages.join('; ')}
Limitations: ${moduleData.limitations.join('; ')}

Generate high-yield educational study notes in "${noteType}" format:
- If "short": A quick revision cheat-sheet with 5 core bullet points and a memory mnemonic.
- If "detailed": Complete textbook-level study notes with sections for Concept, Hardware/Sensors, Operational Mechanics, Advantages, and Limitations.
- If "exam": High-scoring student exam answers with Expected Question, Model Answer, Key Keywords to Underline, and Examiner Marking Scheme.

Format with clean Markdown.`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert transportation engineering professor creating study notes strictly grounded in the provided curriculum.'
        }
      });
      return res.json({ notes: response.text, module: moduleData });
    }

    // Direct fallback notes from PDF knowledge
    const fallback = `## Study Notes: Page ${moduleData.pageNumber} – ${moduleData.title}\n\n` +
      `### Overview\n${moduleData.summary}\n\n` +
      `### Key Points\n` + moduleData.importantPoints.map(p => `- ${p}`).join('\n') + `\n\n` +
      `### Real-World Examples\n` + moduleData.realWorldExamples.map(e => `- **${e.title}**: ${e.description} *(Impact: ${e.impact})*`).join('\n') + `\n\n` +
      `### Key Takeaway\n${moduleData.keyTakeaways.join(' ')}`;

    res.json({ notes: fallback, module: moduleData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// AI Quiz Generator
apiRouter.post('/quiz', async (req: Request, res: Response) => {
  try {
    const { moduleId, count = 5 } = req.body;
    let targetModules = PDF_MODULES;
    if (moduleId && moduleId !== 'all') {
      targetModules = PDF_MODULES.filter(m => m.moduleId === moduleId);
    }

    // Curated questions from PDF
    const baseQuestions = targetModules.flatMap(m => m.quizQuestions.map(q => ({
      ...q,
      moduleId: m.moduleId,
      pageNumber: m.pageNumber,
      moduleTitle: m.title
    })));

    if (ai && count > baseQuestions.length) {
      const prompt = `Generate ${count - baseQuestions.length} additional multiple choice questions based on these PDF modules: ${targetModules.map(m => `Page ${m.pageNumber}: ${m.title}`).join(', ')}.
Output strictly valid JSON array of objects with structure:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctIndex": number (0 to 3),
    "explanation": "string citing exact PDF page",
    "pageNumber": number,
    "moduleTitle": "string"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      try {
        const extra = JSON.parse(response.text || '[]');
        return res.json({ questions: [...baseQuestions, ...extra].slice(0, count) });
      } catch {
        return res.json({ questions: baseQuestions });
      }
    }

    res.json({ questions: baseQuestions.slice(0, count) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// AI Simplifier (School & Diploma student explanations)
apiRouter.post('/simplify', async (req: Request, res: Response) => {
  try {
    const { text, topic, level = 'school' } = req.body;
    const query = topic || text || 'How AI works in transportation';

    const retrieved = retrieveRelevantChunks(query, 2);
    const context = retrieved.map(r => r.text).join('\n');

    const prompt = `Simplify the following technical transportation AI concept for a ${level === 'diploma' ? 'diploma engineering student' : '12-year-old school student'}:
Concept / Question: "${query}"
Context from PDF:
${context}

Instructions:
1. Use an intuitive real-world analogy (e.g. comparing sensors to human eyes and ears, computer to the brain, actuators to muscles).
2. Avoid dense academic jargon; explain terms simply.
3. Keep it engaging, crystal clear, and encouraging.
4. Mention which PDF page this comes from.`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a warm, inspiring educator who makes complex engineering concepts simple and relatable.'
        }
      });
      return res.json({ simplified: response.text });
    }

    res.json({
      simplified: `### Simple Explanation of ${query}\n\n` +
        `Imagine a self-driving car as a human:\n` +
        `- **Eyes and Ears (Sensors & Cameras)**: The car looks at lines and signs and listens for sirens.\n` +
        `- **Brain (The AI Computer)**: It thinks about what it sees and calculates speed and distance.\n` +
        `- **Hands and Feet (Actuators)**: It presses the brake or turns the steering wheel.\n\n` +
        `This whole cycle takes less than the blink of an eye—making travel smoother and safer for everyone!`
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// AI Flashcards Generator
apiRouter.post('/flashcards', async (req: Request, res: Response) => {
  try {
    const { moduleId } = req.body;
    let modules = PDF_MODULES;
    if (moduleId && moduleId !== 'all') {
      modules = PDF_MODULES.filter(m => m.moduleId === moduleId);
    }
    const cards = modules.flatMap(m => m.flashcards.map(f => ({
      ...f,
      pageNumber: m.pageNumber,
      moduleTitle: m.title
    })));

    res.json({ flashcards: cards });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// AI Study Planner
apiRouter.post('/study-plan', async (req: Request, res: Response) => {
  try {
    const { hoursPerWeek = 5, targetGoal = 'Exam Preparation', weakModules = [] } = req.body;

    const prompt = `Create a structured study timetable for mastering the 14-page "AI IN TRANSPORTATION.pdf" curriculum.
Available time: ${hoursPerWeek} hours/week.
Goal: ${targetGoal}.
Focus/Weak areas: ${weakModules.length ? weakModules.join(', ') : 'All 14 pages'}.

All 14 modules:
${PDF_MODULES.map(m => `Page ${m.pageNumber}: ${m.title}`).join('\n')}

Generate a daily/weekly step-by-step revision calendar with specific learning milestones, quiz checkpoints, and practical study tips.`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an educational academic advisor creating a practical, structured study schedule.'
        }
      });
      return res.json({ plan: response.text });
    }

    res.json({
      plan: `### Personalized ${hoursPerWeek}-Hour Study Plan for ${targetGoal}\n\n` +
        `**Phase 1: Foundations (Days 1–2)**\n- Page 1: Introduction to AI\n- Page 2: AI in Transportation\n- Page 3: History & Evolution\n\n` +
        `**Phase 2: Mechanics & Sensors (Days 3–4)**\n- Page 5: How AI Works (4 stages)\n- Page 6: AI in Automobiles (radar, ultrasonic)\n- Page 7: AI in Traffic Management (inductive loops)\n\n` +
        `**Phase 3: Public Transit & Logistics (Days 5–6)**\n- Page 4: Public Transportation\n- Page 8: Aviation & ADS-B\n- Page 9: Logistics & Route Optimization\n\n` +
        `**Phase 4: Impact & Future (Day 7)**\n- Page 10 & 11: Benefits & Disadvantages\n- Page 12: Future Mobility\n- Take the 14-Module Assessment Quiz!`
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// AI Presentation Helper
apiRouter.post('/presentation-helper', async (req: Request, res: Response) => {
  try {
    const { moduleId } = req.body;
    const mod = PDF_MODULES.find(m => m.moduleId === moduleId) || PDF_MODULES[0];

    const prompt = `Generate presentation speaking notes for a seminar slide based on Page ${mod.pageNumber} ("${mod.title}") of the "AI IN TRANSPORTATION.pdf".
Module Details:
${mod.summary}
Key Points: ${mod.importantPoints.join('; ')}
Examples: ${JSON.stringify(mod.realWorldExamples)}

Output formatted with:
1. **Slide Title & Visual Layout Idea**
2. **Key Talking Points (3-4 concise bullet points for the slide)**
3. **Word-for-Word Speaker Script (What to say to the audience, warm and confident)**
4. **Interactive Question to Ask the Audience**`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a professional keynote coach preparing high-impact presentation materials.'
        }
      });
      return res.json({ presentation: response.text, module: mod });
    }

    res.json({
      presentation: `## Slide: Page ${mod.pageNumber} – ${mod.title}\n\n` +
        `**Visual Recommendation:** Show a split slide with sensor inputs on the left and dynamic vehicle actions on the right.\n\n` +
        `**Bullet Points for Slide:**\n` +
        mod.importantPoints.slice(0, 4).map(p => `- ${p}`).join('\n') + `\n\n` +
        `**Speaker Script:**\n"Good morning everyone. Today we are looking at ${mod.title}. In transportation, AI allows us to move from passive mechanical hardware to adaptive, intelligent machines. Notice how ${mod.importantPoints[0]}..."\n\n` +
        `**Audience Question:** "How many of you have noticed smart parking sensors or adaptive cruise control during your daily commute?"`,
      module: mod
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Mount the API Router for both '/api' prefix and root paths (ensures zero 404s on Vercel or local)
app.use('/api', apiRouter);
app.use(apiRouter);

// ---------------------------------------------------------
// DEV & PRODUCTION SERVER INTEGRATION
// ---------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // In dev: mount Vite middlewares
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production: serve dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Transport AI Server running on port ${PORT}`);
  });
}

// Only start HTTP listener when running directly in local dev or standalone node
if (process.env.VERCEL !== '1' && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  startServer();
}

export default app;
