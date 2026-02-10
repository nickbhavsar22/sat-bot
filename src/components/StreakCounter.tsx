interface StreakCounterProps {
  streak: number;
  bestStreak: number;
}

export default function StreakCounter({ streak, bestStreak }: StreakCounterProps) {
  const isMilestone = streak === 5 || streak === 10 || streak === 25;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex items-center gap-1 text-lg font-bold transition-all duration-200
          ${streak === 0 ? 'text-slate-300' : 'text-amber-500'}
          ${isMilestone ? 'animate-fire-grow' : ''}`}
      >
        <span className={`${streak === 0 ? 'grayscale opacity-40' : ''} transition-all duration-200`}>
          🔥
        </span>
        <span>{streak}</span>
      </div>
      {bestStreak > 0 && (
        <span className="text-[10px] text-slate-400 font-medium">
          Best: {bestStreak}
        </span>
      )}
    </div>
  );
}
