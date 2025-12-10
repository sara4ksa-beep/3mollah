import { notFound } from 'next/navigation';
import { Check, ArrowLeft, Shield, Truck, Package } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import BuyButton from '@/components/BuyButton';
import { ProductImage } from '@/components/CloudinaryImage';
import { formatPriceWithCurrency } from '@/utils/numbers';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 sm:mb-8 transition-colors duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-semibold text-body">العودة للرئيسية</span>
        </Link>

        {/* Main Product Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">
            {/* Product Image Section */}
            <div className="relative">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-200">
                  <Shield size={16} className="text-green-600" />
                  <span className="text-xs font-semibold text-green-700">ضمان الجودة</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
                  <Truck size={16} className="text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700">توصيل سريع</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-200">
                  <Package size={16} className="text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">أصلي 100%</span>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col justify-between space-y-6 sm:space-y-8">
              {/* Title and Price */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight text-heading">
                    {product.name}
                  </h1>
                </div>
                
                {/* Price Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100">
                  <p className="text-sm sm:text-base text-gray-600 mb-3 text-body">السعر</p>
                  <div className="flex items-baseline">
                    <span className="product-price text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 text-heading">
                      {formatPriceWithCurrency(product.price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              {product.features && product.features.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Check size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-subheading">
                      مميزات المنتج
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <div className="mt-0.5 p-1 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                          <Check className="text-green-600 flex-shrink-0" size={16} />
                        </div>
                        <span className="text-gray-700 text-base sm:text-lg leading-relaxed text-body flex-1">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description if available */}
              {product.description && (
                <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-subheading">الوصف</h3>
                  <p className="text-gray-600 leading-relaxed text-body">{product.description}</p>
                </div>
              )}

              {/* Buy Button Section */}
              <div className="pt-4 space-y-3">
                <BuyButton productId={product.id} externalLink={product.externalLink} />
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 text-caption">
                  <Shield size={14} />
                  <p>سيتم توجيهك إلى موقع البائع الأصلي - معاملة آمنة ومضمونة</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <Truck size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-subheading">توصيل سريع</h3>
            <p className="text-sm text-gray-600 text-body">توصيل خلال 2-5 أيام عمل</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <Shield size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-subheading">ضمان الجودة</h3>
            <p className="text-sm text-gray-600 text-body">منتجات أصلية 100%</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <Package size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-subheading">سهولة الإرجاع</h3>
            <p className="text-sm text-gray-600 text-body">إرجاع مجاني خلال 14 يوم</p>
          </div>
        </div>
      </div>
    </div>
  );
} 