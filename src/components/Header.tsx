'use client';

import Link from 'next/link';
import { Mail, Home, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const categories = [
    { name: 'الإلكترونيات', href: '/products?category=الإلكترونيات' },
    { name: 'الجمال والعناية', href: '/products?category=الجمال والعناية' },
    { name: 'الإكسسوارات', href: '/products?category=الإكسسوارات' },
    { name: 'الهواتف الذكية', href: '/products?category=الهواتف الذكية' },
    { name: 'الأجهزة المحمولة', href: '/products?category=الأجهزة المحمولة' },
    { name: 'الكاميرات', href: '/products?category=الكاميرات' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors text-heading">
              متجر العمولة
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 space-x-reverse">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={toggleCategories}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <span className="font-bold">الفئات</span>
                <ChevronDown size={16} className={`transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isCategoriesOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-right"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <Link 
              href="/products" 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="font-bold">البحث</span>
              <Search size={18} />
            </Link>
            
            <Link 
              href="/contact" 
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span className="font-bold">اتصل بنا</span>
              <Mail size={18} />
            </Link>
            
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span className="font-bold">الرئيسية</span>
              <Home size={18} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 pt-4">
              {/* Mobile Categories */}
              <div className="space-y-2">
                <div className="px-4 py-2 text-sm font-bold text-gray-600">الفئات:</div>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={closeMenu}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-right"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              
              <Link 
                href="/products" 
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search size={20} />
                <span className="font-bold">البحث</span>
              </Link>
              
              <Link 
                href="/" 
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Home size={20} />
                <span className="font-bold">الرئيسية</span>
              </Link>
              
              <Link 
                href="/contact" 
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Mail size={20} />
                <span className="font-bold">اتصل بنا</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
      
      {/* Overlay for closing dropdown */}
      {isCategoriesOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsCategoriesOpen(false)}
        />
      )}
    </header>
  );
} 