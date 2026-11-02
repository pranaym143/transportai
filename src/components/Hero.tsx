import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  Package, 
  ArrowRight, 
  Bot, 
  Sparkles, 
  Truck,
  Eye,
  Maximize2
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, openAssistantWithQuery, openModuleReader } = useLearning();

  const [pickup, setPickup] = useState('');
  const [delivery, setDelivery] = useState('');
  const [isSimulatingDispatch, setIsSimulatingDispatch] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<string | null>(null);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulatingDispatch(true);
    setDispatchResult(null);

    setTimeout(() => {
      setIsSimulatingDispatch(false);
      setDispatchResult(`Autonomous Route Dispatched: Path from "${pickup || 'Smart Terminal A'}" to "${delivery || 'Urban Sector 4'}" optimized via Page 9 algorithms. Fuel reduction: 18%, ETA: 12 mins.`);
    }, 1100);
  };

  return (
    <section className="relative pt-6 pb-20 lg:pb-28 overflow-hidden min-h-[760px] flex flex-col justify-between">
      
      {/* 100% Full Clarity Background Image: Futuristic Logistics Hub in Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none">
        <img 
          src="https://res.cloudinary.com/dqpsyh7yu/image/upload/v1793633136/Futuristic_Logistics_Hub_in_Motion_mxbink.png" 
          alt="Futuristic Logistics Hub in Motion" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Hero Content housed in solid white pill-card with strong contrast */}
        <div className="max-w-2xl lg:max-w-xl my-4">
          
          <div className="bg-white/95 rounded-[32px] p-6 sm:p-9 border border-[#E7E0D8] shadow-2xl space-y-6">
            
            {/* Small uppercase introductory text with letter spacing */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#77716E] uppercase font-sans">
                DELIVERING A BRIGHTER TOMORROW
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF690F]" />
              <span className="text-[10px] uppercase font-bold text-[#FF690F] bg-orange-100/80 px-2.5 py-0.5 rounded-full border border-orange-200">
                14-PAGE CURRICULUM
              </span>
            </div>

            {/* Large bold black headline with bright orange highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#171717] font-display tracking-tight leading-[1.04]">
              ARTIFICIAL <br />
              INTELLIGENCE IN <br />
              <span className="text-[#FF690F]">TRANSPORTATION.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-bold text-[#171717] font-display">
              Discover how AI is transforming the way the world moves.
            </p>

            {/* Supporting description */}
            <p className="text-xs sm:text-sm text-[#77716E] font-normal leading-relaxed">
              Fast, reliable, and intelligent systems for autonomous vehicles, smart traffic signals, predictive aviation, and next-generation logistics. From roadside sensors to international skyways.
            </p>

            {/* Reference Dual-Input Search/Booking Capsule */}
            <form 
              onSubmit={handleDispatch}
              className="bg-[#F7F3EF] rounded-full p-1.5 sm:p-2 flex items-center border border-[#E7E0D8] transition-all focus-within:border-[#FF690F]/70 focus-within:ring-2 focus-within:ring-orange-500/10"
            >
              <div className="pl-2.5 pr-2 text-[#FF690F] shrink-0">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
                  <Package className="w-4 h-4 text-[#FF690F]" />
                </div>
              </div>

              <input
                type="text"
                placeholder="Enter pickup / topic"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-1/2 px-2 py-1.5 text-xs sm:text-[13px] text-[#171717] placeholder-[#77716E] focus:outline-none bg-transparent"
              />

              <div className="h-5 w-[1px] bg-[#E7E0D8] mx-1.5 shrink-0" />

              <input
                type="text"
                placeholder="Enter destination"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="w-1/2 px-2 py-1.5 text-xs sm:text-[13px] text-[#171717] placeholder-[#77716E] focus:outline-none bg-transparent"
              />

              <button
                type="submit"
                disabled={isSimulatingDispatch}
                className="w-10 h-10 rounded-full bg-[#FF690F] hover:bg-[#E55705] flex items-center justify-center text-white shrink-0 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                title="Simulate Autonomous Dispatch"
              >
                {isSimulatingDispatch ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Dispatch Result toast if triggered */}
            {dispatchResult && (
              <div className="p-3 rounded-2xl bg-white border border-orange-200 shadow-sm text-xs text-[#171717] flex items-start gap-2.5 animate-fadeIn">
                <Truck className="w-4 h-4 text-[#FF690F] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-[#171717]">AI Logistics Dispatch: </span>
                  <span className="text-[#77716E]">{dispatchResult}</span>
                </div>
                <button 
                  onClick={() => openModuleReader('module-9')}
                  className="text-[#FF690F] font-bold hover:underline shrink-0 text-[11px]"
                >
                  Module 9 →
                </button>
              </div>
            )}

            {/* Two Rounded CTA Buttons: "Explore Learning" and "Ask AI" */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('learn');
                  window.scrollTo({ top: 700, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-[#171717] hover:bg-black text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer group"
              >
                <span>Explore Learning</span>
                <span className="text-[#FF690F] group-hover:translate-x-0.5 transition-transform font-bold">
                  →
                </span>
              </button>

              <button
                onClick={() => openAssistantWithQuery('What is AI in transportation and how does it work?')}
                className="px-6 py-3 rounded-full bg-white hover:bg-[#F1EBE5] text-[#171717] text-xs sm:text-sm font-bold flex items-center gap-2 border border-[#E7E0D8] shadow-xs transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#FF690F]" />
                <span>Ask AI</span>
              </button>
            </div>

          </div>

        </div>

        {/* STATISTICS SECTION: Rendered in a clean floating white capsule card */}
        <div className="mt-12 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#E7E0D8] warm-card-shadow">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 max-w-4xl mx-auto">
            
            {/* Stat 1 */}
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-bold text-[#77716E] tracking-[0.16em] uppercase block mb-1">
                AI LEARNING MODULES
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#171717] font-display">
                14
              </div>
              <p className="text-xs text-[#77716E] mt-1">
                Full syllabus from foundational principles to future mobility
              </p>
            </div>

            {/* Stat 2 with vertical separator */}
            <div className="text-center sm:text-left sm:pl-8 sm:border-l sm:border-[#E7E0D8]">
              <span className="text-[11px] font-bold text-[#77716E] tracking-[0.16em] uppercase block mb-1">
                INTELLIGENT FEATURES
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#171717] font-display">
                06+
              </div>
              <p className="text-xs text-[#77716E] mt-1">
                Notes, adaptive quizzes, simplifier, flashcards & planner
              </p>
            </div>

            {/* Stat 3 with vertical separator */}
            <div className="text-center sm:text-left sm:pl-8 sm:border-l sm:border-[#E7E0D8]">
              <span className="text-[11px] font-bold text-[#77716E] tracking-[0.16em] uppercase block mb-1">
                LEARNING ANYTIME
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#171717] font-display">
                24/7
              </div>
              <p className="text-xs text-[#77716E] mt-1">
                On-demand Gemini 3.8 Flash RAG tutoring & self-paced testing
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
