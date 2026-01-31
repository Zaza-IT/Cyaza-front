'use server';

import { redirect } from 'next/navigation';
import { createSession, destroySession, getSession } from './session';
import { authenticateUser } from './mock-auth';
import type { LoginCredentials, Session, User, Tenant } from './types';

export interface LoginFormState {
  success: boolean;
  error?: string;
}

/**
 * Server Action: Login
 * Handles form submission for login
 */
export async function login(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { success: false, error: 'Preencha todos os campos' };
  }

  const credentials: LoginCredentials = { username, password };
  
  // Authenticate with mock data (replace with Django API call)
  const result = await authenticateUser(credentials);

  if (!result.success || !result.session) {
    return { success: false, error: result.error || 'Erro ao autenticar' };
  }

  // Create httpOnly session cookie
  await createSession(result.session);

  // Redirect to dashboard
  redirect('/dashboard');
}

/**
 * Server Action: Logout
 */
export async function logout(): Promise<void> {
  await destroySession();
  redirect('/login');
}

/**
 * Get current user from session
 * For use in Server Components
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Get current tenant from session
 * For use in Server Components
 */
export async function getCurrentTenant(): Promise<Tenant | null> {
  const session = await getSession();
  return session?.tenant || null;
}

/**
 * Get full session data
 * For use in Server Components
 */
export async function getSessionData(): Promise<Session | null> {
  return await getSession();
}

/**
 * Check if user is authenticated
 * For use in Server Components
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
