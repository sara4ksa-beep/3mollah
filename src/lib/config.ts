// إعدادات الموقع حسب النطاق
export const getSiteConfig = (hostname?: string) => {
  const host = hostname || 'mtekt.com';
  
  // إعدادات افتراضية
  const defaultConfig = {
    name: 'متجر العمولة',
    description: 'موقع البيع بالعمولة - نروج منتجات التجار مقابل عمولة من كل عملية بيع',
    url: 'https://mtekt.com',
    logo: '/logo.png',
    theme: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
    }
  };

  // إعدادات خاصة بـ subdomain amoolah
  if (host.includes('amoolah')) {
    return {
      ...defaultConfig,
      name: 'عمولة - متجر العمولة',
      description: 'موقع عمولة - نروج منتجات التجار مقابل عمولة من كل عملية بيع',
      url: 'https://amoolah.mtekt.com',
      logo: '/amoolah-logo.png',
      theme: {
        primary: '#10B981', // أخضر
        secondary: '#059669',
      }
    };
  }

  return defaultConfig;
};

// إعدادات البيئة
export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://mtekt.com',
};

// التحقق من صحة الإعدادات
export const validateEnv = () => {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}; 