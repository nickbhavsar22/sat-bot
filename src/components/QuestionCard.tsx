import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
}

const difficultyConfig = {
  easy: { color: 'bg-success', label: 'Easy' },
  medium: { color: 'bg-amber-400', label: 'Medium' },
  hard: { color: 'bg-error', label: 'Hard' },
} as const;

export default function QuestionCard({ question }: QuestionCardProps) {
  const diff = difficultyConfig[question.difficulty];

  return (
    <div className="animate-fade-in">
      {/* Domain / Skill / Difficulty row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
          {question.domain}
        </span>
        <span className="inline-flex items-center text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
          {question.skill}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 ml-auto">
          <span className={`w-2 h-2 rounded-full ${diff.color}`} />
          {diff.label}
        </span>
      </div>

      {/* Passage */}
      {question.passage && (
        <div className="mb-5 border-l-4 border-primary/30 bg-slate-50 rounded-r-xl px-5 py-4 text-sm text-slate-700 leading-relaxed italic">
          {question.passage}
        </div>
      )}

      {/* Question text */}
      <p className="text-lg font-semibold text-slate-800 leading-relaxed">
        {question.question}
      </p>
    </div>
  );
}
