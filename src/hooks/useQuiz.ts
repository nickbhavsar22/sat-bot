import { useState, useCallback, useMemo } from 'react';
import type {
  AnswerLetter,
  DifficultyScores,
  Question,
  QuizState,
  Section,
} from '../types/index';
import { selectQuestions, shuffleQuestions } from '../utils/questionSelector';
import { calculateEstimatedScore, getScoreLabel } from '../utils/scoring';
import verbalQuestions from '../data/verbal-questions.json';
import mathQuestions from '../data/math-questions.json';

const initialDifficultyScores: DifficultyScores = {
  easy: { correct: 0, total: 0 },
  medium: { correct: 0, total: 0 },
  hard: { correct: 0, total: 0 },
};

const initialState: QuizState = {
  section: null,
  currentQuestionIndex: 0,
  questions: [],
  streak: 0,
  bestStreak: 0,
  correctCount: 0,
  totalAnswered: 0,
  answeredQuestionIds: new Set(),
  showExplanation: false,
  selectedAnswer: null,
  isCorrect: null,
  difficultyScores: initialDifficultyScores,
};

export function useQuiz() {
  const [state, setState] = useState<QuizState>({ ...initialState });

  const currentQuestion: Question | null =
    state.questions[state.currentQuestionIndex] ?? null;

  const estimatedScore = useMemo(
    () => calculateEstimatedScore(state.difficultyScores),
    [state.difficultyScores],
  );

  const scoreLabel = useMemo(
    () => (estimatedScore ? getScoreLabel(estimatedScore) : ''),
    [estimatedScore],
  );

  const startQuiz = useCallback((section: Section) => {
    const allQuestions = (
      section === 'verbal' ? verbalQuestions : mathQuestions
    ) as Question[];
    const questions = shuffleQuestions(allQuestions);

    setState({
      ...initialState,
      section,
      questions,
      answeredQuestionIds: new Set(),
      difficultyScores: {
        easy: { correct: 0, total: 0 },
        medium: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 },
      },
    });
  }, []);

  const submitAnswer = useCallback((answer: AnswerLetter) => {
    setState((prev) => {
      if (prev.selectedAnswer !== null || !prev.questions[prev.currentQuestionIndex]) {
        return prev;
      }

      const question = prev.questions[prev.currentQuestionIndex];
      const correct = answer === question.correctAnswer;

      const newStreak = correct ? prev.streak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);
      const newCorrectCount = prev.correctCount + (correct ? 1 : 0);
      const newTotalAnswered = prev.totalAnswered + 1;

      const newDifficultyScores: DifficultyScores = {
        ...prev.difficultyScores,
        [question.difficulty]: {
          correct: prev.difficultyScores[question.difficulty].correct + (correct ? 1 : 0),
          total: prev.difficultyScores[question.difficulty].total + 1,
        },
      };

      return {
        ...prev,
        selectedAnswer: answer,
        isCorrect: correct,
        showExplanation: !correct,
        streak: newStreak,
        bestStreak: newBestStreak,
        correctCount: newCorrectCount,
        totalAnswered: newTotalAnswered,
        difficultyScores: newDifficultyScores,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const currentQ = prev.questions[prev.currentQuestionIndex];
      const newAnsweredIds = new Set(prev.answeredQuestionIds);
      if (currentQ) {
        newAnsweredIds.add(currentQ.id);
      }

      const nextIndex = prev.currentQuestionIndex + 1;

      if (nextIndex < prev.questions.length) {
        return {
          ...prev,
          currentQuestionIndex: nextIndex,
          answeredQuestionIds: newAnsweredIds,
          selectedAnswer: null,
          isCorrect: null,
          showExplanation: false,
        };
      }

      // Exceeded questions length — reshuffle remaining unanswered questions
      const allQuestions = (
        prev.section === 'verbal' ? verbalQuestions : mathQuestions
      ) as Question[];
      const reshuffled = selectQuestions(allQuestions, newAnsweredIds);

      return {
        ...prev,
        currentQuestionIndex: 0,
        questions: reshuffled,
        answeredQuestionIds: newAnsweredIds,
        selectedAnswer: null,
        isCorrect: null,
        showExplanation: false,
      };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    setState({
      ...initialState,
      answeredQuestionIds: new Set(),
      difficultyScores: {
        easy: { correct: 0, total: 0 },
        medium: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 },
      },
    });
  }, []);

  return {
    state,
    startQuiz,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    currentQuestion,
    estimatedScore,
    scoreLabel,
  };
}
