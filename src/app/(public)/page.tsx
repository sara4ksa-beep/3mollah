import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import CustomerReviews from '@/components/CustomerReviews';
import { prisma } from '@/lib/prisma';

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { category, search } = await searchParams;

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

  // Fetch products with filtering - maximum 12 products
  const products = await prisma.product.findMany({
    where,
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 12 // Maximum 12 products
  });

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Products Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12 text-heading">
            منتجاتنا المميزة
          </h2>
          
          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
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
          ) : (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-500 text-base md:text-lg text-body">
                {search || category 
                  ? 'لم يتم العثور على منتجات تطابق معايير البحث'
                  : 'لا توجد منتجات متاحة حالياً'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews />
    </div>
  );
} 