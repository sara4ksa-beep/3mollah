import { notFound } from 'next/navigation';
import { Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import BuyButton from '@/components/BuyButton';
import { ProductImage } from '@/components/CloudinaryImage';

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 space-x-reverse text-blue-600 hover:text-blue-700 mb-8 text-body"
        >
          <ArrowLeft size={20} />
          <span>العودة للرئيسية</span>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative h-96 lg:h-full">
              <ProductImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-heading">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-blue-600 text-heading">
                  {product.price.toLocaleString('ar-SA')} ريال
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-subheading">
                  مميزات المنتج
                </h2>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3 space-x-reverse">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700 text-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buy Button */}
              <div className="pt-6">
                <BuyButton productId={product.id} externalLink={product.externalLink} />
                <p className="text-sm text-gray-500 text-center mt-2 text-caption">
                  سيتم توجيهك إلى موقع البائع الأصلي
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 