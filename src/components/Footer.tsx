'use client';

import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Heart,
  Package,
  Star,
  Shield,
  Truck
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'فيسبوك',
      href: 'https://facebook.com',
      icon: Facebook,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'إنستقرام',
      href: 'https://instagram.com',
      icon: Instagram,
      color: 'hover:bg-pink-600'
    },
    {
      name: 'تويتر',
      href: 'https://twitter.com',
      icon: Twitter,
      color: 'hover:bg-blue-400'
    },
    {
      name: 'يوتيوب',
      href: 'https://youtube.com',
      icon: Youtube,
      color: 'hover:bg-red-600'
    },
    {
      name: 'لينكد إن',
      href: 'https://linkedin.com',
      icon: Linkedin,
      color: 'hover:bg-blue-700'
    }
  ];

  const quickLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المنتجات', href: '/products' },
    { name: 'من نحن', href: '/about' },
    { name: 'اتصل بنا', href: '/contact' }
  ];

  const features = [
    { icon: Truck, text: 'توصيل سريع' },
    { icon: Shield, text: 'دفع آمن' },
    { icon: Star, text: 'جودة عالية' },
    { icon: Heart, text: 'خدمة عملاء ممتازة' }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#1e3a8a] to-[#2c5aa0] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-[#2c5aa0]" />
              </div>
              <h3 className="text-xl font-bold text-heading">متجر العمولة</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              نقدم لك أفضل المنتجات المختارة بعناية من التجار الموثوقين مع ضمان الجودة والخدمة المتميزة.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-300" />
                <span>0551781111</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-300" />
                <span>info@abrajsa.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span>جدة، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-subheading">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-subheading">لماذا نحن؟</h4>
            <div className="space-y-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-300" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-subheading">تابعنا</h4>
            <p className="text-gray-300 text-sm">
              تابع آخر أخبارنا وعروضنا الخاصة
            </p>
            
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon size={18} className="text-white" />
                  </a>
                );
              })}
            </div>

            {/* Business Hours */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-medium">ساعات العمل</span>
              </div>
              <p className="text-xs text-gray-300">
                الأحد - الخميس: 9:00 ص - 6:00 م<br />
                الجمعة - السبت: مغلق
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-right">
              جميع الحقوق محفوظة &copy; {currentYear} متجر العمولة. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <Link href="/contact" className="hover:text-white transition-colors text-blue-300 font-medium">
                راسلنا لأي ملاحظة
              </Link>
              <span>•</span>
              <a href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</a>
              <span>•</span>
              <a href="/terms" className="hover:text-white transition-colors">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 