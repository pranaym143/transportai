import React from 'react';
import { useLearning } from '../context/LearningContext';
import { ActiveTab } from '../types';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useLearning();

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 py-12 relative overflow-hidden mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-slate-950 font-display tracking-tight flex items-center">
                swift<span className="text-[#f9570c]">.</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Delivering a brighter tomorrow. Send anything. Anywhere. The premier interactive platform integrating real-world autonomous logistics with the 14-page AI in Transportation curriculum.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#f9570c] text-[11px] font-mono font-bold border border-orange-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Grounded in "AI IN TRANSPORTATION.pdf" (14 Pages)</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-display">
              Curriculum Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#f9570c] transition-colors cursor-pointer">
                  Send (Home)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('learn')} className="hover:text-[#f9570c] transition-colors cursor-pointer">
                  14 PDF Modules
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('assistant')} className="hover:text-[#f9570c] transition-colors cursor-pointer">
                  Transport AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('applications')} className="hover:text-[#f9570c] transition-colors cursor-pointer">
                  Fleet & Applications
                </button>
              </li>
            </ul>
          </div>

          {/* Study Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-display">
              AI Study Suite
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('tools')} className="hover:text-[#f9570c] transition-colors cursor-pointer">
                  AI Notes & Exam Generator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('quiz')} className="hover:text-[#f9570c] transition-colors cursor-pointer">
                  14-Page Adaptive Quiz
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tools')} className="hover:text-[#f9570c] transition-colors cursor-pointer">
                  AI Simplifier & Flashcards
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-[#f9570c] transition-colors cursor-pointer">
                  Student Dashboard & Certificate
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 TRANSPORT AI. All rights reserved. Built for intelligent mobility and curriculum excellence.</p>
          <p className="text-slate-400 font-medium">
            AI in Transportation • 14-Page Educational Framework
          </p>
        </div>

      </div>
    </footer>
  );
};
