import { NextResponse } from 'next/server';
import { registerUser, authenticateUser } from '@/lib/auth/mock-auth';
import { createSession } from '@/lib/auth/session';
import type { SignUpCredentials } from '@/lib/auth/types';

/**
 * POST /api/auth/signup
 * Register a new user
 * 
 * Request body:
 * {
 *   username: string;
 *   password: string;
 *   confirmPassword: string;
 *   firstName: string;
 *   lastName: string;
 *   tenantName?: string;
 * }
 * 
 * Replace with Django API call:
 * const response = await fetch(`${process.env.DJANGO_API_URL}/api/auth/register/`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(credentials),
 * });
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const credentials: SignUpCredentials = {
      username: body.username,
      password: body.password,
      confirmPassword: body.confirmPassword,
      firstName: body.firstName,
      lastName: body.lastName,
      tenantName: body.tenantName,
    };

    // Register with mock data (replace with Django API call)
    const result = await registerUser(credentials);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          errors: result.errors,
        },
        { status: 400 }
      );
    }

    // Auto-login after successful registration
    const loginResult = await authenticateUser({
      username: credentials.username,
      password: credentials.password,
    });

    if (loginResult.success && loginResult.session) {
      // Create session cookie
      await createSession(loginResult.session);

      return NextResponse.json({
        success: true,
        user: result.user,
        message: 'Conta criada com sucesso',
      });
    }

    // Registration succeeded but auto-login failed
    return NextResponse.json({
      success: true,
      user: result.user,
      message: 'Conta criada. Por favor, faça login.',
      requiresLogin: true,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
