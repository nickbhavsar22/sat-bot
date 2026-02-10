import type { AnswerLetter, AnswerState } from '../types';

interface AnswerButtonProps {
  letter: AnswerLetter;
  text: string;
  state: AnswerState;
  onClick: () => void;
  disabled: boolean;
}

const stateStyles: Record<AnswerState, string> = {
  default:
    'bg-surface border-slate-200 hover:border-primary/50 hover:bg-primary/5 text-slate-700',
  selected:
    'bg-primary/10 border-primary ring-2 ring-primary/30 text-primary',
  correct:
    'bg-success/10 border-success text-success',
  incorrect:
    'bg-error/10 border-error text-error animate-shake',
};

const letterStyles: Record<AnswerState, string> = {
  default: 'bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary',
  selected: 'bg-primary text-white',
  correct: 'bg-success text-white',
  incorrect: 'bg-error text-white',
};

export default function AnswerButton({ letter, text, state, onClick, disabled }: AnswerButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2
        transition-all duration-200 text-left cursor-pointer
        disabled:cursor-default
        ${stateStyles[state]}`}
    >
      <span
        className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full
          text-sm font-bold transition-all duration-200
          ${letterStyles[state]}`}
      >
        {state === 'correct' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : state === 'incorrect' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          letter
        )}
      </span>
      <span className="text-sm md:text-base font-medium leading-snug">{text}</span>
    </button>
  );
}
