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
      gradient: "from-black/40 via-black/30 to-black/40",
      buttons: [
        { text: "تصفح المنتجات", href: "/products", style: "bg-blue-600 text-white hover:bg-blue-700" },
        { text: "تعرف علينا", href: "/about", style: "bg-white/20 text-white hover:bg-white hover:text-blue-600" }
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
        { text: "ابدأ الربح الآن", href: "https://abrajsa.com/request-service", style: "bg-blue-600 text-white hover:bg-blue-700" },
        { text: "تواصل معنا", href: "/contact", style: "bg-white/20 text-white hover:bg-white hover:text-blue-600" }
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
    <section className="relative overflow-hidden">
      {/* Hero Banner Container - Responsive Height */}
      <div className="relative w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[650px]">
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
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {banners[currentBanner].title}
            </h1>
            
            {/* Subtitle - Responsive */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              {banners[currentBanner].subtitle}
            </p>
            
            {/* Buttons Container - Responsive Layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              {banners[currentBanner].buttons.map((button, index) => (
                <Link 
                  key={index}
                  href={button.href}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium shadow-lg inline-block transform hover:scale-105 active:scale-95 w-fit ${button.style}`}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
} 