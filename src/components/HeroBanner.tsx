'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      id: 1,
      image: "/ph.png",
      alt: "خدمة التوصيل المميزة",
      title: "متجر العمولة",
      subtitle: "اكتشف أفضل المنتجات المختارة بعناية من التجار الموثوقين",
      gradient: "from-gray-800/50 via-gray-800/30 to-gray-900/50 sm:from-gray-800/40 sm:via-gray-800/20 sm:to-gray-900/40",
      buttons: [
        { text: "تصفح المنتجات", href: "/products", style: "bg-white text-blue-600 hover:bg-gray-100" },
        { text: "تعرف علينا", href: "/about", style: "border-2 border-white text-white hover:bg-white hover:text-blue-600" }
      ]
    },
    {
      id: 2,
      image: "/nner.png",
      alt: "الربح من متجر العمولة",
      title: "اربح بسهولة مع متجر العمولة",
      subtitle: "المورد يتكفّل بالشحن و التخزين وأنت تربح من تسويق متجرك",
      gradient: "from-black/40 via-black/30 to-black/40",
      buttons: [
        { text: "ابدأ الربح الآن", href: "https://abrajsa.com/request-service", style: "bg-white text-blue-600 hover:bg-gray-100" },
        { text: "تواصل معنا", href: "/contact", style: "border-2 border-white text-white hover:bg-white hover:text-blue-600" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Hero Banner Container - Responsive Height */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
        {/* Background Images with Fade Transition */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              className="object-cover"
              priority={index === 0}
              placeholder="empty"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
            />
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`}></div>
          </div>
        ))}
        
        {/* Content Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Main Heading - Responsive Typography */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_100%)] leading-tight">
              {banners[currentBanner].title}
            </h1>
            
            {/* Subtitle - Responsive */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-white drop-shadow-2xl font-medium px-2 sm:px-4 leading-relaxed">
              {banners[currentBanner].subtitle}
            </p>
            
            {/* Buttons Container - Responsive Layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-2 sm:px-4">
              {banners[currentBanner].buttons.map((button, index) => (
                <Link 
                  key={index}
                  href={button.href}
                  className={`px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-sm sm:text-base md:text-lg shadow-lg inline-block transform hover:scale-105 active:scale-95 ${button.style}`}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Banner Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBanner 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 