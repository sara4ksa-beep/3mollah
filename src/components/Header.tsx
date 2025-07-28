'use client';

import Link from 'next/link';
import { Mail, Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors text-heading">
              متجر العمولة
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center">
            <Link 
              href="/contact" 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="font-bold">اتصل بنا</span>
              <Mail size={18} />
            </Link>
            
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mr-4"
            >
              <span className="font-bold">الرئيسية</span>
              <Home size={18} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 