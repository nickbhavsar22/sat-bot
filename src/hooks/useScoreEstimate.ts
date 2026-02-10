import { useMemo } from 'react';
import type { DifficultyScores } from '../types/index';
import { calculateEstimatedScore, getScoreLabel } from '../utils/scoring';

export function useScoreEstimate(difficultyScores: DifficultyScores) {
  return useMemo(() => {
    const totalCorrect =
      difficultyScores.easy.correct +
      difficultyScores.medium.correct +
      difficultyScores.hard.correct;

    const totalAnswered =
      difficultyScores.easy.total +
      difficultyScores.medium.total +
      difficultyScores.hard.total;

    const estimatedScore = calculateEstimatedScore(difficultyScores);
    const scoreLabel = estimatedScore ? getScoreLabel(estimatedScore) : '';
    const percentage = totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0;

    return { estimatedScore, scoreLabel, percentage };
  }, [difficultyScores]);
}
