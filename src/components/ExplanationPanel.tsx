import type { AnswerLetter } from '../types';

interface ExplanationPanelProps {
  correctAnswer: AnswerLetter;
  correctAnswerText: string;
  explanation: string;
  selectedAnswer: AnswerLetter;
  selectedAnswerText: string;
  onContinue: () => void;
}

export default function ExplanationPanel({
  correctAnswer,
  correctAnswerText,
  explanation,
  selectedAnswer,
  selectedAnswerText,
  onContinue,
}: ExplanationPanelProps) {
  return (
    <div className="animate-slide-up mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl flex-shrink-0 mt-0.5">💡</span>
        <div>
          <p className="font-bold text-slate-800 text-lg">
            The correct answer is {correctAnswer}: {correctAnswerText}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            You selected {selectedAnswer}: {selectedAnswerText}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-amber-200/60 my-4" />

      {/* Rich explanation content */}
      <div
        className="explanation-prose text-slate-700 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: explanation }}
      />

      <button
        onClick={onContinue}
        className="mt-6 w-full bg-primary hover:bg-primary-dark text-white font-semibold
          py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer
          hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
      >
        Continue
      </button>
    </div>
  );
}
