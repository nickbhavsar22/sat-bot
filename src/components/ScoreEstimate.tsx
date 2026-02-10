import type { Section } from '../types';

interface ScoreEstimateProps {
  estimatedScore: number | null;
  scoreLabel: string;
  section: Section;
  totalAnswered: number;
}

function getScoreColor(score: number): string {
  if (score >= 720) return 'text-emerald-500';
  if (score >= 640) return 'text-blue-500';
  if (score >= 560) return 'text-indigo-500';
  if (score >= 480) return 'text-amber-500';
  return 'text-rose-500';
}

function getBarColor(score: number): string {
  if (score >= 720) return 'bg-emerald-500';
  if (score >= 640) return 'bg-blue-500';
  if (score >= 560) return 'bg-indigo-500';
  if (score >= 480) return 'bg-amber-500';
  return 'bg-rose-500';
}

function getBarBgColor(score: number): string {
  if (score >= 720) return 'bg-emerald-100';
  if (score >= 640) return 'bg-blue-100';
  if (score >= 560) return 'bg-indigo-100';
  if (score >= 480) return 'bg-amber-100';
  return 'bg-rose-100';
}

export default function ScoreEstimate({ estimatedScore, scoreLabel, section, totalAnswered }: ScoreEstimateProps) {
  if (estimatedScore === null) {
    return (
      <div className="flex flex-col items-center min-w-[120px]">
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
          Projected {section === 'verbal' ? 'Verbal' : 'Math'} Score
        </span>
        <span className="text-lg text-slate-300 font-bold mt-1">— / 800</span>
        <span className="text-[10px] text-slate-400 mt-0.5">Answer a question to start</span>
      </div>
    );
  }

  const pct = Math.round(((estimatedScore - 200) / 600) * 100);

  return (
    <div className="flex flex-col items-center gap-1 min-w-[120px]">
      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
        Projected {section === 'verbal' ? 'Verbal' : 'Math'} Score
      </span>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-extrabold tabular-nums transition-all duration-300 ${getScoreColor(estimatedScore)}`}>
          {estimatedScore}
        </span>
        <span className="text-sm font-semibold text-slate-300">/ 800</span>
      </div>
      <div className={`w-full h-2 ${getBarBgColor(estimatedScore)} rounded-full overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getBarColor(estimatedScore)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`text-[10px] font-bold ${getScoreColor(estimatedScore)}`}>
          {scoreLabel}
        </span>
        {totalAnswered < 5 && (
          <span className="text-[9px] text-slate-400 italic">(preliminary)</span>
        )}
      </div>
    </div>
  );
}
