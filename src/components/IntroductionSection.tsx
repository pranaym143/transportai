import React from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  Cpu, 
  Workflow, 
  Eye, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Zap
} from 'lucide-react';

export const IntroductionSection: React.FC = () => {
  const { openAssistantWithQuery, openModuleReader } = useLearning();

  const pillars = [
    {
      title: 'Cognitive Data Processing',
      desc: 'High-speed ingestion of multi-sensor data streams (radar, cameras, GPS) transformed into immediate spatial awareness.',
      icon: <Cpu className="w-5 h-5 text-[#FF690F]" />,
      pageRef: 1
    },
    {
      title: 'Environment Perception',
      desc: 'Computer vision and acoustic recognition classifying lane markers, pedestrians, traffic signals, and approaching emergency sirens.',
      icon: <Eye className="w-5 h-5 text-[#FF690F]" />,
      pageRef: 1
    },
    {
      title: 'Adaptive Learning & Reasoning',
      desc: 'Deep neural networks continuously learning from millions of miles driven, adapting to novel edge cases and changing weather.',
      icon: <Workflow className="w-5 h-5 text-[#FF690F]" />,
      pageRef: 5
    },
    {
      title: 'Instantaneous Safe Actuation',
      desc: 'Deterministic sub-35 millisecond reaction times actuating steering, throttle, and electronic braking to prevent collisions.',
      icon: <Zap className="w-5 h-5 text-[#FF690F]" />,
      pageRef: 5
    }
  ];

  return (
    <section className="py-20 bg-[#F1EBE5]/70 border-y border-[#E7E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E7E0D8] text-[#FF690F] text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FOUNDATIONAL ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-display tracking-tight">
            Introduction to Artificial Intelligence in Transportation
          </h2>
          <p className="text-[#77716E] text-sm sm:text-base mt-3 leading-relaxed">
            Unlike static, rule-based automation of the 1970s and 1980s, modern transportation AI is a cognitive paradigm. It perceives environments in 360 degrees, calculates trajectories under uncertainty, and acts with millisecond precision.
          </p>
        </div>

        {/* 4 Pillars Grid in Pure White Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E0D8] warm-card-shadow warm-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F7F3EF] flex items-center justify-center mb-5 border border-[#E7E0D8]">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-[#171717] font-display mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-[#77716E] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0EAE3] flex items-center justify-between">
                <button
                  onClick={() => openModuleReader(`module-${p.pageRef}`)}
                  className="text-xs font-bold text-[#FF690F] hover:text-[#E55705] flex items-center gap-1 cursor-pointer"
                >
                  <span>Page {p.pageRef} in PDF</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Callout Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E0D8] warm-card-shadow flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold text-[#FF690F] uppercase tracking-wider">
              Curriculum Core Principle
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[#171717] font-display">
              "AI is not just automation; it is adaptive intelligence that improves with continuous data ingestion."
            </h4>
            <p className="text-xs text-[#77716E]">
              From Module 1 & Module 2 of "AI IN TRANSPORTATION.pdf"
            </p>
          </div>

          <button
            onClick={() => openAssistantWithQuery('Explain the difference between traditional automation and AI in transportation according to the PDF.')}
            className="px-6 py-3 rounded-full bg-[#171717] hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
          >
            <span>Ask AI About This Concept</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF690F]" />
          </button>
        </div>

      </div>
    </section>
  );
};
