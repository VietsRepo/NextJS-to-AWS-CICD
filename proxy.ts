import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REFRESH_TOKEN_COOKIE = 'refresh_token';

// To run code before a request is completed
export function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  console.log(refreshToken);

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notification/:path*', '/settings/:path*'],
};
