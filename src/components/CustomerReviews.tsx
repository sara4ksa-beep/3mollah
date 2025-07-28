'use client';

import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  gender: 'male' | 'female';
}

const reviews: Review[] = [
  {
    id: 1,
    name: "أحمد محمد",
    rating: 5,
    comment: "متجر رائع جداً! المنتجات عالية الجودة والأسعار منافسة. التوصيل سريع والخدمة ممتازة. أنصح الجميع بالتسوق من هنا.",
    date: "منذ أسبوع",
    gender: "male"
  },
  {
    id: 2,
    name: "فاطمة علي",
    rating: 5,
    comment: "تجربة تسوق ممتازة! وجدت كل ما أحتاجه بأسعار معقولة. فريق العمل متعاون جداً والمنتجات أصلية.",
    date: "منذ 3 أيام",
    gender: "female"
  },
  {
    id: 3,
    name: "محمد عبدالله",
    rating: 4,
    comment: "متجر موثوق وجدير بالثقة. المنتجات مطابقة للوصف والجودة عالية. سأعود للتسوق مرة أخرى.",
    date: "منذ أسبوعين",
    gender: "male"
  },
  {
    id: 4,
    name: "سارة أحمد",
    rating: 5,
    comment: "أفضل متجر للتسوق الإلكتروني! الأسعار منافسة والمنتجات أصلية. التوصيل سريع والخدمة ممتازة.",
    date: "منذ 5 أيام",
    gender: "female"
  },
  {
    id: 5,
    name: "علي حسن",
    rating: 5,
    comment: "تجربة رائعة! المنتجات عالية الجودة والأسعار معقولة. أنصح جميع الأصدقاء بالتسوق من هذا المتجر.",
    date: "منذ أسبوع",
    gender: "male"
  },
  {
    id: 6,
    name: "نورا سعد",
    rating: 4,
    comment: "متجر ممتاز وموثوق. وجدت منتجات رائعة بأسعار مناسبة. التوصيل سريع والخدمة جيدة.",
    date: "منذ 4 أيام",
    gender: "female"
  }
];

export default function CustomerReviews() {
  const swiperRef = useRef<any>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 bg-[#2c5aa0] rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4 text-heading !text-white">
            آراء عملائنا الكرام
          </h2>
          <p className="text-white text-lg text-body max-w-2xl mx-auto !text-white">
            اكتشف ما يقوله عملاؤنا عن تجربتهم مع متجر العمولة
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          {/* Custom Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            aria-label="السابق"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            aria-label="التالي"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            className="reviews-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-gray-50 rounded-lg p-6 h-full hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="w-8 h-8 text-blue-600 opacity-50" />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={`${
                            index < review.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Comment */}
                  <p className="text-gray-700 text-body leading-relaxed mb-4 flex-grow">
                    "{review.comment}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      {/* Gender Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        review.gender === 'male' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-pink-100 text-pink-600'
                      }`}>
                        {review.gender === 'male' ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-subheading">
                          {review.name}
                        </h4>
                        <p className="text-gray-500 text-sm text-caption">
                          {review.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="swiper-pagination mt-8 flex justify-center"></div>
        </div>


      </div>

      <style jsx global>{`
        .reviews-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .reviews-swiper .swiper-pagination-bullet-active {
          background-color: #2563eb;
          transform: scale(1.2);
        }
        
        .reviews-swiper .swiper-slide {
          height: auto;
        }
        
        /* Force white text only for the header section */
        .bg-\\[\\#2c5aa0\\] .text-heading {
          color: white !important;
        }
        
        .bg-\\[\\#2c5aa0\\] .text-body {
          color: white !important;
        }
      `}</style>
    </section>
  );
} 