interface SessionStatsProps {
  correctCount: number;
  totalAnswered: number;
}

export default function SessionStats({ correctCount, totalAnswered }: SessionStatsProps) {
  const pct = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-slate-400 font-medium">Accuracy</span>
      <span className="text-lg font-bold text-slate-700">
        {correctCount}/{totalAnswered}
        {totalAnswered > 0 && (
          <span className="text-sm font-semibold text-slate-400 ml-1">({pct}%)</span>
        )}
      </span>
    </div>
  );
}
