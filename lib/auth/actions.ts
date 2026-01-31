'use server';

import { redirect } from 'next/navigation';
import { createSession, destroySession, getSession } from './session';
import { authenticateUser, registerUser } from './mock-auth';
import type { LoginCredentials, SignUpCredentials, Session, User, Tenant } from './types';

export interface LoginFormState {
  success: boolean;
  error?: string;
}

export interface SignUpFormState {
  success: boolean;
  error?: string;
  errors?: Record<string, string>;
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
 * Server Action: Sign Up
 * Handles form submission for registration
 */
export async function signUp(
  _prevState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const tenantName = formData.get('tenantName') as string | undefined;

  const credentials: SignUpCredentials = {
    username,
    password,
    confirmPassword,
    firstName,
    lastName,
    tenantName: tenantName || undefined,
  };

  // Register with mock data (replace with Django API call)
  const result = await registerUser(credentials);

  if (!result.success) {
    return {
      success: false,
      error: result.error,
      errors: result.errors,
    };
  }

  // Auto-login after successful registration
  const loginResult = await authenticateUser({ username, password });
  
  if (loginResult.success && loginResult.session) {
    await createSession(loginResult.session);
    redirect('/dashboard');
  }

  // If auto-login fails, redirect to login page
  redirect('/login?registered=true');
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
