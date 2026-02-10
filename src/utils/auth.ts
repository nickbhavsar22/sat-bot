const SESSION_KEY = 'sat-bot-auth';

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string): Promise<boolean> {
  const expectedHash = import.meta.env.VITE_APP_PASSWORD_HASH;
  if (!expectedHash) return false;
  const inputHash = await hashPassword(password);
  return inputHash === expectedHash.toLowerCase();
}

export function setAuthenticated(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true');
  } catch {
    // sessionStorage may be unavailable; silently fail
  }
}

export function isAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}
