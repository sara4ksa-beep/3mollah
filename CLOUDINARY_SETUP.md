# Cloudinary Setup Guide

## 📸 إعداد Cloudinary للموقع

### 🔧 المتطلبات الأساسية
- حساب Cloudinary
- Cloud Name: `dulvp7ipq`
- API Key: `512317196777693`
- API Secret: `_KAAVUQEKlf1KuSjGogInY8PqIY`

### 📦 المكتبات المثبتة
```bash
npm install cloudinary next-cloudinary
```

### 🗂️ الملفات المنشأة

#### 1. `src/lib/cloudinary.ts`
- إعدادات Cloudinary الأساسية
- دوال مساعدة لرفع وحذف الصور
- دالة لإنشاء روابط محسنة للصور

#### 2. `src/components/CloudinaryImage.tsx`
- مكونات محسنة للصور
- `CloudinaryImage`: المكون الأساسي
- `ProductImage`: لصور المنتجات
- `HeroImage`: لصور البانر
- `ThumbnailImage`: للصور المصغرة

#### 3. `src/components/ImageUpload.tsx`
- مكون رفع الصور
- دعم السحب والإفلات
- رفع صور متعددة
- معاينة فورية

### 🚀 كيفية الاستخدام

#### رفع صورة واحدة:
```tsx
import ImageUpload from '@/components/ImageUpload';

<ImageUpload
  onUpload={(publicId) => console.log(publicId)}
  onRemove={() => console.log('removed')}
  currentImage="existing-image-id"
/>
```

#### رفع صور متعددة:
```tsx
<ImageUpload
  onUpload={(publicId) => console.log(publicId)}
  multiple={true}
  maxFiles={5}
/>
```

#### عرض صورة محسنة:
```tsx
import { ProductImage } from '@/components/CloudinaryImage';

<ProductImage
  src="cloudinary-public-id"
  alt="Product description"
  className="custom-class"
/>
```

### 🎯 المميزات

#### تحسين الصور:
- تحويل تلقائي لصيغة WebP
- تغيير الحجم حسب الطلب
- ضغط ذكي للصور
- Lazy Loading

#### تجربة المستخدم:
- معاينة فورية
- سحب وإفلات
- معالجة الأخطاء
- مؤشرات التحميل

#### الأداء:
- تحميل سريع
- استهلاك أقل للبيانات
- تحسين SEO
- تجربة مستخدم محسنة

### 🔗 روابط مفيدة
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Cloudinary Integration](https://next-cloudinary.spacejelly.dev/)
- [Image Optimization Guide](https://cloudinary.com/documentation/image_optimization)

### 🧪 صفحة الاختبار
يمكنك اختبار Cloudinary من خلال زيارة:
```
http://localhost:3000/test-cloudinary
```

### 📝 ملاحظات مهمة
1. تأكد من إعداد متغيرات البيئة
2. استخدم Public IDs بدلاً من URLs الكاملة
3. اختر الحجم المناسب لكل نوع صورة
4. استخدم WebP للصور الحديثة
5. اضبط جودة الصور حسب الحاجة 