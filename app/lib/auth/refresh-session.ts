import { refreshTokenRequest, AuthApiError } from '@/app/lib/api/auth';
import { getRefreshToken, setAuthCookies } from '@/app/lib/token/auth-token';

export async function refreshSession() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    throw new AuthApiError('No refresh token');
  }

  const {
    accessToken,
    refreshToken: newRefreshToken,
    expiresIn,
    refreshExpiresIn,
  } = await refreshTokenRequest(refreshToken);

  await setAuthCookies({
    accessToken,
    refreshToken: newRefreshToken,
    expiresIn,
    refreshExpiresIn,
  });

  return accessToken;
}
