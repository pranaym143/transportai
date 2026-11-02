import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, SavedNote, QuizAttempt, ActiveTab } from '../types';
import { PDF_MODULES, PDFModule } from '../data/pdfKnowledge';

interface LearningContextType {
  progress: UserProgress;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedModule: PDFModule | null;
  setSelectedModule: (module: PDFModule | null) => void;
  toggleModuleCompletion: (moduleId: string) => void;
  isModuleCompleted: (moduleId: string) => boolean;
  saveNote: (note: Omit<SavedNote, 'id' | 'date'>) => void;
  deleteNote: (id: string) => void;
  recordQuizAttempt: (score: number, total: number, moduleId?: string) => void;
  setStudentName: (name: string) => void;
  chatPresetPrompt: string;
  setChatPresetPrompt: (prompt: string) => void;
  openAssistantWithQuery: (query: string) => void;
  openModuleReader: (moduleId: string) => void;
}

const STORAGE_KEY = 'transport_ai_learning_progress_v1';

const defaultProgress: UserProgress = {
  completedModules: ['module-1'], // Start with module 1 completed for motivation
  savedNotes: [],
  quizAttempts: [],
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currentModuleId: 'module-2',
  studentName: 'Autonomous Explorer'
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return defaultProgress;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedModule, setSelectedModule] = useState<PDFModule | null>(null);
  const [chatPresetPrompt, setChatPresetPrompt] = useState<string>('');

  // Persist progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Daily streak check
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const isConsecutive = progress.lastActiveDate === yesterday;
      setProgress(prev => ({
        ...prev,
        streakDays: isConsecutive ? prev.streakDays + 1 : 1,
        lastActiveDate: today
      }));
    }
  }, []);

  const toggleModuleCompletion = (moduleId: string) => {
    setProgress(prev => {
      const exists = prev.completedModules.includes(moduleId);
      const nextCompleted = exists
        ? prev.completedModules.filter(id => id !== moduleId)
        : [...prev.completedModules, moduleId];

      // Update next recommended module
      const allIds = PDF_MODULES.map(m => m.moduleId);
      const firstIncomplete = allIds.find(id => !nextCompleted.includes(id)) || allIds[0];

      return {
        ...prev,
        completedModules: nextCompleted,
        currentModuleId: firstIncomplete
      };
    });
  };

  const isModuleCompleted = (moduleId: string) => {
    return progress.completedModules.includes(moduleId);
  };

  const saveNote = (note: Omit<SavedNote, 'id' | 'date'>) => {
    const newNote: SavedNote = {
      ...note,
      id: `note-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setProgress(prev => ({
      ...prev,
      savedNotes: [newNote, ...prev.savedNotes]
    }));
  };

  const deleteNote = (id: string) => {
    setProgress(prev => ({
      ...prev,
      savedNotes: prev.savedNotes.filter(n => n.id !== id)
    }));
  };

  const recordQuizAttempt = (score: number, total: number, moduleId?: string) => {
    const percentage = Math.round((score / total) * 100);
    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      score,
      total,
      percentage,
      moduleId
    };
    setProgress(prev => ({
      ...prev,
      quizAttempts: [attempt, ...prev.quizAttempts]
    }));
  };

  const setStudentName = (name: string) => {
    setProgress(prev => ({ ...prev, studentName: name }));
  };

  const openAssistantWithQuery = (query: string) => {
    setChatPresetPrompt(query);
    setActiveTab('assistant');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModuleReader = (moduleId: string) => {
    const mod = PDF_MODULES.find(m => m.moduleId === moduleId);
    if (mod) {
      setSelectedModule(mod);
    }
  };

  return (
    <LearningContext.Provider
      value={{
        progress,
        activeTab,
        setActiveTab,
        selectedModule,
        setSelectedModule,
        toggleModuleCompletion,
        isModuleCompleted,
        saveNote,
        deleteNote,
        recordQuizAttempt,
        setStudentName,
        chatPresetPrompt,
        setChatPresetPrompt,
        openAssistantWithQuery,
        openModuleReader
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
