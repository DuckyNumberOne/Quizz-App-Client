import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

function handleCheckLogin(req: NextRequest) {
  const value = req.cookies.get('token');
  return value;
}

export function middleware(req: NextRequest) {
  const accessToken = handleCheckLogin(req);
  const { pathname } = req.nextUrl;

  if (pathname === '/' && accessToken) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  if (pathname.startsWith('/admin') && !accessToken) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
