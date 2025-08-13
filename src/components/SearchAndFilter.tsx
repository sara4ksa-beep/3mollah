'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateURL('');
  };

  const updateURL = (search = searchQuery) => {
    const params = new URLSearchParams();
    
    if (search) {
      params.set('search', search);
    }
    
    const queryString = params.toString();
    
    // Determine the base URL based on current path
    const baseUrl = pathname === '/products' ? '/products' : '/';
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    
    router.push(url);
  };

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 gap-4">
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
      </div>
    </div>
  );
} 