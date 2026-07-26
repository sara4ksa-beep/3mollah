import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create users with different roles
  const hashedPassword = await hashPassword('admin123');
  const adminHashedPassword = await hashPassword('Hash1233*');
  
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@example.com' },
    update: {},
    create: {
      email: 'superadmin@example.com',
      password: hashedPassword,
      name: 'مدير النظام العام',
      role: 'SUPER_ADMIN'
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: 'hashbool@gmail.com' },
    update: { password: adminHashedPassword },
    create: {
      email: 'hashbool@gmail.com',
      password: adminHashedPassword,
      name: 'مدير النظام',
      role: 'ADMIN'
    }
  });

  const editor = await prisma.user.upsert({
    where: { email: 'editor@example.com' },
    update: {},
    create: {
      email: 'editor@example.com',
      password: hashedPassword,
      name: 'محرر المحتوى',
      role: 'EDITOR'
    }
  });

  console.log('✅ Users created:', superAdmin.email, admin.email, editor.email);

  // Create categories
  const categories = [
    {
      name: 'الهواتف الذكية',
      slug: 'smartphones',
      description: 'أحدث الهواتف الذكية من أفضل العلامات التجارية',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      sortOrder: 1
    },
    {
      name: 'الإكسسوارات',
      slug: 'accessories',
      description: 'إكسسوارات متنوعة للأجهزة الإلكترونية',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      sortOrder: 2
    },
    {
      name: 'الأجهزة المحمولة',
      slug: 'laptops',
      description: 'أجهزة لابتوب وأجهزة محمولة للأعمال والاستخدام الشخصي',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      sortOrder: 3
    },
    {
      name: 'الكاميرات',
      slug: 'cameras',
      description: 'كاميرات رقمية احترافية وشبه احترافية',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
      sortOrder: 4
    }
  ];

  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: categoryData
    });
    console.log('✅ Category created:', category.name);
  }

  // Get categories for product assignment
  const smartphonesCategory = await prisma.category.findUnique({ where: { slug: 'smartphones' } });
  const accessoriesCategory = await prisma.category.findUnique({ where: { slug: 'accessories' } });
  const laptopsCategory = await prisma.category.findUnique({ where: { slug: 'laptops' } });
  const camerasCategory = await prisma.category.findUnique({ where: { slug: 'cameras' } });

  // Create sample products with categories
  const sampleProducts = [
    {
      name: 'هاتف ذكي متطور',
      slug: 'smartphone-advanced',
      description: 'هاتف ذكي متطور مع أحدث التقنيات والكاميرا المتطورة',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product1',
      categoryId: smartphonesCategory?.id,
      createdById: admin.id,
      features: [
        'شاشة عالية الدقة 6.7 بوصة',
        'كاميرا خلفية ثلاثية 48 ميجابكسل',
        'بطارية تدوم طوال اليوم',
        'معالج سريع وحديث',
        'ذاكرة تخزين 128 جيجابايت',
        'دعم شبكات 5G',
        'حماية ضد الماء والغبار',
        'شحن لاسلكي سريع'
      ]
    },
    {
      name: 'سماعات لاسلكية عالية الجودة',
      slug: 'wireless-headphones',
      description: 'سماعات لاسلكية عالية الجودة مع إلغاء ضوضاء متقدم',
      price: 299,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product2',
      categoryId: accessoriesCategory?.id,
      createdById: editor.id,
      features: [
        'جودة صوت استثنائية',
        'إلغاء ضوضاء نشط',
        'بطارية تدوم 30 ساعة',
        'شحن سريع خلال 10 دقائق',
        'مقاومة للماء والعرق',
        'تحكم باللمس',
        'اتصال بلوتوث 5.0',
        'حقيبة شحن محمولة'
      ]
    },
    {
      name: 'ساعة ذكية رياضية',
      slug: 'smart-watch-sport',
      description: 'ساعة ذكية رياضية مع تتبع النشاط البدني',
      price: 599,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product3',
      categoryId: accessoriesCategory?.id,
      createdById: editor.id,
      features: [
        'مراقبة معدل ضربات القلب',
        'تتبع النشاط البدني',
        'شاشة OLED ملونة',
        'مقاومة للماء حتى 50 متر',
        'بطارية تدوم 7 أيام',
        'إشعارات الهاتف',
        'تطبيقات رياضية متعددة',
        'شحن لاسلكي'
      ]
    },
    {
      name: 'لابتوب للأعمال',
      slug: 'business-laptop',
      description: 'لابتوب احترافي للأعمال مع أداء عالي',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product4',
      categoryId: laptopsCategory?.id,
      createdById: admin.id,
      features: [
        'معالج Intel Core i7 الجيل 12',
        'ذاكرة RAM 16 جيجابايت',
        'قرص صلب SSD 512 جيجابايت',
        'شاشة 15.6 بوصة عالية الدقة',
        'بطارية تدوم 8 ساعات',
        'نظام تشغيل Windows 11',
        'منافذ USB متعددة',
        'اتصال WiFi 6'
      ]
    },
    {
      name: 'كاميرا رقمية احترافية',
      slug: 'professional-camera',
      description: 'كاميرا رقمية احترافية للتصوير الفوتوغرافي',
      price: 899,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product5',
      categoryId: camerasCategory?.id,
      createdById: editor.id,
      features: [
        'دقة 24 ميجابكسل',
        'عدسة قابلة للتبديل',
        'تسجيل فيديو 4K',
        'شاشة LCD قابلة للطي',
        'فلاش مدمج',
        'تثبيت الصورة البصري',
        'بطارية قابلة للشحن',
        'حقيبة حماية مجانية'
      ]
    },
    {
      name: 'طابعة ليزر سريعة',
      slug: 'laser-printer',
      description: 'طابعة ليزر سريعة للاستخدام المكتبي',
      price: 399,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product6',
      categoryId: accessoriesCategory?.id,
      createdById: editor.id,
      features: [
        'سرعة طباعة 30 صفحة في الدقيقة',
        'دقة طباعة 1200 نقطة في البوصة',
        'طباعة لاسلكية',
        'شبكة WiFi مدمجة',
        'شاشة LCD ملونة',
        'حاوية ورق 250 صفحة',
        'طباعة من الهاتف',
        'ضمان سنة كاملة'
      ]
    },
    {
      name: 'مكبر صوت بلوتوث',
      slug: 'bluetooth-speaker',
      description: 'مكبر صوت بلوتوث محمول مع صوت عالي الجودة',
      price: 199,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product7',
      categoryId: accessoriesCategory?.id,
      createdById: editor.id,
      features: [
        'قوة صوت 40 واط',
        'جودة صوت عالية',
        'اتصال بلوتوث 5.0',
        'بطارية تدوم 20 ساعة',
        'مقاومة للماء',
        'تحكم باللمس',
        'إضاءة LED متعددة الألوان',
        'حقيبة حمل مجانية'
      ]
    },
    {
      name: 'جهاز تابلت للرسم',
      slug: 'drawing-tablet',
      description: 'جهاز تابلت احترافي للرسم الرقمي',
      price: 799,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product8',
      categoryId: accessoriesCategory?.id,
      createdById: editor.id,
      features: [
        'شاشة 10.1 بوصة عالية الدقة',
        'قلم رقمي دقيق',
        'ضغط حساس 4096 مستوى',
        'بطارية تدوم 12 ساعة',
        'نظام تشغيل Android',
        'تطبيقات رسم متعددة',
        'تخزين 64 جيجابايت',
        'شحن سريع'
      ]
    },
    {
      name: 'هاتف ذكي اقتصادي',
      slug: 'budget-smartphone',
      description: 'هاتف ذكي اقتصادي مع أداء ممتاز',
      price: 599,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product9',
      categoryId: smartphonesCategory?.id,
      createdById: editor.id,
      features: [
        'شاشة 6.1 بوصة عالية الدقة',
        'كاميرا خلفية مزدوجة 48 ميجابكسل',
        'بطارية 4000 مللي أمبير',
        'معالج Snapdragon 680',
        'ذاكرة تخزين 128 جيجابايت',
        'دعم شبكات 4G',
        'شحن سريع 18 واط',
        'نظام تشغيل Android 12'
      ]
    },
    {
      name: 'لابتوب للطلاب',
      slug: 'student-laptop',
      description: 'لابتوب مثالي للطلاب مع أداء متوازن',
      price: 899,
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product10',
      categoryId: laptopsCategory?.id,
      createdById: editor.id,
      features: [
        'معالج Intel Core i5 الجيل 11',
        'ذاكرة RAM 8 جيجابايت',
        'قرص صلب SSD 256 جيجابايت',
        'شاشة 14 بوصة عالية الدقة',
        'بطارية تدوم 10 ساعات',
        'نظام تشغيل Windows 11',
        'وزن خفيف 1.4 كجم',
        'ضمان سنة كاملة'
      ]
    },
    {
      name: 'كاميرا أكشن رياضية',
      slug: 'action-camera',
      description: 'كاميرا أكشن رياضية مقاومة للماء والصدمات',
      price: 349,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product11',
      categoryId: camerasCategory?.id,
      createdById: editor.id,
      features: [
        'تسجيل فيديو 4K 30fps',
        'مقاومة للماء حتى 30 متر',
        'مقاومة للصدمات',
        'شاشة LCD 2 بوصة',
        'بطارية قابلة للشحن',
        'WiFi مدمج',
        'عدسة واسعة الزاوية',
        'حامل ثلاثي مجاني'
      ]
    },
    {
      name: 'سماعات أذن رياضية',
      slug: 'sport-earbuds',
      description: 'سماعات أذن رياضية مقاومة للماء والعرق',
      price: 149,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop',
      externalLink: 'https://example.com/product12',
      categoryId: accessoriesCategory?.id,
      createdById: editor.id,
      features: [
        'مقاومة للماء والعرق IPX7',
        'بطارية تدوم 8 ساعات',
        'شحن سريع خلال 15 دقيقة',
        'اتصال بلوتوث 5.0',
        'تحكم باللمس',
        'حقيبة شحن محمولة',
        'أحجام مختلفة للأذن',
        'ضمان سنة كاملة'
      ]
    }
  ];

  for (const productData of sampleProducts) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData
    });
    console.log('✅ Product created:', product.name);
  }

  // Create site settings
  const siteSettings = [
    { key: 'site_title', value: 'متجر العمولة - تسوق بذكاء', type: 'string' },
    { key: 'site_description', value: 'موقع البيع بالعمولة - نروج منتجات التجار مقابل عمولة من كل عملية بيع', type: 'string' },
    { key: 'site_keywords', value: 'متجر, عمولة, تسوق, إلكترونيات, هواتف, إكسسوارات', type: 'string' },
    { key: 'commission_rate', value: '10', type: 'number' },
    { key: 'contact_email', value: 'info@commission-store.com', type: 'string' },
    { key: 'contact_phone', value: '+966 50 123 4567', type: 'string' }
  ];

  for (const setting of siteSettings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting
    });
  }
  console.log('✅ Site settings created');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 