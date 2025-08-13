'use client';

import ProductCard from '@/components/ProductCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useProducts, useProductSearch } from '@/lib/swr';
import { useState, Suspense } from 'react';

function ProductsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  // Use SWR hooks for data fetching
  const { data: productsData, error: productsError, isLoading: productsLoading } = useProducts(currentPage, limit);
  const { data: searchData, error: searchError, isLoading: searchLoading } = useProductSearch(searchQuery, {});

  // Determine which data to use
  const isSearching = searchQuery.length > 0;
  const data = isSearching ? searchData : productsData;
  const error = isSearching ? searchError : productsError;
  const isLoading = isSearching ? searchLoading : productsLoading;

  const products = data?.products || data?.hits || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || Math.ceil(total / limit);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ</h2>
          <p className="text-gray-600 mb-4">فشل في تحميل المنتجات</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 space-x-reverse text-blue-600 hover:text-blue-700 mb-4 text-body"
          >
            <ArrowLeft size={20} />
            <span>العودة للرئيسية</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-heading">
            جميع المنتجات
          </h1>
          <p className="text-gray-600 text-lg text-body">
            اكتشف مجموعتنا الكاملة من المنتجات المميزة
          </p>
        </div>

        {/* Search Controls */}
        <SearchAndFilter onSearch={handleSearch} />
        
        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600 text-body">
            تم العثور على <span className="font-semibold text-blue-600">{total}</span> منتج
            {searchQuery && (
              <>
                {' '}للبحث: <span className="font-semibold text-blue-600">&ldquo;{searchQuery}&rdquo;</span>
              </>
            )}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8">
            {Array.from({ length: limit }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="bg-gray-200 h-32 sm:h-40 lg:h-48 xl:h-52 rounded mb-3"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-6 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && products.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 space-x-reverse">
                {currentPage > 1 && (
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    السابق
                  </button>
                )}
                
                <span className="px-4 py-2 text-gray-600">
                  صفحة {currentPage} من {totalPages}
                </span>
                
                {currentPage < totalPages && (
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    التالي
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-heading">
                لا توجد منتجات
              </h3>
              <p className="text-gray-600 text-body">
                {searchQuery 
                  ? 'لم يتم العثور على منتجات تطابق معايير البحث'
                  : 'لا توجد منتجات متاحة حالياً'
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  عرض جميع المنتجات
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
} 