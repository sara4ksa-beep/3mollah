'use client';

import { Facebook, Instagram, Twitter, Music, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2c5aa0] text-white py-6">
      <div className="container mx-auto px-4">
        {/* Social Media Icons */}
        <div className="flex justify-center mb-4">
          <a 
            href="#" 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="فيسبوك"
          >
            <Facebook size={20} className="text-[#2c5aa0]" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg mr-8"
            aria-label="إنستقرام"
          >
            <Instagram size={20} className="text-[#2c5aa0]" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg mr-8"
            aria-label="سناب شات"
          >
            <Camera size={20} className="text-[#2c5aa0]" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg mr-8"
            aria-label="تيك توك"
          >
            <Music size={20} className="text-[#2c5aa0]" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg mr-8"
            aria-label="إكس"
          >
            <Twitter size={20} className="text-[#2c5aa0]" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white text-sm">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} متجر العمولة
          </p>
        </div>
      </div>
    </footer>
  );
} 