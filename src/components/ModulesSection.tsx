import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { PDF_MODULES, PDFModule } from '../data/pdfKnowledge';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Bot, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  Lightbulb,
  Search
} from 'lucide-react';

export const ModulesSection: React.FC = () => {
  const { 
    progress, 
    toggleModuleCompletion, 
    isModuleCompleted, 
    openAssistantWithQuery, 
    selectedModule, 
    setSelectedModule,
    setActiveTab
  } = useLearning();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const categories = ['All', 'Fundamentals', 'Technology & Mechanics', 'Sector Applications', 'Impact & Future', 'Synthesis'];

  const filteredModules = PDF_MODULES.filter((mod) => {
    const matchesCategory = activeCategory === 'All' || mod.category === activeCategory;
    const matchesSearch = searchTerm.trim() === '' || 
      mod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.pageNumber.toString() === searchTerm.trim() ||
      mod.importantPoints.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleToggleAudio = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleNextModule = () => {
    if (!selectedModule) return;
    const nextIndex = (selectedModule.pageNumber % PDF_MODULES.length);
    setSelectedModule(PDF_MODULES[nextIndex]);
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const handlePrevModule = () => {
    if (!selectedModule) return;
    const prevIndex = (selectedModule.pageNumber - 2 + PDF_MODULES.length) % PDF_MODULES.length;
    setSelectedModule(PDF_MODULES[prevIndex]);
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const closeReader = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
    setSelectedModule(null);
  };

  return (
    <section id="modules-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#f9570c] text-xs font-bold mb-3 border border-orange-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THE 14-PAGE PRIMARY CURRICULUM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight">
              PDF Learning Modules
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Every chapter, sensor mechanism, and technical milestone from the official 14-page textbook. Read each module, listen with the speech reader, and test your retention.
            </p>
          </div>

          {/* Curriculum Mastery Card */}
          <div className="bg-white p-4 rounded-2xl swift-card-shadow border border-slate-200/80 min-w-[240px]">
            <div className="flex items-center justify-between text-xs mb-2 font-medium">
              <span className="text-slate-500">Curriculum Mastery:</span>
              <span className="font-bold text-[#f9570c]">
                {Math.round((progress.completedModules.length / PDF_MODULES.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#f9570c] transition-all duration-500"
                style={{ width: `${(progress.completedModules.length / PDF_MODULES.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 text-right font-medium">
              {progress.completedModules.length} of {PDF_MODULES.length} modules completed
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Filter by keyword or page #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#f9570c]"
            />
          </div>
        </div>

        {/* Module Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const completed = isModuleCompleted(module.moduleId);

            return (
              <div
                key={module.moduleId}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 swift-card-shadow swift-card-shadow-hover flex flex-col justify-between group"
              >
                <div>
                  {/* Top card metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-orange-50 text-[#f9570c] border border-orange-200">
                      Page {module.pageNumber} of 14
                    </span>

                    <button
                      onClick={() => toggleModuleCompletion(module.moduleId)}
                      className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                        completed
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold'
                          : 'text-slate-500 hover:text-slate-900 bg-slate-50 border border-slate-200'
                      }`}
                      title={completed ? 'Completed' : 'Mark as completed'}
                    >
                      {completed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[11px]">Mastered</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-[11px]">Mark Done</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Title and Category */}
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    {module.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#f9570c] transition-colors font-display mt-0.5">
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {module.summary}
                  </p>

                  {/* Key bullet preview */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {module.importantPoints.slice(0, 2).map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                        <span className="text-[#f9570c] mt-0.5 font-bold">•</span>
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom action row */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedModule(module)}
                    className="text-xs font-bold text-[#f9570c] hover:text-[#e04a04] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Read Page {module.pageNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => openAssistantWithQuery(`Explain Page ${module.pageNumber} (${module.title}) in student exam format with key points.`)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-[#f9570c] hover:bg-orange-50 transition-colors"
                    title={`Ask AI about ${module.title}`}
                  >
                    <Bot className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* CONTINUOUS 14-PAGE READER MODAL */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-orange-100 text-[#f9570c] font-mono text-xs font-bold border border-orange-200">
                  Page {selectedModule.pageNumber} of 14
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    {selectedModule.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-display">
                    {selectedModule.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleAudio(`${selectedModule.title}. ${selectedModule.summary}. ${selectedModule.importantPoints.join('. ')}`)}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-100 border-amber-300 text-amber-700 animate-pulse'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950'
                  }`}
                  title={isPlayingAudio ? 'Stop audio' : 'Listen to module text'}
                >
                  {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => toggleModuleCompletion(selectedModule.moduleId)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isModuleCompleted(selectedModule.moduleId)
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {isModuleCompleted(selectedModule.moduleId) ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <span>Mark Done</span>
                  )}
                </button>

                <button
                  onClick={closeReader}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm leading-relaxed text-slate-700">
              
              {/* PDF Excerpt callout */}
              <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#f9570c] mb-2">
                  <FileText className="w-4 h-4" />
                  <span>PRIMARY PDF EXCERPT (VERBATIM KNOWLEDGE SOURCE)</span>
                </div>
                <p className="text-slate-800 text-sm whitespace-pre-line leading-relaxed">
                  {selectedModule.pdfExcerpt}
                </p>
              </div>

              {/* Important Points */}
              <div>
                <h4 className="text-base font-bold text-slate-950 font-display flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#f9570c]" />
                  <span>Important Curriculum Points</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedModule.importantPoints.map((pt, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#f9570c] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 text-xs sm:text-sm">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Examples */}
              {selectedModule.realWorldExamples.length > 0 && (
                <div>
                  <h4 className="text-base font-bold text-slate-950 font-display flex items-center gap-2 mb-4">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Real-World Implementations</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedModule.realWorldExamples.map((ex, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="font-bold text-slate-900 text-sm mb-1">{ex.title}</div>
                        <p className="text-xs text-slate-600 mb-3">{ex.description}</p>
                        <div className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-medium">
                          <strong className="text-[#f9570c]">Impact:</strong> {ex.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advantages and Limitations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Advantages Highlighted</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedModule.advantages.map((adv, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-3">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Limitations & Engineering Challenges</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedModule.limitations.map((lim, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="text-rose-600 font-bold">✗</span>
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sample Exam Question & Answer */}
              {selectedModule.sampleQuestions.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-purple-200">
                  <div className="text-xs font-bold text-purple-700 mb-1">
                    Student Exam Prep Question (Page {selectedModule.pageNumber})
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-2">
                    Q: {selectedModule.sampleQuestions[0].question}
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed mb-2">
                    <strong>Model Answer:</strong> {selectedModule.sampleQuestions[0].answer}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium">
                    💡 Exam Tip: {selectedModule.sampleQuestions[0].examTip}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevModule}
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>

                <button
                  onClick={handleNextModule}
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    closeReader();
                    setActiveTab('tools');
                  }}
                  className="px-4 py-2 rounded-full bg-white text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-100 cursor-pointer"
                >
                  Open Study Tools
                </button>

                <button
                  onClick={() => {
                    closeReader();
                    openAssistantWithQuery(`Give me a detailed student explanation of Page ${selectedModule.pageNumber} (${selectedModule.title}) with key points, formulas, and real examples.`);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-[#f9570c]" />
                  <span>Ask AI About This Topic</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
