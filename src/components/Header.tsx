import type { Section } from '../types';

interface HeaderProps {
  section: Section | null;
  onBack: () => void;
}

export default function Header({ section, onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {section && (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors duration-200 text-sm font-medium cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Home
            </button>
          )}
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            <span className="mr-1.5">🎯</span>SAT Bot
          </h1>
        </div>
        {section && (
          <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {section === 'verbal' ? 'Verbal' : 'Math'}
          </span>
        )}
      </div>
    </header>
  );
}
