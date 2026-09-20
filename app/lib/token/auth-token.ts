import 'server-only';
import { cookies } from 'next/headers';

const ACCESS_TOKEN_COOKIE = 'access_token';
const ACCESS_TOKEN_EXPIRES_AT_COOKIE = 'access_token_expires_at';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

type SetAuthCookiesParams = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
};

export async function setAuthCookies({
  accessToken,
  refreshToken,
  expiresIn,
  refreshExpiresIn,
}: SetAuthCookiesParams) {
  const cookieStore = await cookies();

  const accessTokenExpiresAt = new Date(Date.now() + expiresIn * 1000);
  const refreshTokenExpiresAt = new Date(Date.now() + refreshExpiresIn * 1000);

  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    // npm run dev -> NODE_ENV = "development"
    // npm run build / npm start -> NODE_ENV = "production"
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: accessTokenExpiresAt,
    path: '/',
  });

  cookieStore.set(
    ACCESS_TOKEN_EXPIRES_AT_COOKIE,
    accessTokenExpiresAt.toISOString(),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: accessTokenExpiresAt,
      path: '/', // path '/' so proxy.ts can read this cookie on every route
    },
  );

  cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: refreshTokenExpiresAt,
    path: '/api/auth/refresh-token',
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(ACCESS_TOKEN_EXPIRES_AT_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
}

export async function getAccessTokenExpiresAt() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ACCESS_TOKEN_EXPIRES_AT_COOKIE)?.value;
  return value ? new Date(value) : undefined;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
}
