'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/delver.jpeg"
          alt="خدمة التوصيل"
          fill
          className="object-cover"
          priority
          placeholder="empty"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-900/20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_100%)]">
          متجر العمولة
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto text-white drop-shadow-2xl font-medium px-4">
          اكتشف أفضل المنتجات المختارة بعناية من التجار الموثوقين
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
          <Link 
            href="/products"
            className="bg-white text-blue-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors text-base sm:text-lg shadow-lg inline-block"
          >
            تصفح المنتجات
          </Link>
          <Link 
            href="/about"
            className="border-2 sm:border-3 border-white text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors text-base sm:text-lg shadow-lg inline-block"
          >
            تعرف علينا
          </Link>
        </div>
      </div>
    </section>
  );
} 