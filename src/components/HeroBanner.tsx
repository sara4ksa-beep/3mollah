'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/delver.jpeg"
          alt="خدمة التوصيل"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-900/20"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_100%)]">
          متجر العمولة
        </h1>
        <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto text-white drop-shadow-2xl font-medium">
          اكتشف أفضل المنتجات المختارة بعناية من التجار الموثوقين
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            href="/products"
            className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors text-lg shadow-lg inline-block"
          >
            تصفح المنتجات
          </Link>
          <Link 
            href="/about"
            className="border-3 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors text-lg shadow-lg inline-block"
          >
            تعرف علينا
          </Link>
        </div>
      </div>
    </section>
  );
} 