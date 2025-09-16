'use client';

import Link from 'next/link';
import { Mail, Home, Menu, Search, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import AdvancedSearch from './AdvancedSearch';

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    products: number;
  };
}

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        // Filter only categories that have products
        const categoriesWithProducts = data.filter((cat: Category) => cat._count.products > 0);
        setCategories(categoriesWithProducts);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };


  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const toggleCategories = () => {
    if (!loading && categories.length > 0) {
      setIsCategoriesOpen(!isCategoriesOpen);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Left-aligned on mobile, left-aligned on desktop */}
            <div className="flex items-center flex-1 justify-start lg:justify-start lg:flex-none order-1">
              <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors text-heading">
                متجر العمولة
              </Link>
            </div>

            {/* Sidebar Toggle Button - Only on mobile, positioned on the right */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors order-2"
              aria-label="فتح القائمة الجانبية"
            >
              <Menu size={24} className="text-gray-700" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center order-3">
            {/* Categories Dropdown */}
            {categories.length > 0 && (
              <div className="relative ml-6">
                <button
                  onClick={toggleCategories}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  <span className="font-bold">الفئات</span>
                  <ChevronDown size={16} className={`transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isCategoriesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-right"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category.name}</span>
                          <span className="text-xs text-gray-500">({category._count.products})</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Search Button */}
            <button
              onClick={toggleSearch}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ml-6"
            >
              <span className="font-bold">بحث متقدم</span>
              <Search size={18} />
            </button>
            
            <Link 
              href="/contact" 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-6"
            >
              <span className="font-bold">اتصل بنا</span>
              <Mail size={18} />
            </Link>
            
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ml-6"
            >
              <span className="font-bold">الرئيسية</span>
              <Home size={18} />
            </Link>
          </nav>

        </div>

      </div>
      
      {/* Overlay for closing dropdown */}
      {isCategoriesOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsCategoriesOpen(false)}
        />
      )}
      </header>

      {/* Advanced Search */}
      <AdvancedSearch isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
} 