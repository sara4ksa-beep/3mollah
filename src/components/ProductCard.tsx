'use client';

import Link from 'next/link';
import { ProductImage } from './CloudinaryImage';
import { formatPriceWithCurrency } from '@/utils/numbers';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
        {/* Product Image */}
        <div className="relative h-28 xs:h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 overflow-hidden">
          <ProductImage
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        
        {/* Product Info */}
        <div className="p-2 xs:p-3 sm:p-4 lg:p-5">
          <h3 className="font-semibold text-gray-800 mb-1 xs:mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors text-xs xs:text-sm sm:text-base lg:text-lg text-subheading leading-tight">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-blue-600 text-heading">
              {formatPriceWithCurrency(price)}
            </p>
            {/* Quick view indicator */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 