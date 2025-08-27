export type AxisId = 'economic' | 'social' | 'authority' | 'sovereignty' | 'environment' | 'welfare';

export interface Axis {
  id: AxisId;
  name: string;
  description: string;
  leftLabel: string;
  rightLabel: string;
  color: string;
}

export interface AxisTarget {
  axis: AxisId;
  weight: number; // 1-2 axes per question, weights sum to 1-2
}

export interface Source {
  label: string;
  url: string;
}

export interface Question {
  id: string;
  text: string;
  axisTargets: AxisTarget[];
  rationale: string;
  stat?: string;
  sources?: Source[];
}

export interface Answer {
  questionId: string;
  value: number; // -3 to +3 (Likert 1-7 mapped)
}

export interface QuizSession {
  id: string;
  answers: Answer[];
  importanceWeights?: Record<AxisId, number>;
  createdAt: Date;
  durationMs?: number;
}

export interface AxisScore {
  axis: AxisId;
  score: number; // -100 to +100
  confidence: number; // 0 to 100
}

export interface QuizResults {
  scores: AxisScore[];
  tags: string[];
  summary: Record<AxisId, string>;
}

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface QuizHistory {
  id: string;
  createdAt: Date;
  scores: AxisScore[];
  tags: string[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  context?: string;
}
