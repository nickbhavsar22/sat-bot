import type { DifficultyScores } from '../types';

const DIFFICULTY_WEIGHTS = {
  easy: 1.0,
  medium: 1.2,
  hard: 1.5,
} as const;

const MIN_QUESTIONS_FOR_SCORE = 1;
const MIN_SCORE = 200;
const MAX_SCORE = 800;
const SCORE_RANGE = MAX_SCORE - MIN_SCORE;

export function calculateEstimatedScore(difficultyScores: DifficultyScores): number | null {
  const totalAnswered =
    difficultyScores.easy.total +
    difficultyScores.medium.total +
    difficultyScores.hard.total;

  if (totalAnswered < MIN_QUESTIONS_FOR_SCORE) {
    return null;
  }

  let weightedCorrect = 0;
  let weightedTotal = 0;

  for (const difficulty of ['easy', 'medium', 'hard'] as const) {
    const { correct, total } = difficultyScores[difficulty];
    const weight = DIFFICULTY_WEIGHTS[difficulty];
    weightedCorrect += correct * weight;
    weightedTotal += total * weight;
  }

  const weightedAccuracy = weightedTotal > 0 ? weightedCorrect / weightedTotal : 0;
  const rawScore = MIN_SCORE + Math.round(weightedAccuracy * SCORE_RANGE);

  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, rawScore));
}

export function getScoreLabel(score: number): string {
  if (score >= 720) return 'Exceptional';
  if (score >= 640) return 'Strong';
  if (score >= 560) return 'Solid';
  if (score >= 480) return 'Building';
  return 'Keep Practicing';
}
