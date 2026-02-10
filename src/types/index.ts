export type Section = 'verbal' | 'math';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type AnswerLetter = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: string;
  section: Section;
  domain: string;
  skill: string;
  difficulty: Difficulty;
  passage: string | null;
  question: string;
  choices: Record<AnswerLetter, string>;
  correctAnswer: AnswerLetter;
  explanation: string;
}

export interface DifficultyScores {
  easy: { correct: number; total: number };
  medium: { correct: number; total: number };
  hard: { correct: number; total: number };
}

export interface QuizState {
  section: Section | null;
  currentQuestionIndex: number;
  questions: Question[];
  streak: number;
  bestStreak: number;
  correctCount: number;
  totalAnswered: number;
  answeredQuestionIds: Set<string>;
  showExplanation: boolean;
  selectedAnswer: AnswerLetter | null;
  isCorrect: boolean | null;
  difficultyScores: DifficultyScores;
}

export interface SessionStats {
  correctCount: number;
  totalAnswered: number;
  percentage: number;
  estimatedScore: number | null;
  streak: number;
  bestStreak: number;
}

export type AnswerState = 'default' | 'selected' | 'correct' | 'incorrect';
