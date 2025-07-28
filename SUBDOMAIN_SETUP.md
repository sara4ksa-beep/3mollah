# 🚀 دليل إعداد Subdomain: 3molah.mtekt.com

## 📋 المتطلبات الأساسية

1. **نطاق رئيسي**: `mtekt.com` مسجل ومُدار
2. **مزود DNS**: مثل Namecheap, GoDaddy, Cloudflare
3. **حساب Vercel**: لنشر التطبيق

## 🌐 الطريقة الأولى: عبر Vercel Dashboard (الأسهل)

### خطوات إعداد Subdomain:

#### 1. إضافة Domain في Vercel:
```bash
# اذهب إلى Vercel Dashboard
https://vercel.com/dashboard

# اختر مشروعك
# Settings → Domains → Add Domain
# اكتب: 3molah.mtekt.com
```

#### 2. إعداد DNS Records:
في مزود النطاق الخاص بك، أضف:

```
Type: CNAME
Name: 3molah
Value: cname.vercel-dns.com
TTL: 3600 (أو Auto)
```

#### 3. انتظار التفعيل:
- قد يستغرق الأمر 5-15 دقيقة
- تحقق من حالة النطاق في Vercel Dashboard

## 🔧 الطريقة الثانية: إعداد DNS يدوياً

### إعدادات DNS المطلوبة:

#### في Namecheap:
1. اذهب إلى **Domain List** → **Manage**
2. **Advanced DNS** → **Add New Record**
3. أضف:
   ```
   Type: CNAME Record
   Host: 3molah
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

#### في GoDaddy:
1. اذهب إلى **DNS Management**
2. **Add Record**
3. أضف:
   ```
   Type: CNAME
   Name: 3molah
   Value: cname.vercel-dns.com
   TTL: 1 Hour
   ```

#### في Cloudflare:
1. اذهب إلى **DNS** → **Records**
2. **Add Record**
3. أضف:
   ```
   Type: CNAME
   Name: 3molah
   Target: cname.vercel-dns.com
   Proxy status: DNS only (Gray cloud)
   ```

## ⚙️ إعداد Environment Variables

### في Vercel Dashboard:
```env
# النطاق الرئيسي
NEXT_PUBLIC_SITE_URL=https://mtekt.com

# للنطاق الفرعي (اختياري)
NEXT_PUBLIC_SUBDOMAIN_URL=https://3molah.mtekt.com

# قاعدة البيانات
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary (اختياري)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🎨 تخصيص Subdomain

### إعدادات خاصة بـ 3molah.mtekt.com:

```typescript
// في src/lib/config.ts
if (host.includes('3molah')) {
  return {
    name: 'عمولة - متجر العمولة',
    description: 'موقع عمولة - نروج منتجات التجار مقابل عمولة من كل عملية بيع',
    url: 'https://3molah.mtekt.com',
    theme: {
      primary: '#10B981', // أخضر
      secondary: '#059669',
    }
  };
}
```

## 🔍 اختبار Subdomain

### 1. اختبار DNS:
```bash
# في Terminal
nslookup 3molah.mtekt.com
dig 3molah.mtekt.com
```

### 2. اختبار الاتصال:
```bash
# اختبار HTTP
curl -I https://3molah.mtekt.com

# اختبار HTTPS
curl -I https://3molah.mtekt.com
```

### 3. اختبار في المتصفح:
- افتح: `https://3molah.mtekt.com`
- تأكد من تحميل الصفحة بشكل صحيح
- تحقق من الشهادة الأمنية (SSL)

## 🛠 حل المشاكل الشائعة

### مشكلة: Subdomain لا يعمل
**الحل:**
1. تحقق من إعدادات DNS
2. انتظر 15-30 دقيقة لانتشار DNS
3. تحقق من حالة النطاق في Vercel

### مشكلة: خطأ SSL
**الحل:**
1. تأكد من أن النطاق مضاف في Vercel
2. انتظر إصدار الشهادة (قد يستغرق ساعة)
3. تحقق من إعدادات DNS

### مشكلة: إعادة توجيه غير صحيحة
**الحل:**
1. تحقق من middleware.ts
2. تأكد من إعدادات النطاق في config.ts
3. امسح cache المتصفح

## 📱 استخدام Subdomain في التطبيق

### في المكونات:
```typescript
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default function Header() {
  const { config, loading } = useSiteConfig();
  
  if (loading) return <div>جاري التحميل...</div>;
  
  return (
    <header style={{ backgroundColor: config.theme.primary }}>
      <h1>{config.name}</h1>
    </header>
  );
}
```

### في API Routes:
```typescript
import { getSiteConfig } from '@/lib/config';

export async function GET(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const config = getSiteConfig(hostname);
  
  return NextResponse.json({ config });
}
```

## 🎯 نصائح مهمة

1. **DNS Propagation**: قد يستغرق 24-48 ساعة لانتشار DNS عالمياً
2. **SSL Certificate**: Vercel يصدر شهادة SSL تلقائياً
3. **Caching**: استخدم CDN لتحسين الأداء
4. **Monitoring**: راقب أداء النطاق الفرعي
5. **Backup**: احتفظ بنسخة احتياطية من إعدادات DNS

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من سجلات Vercel
2. راجع إعدادات DNS
3. تأكد من صحة Environment Variables
4. اتصل بدعم مزود النطاق إذا لزم الأمر

---

**ملاحظة**: هذا الدليل مخصص لـ `3molah.mtekt.com` ويمكن تطبيقه على أي subdomain آخر. 