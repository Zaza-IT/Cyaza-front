import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { Session } from '@/lib/auth/types';

const SESSION_COOKIE_NAME = 'crm_session';

function decryptSession(encrypted: string): Session | null {
  try {
    const data = Buffer.from(encrypted, 'base64').toString('utf-8');
    return JSON.parse(data) as Session;
  } catch {
    return null;
  }
}

/**
 * GET /api/auth/session
 * Get current session info (for client-side use)
 */
export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  
  const session = decryptSession(sessionCookie.value);
  
  if (!session || Date.now() > session.expiresAt) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  
  // Return session info without sensitive data
  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.user.id,
      username: session.user.username,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      role: session.user.role,
    },
    tenant: {
      id: session.tenant.id,
      name: session.tenant.name,
    },
    expiresAt: session.expiresAt,
  });
}
