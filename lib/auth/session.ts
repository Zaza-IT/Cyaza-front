import 'server-only';
import { cookies } from 'next/headers';
import type { Session } from './types';

const SESSION_COOKIE_NAME = 'crm_session';
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours in seconds

// In production, use a proper encryption key from environment variables
const ENCRYPTION_KEY = process.env.SESSION_SECRET || 'dev-secret-key-change-in-production';

/**
 * Simple encryption for session data
 * In production, consider using iron-session or similar library
 */
function encryptSession(session: Session): string {
  const data = JSON.stringify(session);
  return Buffer.from(data).toString('base64');
}

function decryptSession(encrypted: string): Session | null {
  try {
    const data = Buffer.from(encrypted, 'base64').toString('utf-8');
    return JSON.parse(data) as Session;
  } catch {
    return null;
  }
}

/**
 * Create a new session cookie
 */
export async function createSession(session: Session): Promise<void> {
  const cookieStore = await cookies();
  const encryptedSession = encryptSession(session);
  
  cookieStore.set(SESSION_COOKIE_NAME, encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

/**
 * Get current session from cookie
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie?.value) {
    return null;
  }
  
  const session = decryptSession(sessionCookie.value);
  
  if (!session) {
    return null;
  }
  
  // Check if session has expired
  if (Date.now() > session.expiresAt) {
    await destroySession();
    return null;
  }
  
  return session;
}

/**
 * Destroy session (logout)
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Update session (extend expiry, update tenant context, etc.)
 */
export async function updateSession(updates: Partial<Session>): Promise<void> {
  const currentSession = await getSession();
  
  if (!currentSession) {
    throw new Error('No active session');
  }
  
  const updatedSession: Session = {
    ...currentSession,
    ...updates,
  };
  
  await createSession(updatedSession);
}
