'use client';

import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-heading">اتصل بنا</h1>
            <p className="text-xl text-gray-600 text-body">
              نحن هنا لمساعدتك في أي استفسار أو طلب
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-subheading">معلومات التواصل</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">الهاتف</h3>
                    <p className="text-gray-600">+966 50 123 4567</p>
                    <p className="text-gray-600">+966 11 234 5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Mail className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">البريد الإلكتروني</h3>
                    <p className="text-gray-600">info@commission-store.com</p>
                    <p className="text-gray-600">support@commission-store.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <MapPin className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">العنوان</h3>
                    <p className="text-gray-600">
                      شارع الملك فهد<br />
                      الرياض، المملكة العربية السعودية<br />
                      الرمز البريدي: 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">تابعنا على وسائل التواصل الاجتماعي</h3>
                <div className="flex flex-wrap gap-4">
                  {/* Facebook */}
                  <a 
                    href="#" 
                    className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    title="فيسبوك"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="w-7 h-7" />
                  </a>

                  {/* Instagram */}
                  <a 
                    href="#" 
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-4 rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg"
                    title="انستقرام"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="w-7 h-7" />
                  </a>

                  {/* X (Twitter) */}
                  <a 
                    href="#" 
                    className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    title="إكس (تويتر)"
                  >
                    <FontAwesomeIcon icon={faXTwitter} className="w-7 h-7" />
                  </a>

                  {/* TikTok */}
                  <a 
                    href="#" 
                    className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    title="تيك توك"
                  >
                    <FontAwesomeIcon icon={faTiktok} className="w-7 h-7" />
                  </a>

                  {/* YouTube */}
                  <a 
                    href="#" 
                    className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    title="يوتيوب"
                  >
                    <FontAwesomeIcon icon={faYoutube} className="w-7 h-7" />
                  </a>
                </div>
              </div>

              {/* Commission Store Section */}
              <div className="pt-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-3">احصل على متجر العمولة الخاص بك</h3>
                  <p className="text-blue-100 mb-4">
                    انضم إلى شبكة التجار الناجحين واحصل على متجر عمولة مخصص لك
                  </p>
                  <a 
                    href="https://abrajsa.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    طلب متجر العمولة
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">أرسل لنا رسالة</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    الموضوع
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="general">استفسار عام</option>
                    <option value="product">استفسار عن منتج</option>
                    <option value="partnership">شراكة تجارية</option>
                    <option value="support">دعم فني</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اكتب رسالتك هنا..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <Send size={20} />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 