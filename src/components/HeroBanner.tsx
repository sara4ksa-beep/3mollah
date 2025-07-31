'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Hero Banner Container - Responsive Height */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
        {/* Background Image */}
        <Image
          src="/ph.png"
          alt="خدمة التوصيل المميزة"
          fill
          className="object-cover"
          priority
          placeholder="empty"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
        />
        
        {/* Overlay Gradient - Responsive */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-900/50 sm:from-gray-800/40 sm:via-gray-800/20 sm:to-gray-900/40"></div>
        
        {/* Content Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Main Heading - Responsive Typography */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_100%)] leading-tight">
              متجر العمولة
            </h1>
            
            {/* Subtitle - Responsive */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-white drop-shadow-2xl font-medium px-2 sm:px-4 leading-relaxed">
              اكتشف أفضل المنتجات المختارة بعناية من التجار الموثوقين
            </p>
            
            {/* Buttons Container - Responsive Layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-2 sm:px-4">
              <Link 
                href="/products"
                className="bg-white text-blue-600 px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base md:text-lg shadow-lg inline-block transform hover:scale-105 active:scale-95"
              >
                تصفح المنتجات
              </Link>
              <Link 
                href="/about"
                className="border-2 border-white text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 text-sm sm:text-base md:text-lg shadow-lg inline-block transform hover:scale-105 active:scale-95"
              >
                تعرف علينا
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 