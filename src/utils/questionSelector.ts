import type { Question } from '../types';

export function shuffleQuestions<T>(questions: T[]): T[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectQuestions(
  allQuestions: Question[],
  answeredIds: Set<string>,
): Question[] {
  const unanswered = allQuestions.filter((q) => !answeredIds.has(q.id));
  return shuffleQuestions(unanswered);
}
