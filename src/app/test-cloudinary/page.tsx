'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import { ProductImage, HeroImage, ThumbnailImage } from '@/components/CloudinaryImage';

export default function TestCloudinaryPage() {
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [multipleImages, setMultipleImages] = useState<string[]>([]);

  const handleSingleUpload = (publicId: string) => {
    setUploadedImage(publicId);
  };

  const handleMultipleUpload = (publicId: string) => {
    setMultipleImages(prev => [...prev, publicId]);
  };

  const removeSingleImage = () => {
    setUploadedImage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-heading">
        اختبار Cloudinary
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Single Image Upload */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-subheading">رفع صورة واحدة</h2>
          <ImageUpload
            onUpload={handleSingleUpload}
            onRemove={removeSingleImage}
            currentImage={uploadedImage}
          />
          
          {uploadedImage && (
            <div className="mt-4">
              <h3 className="font-medium mb-2 text-body">الصورة المرفوعة:</h3>
              <ProductImage
                src={uploadedImage}
                alt="Uploaded product"
                className="w-full h-64"
              />
            </div>
          )}
        </div>

        {/* Multiple Images Upload */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-subheading">رفع صور متعددة</h2>
          <ImageUpload
            onUpload={handleMultipleUpload}
            multiple={true}
            maxFiles={4}
          />
          
          {multipleImages.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2 text-body">الصور المرفوعة:</h3>
              <div className="grid grid-cols-2 gap-2">
                {multipleImages.map((imageId, index) => (
                  <ThumbnailImage
                    key={index}
                    src={imageId}
                    alt={`Uploaded ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Optimization Examples */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-subheading">أمثلة تحسين الصور</h2>
        
        {uploadedImage && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2 text-body">صورة المنتج (300x300)</h3>
              <ProductImage
                src={uploadedImage}
                alt="Product example"
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-body">صورة البانر (1200x600)</h3>
              <HeroImage
                src={uploadedImage}
                alt="Hero example"
                className="h-48"
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-body">صورة مصغرة (100x100)</h3>
              <ThumbnailImage
                src={uploadedImage}
                alt="Thumbnail example"
              />
            </div>
          </div>
        )}
      </div>

      {/* Cloudinary Features Info */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-subheading">مميزات Cloudinary</h2>
        <ul className="space-y-2 text-body">
          <li>✅ تحسين تلقائي للصور</li>
          <li>✅ تحويل تلقائي لصيغة WebP</li>
          <li>✅ تغيير الحجم حسب الطلب</li>
          <li>✅ Lazy Loading</li>
          <li>✅ معالجة الأخطاء</li>
          <li>✅ دعم السحب والإفلات</li>
          <li>✅ معاينة فورية</li>
          <li>✅ حذف الصور</li>
        </ul>
      </div>
    </div>
  );
} 