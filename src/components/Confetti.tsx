import { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
}

interface Piece {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
  duration: number;
}

const COLORS = [
  '#4F46E5', '#F59E0B', '#10B981', '#F43F5E',
  '#6366F1', '#FBBF24', '#34D399', '#FB7185',
  '#8B5CF6', '#EC4899', '#14B8A6', '#F97316',
];

export default function Confetti({ active }: ConfettiProps) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!active) return;

    const newPieces: Piece[] = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      duration: 2 + Math.random() * 1.5,
    }));

    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 3500);
    return () => clearTimeout(timer);
  }, [active]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: '-2%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
