'use client';

import Link from 'next/link';
import { ProductImage } from './CloudinaryImage';
import { formatPriceWithCurrency } from '@/utils/numbers';
import { Eye, ArrowLeft } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group block h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 h-full flex flex-col">
        {/* Product Image Container */}
        <div className="relative h-40 xs:h-44 sm:h-52 md:h-56 lg:h-60 xl:h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="absolute inset-0">
            <ProductImage
              src={image}
              alt={name}
              className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Quick View Badge */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
              <Eye size={14} className="text-blue-600" />
              <span className="text-xs font-semibold text-gray-700">عرض سريع</span>
            </div>
          </div>
          
          {/* Price Badge on Image */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-blue-600 text-white rounded-lg px-3 py-1.5 shadow-xl">
              <p className="text-sm font-bold">{formatPriceWithCurrency(price)}</p>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-3 xs:p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50/50">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2 xs:mb-3 sm:mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-sm xs:text-base sm:text-lg lg:text-xl text-subheading leading-tight">
              {name}
            </h3>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-heading">
                {formatPriceWithCurrency(price)}
              </p>
            </div>
            
            {/* View Arrow */}
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <ArrowLeft size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 