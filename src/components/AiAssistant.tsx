import React, { useState, useEffect, useRef } from 'react';
import { useLearning } from '../context/LearningContext';
import { ChatMessage } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Trash2, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'What is AI in transportation?',
  'Explain how AI works.',
  'What are the advantages of AI?',
  'Explain AI in aviation.',
  'What is the future of AI transportation?',
  'Explain smart traffic signals.'
];

const MODES = [
  { id: 'standard', label: 'Standard', desc: 'Balanced & Educational' },
  { id: 'short', label: 'Short Answer', desc: '2-3 Sentences' },
  { id: 'detailed', label: 'Step-by-Step', desc: 'Deep Technical' },
  { id: 'exam', label: 'Exam Prep', desc: 'Scoring Model Answer' },
  { id: 'definition', label: 'Definition', desc: 'Simple & Jargon-free' }
];

export const AiAssistant: React.FC = () => {
  const { chatPresetPrompt, setChatPresetPrompt, openModuleReader } = useLearning();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `### Welcome to Transport AI! 🚀\nI am your intelligent educational assistant specializing in **Artificial Intelligence in Transportation**, grounded strictly in the 14-page textbook **"AI IN TRANSPORTATION.pdf"**.\n\nYou can ask me about:\n- How AI works (Sensors, cameras, GPS -> Analysis -> Decision -> System response)\n- Ultrasonic vs Radar sensors in automobiles\n- Inductive loops & smart traffic signals\n- ADS-B & why human pilots remain vital in aviation\n- Route optimization & autonomous last-mile delivery\n- Future mobility (eVTOL flying cars, V2V communication, Vision Zero)\n\n*Choose a query mode above or click any suggested question below to get started!*`,
      groundedInPdf: true,
      sourcePages: [1, 5, 6, 7, 8, 9, 12],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>('standard');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (chatPresetPrompt) {
      sendMessage(chatPresetPrompt);
      setChatPresetPrompt('');
    }
  }, [chatPresetPrompt]);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          mode: selectedMode
        })
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          sourcePages: data.sourcePages,
          groundedInPdf: data.groundedInPdf,
          mode: data.mode,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ Error: ${data.error || 'Unable to connect to Transport AI server.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Connection failure: Could not reach the AI service.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'new-welcome',
        role: 'assistant',
        content: 'Conversation cleared! How can I assist you with the 14-page AI in Transportation curriculum today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm sm:text-base font-bold text-slate-900 font-display mt-3 mb-1">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-base sm:text-lg font-bold text-slate-950 font-display mt-4 mb-2">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#f9570c] font-bold mt-0.5">•</span>
            <span>{renderInlineFormatting(itemText)}</span>
          </div>
        );
      }
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-[#f9570c] font-bold shrink-0 mt-0.5 font-mono">
              {numMatch[1]}
            </span>
            <span>{renderInlineFormatting(numMatch[2])}</span>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="my-1 leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[PDF Source:.*?\]|\[Page\s*\d+.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-900 font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[PDF Source:') || part.startsWith('[Page')) {
        return (
          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full bg-orange-100 text-[#f9570c] font-mono text-[11px] font-bold border border-orange-200 mx-1">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section id="ai-assistant" className="py-12 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#f9570c] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>14-PAGE PDF RETRIEVAL-AUGMENTED LEARNING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display uppercase tracking-tight">
            TRANSPORT AI – YOUR PERSONAL LEARNING ASSISTANT
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
            Ask any question about autonomous driving, smart traffic signals, aviation, logistics, sensors, or future mobility. Every answer is grounded in the uploaded curriculum.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 swift-card-shadow flex flex-col h-[740px]">
          
          {/* Top Control Bar */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-500 font-bold mr-1 hidden sm:inline">
                Mode:
              </span>
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMode(m.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedMode === m.id
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 bg-white border border-slate-200'
                  }`}
                  title={m.desc}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRegenerate}
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-950 hover:bg-white transition-colors text-xs flex items-center gap-1 cursor-pointer border border-transparent hover:border-slate-200"
                title="Regenerate last answer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#f9570c]" />
                <span className="hidden md:inline font-medium">Regenerate</span>
              </button>

              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-full text-slate-500 hover:text-rose-600 hover:bg-white transition-colors text-xs flex items-center gap-1 cursor-pointer border border-transparent hover:border-slate-200"
                title="Clear conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-medium">Clear Chat</span>
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/30">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-9 h-9 rounded-full bg-[#111827] flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <span className="text-white text-xs font-black font-display">s<span className="text-[#f9570c]">.</span></span>
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 ${
                    isAssistant 
                      ? 'bg-white border border-slate-200/80 text-slate-700 shadow-sm' 
                      : 'bg-[#111827] text-white shadow-sm'
                  }`}>
                    
                    {isAssistant && (
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-slate-100 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-950">Transport AI</span>
                          {msg.groundedInPdf && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              PDF Grounded
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">{msg.timestamp}</span>
                      </div>
                    )}

                    <div className="text-xs sm:text-sm">
                      {isAssistant ? renderFormattedText(msg.content) : msg.content}
                    </div>

                    {isAssistant && msg.sourcePages && msg.sourcePages.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-[11px] text-slate-400 font-bold">Verified PDF Pages:</span>
                        {msg.sourcePages.map((pg) => (
                          <button
                            key={pg}
                            onClick={() => openModuleReader(`module-${pg}`)}
                            className="px-2.5 py-0.5 rounded-full bg-orange-50 hover:bg-orange-100 text-[#f9570c] border border-orange-200 font-mono text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            title={`Jump to Page ${pg}`}
                          >
                            <span>Page {pg}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ))}
                      </div>
                    )}

                    {isAssistant && (
                      <div className="mt-3 flex items-center justify-end gap-2 text-xs text-slate-400">
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="p-1 rounded hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 text-[10px] font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-medium">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                  </div>

                  {!isAssistant && (
                    <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm font-bold text-xs">
                      You
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3.5 justify-start items-center">
                <div className="w-9 h-9 rounded-full bg-[#111827] flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4 h-4 text-[#f9570c] animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-4 flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#f9570c] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#f9570c] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#f9570c] animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs text-slate-600 ml-2 font-medium">Retrieving PDF context & reasoning...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="text-slate-400 font-bold text-[11px] shrink-0">Suggested:</span>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                disabled={isLoading}
                className="px-3 py-1 rounded-full bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-[#f9570c] border border-slate-200 hover:border-orange-200 whitespace-nowrap transition-colors shrink-0 disabled:opacity-50 cursor-pointer font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 bg-slate-50 rounded-full border border-slate-200 p-1.5 focus-within:border-[#f9570c] focus-within:ring-2 focus-within:ring-orange-500/10"
            >
              <input
                type="text"
                placeholder="Ask about self-driving sensors, aviation ADS-B, traffic inductive loops, logistics..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none bg-transparent disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-[#f9570c] hover:bg-[#e04a04] text-white flex items-center justify-center shrink-0 shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
