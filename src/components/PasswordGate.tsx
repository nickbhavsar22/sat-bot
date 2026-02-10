import { useState, useCallback, type FormEvent, type ReactNode } from 'react';
import { verifyPassword, setAuthenticated, isAuthenticated } from '../utils/auth';

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated());
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        const valid = await verifyPassword(password);
        if (valid) {
          setAuthenticated();
          setAuthed(true);
        } else {
          setError('Incorrect password. Please try again.');
          setPassword('');
        }
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [password],
  );

  if (authed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 tracking-tight">
          SAT Bot
        </h1>
        <p className="text-lg text-slate-500 max-w-md mx-auto">
          Enter the password to access your practice session.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm animate-slide-up"
      >
        <div className="bg-surface rounded-2xl shadow-lg border border-slate-100 p-8">
          <label
            htmlFor="password-input"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Password
          </label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-xl border border-slate-200
              focus:border-primary focus:ring-2 focus:ring-primary/20
              outline-none transition-all duration-200 text-slate-800
              placeholder:text-slate-400 text-sm"
          />

          {error && (
            <p className="mt-3 text-sm text-error font-medium animate-shake">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || password.length === 0}
            className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-purple-600
              text-white font-semibold text-sm px-5 py-3 rounded-xl
              hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-200 cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Checking...' : 'Unlock'}
          </button>
        </div>
      </form>
    </div>
  );
}
