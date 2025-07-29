'use client';

import { Facebook, Instagram, Twitter, Music, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2c5aa0] text-white py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Icons */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a 
              href="#" 
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="فيسبوك"
            >
              <Facebook size={16} className="sm:w-5 sm:h-5 text-[#2c5aa0]" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="إنستقرام"
            >
              <Instagram size={16} className="sm:w-5 sm:h-5 text-[#2c5aa0]" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="سناب شات"
            >
              <Camera size={16} className="sm:w-5 sm:h-5 text-[#2c5aa0]" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="تيك توك"
            >
              <Music size={16} className="sm:w-5 sm:h-5 text-[#2c5aa0]" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="إكس"
            >
              <Twitter size={16} className="sm:w-5 sm:h-5 text-[#2c5aa0]" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white text-xs sm:text-sm">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} متجر العمولة
          </p>
        </div>
      </div>
    </footer>
  );
} 