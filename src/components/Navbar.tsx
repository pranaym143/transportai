import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { ActiveTab } from '../types';
import { 
  Menu, 
  X, 
  Search,
  BookOpen,
  Bot,
  HelpCircle,
  Layers,
  Award,
  Sparkles,
  Flame
} from 'lucide-react';
import { PDF_MODULES } from '../data/pdfKnowledge';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, progress, openModuleReader } = useLearning();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Learn' },
    { id: 'assistant', label: 'AI Assistant' },
    { id: 'applications', label: 'Applications' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'about', label: 'About' },
  ];

  const filteredModules = searchQuery.trim()
    ? PDF_MODULES.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.pageNumber.toString() === searchQuery.trim()
      )
    : [];

  return (
    <>
      <header className="sticky top-5 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large floating white pill navigation container */}
        <div className="bg-white rounded-full warm-nav-shadow px-6 sm:px-8 py-3.5 flex items-center justify-between border border-[#E7E0D8]/90 backdrop-blur-md bg-white/95 transition-all">
          
          {/* Logo on Left: TRANSPORT AI with AI in Orange */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 focus:outline-none cursor-pointer group"
          >
            <span className="text-xl sm:text-[22px] font-black text-[#171717] font-display tracking-tight flex items-center">
              TRANSPORT&nbsp;<span className="text-[#FF690F]">AI</span>
            </span>
          </button>

          {/* Navigation Links Centered */}
          <nav className="hidden lg:flex items-center space-x-7 text-[13.5px] font-medium text-[#77716E]">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors cursor-pointer relative py-1 ${
                    isActive 
                      ? 'text-[#171717] font-bold' 
                      : 'hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#FF690F] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-[#77716E] hover:text-[#171717] hover:bg-[#F1EBE5] transition-colors cursor-pointer"
              title="Search curriculum"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Streak Counter */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F3EF] border border-[#E7E0D8] text-[#FF690F] text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 fill-[#FF690F]" />
              <span>{progress.streakDays}d Streak</span>
            </div>

            {/* Primary CTA button with orange arrow: Start Learning → */}
            <button
              onClick={() => handleNavClick('learn')}
              className="bg-[#171717] hover:bg-black text-white text-xs sm:text-[13px] font-semibold rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm transition-all cursor-pointer group"
            >
              <span>Explore Learning</span>
              <span className="text-[#FF690F] font-bold group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#171717] hover:bg-[#F1EBE5]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white rounded-3xl warm-nav-shadow p-5 border border-[#E7E0D8] space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#F7F3EF] text-[#FF690F] font-bold'
                    : 'text-[#77716E] hover:bg-[#F1EBE5]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#E7E0D8] flex items-center justify-between">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="text-sm font-medium text-[#171717]"
              >
                Student Dashboard
              </button>
              <button
                onClick={() => handleNavClick('learn')}
                className="bg-[#171717] text-white text-xs font-bold rounded-full px-4 py-2 flex items-center gap-1.5"
              >
                <span>Start Learning</span>
                <span className="text-[#FF690F]">→</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Curriculum Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/35 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 border border-[#E7E0D8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE3]">
              <span className="font-bold text-[#171717] text-sm flex items-center gap-2">
                <Search className="w-4 h-4 text-[#FF690F]" />
                <span>Search 14-Page AI in Transportation Curriculum</span>
              </span>
              <button onClick={() => setSearchOpen(false)} className="text-[#77716E] hover:text-[#171717]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3">
              <input
                type="text"
                autoFocus
                placeholder="Search topics (e.g., radar, ADS-B, inductive loop, parking, page 5)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-[#F7F3EF] border border-[#E7E0D8] text-[#171717] placeholder-[#77716E] text-sm focus:outline-none focus:border-[#FF690F]"
              />
            </div>

            <div className="mt-3 max-h-72 overflow-y-auto space-y-1.5">
              {filteredModules.map((m) => (
                <div
                  key={m.moduleId}
                  onClick={() => {
                    openModuleReader(m.moduleId);
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-3 rounded-2xl hover:bg-[#F7F3EF] border border-transparent hover:border-[#E7E0D8] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#FF690F]">
                        Page {m.pageNumber}
                      </span>
                      <h4 className="text-xs font-bold text-[#171717] group-hover:text-[#FF690F] transition-colors">
                        {m.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#77716E] line-clamp-1 mt-0.5">
                      {m.summary}
                    </p>
                  </div>
                  <span className="text-xs text-[#FF690F] font-bold">
                    Read →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
