import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { hostname } = request.nextUrl;
  
  // إعادة توجيه من www إلى النطاق الرئيسي (اختياري)
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    const newUrl = new URL(request.url);
    newUrl.hostname = newHostname;
    return NextResponse.redirect(newUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 