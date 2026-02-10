import { useState, useEffect, useCallback, useRef } from 'react';
import type { AnswerLetter, AnswerState, Question, QuizState } from '../types';
import Header from './Header';
import QuestionCard from './QuestionCard';
import AnswerButton from './AnswerButton';
import ExplanationPanel from './ExplanationPanel';
import StreakCounter from './StreakCounter';
import SessionStats from './SessionStats';
import ScoreEstimate from './ScoreEstimate';
import Confetti from './Confetti';

const ENCOURAGING_MESSAGES = [
  'Awesome!',
  "You're on fire!",
  'Nailed it!',
  'Keep going!',
  'SAT ready!',
  'Brilliant!',
  'Nice work!',
  'Crushing it!',
  'Unstoppable!',
  'Perfect!',
];

function getRandomEncouragement(): string {
  return ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
}

interface QuizScreenProps {
  state: QuizState;
  currentQuestion: Question | null;
  estimatedScore: number | null;
  scoreLabel: string;
  submitAnswer: (answer: AnswerLetter) => void;
  nextQuestion: () => void;
  onBack: () => void;
}

export default function QuizScreen({
  state,
  currentQuestion,
  estimatedScore,
  scoreLabel,
  submitAnswer,
  nextQuestion,
  onBack,
}: QuizScreenProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevStreakRef = useRef(state.streak);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle confetti on milestone streaks
  useEffect(() => {
    const prev = prevStreakRef.current;
    prevStreakRef.current = state.streak;

    if (
      state.streak > prev &&
      (state.streak === 5 || state.streak === 10 || state.streak === 25)
    ) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [state.streak]);

  // Auto-advance on correct answer
  useEffect(() => {
    if (state.isCorrect === true) {
      setToast(`${getRandomEncouragement()} 🎉`);
      autoAdvanceRef.current = setTimeout(() => {
        setToast(null);
        nextQuestion();
      }, 1500);
      return () => {
        if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      };
    } else {
      setToast(null);
    }
  }, [state.isCorrect, state.currentQuestionIndex, nextQuestion]);

  const handleAnswer = useCallback(
    (letter: AnswerLetter) => {
      if (state.selectedAnswer !== null) return;
      submitAnswer(letter);
    },
    [state.selectedAnswer, submitAnswer],
  );

  const handleContinue = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  if (!currentQuestion || !state.section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400 text-lg">Loading questions...</p>
      </div>
    );
  }

  const answerLetters: AnswerLetter[] = ['A', 'B', 'C', 'D'];

  function getAnswerState(letter: AnswerLetter): AnswerState {
    if (state.selectedAnswer === null) return 'default';
    if (letter === currentQuestion!.correctAnswer && state.selectedAnswer !== null) {
      return 'correct';
    }
    if (letter === state.selectedAnswer && !state.isCorrect) {
      return 'incorrect';
    }
    return 'default';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header section={state.section} onBack={onBack} />

      <Confetti active={showConfetti} />

      {/* Stats bar */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-4 pb-2">
        <div className="bg-surface rounded-2xl shadow-sm border border-slate-100 px-6 py-3 flex items-center justify-between gap-4">
          <StreakCounter streak={state.streak} bestStreak={state.bestStreak} />
          <SessionStats
            correctCount={state.correctCount}
            totalAnswered={state.totalAnswered}
          />
          <ScoreEstimate
            estimatedScore={estimatedScore}
            scoreLabel={scoreLabel}
            section={state.section}
            totalAnswered={state.totalAnswered}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-4">
        {/* Question progress */}
        <div className="mb-4 text-xs text-slate-400 font-medium">
          Question {state.totalAnswered + (state.selectedAnswer === null ? 1 : 0)}
        </div>

        {/* Question card */}
        <div className="bg-surface rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 mb-6">
          <QuestionCard question={currentQuestion} />
        </div>

        {/* Correct toast */}
        {toast && (
          <div className="flex justify-center mb-4 animate-bounce-in">
            <span className="bg-success/10 text-success font-bold px-5 py-2 rounded-full text-sm">
              {toast}
            </span>
          </div>
        )}

        {/* Answer buttons */}
        <div className="space-y-3 mb-4">
          {answerLetters.map((letter) => (
            <AnswerButton
              key={letter}
              letter={letter}
              text={currentQuestion.choices[letter]}
              state={getAnswerState(letter)}
              onClick={() => handleAnswer(letter)}
              disabled={state.selectedAnswer !== null}
            />
          ))}
        </div>

        {/* Explanation panel */}
        {state.showExplanation && state.selectedAnswer && (
          <ExplanationPanel
            correctAnswer={currentQuestion.correctAnswer}
            correctAnswerText={currentQuestion.choices[currentQuestion.correctAnswer]}
            explanation={currentQuestion.explanation}
            selectedAnswer={state.selectedAnswer}
            selectedAnswerText={currentQuestion.choices[state.selectedAnswer]}
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  );
}
