import 'server-only';
import { redirect } from 'next/navigation';
import { getAccessToken, clearAuthCookies } from '@/app/lib/token/auth-token';
import { refreshSession } from '@/app/lib/auth/refresh-session';

// const BACKEND_URL = process.env.BACKEND_URL;
const BACKEND_URL = 'http://localhost:8080';

// if (!BACKEND_URL) {
//   throw new Error('Missing BACKEND_URL environment variable');
// }

async function rawFetch(
  path: string,
  accessToken: string | undefined,
  options: RequestInit,
) {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  });
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const accessToken = await getAccessToken();
  const res = await rawFetch(path, accessToken, options);

  if (res.status !== 401) {
    return res;
  }

  try {
    const newAccessToken = await refreshSession();
    return rawFetch(path, newAccessToken, options);
  } catch {
    await clearAuthCookies();
    redirect('/login');
  }
}
