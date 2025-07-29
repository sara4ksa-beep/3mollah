'use client';

import { Cairo, Inter, Poppins } from 'next/font/google';
import "../globals.css";
import AdminSidebar from "@/components/AdminSidebar";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-cairo',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're on the login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // If we're on login page, don't check authentication
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Decode token to get user info
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        name: payload.name || 'المدير',
        role: payload.role
      });
    } catch (error) {
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [router, isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  // If we're on login page, render without sidebar
  if (isLoginPage) {
    return (
      <html lang="ar" dir="rtl">
        <body className={`${cairo.variable} ${inter.variable} ${poppins.variable} font-cairo font-smooth text-arabic-optimized min-h-screen bg-white`} suppressHydrationWarning={true}>
          {children}
        </body>
      </html>
    );
  }

  if (loading) {
    return (
      <html lang="ar" dir="rtl">
        <body className={`${cairo.variable} ${inter.variable} ${poppins.variable} font-cairo font-smooth text-arabic-optimized min-h-screen bg-white`} suppressHydrationWarning={true}>
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </body>
      </html>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${inter.variable} ${poppins.variable} font-cairo font-smooth text-arabic-optimized min-h-screen bg-white`} suppressHydrationWarning={true}>
        <div className="flex h-screen">
          <AdminSidebar 
            userRole={user.role}
            userName={user.name}
            onLogout={handleLogout}
          />
          {/* Main Content - Responsive margin */}
          <div className="flex-1 overflow-auto lg:mr-64">
            <div className="p-4 lg:p-8">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 