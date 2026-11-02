import { PDFModule } from '../data/pdfKnowledge';

export type ActiveTab = 'home' | 'learn' | 'assistant' | 'applications' | 'tools' | 'quiz' | 'dashboard' | 'about';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sourcePages?: number[];
  groundedInPdf?: boolean;
  timestamp: string;
  mode?: string;
}

export interface QuizAttempt {
  id: string;
  timestamp: string;
  score: number;
  total: number;
  percentage: number;
  moduleId?: string;
}

export interface SavedNote {
  id: string;
  moduleId: string;
  moduleTitle: string;
  pageNumber: number;
  content: string;
  date: string;
}

export interface UserProgress {
  completedModules: string[]; // moduleIds
  savedNotes: SavedNote[];
  quizAttempts: QuizAttempt[];
  streakDays: number;
  lastActiveDate: string;
  currentModuleId: string;
  studentName: string;
}
