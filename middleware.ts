import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'crm_session';

// Routes that don't require authentication
const publicRoutes = ['/login', '/api/auth/login'];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login'];

function decryptSession(encrypted: string): { expiresAt: number } | null {
  try {
    const data = Buffer.from(encrypted, 'base64').toString('utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get session cookie
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  const session = sessionCookie?.value ? decryptSession(sessionCookie.value) : null;
  
  // Check if session is valid and not expired
  const isValidSession = session && Date.now() < session.expiresAt;
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname === route);
  
  // Redirect authenticated users away from auth pages
  if (isValidSession && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Redirect unauthenticated users to login
  if (!isValidSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // User is authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon files, apple-icon
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.*|apple-icon.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
