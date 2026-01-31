// Authentication Types for Multi-tenant CRM

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'sales' | 'viewer';
  isActive: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  schema: string; // Database schema name for multi-tenant isolation
  isActive: boolean;
}

export interface Session {
  user: User;
  tenant: Tenant;
  expiresAt: number; // Unix timestamp
}

export interface LoginCredentials {
  username: string;
  password: string;
  tenantId?: string; // Optional: for multi-tenant login
}

export interface AuthResult {
  success: boolean;
  error?: string;
  session?: Session;
}
