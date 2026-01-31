// Mock Authentication Data
// This file simulates Django backend responses
// Replace with actual API calls to Django when ready

import type { User, Tenant, LoginCredentials, AuthResult, Session } from './types';

// Mock Users (would come from Django's public schema)
const mockUsers: Record<string, { user: User; password: string; tenantId: string }> = {
  'admin': {
    user: {
      id: '1',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'Sistema',
      role: 'admin',
      isActive: true,
    },
    password: 'admin123', // In production, Django handles password validation
    tenantId: 'tenant-1',
  },
  'carlos': {
    user: {
      id: '2',
      username: 'carlos',
      firstName: 'Carlos',
      lastName: 'Silva',
      role: 'sales',
      isActive: true,
    },
    password: 'carlos123',
    tenantId: 'tenant-1',
  },
  'ana': {
    user: {
      id: '3',
      username: 'ana',
      firstName: 'Ana',
      lastName: 'Santos',
      role: 'manager',
      isActive: true,
    },
    password: 'ana123',
    tenantId: 'tenant-1',
  },
};

// Mock Tenants (would come from Django's public schema)
const mockTenants: Record<string, Tenant> = {
  'tenant-1': {
    id: 'tenant-1',
    name: 'Empresa Demo',
    schema: 'tenant_demo',
    isActive: true,
  },
  'tenant-2': {
    id: 'tenant-2',
    name: 'Outra Empresa',
    schema: 'tenant_outra',
    isActive: true,
  },
};

/**
 * Mock authentication function
 * Replace this with actual Django API call:
 * 
 * export async function authenticateWithDjango(credentials: LoginCredentials): Promise<AuthResult> {
 *   const response = await fetch(`${process.env.DJANGO_API_URL}/api/auth/login/`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(credentials),
 *   });
 *   return response.json();
 * }
 */
export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const { username, password } = credentials;
  
  const userData = mockUsers[username.toLowerCase()];
  
  if (!userData) {
    return { success: false, error: 'Usuário não encontrado' };
  }
  
  if (userData.password !== password) {
    return { success: false, error: 'Senha incorreta' };
  }
  
  if (!userData.user.isActive) {
    return { success: false, error: 'Usuário inativo' };
  }
  
  const tenant = mockTenants[userData.tenantId];
  
  if (!tenant || !tenant.isActive) {
    return { success: false, error: 'Tenant inativo ou não encontrado' };
  }
  
  // Create session (expires in 8 hours)
  const session: Session = {
    user: userData.user,
    tenant,
    expiresAt: Date.now() + (8 * 60 * 60 * 1000),
  };
  
  return { success: true, session };
}

/**
 * Validate session (for middleware)
 * Replace with Django API call to validate session token
 */
export async function validateSession(sessionData: Session | null): Promise<boolean> {
  if (!sessionData) return false;
  if (Date.now() > sessionData.expiresAt) return false;
  if (!sessionData.user?.isActive) return false;
  if (!sessionData.tenant?.isActive) return false;
  return true;
}
