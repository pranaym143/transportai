import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { PDF_MODULES } from '../data/pdfKnowledge';
import { 
  Award, 
  Flame, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Bookmark, 
  ArrowRight, 
  Trash2, 
  Download, 
  GraduationCap
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    progress, 
    toggleModuleCompletion, 
    deleteNote, 
    openModuleReader, 
    setActiveTab, 
    setStudentName
  } = useLearning();

  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [editingName, setEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(progress.studentName);

  const completedCount = progress.completedModules.length;
  const totalCount = PDF_MODULES.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const nextModule = PDF_MODULES.find(m => !progress.completedModules.includes(m.moduleId)) || PDF_MODULES[0];

  const avgQuizScore = progress.quizAttempts.length > 0
    ? Math.round(progress.quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / progress.quizAttempts.length)
    : 0;

  const handleSaveName = () => {
    if (tempName.trim()) {
      setStudentName(tempName.trim());
      setEditingName(false);
    }
  };

  return (
    <section id="dashboard-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#f9570c] text-xs font-bold mb-3 border border-orange-200">
              <Award className="w-3.5 h-3.5" />
              <span>PERSONALIZED MOBILITY DASHBOARD</span>
            </div>
            
            <div className="flex items-center gap-3">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-3 py-1.5 rounded-full bg-white border border-[#f9570c] text-base font-bold text-slate-900 focus:outline-none"
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-4 py-1.5 rounded-full bg-[#111827] text-white text-xs font-bold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display">
                    {progress.studentName}'s Command Center
                  </h2>
                  <button
                    onClick={() => setEditingName(true)}
                    className="text-xs text-slate-400 hover:text-[#f9570c] underline cursor-pointer"
                  >
                    Edit Name
                  </button>
                </div>
              )}
            </div>

            <p className="text-slate-600 text-sm mt-1">
              Tracking your mastery of the 14-page AI in Transportation syllabus and interactive assessments.
            </p>
          </div>

          <button
            onClick={() => setShowCertificate(true)}
            className="px-6 py-3.5 rounded-full bg-[#111827] hover:bg-black text-white font-bold text-xs shadow-sm flex items-center gap-2.5 cursor-pointer transition-all"
          >
            <GraduationCap className="w-4 h-4 text-[#f9570c]" />
            <span>View Certificate of Mastery</span>
          </button>
        </div>

        {/* 4 Metrics Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl swift-card-shadow border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>Curriculum Progress</span>
              <BookOpen className="w-4 h-4 text-[#f9570c]" />
            </div>
            <div className="text-3xl font-extrabold text-slate-950 font-display">
              {progressPct}%
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
              <div 
                className="h-full bg-[#f9570c] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block font-medium">
              {completedCount} of {totalCount} Modules Mastered
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl swift-card-shadow border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>Study Streak</span>
              <Flame className="w-4 h-4 text-[#f9570c] fill-[#f9570c]" />
            </div>
            <div className="text-3xl font-extrabold text-[#f9570c] font-display">
              {progress.streakDays} Days
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-medium">
              Consistent daily review boosts long-term memory retention.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl swift-card-shadow border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>Average Quiz Score</span>
              <HelpCircle className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-950 font-display">
              {progress.quizAttempts.length > 0 ? `${avgQuizScore}%` : 'N/A'}
            </div>
            <span className="text-[11px] text-slate-400 mt-3 block font-medium">
              {progress.quizAttempts.length} Quiz Assessments Completed
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl swift-card-shadow border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>Saved Notes & Sheets</span>
              <Bookmark className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-950 font-display">
              {progress.savedNotes.length}
            </div>
            <span className="text-[11px] text-slate-400 mt-3 block font-medium">
              Personalized exam revision summaries
            </span>
          </div>

        </div>

        {/* Recommended Next Lesson */}
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 swift-card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#f9570c] uppercase tracking-wider">
              <span>Recommended Next Lesson</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-display">
              Page {nextModule.pageNumber}: {nextModule.title}
            </h3>
            <p className="text-xs text-slate-600 max-w-xl line-clamp-1">
              {nextModule.summary}
            </p>
          </div>

          <button
            onClick={() => openModuleReader(nextModule.moduleId)}
            className="px-6 py-3 rounded-full bg-[#f9570c] hover:bg-[#e04a04] text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Continue Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Main 2-Column Section */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Checklist */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 swift-card-shadow space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-950 font-display flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#f9570c]" />
                <span>Curriculum Checklist (14 Modules)</span>
              </h4>
              <span className="text-xs text-[#f9570c] font-bold font-mono">
                {completedCount} / 14 Complete
              </span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {PDF_MODULES.map((mod) => {
                const isDone = progress.completedModules.includes(mod.moduleId);

                return (
                  <div
                    key={mod.moduleId}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                      isDone
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleModuleCompletion(mod.moduleId)}
                        className="cursor-pointer"
                        title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-[#f9570c] transition-colors" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-bold">
                            Pg {mod.pageNumber}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {mod.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {mod.summary}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => openModuleReader(mod.moduleId)}
                      className="text-xs text-[#f9570c] font-bold hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Saved Notes & Quiz History */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Saved Notes */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 swift-card-shadow space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-base font-bold text-slate-950 font-display flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-emerald-600" />
                  <span>My Saved Notes ({progress.savedNotes.length})</span>
                </h4>
                <button
                  onClick={() => setActiveTab('tools')}
                  className="text-xs text-[#f9570c] font-bold hover:underline"
                >
                  Generate Notes
                </button>
              </div>

              {progress.savedNotes.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {progress.savedNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          Page {note.pageNumber}: {note.moduleTitle}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px]">
                          <span>{note.date}</span>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="text-slate-400 hover:text-rose-600 p-0.5"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-600 line-clamp-3 text-[11px] leading-relaxed whitespace-pre-line">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  No saved notes yet. Visit the AI Notes Generator to save high-yield exam sheets!
                </div>
              )}
            </div>

            {/* Quiz Attempt History */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 swift-card-shadow space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-base font-bold text-slate-950 font-display flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  <span>Recent Quiz Attempts</span>
                </h4>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="text-xs text-[#f9570c] font-bold hover:underline"
                >
                  Take Quiz
                </button>
              </div>

              {progress.quizAttempts.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {progress.quizAttempts.slice(0, 5).map((att) => (
                    <div
                      key={att.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="text-slate-800 font-bold">
                          Quiz Assessment ({att.score} / {att.total})
                        </div>
                        <span className="text-[10px] text-slate-400">{att.timestamp}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full font-mono font-bold text-xs ${
                        att.percentage >= 80 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : att.percentage >= 60 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {att.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  No quizzes taken yet. Test your knowledge in the Quiz tab!
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border-2 border-orange-200 rounded-3xl p-8 sm:p-12 shadow-2xl relative text-center">
            
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 cursor-pointer"
            >
              ✕
            </button>

            <div className="w-16 h-16 rounded-full bg-orange-100 mx-auto flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-[#f9570c]" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#f9570c] font-black font-mono">
              CERTIFICATE OF CURRICULUM MASTERY
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display mt-2">
              Artificial Intelligence in Transportation
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Based on the 14-Page Primary Curriculum "AI IN TRANSPORTATION.pdf"
            </p>

            <div className="my-8 py-5 border-y border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">This certifies that</span>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
                {progress.studentName}
              </h4>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                has successfully explored and mastered all 14 instructional modules spanning cognitive sensor pipelines, autonomous automobiles, smart traffic signals, aviation ADS-B, intelligent logistics, and future mobility paradigms.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs text-slate-500 mb-8 font-mono">
              <div>
                <span className="block text-slate-400 text-[10px]">VERIFIED MODULES</span>
                <strong className="text-slate-900 text-sm">{completedCount} / 14</strong>
              </div>
              <div>
                <span className="block text-slate-400 text-[10px]">AVG QUIZ SCORE</span>
                <strong className="text-slate-900 text-sm">{avgQuizScore}%</strong>
              </div>
              <div>
                <span className="block text-slate-400 text-[10px]">ISSUE DATE</span>
                <strong className="text-slate-900 text-sm">{new Date().toLocaleDateString()}</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={() => setShowCertificate(false)}
                className="px-6 py-2.5 rounded-full bg-[#111827] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
