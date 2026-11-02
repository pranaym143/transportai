import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { PDF_MODULES } from '../data/pdfKnowledge';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Calendar, 
  Presentation, 
  Copy, 
  Check, 
  Bookmark, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle,
  Lightbulb
} from 'lucide-react';

type ToolTab = 'notes' | 'quiz' | 'simplifier' | 'flashcards' | 'planner' | 'presentation';

export const ExtraAiTools: React.FC<{ initialTab?: ToolTab }> = ({ initialTab = 'notes' }) => {
  const { saveNote, recordQuizAttempt } = useLearning();

  const [activeTab, setActiveTab] = useState<ToolTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // TOOL A: AI NOTES GENERATOR
  const [notesModuleId, setNotesModuleId] = useState<string>('module-1');
  const [noteType, setNoteType] = useState<'short' | 'detailed' | 'exam'>('detailed');
  const [generatedNotes, setGeneratedNotes] = useState<string>('');
  const [notesLoading, setNotesLoading] = useState<boolean>(false);
  const [notesCopied, setNotesCopied] = useState<boolean>(false);
  const [notesSaved, setNotesSaved] = useState<boolean>(false);

  const handleGenerateNotes = async () => {
    setNotesLoading(true);
    setNotesSaved(false);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: notesModuleId, noteType })
      });
      const data = await res.json();
      setGeneratedNotes(data.notes || 'No notes generated.');
    } catch {
      const mod = PDF_MODULES.find(m => m.moduleId === notesModuleId) || PDF_MODULES[0];
      setGeneratedNotes(`## Study Notes for Page ${mod.pageNumber}: ${mod.title}\n\n${mod.summary}\n\n### Key Points:\n${mod.importantPoints.map(p => `- ${p}`).join('\n')}`);
    } finally {
      setNotesLoading(false);
    }
  };

  const handleSaveNotes = () => {
    const mod = PDF_MODULES.find(m => m.moduleId === notesModuleId) || PDF_MODULES[0];
    saveNote({
      moduleId: mod.moduleId,
      moduleTitle: mod.title,
      pageNumber: mod.pageNumber,
      content: generatedNotes
    });
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  // TOOL B: AI QUIZ GENERATOR
  const [quizModuleId, setQuizModuleId] = useState<string>('all');
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizLoading, setQuizLoading] = useState<boolean>(false);

  const startQuiz = async () => {
    setQuizLoading(true);
    setQuizFinished(false);
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setAnsweredState(false);

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: quizModuleId, count: 5 })
      });
      const data = await res.json();
      setQuizQuestions(data.questions || []);
    } catch {
      const qs = PDF_MODULES.flatMap(m => m.quizQuestions.map(q => ({
        ...q,
        pageNumber: m.pageNumber,
        moduleTitle: m.title
      })));
      setQuizQuestions(qs.slice(0, 5));
    } finally {
      setQuizLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'quiz' && quizQuestions.length === 0) {
      startQuiz();
    }
  }, [activeTab]);

  const handleSelectOption = (idx: number) => {
    if (answeredState) return;
    setSelectedAnswer(idx);
    setAnsweredState(true);

    const currentQ = quizQuestions[currentQuizIndex];
    if (idx === currentQ.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnsweredState(false);
    } else {
      setQuizFinished(true);
      const finalScore = selectedAnswer === quizQuestions[currentQuizIndex].correctIndex ? quizScore : quizScore;
      recordQuizAttempt(finalScore, quizQuestions.length, quizModuleId);

      if ((finalScore / quizQuestions.length) >= 0.6) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  // TOOL C: AI SIMPLIFIER
  const [simplifyQuery, setSimplifyQuery] = useState<string>('How inductive loop sensors work in smart traffic');
  const [simplifyLevel, setSimplifyLevel] = useState<'school' | 'diploma'>('school');
  const [simplifiedOutput, setSimplifiedOutput] = useState<string>('');
  const [simplifyLoading, setSimplifyLoading] = useState<boolean>(false);

  const handleSimplify = async (customQuery?: string) => {
    const q = customQuery || simplifyQuery;
    setSimplifyLoading(true);
    try {
      const res = await fetch('/api/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: q, level: simplifyLevel })
      });
      const data = await res.json();
      setSimplifiedOutput(data.simplified || 'Could not simplify.');
    } catch {
      setSimplifiedOutput(`### Simplified: ${q}\n\nThink of the AI in a vehicle like human reflexes: cameras are eyes, radar is hearing through fog, the processor is the brain making safe choices, and brakes are the muscles stopping the car safely.`);
    } finally {
      setSimplifyLoading(false);
    }
  };

  // TOOL D: FLASHCARDS
  const [flashcardsList, setFlashcardsList] = useState<any[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [flashcardModuleId, setFlashcardModuleId] = useState<string>('all');

  const loadFlashcards = async () => {
    try {
      const res = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: flashcardModuleId })
      });
      const data = await res.json();
      setFlashcardsList(data.flashcards || []);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    } catch {
      const cards = PDF_MODULES.flatMap(m => m.flashcards.map(f => ({
        ...f,
        pageNumber: m.pageNumber,
        moduleTitle: m.title
      })));
      setFlashcardsList(cards);
    }
  };

  useEffect(() => {
    if (activeTab === 'flashcards') {
      loadFlashcards();
    }
  }, [activeTab, flashcardModuleId]);

  // TOOL E: STUDY PLANNER
  const [studyHours, setStudyHours] = useState<number>(5);
  const [studyGoal, setStudyGoal] = useState<string>('Exam Preparation');
  const [studyPlanOutput, setStudyPlanOutput] = useState<string>('');
  const [plannerLoading, setPlannerLoading] = useState<boolean>(false);

  const handleGeneratePlan = async () => {
    setPlannerLoading(true);
    try {
      const res = await fetch('/api/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hoursPerWeek: studyHours, targetGoal: studyGoal })
      });
      const data = await res.json();
      setStudyPlanOutput(data.plan || '');
    } catch {
      setStudyPlanOutput(`### Personalized ${studyHours}-Hour Study Plan for ${studyGoal}\n- Day 1: Pages 1-3 (Foundations)\n- Day 2: Pages 4-6 (Public Transit & Autonomous Cars)\n- Day 3: Pages 7-9 (Traffic & Logistics)\n- Day 4: Pages 10-12 (Benefits, Risks & Future)\n- Day 5: 14-Module Assessment Quiz`);
    } finally {
      setPlannerLoading(false);
    }
  };

  // TOOL F: PRESENTATION HELPER
  const [presModuleId, setPresModuleId] = useState<string>('module-1');
  const [presOutput, setPresOutput] = useState<string>('');
  const [presLoading, setPresLoading] = useState<boolean>(false);

  const handleGeneratePresentation = async () => {
    setPresLoading(true);
    try {
      const res = await fetch('/api/presentation-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: presModuleId })
      });
      const data = await res.json();
      setPresOutput(data.presentation || '');
    } catch {
      const m = PDF_MODULES.find(mod => mod.moduleId === presModuleId) || PDF_MODULES[0];
      setPresOutput(`## Slide Presentation: Page ${m.pageNumber} – ${m.title}\n\n**Slide Key Points:**\n${m.importantPoints.map(p => `- ${p}`).join('\n')}\n\n**Speaker Script:**\n"Welcome everyone. In this section on ${m.title}, we look at how artificial intelligence transforms mobility..."`);
    } finally {
      setPresLoading(false);
    }
  };

  const tools = [
    { id: 'notes', label: 'AI Notes Generator', icon: <FileText className="w-4 h-4 text-[#f9570c]" /> },
    { id: 'quiz', label: 'AI Quiz Generator', icon: <HelpCircle className="w-4 h-4 text-amber-500" /> },
    { id: 'simplifier', label: 'AI Simplifier', icon: <Sparkles className="w-4 h-4 text-emerald-600" /> },
    { id: 'flashcards', label: 'AI Flashcards', icon: <Layers className="w-4 h-4 text-purple-600" /> },
    { id: 'planner', label: 'AI Study Planner', icon: <Calendar className="w-4 h-4 text-blue-600" /> },
    { id: 'presentation', label: 'Presentation Helper', icon: <Presentation className="w-4 h-4 text-pink-600" /> }
  ];

  return (
    <section id="tools-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#f9570c] text-xs font-bold mb-3 border border-orange-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE LEARNING SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight uppercase">
            6 Specialized AI Study Features
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Accelerate your learning with AI exam cheat-sheets, multiple-choice quizzes, student simplifications, flashcards, study schedules, and keynote speaking scripts.
          </p>
        </div>

        {/* Tool Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {tools.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as ToolTab)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tool Content Container */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 swift-card-shadow min-h-[480px]">
          
          {/* TAB A: NOTES GENERATOR */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 font-display flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#f9570c]" />
                    <span>AI Notes Generator</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Extract short revision notes, detailed chapter summaries, or student exam-ready answers.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={notesModuleId}
                    onChange={(e) => setNotesModuleId(e.target.value)}
                    className="px-3 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  >
                    {PDF_MODULES.map((m) => (
                      <option key={m.moduleId} value={m.moduleId}>
                        Page {m.pageNumber}: {m.title}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
                    {(['short', 'detailed', 'exam'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setNoteType(type)}
                        className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-colors cursor-pointer ${
                          noteType === type ? 'bg-[#f9570c] text-white' : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleGenerateNotes}
                    disabled={notesLoading}
                    className="px-5 py-2 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {notesLoading ? 'Generating...' : 'Generate Notes'}
                  </button>
                </div>
              </div>

              {generatedNotes ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#f9570c] font-bold font-mono">
                      Generated {noteType.toUpperCase()} Notes for Page {PDF_MODULES.find(m => m.moduleId === notesModuleId)?.pageNumber}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveNotes}
                        className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 flex items-center gap-1.5 cursor-pointer font-medium"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-[#f9570c]" />
                        <span>{notesSaved ? 'Saved to Dashboard!' : 'Save to My Notes'}</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedNotes);
                          setNotesCopied(true);
                          setTimeout(() => setNotesCopied(false), 2000);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 flex items-center gap-1.5 cursor-pointer font-medium"
                      >
                        {notesCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{notesCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
                    {generatedNotes}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">Select a module and note format, then click "Generate Notes".</p>
                  <p className="text-xs text-slate-400 mt-1">Grounded in the 14-page PDF textbook.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB B: QUIZ GENERATOR */}
          {activeTab === 'quiz' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 font-display flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    <span>AI Quiz Assessment</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Test your understanding with official PDF questions. Instant grading with exact page citations.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={quizModuleId}
                    onChange={(e) => setQuizModuleId(e.target.value)}
                    className="px-3 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="all">All 14 Modules</option>
                    {PDF_MODULES.map((m) => (
                      <option key={m.moduleId} value={m.moduleId}>
                        Page {m.pageNumber}: {m.title}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={startQuiz}
                    disabled={quizLoading}
                    className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>New Quiz</span>
                  </button>
                </div>
              </div>

              {quizLoading ? (
                <div className="text-center py-16 text-slate-400">
                  <Sparkles className="w-10 h-10 text-[#f9570c] animate-spin mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">Preparing 14-page PDF quiz questions...</p>
                </div>
              ) : quizFinished ? (
                <div className="text-center py-12 max-w-md mx-auto">
                  <div className="w-20 h-20 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center mx-auto mb-4 text-3xl font-display text-[#f9570c] font-black shadow-sm">
                    {Math.round((quizScore / quizQuestions.length) * 100)}%
                  </div>
                  <h4 className="text-2xl font-bold text-slate-950 font-display">
                    {quizScore === quizQuestions.length ? 'Perfect Score! 🌟' : quizScore >= quizQuestions.length * 0.7 ? 'Great Job! 👏' : 'Keep Practicing! 🚀'}
                  </h4>
                  <p className="text-sm text-slate-600 mt-2">
                    You scored <strong className="text-[#f9570c]">{quizScore}</strong> out of <strong className="text-[#f9570c]">{quizQuestions.length}</strong> questions correct.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Your score has been saved to your student dashboard.</p>

                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      onClick={startQuiz}
                      className="px-6 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white font-bold text-xs shadow-sm cursor-pointer"
                    >
                      Try Another Quiz
                    </button>
                  </div>
                </div>
              ) : quizQuestions.length > 0 ? (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#f9570c] font-bold">
                      Question {currentQuizIndex + 1} of {quizQuestions.length}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#f9570c] border border-orange-200 font-mono text-[11px] font-bold">
                      Source: Page {quizQuestions[currentQuizIndex].pageNumber}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="text-base sm:text-lg font-bold text-slate-950 leading-snug font-display">
                      {quizQuestions[currentQuizIndex].question}
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {quizQuestions[currentQuizIndex].options.map((opt: string, idx: number) => {
                      const isCorrect = idx === quizQuestions[currentQuizIndex].correctIndex;
                      const isSelected = selectedAnswer === idx;

                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-[#f9570c] hover:bg-orange-50/20';
                      if (answeredState) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-50 border-rose-500 text-rose-800';
                        } else {
                          btnStyle = 'bg-slate-50 border-slate-200 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={answeredState}
                          className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {answeredState && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                          {answeredState && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {answeredState && (
                    <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 text-xs space-y-2">
                      <div className="font-bold text-[#f9570c] flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4" />
                        <span>Curriculum Explanation (Verified PDF Page {quizQuestions[currentQuizIndex].pageNumber}):</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {quizQuestions[currentQuizIndex].explanation}
                      </p>
                    </div>
                  )}

                  {answeredState && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleNextQuizQuestion}
                        className="px-6 py-3 rounded-full bg-[#111827] hover:bg-black text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <span>{currentQuizIndex + 1 < quizQuestions.length ? 'Next Question' : 'View Results'}</span>
                        <ArrowRight className="w-4 h-4 text-[#f9570c]" />
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {/* TAB C: AI SIMPLIFIER */}
          {activeTab === 'simplifier' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-950 font-display flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>AI Simplifier (School & Diploma Friendly)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Demystify dense engineering concepts into crystal-clear real-world analogies.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="text-xs text-slate-700 font-bold">Target Student Audience:</label>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
                    <button
                      onClick={() => setSimplifyLevel('school')}
                      className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                        simplifyLevel === 'school' ? 'bg-[#111827] text-white' : 'text-slate-600'
                      }`}
                    >
                      School Student (Age 12)
                    </button>
                    <button
                      onClick={() => setSimplifyLevel('diploma')}
                      className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                        simplifyLevel === 'diploma' ? 'bg-[#111827] text-white' : 'text-slate-600'
                      }`}
                    >
                      Diploma / Polytechnic Student
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={simplifyQuery}
                    onChange={(e) => setSimplifyQuery(e.target.value)}
                    placeholder="Enter concept (e.g. Inductive loops, ADS-B, Sensor fusion, Ultrasonic echoes)..."
                    className="flex-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#f9570c]"
                  />
                  <button
                    onClick={() => handleSimplify()}
                    disabled={simplifyLoading || !simplifyQuery.trim()}
                    className="px-6 py-3 rounded-full bg-[#f9570c] hover:bg-[#e04a04] text-white text-xs font-bold shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {simplifyLoading ? 'Simplifying...' : 'Simplify'}
                  </button>
                </div>
              </div>

              {simplifiedOutput && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {simplifiedOutput}
                </div>
              )}
            </div>
          )}

          {/* TAB D: FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 font-display flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-600" />
                    <span>AI Flashcard Revision</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click card to flip between question and verified curriculum answer.
                  </p>
                </div>

                <select
                  value={flashcardModuleId}
                  onChange={(e) => setFlashcardModuleId(e.target.value)}
                  className="px-3 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none"
                >
                  <option value="all">All Modules</option>
                  {PDF_MODULES.map((m) => (
                    <option key={m.moduleId} value={m.moduleId}>
                      Page {m.pageNumber}: {m.title}
                    </option>
                  ))}
                </select>
              </div>

              {flashcardsList.length > 0 ? (
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Card {currentCardIndex + 1} of {flashcardsList.length}</span>
                    <span className="font-mono text-[#f9570c] font-bold">Page {flashcardsList[currentCardIndex].pageNumber}</span>
                  </div>

                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="min-h-[250px] p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-[#f9570c] shadow-sm flex flex-col justify-between cursor-pointer transition-all select-none group"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                      <span className="uppercase tracking-wider">
                        {isFlipped ? 'Answer (From PDF)' : 'Question (Click to flip)'}
                      </span>
                      <span className="text-[#f9570c]">
                        Flip ⟳
                      </span>
                    </div>

                    <div className="text-base sm:text-lg font-bold text-slate-900 text-center py-6 leading-relaxed font-display">
                      {isFlipped ? flashcardsList[currentCardIndex].back : flashcardsList[currentCardIndex].front}
                    </div>

                    <div className="text-[11px] text-slate-400 text-center font-medium">
                      {isFlipped ? 'Verified curriculum fact' : 'Recall answer before revealing!'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        setCurrentCardIndex((prev) => (prev - 1 + flashcardsList.length) % flashcardsList.length);
                      }}
                      className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      ← Previous Card
                    </button>

                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        setCurrentCardIndex((prev) => (prev + 1) % flashcardsList.length);
                      }}
                      className="px-4 py-2 rounded-full bg-[#111827] hover:bg-black text-xs text-white font-bold cursor-pointer"
                    >
                      Next Card →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400">No flashcards found for this selection.</div>
              )}
            </div>
          )}

          {/* TAB E: STUDY PLANNER */}
          {activeTab === 'planner' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-950 font-display flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>AI Study Planner</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Generate a structured timetable tailored to your available study hours and goals.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-700 block mb-1.5 font-bold">Study Hours / Week:</label>
                  <select
                    value={studyHours}
                    onChange={(e) => setStudyHours(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value={2}>2 Hours / Week (Light revision)</option>
                    <option value={5}>5 Hours / Week (Recommended)</option>
                    <option value={10}>10 Hours / Week (Intensive Exam Prep)</option>
                    <option value={15}>15 Hours / Week (Full Engineering Mastery)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-700 block mb-1.5 font-bold">Goal:</label>
                  <select
                    value={studyGoal}
                    onChange={(e) => setStudyGoal(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Exam Preparation">Exam Preparation & Model Answers</option>
                    <option value="College Seminar">College Seminar / Presentation Prep</option>
                    <option value="Autonomous Engineering">Autonomous Systems Engineering</option>
                    <option value="Quick Review">Quick 3-Day Crash Course</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGeneratePlan}
                disabled={plannerLoading}
                className="px-6 py-3 rounded-full bg-[#111827] hover:bg-black text-white font-bold text-xs shadow-sm cursor-pointer disabled:opacity-50"
              >
                {plannerLoading ? 'Building Schedule...' : 'Generate Personalized Study Schedule'}
              </button>

              {studyPlanOutput && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {studyPlanOutput}
                </div>
              )}
            </div>
          )}

          {/* TAB F: PRESENTATION HELPER */}
          {activeTab === 'presentation' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 font-display flex items-center gap-2">
                    <Presentation className="w-5 h-5 text-pink-600" />
                    <span>AI Presentation Helper</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Generate slide bullet points, verbatim speaking scripts, and audience icebreaker questions for each module.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={presModuleId}
                    onChange={(e) => setPresModuleId(e.target.value)}
                    className="px-3 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  >
                    {PDF_MODULES.map((m) => (
                      <option key={m.moduleId} value={m.moduleId}>
                        Page {m.pageNumber}: {m.title}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleGeneratePresentation}
                    disabled={presLoading}
                    className="px-5 py-2 rounded-full bg-[#f9570c] hover:bg-[#e04a04] text-white text-xs font-bold shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {presLoading ? 'Drafting...' : 'Generate Slide & Script'}
                  </button>
                </div>
              </div>

              {presOutput ? (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {presOutput}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400">
                  <Presentation className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">Select a module and click "Generate Slide & Script".</p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
