import { NextResponse } from 'next/server';
import { AuthApiError } from '@/app/lib/api/auth';
import { clearAuthCookies } from '@/app/lib/token/auth-token';
import { refreshSession } from '@/app/lib/auth/refresh-session';

export async function POST() {
  try {
    await refreshSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    await clearAuthCookies();
    if (error instanceof AuthApiError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    throw error;
  }
}
