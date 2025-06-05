// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Protect the /event-template route
  if (pathname === '/event-template') {
    const code = request.cookies.get('event_code')?.value;
    if (code !== process.env.EVENT_TEMPLATE_CODE) {
      return NextResponse.redirect(new URL('/enter-code', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/event-template'],
};
