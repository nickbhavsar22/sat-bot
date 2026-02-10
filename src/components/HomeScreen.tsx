import type { Section } from '../types';

interface HomeScreenProps {
  onSelectSection: (section: Section) => void;
}

const sections = [
  {
    id: 'verbal' as Section,
    icon: '📖',
    title: 'Verbal',
    subtitle: 'Reading & Writing',
    description: 'Vocabulary, reading comprehension, grammar, and rhetorical analysis',
    color: 'from-indigo-500 to-purple-600',
    hoverColor: 'hover:shadow-indigo-200',
  },
  {
    id: 'math' as Section,
    icon: '🧮',
    title: 'Math',
    subtitle: 'Problem Solving',
    description: 'Algebra, geometry, data analysis, and advanced math concepts',
    color: 'from-amber-500 to-orange-600',
    hoverColor: 'hover:shadow-amber-200',
  },
] as const;

export default function HomeScreen({ onSelectSection }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 tracking-tight">
          SAT Bot
        </h1>
        <p className="text-lg text-slate-500 max-w-md mx-auto">
          Practice smarter, score higher. Choose a section to begin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full animate-slide-up">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelectSection(s.id)}
            className={`group bg-surface rounded-2xl shadow-lg ${s.hoverColor} hover:shadow-xl
              hover:scale-[1.03] active:scale-[0.98] transition-all duration-200
              p-8 text-left cursor-pointer border border-slate-100`}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
              {s.icon}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">{s.title}</h2>
            <p className="text-sm font-semibold text-primary mb-2">{s.subtitle}</p>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">{s.description}</p>
            <div
              className={`inline-flex items-center gap-2 bg-gradient-to-r ${s.color}
                text-white font-semibold text-sm px-5 py-2.5 rounded-xl
                group-hover:shadow-md transition-all duration-200`}
            >
              Start Practice
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
