import ProductCard from '@/components/ProductCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import { prisma } from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search, page = '1', sortBy = 'createdAt', sortOrder = 'desc' } = await searchParams;
  const currentPage = parseInt(page);
  const limit = 12;
  const skip = (currentPage - 1) * limit;

  // Build where clause
  const where: { isActive: boolean; categoryId?: string; OR?: Array<{ name: { contains: string; mode: 'insensitive' }; } | { description: { contains: string; mode: 'insensitive' }; }> } = { isActive: true };
  
  if (category) {
    where.categoryId = category;
  }
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  // Fetch products with pagination
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, slug: true }
        }
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit
    }),
    prisma.product.count({ where })
  ]);

  const totalPages = Math.ceil(total / limit);

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

        {/* Search and Filter Controls */}
        <SearchAndFilter />
        
        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600 text-body">
            تم العثور على <span className="font-semibold text-blue-600">{total}</span> منتج
            {search && (
              <>
                {' '}للبحث: <span className="font-semibold text-blue-600">&ldquo;{search}&rdquo;</span>
              </>
            )}
            {category && (
              <>
                {' '}في الفئة: <span className="font-semibold text-blue-600">
                  {products[0]?.category?.name || 'غير محدد'}
                </span>
              </>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category?.name}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 space-x-reverse">
                {currentPage > 1 && (
                  <Link
                    href={`/products?${new URLSearchParams({
                      ...(search && { search }),
                      ...(category && { category }),
                      page: (currentPage - 1).toString(),
                      sortBy,
                      sortOrder
                    })}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    السابق
                  </Link>
                )}
                
                <span className="px-4 py-2 text-gray-600">
                  صفحة {currentPage} من {totalPages}
                </span>
                
                {currentPage < totalPages && (
                  <Link
                    href={`/products?${new URLSearchParams({
                      ...(search && { search }),
                      ...(category && { category }),
                      page: (currentPage + 1).toString(),
                      sortBy,
                      sortOrder
                    })}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    التالي
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
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
                {search || category 
                  ? 'لم يتم العثور على منتجات تطابق معايير البحث'
                  : 'لا توجد منتجات متاحة حالياً'
                }
              </p>
              {(search || category) && (
                <Link
                  href="/products"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  عرض جميع المنتجات
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 