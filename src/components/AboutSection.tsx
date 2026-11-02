import React from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  FileText, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { PDF_MODULES } from '../data/pdfKnowledge';

export const AboutSection: React.FC = () => {
  const { setActiveTab } = useLearning();

  return (
    <section id="about-section" className="py-16 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#f9570c] text-xs font-bold mb-3 border border-orange-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PEDAGOGICAL ARCHITECTURE & GROUND TRUTH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight uppercase">
            About Transport AI
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Engineered with strict educational fidelity to the 14-page curriculum <strong>"AI IN TRANSPORTATION.pdf"</strong>, harmonizing primary textbook facts with intelligent contextual retrieval.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 swift-card-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[#f9570c] mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-950 font-display">1. The PDF as Primary Source</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every topic—from 1960s microprocessors to 77 GHz radar, inductive loops, and ADS-B aviation tracking—comes directly from the 14-page syllabus. We preserve exact terminology and avoid hallucinated facts.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 swift-card-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-950 font-display">2. Intelligent RAG Architecture</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our retrieval-augmented pipeline extracts and indexes semantic chunks across all 14 modules. User queries are matched against curriculum context to provide authoritative, grounded educational answers.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 swift-card-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-950 font-display">3. Transparent Distinctions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whenever a learner requests supplementary information beyond the 14 pages, Transport AI explicitly flags it as "Additional Knowledge", upholding complete academic trust and exam readiness.
            </p>
          </div>

        </div>

        {/* 14 Page Index */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 swift-card-shadow">
          <h3 className="text-xl font-bold text-slate-950 font-display mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#f9570c]" />
            <span>Complete 14-Page Curriculum Index</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PDF_MODULES.map((m) => (
              <div 
                key={m.pageNumber}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3"
              >
                <span className="w-7 h-7 rounded-full bg-orange-100 text-[#f9570c] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {m.pageNumber}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {m.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Designed for diploma, undergraduate engineering, and autonomous logistics practitioners.
            </p>

            <button
              onClick={() => {
                setActiveTab('learn');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All 14 Modules</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#f9570c]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
