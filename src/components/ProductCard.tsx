'use client';

import Link from 'next/link';
import { Tag } from 'lucide-react';
import { ProductImage } from './CloudinaryImage';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative h-32 sm:h-40 lg:h-48 xl:h-52 overflow-hidden">
          <ProductImage
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {category && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Tag size={12} />
              <span className="hidden sm:inline">{category}</span>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-2 sm:p-3 lg:p-4">
          <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-xs sm:text-sm lg:text-base text-subheading">
            {name}
          </h3>
          <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-blue-600 text-heading">
            {price.toLocaleString('ar-SA')} ريال
          </p>
        </div>
      </div>
    </Link>
  );
} 