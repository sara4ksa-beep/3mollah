'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, X, ChevronDown } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    products: number;
  };
}

export default function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL();
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsOpen(false);
    updateURL(categoryId);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateURL(selectedCategory, '');
  };

  const updateURL = (category = selectedCategory, search = searchQuery) => {
    const params = new URLSearchParams();
    
    if (search) {
      params.set('search', search);
    }
    
    if (category) {
      params.set('category', category);
    }
    
    const queryString = params.toString();
    
    // Determine the base URL based on current path
    const baseUrl = pathname === '/products' ? '/products' : '/';
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    
    router.push(url);
  };

  const selectedCategoryName = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory)?.name 
    : 'جميع الفئات';

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="animate-pulse bg-gray-200 h-12 rounded-lg"></div>
          <div className="animate-pulse bg-gray-200 h-12 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="البحث في المنتجات..."
            />
            
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 left-0 pl-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </form>

        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-right flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">{selectedCategoryName}</span>
            <ChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div className="py-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-right px-4 py-2 hover:bg-gray-100 ${
                    !selectedCategory ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  جميع الفئات
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-right px-4 py-2 hover:bg-gray-100 flex items-center justify-between ${
                      selectedCategory === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">({category._count.products})</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 