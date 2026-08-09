import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { checkRateLimit, SECURITY_HEADERS } from '@/lib/security';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || '127.0.0.1';

  // 1. Rate Limiting Check (Max 120 requests/min per IP, 10 req/min for login API)
  const isLoginRoute = pathname.includes('/login');
  const rateLimit = isLoginRoute ? 10 : 120;
  const { isLimited } = checkRateLimit(`${ip}:${isLoginRoute ? 'login' : 'gen'}`, rateLimit, 60000);

  if (isLimited) {
    return new NextResponse(
      JSON.stringify({ error: 'Too Many Requests', message: 'Rate limit exceeded. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          ...SECURITY_HEADERS,
        },
      }
    );
  }

  let response: NextResponse;

  // 2. Allow login page through
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    response = NextResponse.next();
  }
  // 3. Protect /admin and /api/admin routes
  else if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      if (pathname.startsWith('/api/admin')) {
        response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      } else {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        response = NextResponse.redirect(loginUrl);
        response.cookies.delete(AUTH_COOKIE_NAME);
      }
    } else {
      response = NextResponse.next();
    }
  } else {
    response = NextResponse.next();
  }

  // 4. Attach OWASP Security Headers to every response
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
