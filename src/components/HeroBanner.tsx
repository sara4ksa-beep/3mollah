'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden hero-banner">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/delver.jpeg"
          alt="خدمة التوصيل"
          fill
          className="object-cover"
          priority
          placeholder="empty"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/40 to-gray-900/40"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-white hero-text-shadow leading-tight">
            متجر العمولة
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto text-white hero-text-shadow font-medium px-2 sm:px-4 leading-relaxed">
            اكتشف أفضل المنتجات المختارة بعناية من التجار الموثوقين
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-2 sm:px-4">
            <Link 
              href="/products"
              className="bg-white text-blue-600 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-100 hero-transition text-sm sm:text-base md:text-lg shadow-lg inline-block"
            >
              تصفح المنتجات
            </Link>
            <Link 
              href="/about"
              className="border-2 border-white text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-white hover:text-blue-600 hero-transition text-sm sm:text-base md:text-lg shadow-lg inline-block"
            >
              تعرف علينا
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 