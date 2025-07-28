import { NextRequest, NextResponse } from 'next/server';
import { getSiteConfig } from '@/lib/config';

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;
  
  // الحصول على إعدادات الموقع حسب النطاق
  const siteConfig = getSiteConfig(hostname);
  
  // إضافة headers خاصة بـ subdomain
  const response = NextResponse.next();
  
  // إضافة معلومات النطاق للاستخدام في التطبيق
  response.headers.set('x-site-config', JSON.stringify(siteConfig));
  
  // إعادة توجيه من www إلى النطاق الرئيسي (اختياري)
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    const newUrl = new URL(request.url);
    newUrl.hostname = newHostname;
    return NextResponse.redirect(newUrl);
  }
  
  return response;
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