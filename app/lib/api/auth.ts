// throw a build-time error if this file is imported into a Client Component
import 'server-only';
import { ERROR_MESSAGES } from '@/app/constants/error-messages';
import { ApiFieldError } from '@/app/types/api';

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
  refreshExpiresIn: number; // seconds
};

type AuthBody =
  { username: string; password: string } | { email: string; password: string };

export class AuthApiError extends Error {
  code?: string;
  fieldErrors?: ApiFieldError[];

  constructor(
    message: string,
    options?: { code?: string; fieldErrors?: ApiFieldError[] },
  ) {
    super(message);
    this.name = 'AuthApiError';
    this.code = options?.code;
    this.fieldErrors = options?.fieldErrors;
  }
}

// const BACKEND_URL = process.env.BACKEND_URL;
const BACKEND_URL = 'http://localhost:8080';

// fail fast in build/start time
// if (!BACKEND_URL) {
//   throw new Error('Missing BACKEND_URL environment variable');
// }

async function postAuth(path: string, body: AuthBody) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    // no read cache and update cache
    cache: 'no-store',
  });

  if (!res.ok) {
    // catch in case JSON parsing fails, to avoid crashing the app
    const data = await res.json().catch(() => null);

    // Nullish coalescing operator (??)
    // returns the right-hand value if left-hand is null/undefined,
    // otherwise returns the left-hand value
    throw new AuthApiError(data?.message ?? ERROR_MESSAGES.GENERIC_ERROR, {
      code: data?.code,
      fieldErrors: data?.errors,
    });
  }

  return res.json() as Promise<AuthResponse>;
}

export function loginRequest(username: string, password: string) {
  return postAuth('/api/auth/login', { username, password });
}

export function registerRequest(email: string, password: string) {
  return postAuth('/api/auth/register', { email, password });
}

export async function refreshTokenRequest(refreshToken: string) {
  const res = await fetch(`${BACKEND_URL}/api/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
    cache: 'no-store',
  });

  if (!res.ok) {
    // This error isn't shown in the UI, so no need to parse/clarify the message from BE
    // Just redirects to /login on failure
    throw new AuthApiError('Refresh token failed');
  }

  return res.json() as Promise<AuthResponse>;
}
