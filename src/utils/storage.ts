import type { Section, SessionStats } from '../types';

const STORAGE_PREFIX = 'sat-bot';

export function saveSession(section: Section, stats: SessionStats): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}-${section}`, JSON.stringify(stats));
  } catch {
    // localStorage may be unavailable or full; silently fail
  }
}

export function loadSession(section: Section): SessionStats | null {
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}-${section}`);
    if (!data) return null;
    return JSON.parse(data) as SessionStats;
  } catch {
    return null;
  }
}

export function clearSession(section?: Section): void {
  try {
    if (section) {
      localStorage.removeItem(`${STORAGE_PREFIX}-${section}`);
    } else {
      localStorage.removeItem(`${STORAGE_PREFIX}-verbal`);
      localStorage.removeItem(`${STORAGE_PREFIX}-math`);
    }
  } catch {
    // silently fail
  }
}
