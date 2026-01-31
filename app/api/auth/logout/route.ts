import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'crm_session';

/**
 * POST /api/auth/logout
 * Clear session cookie
 */
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  
  return NextResponse.json({ success: true });
}
