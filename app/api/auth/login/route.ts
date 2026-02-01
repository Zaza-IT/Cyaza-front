import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authenticateUser } from '@/lib/auth/mock-auth';
import type { LoginCredentials, Session } from '@/lib/auth/types';

const SESSION_COOKIE_NAME = 'crm_session';
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours in seconds

function encryptSession(session: Session): string {
  const data = JSON.stringify(session);
  return Buffer.from(data).toString('base64');
}

/**
 * POST /api/auth/login
 * Alternative to Server Actions for authentication
 * Can be used by external clients or for testing
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body as LoginCredentials;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const result = await authenticateUser({ username, password });

    if (!result.success || !result.session) {
      return NextResponse.json(
        { success: false, error: result.error || 'Authentication failed' },
        { status: 401 }
      );
    }

    // Set httpOnly cookie
    const cookieStore = await cookies();
    const encryptedSession = encryptSession(result.session);
    
    cookieStore.set(SESSION_COOKIE_NAME, encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    });

    // Return user info (without sensitive data)
    return NextResponse.json({
      success: true,
      user: {
        id: result.session.user.id,
        username: result.session.user.username,
        firstName: result.session.user.firstName,
        lastName: result.session.user.lastName,
        role: result.session.user.role,
      },
      tenant: {
        id: result.session.tenant.id,
        name: result.session.tenant.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
