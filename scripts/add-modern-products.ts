import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modernProducts = [
  // إلكترونيات حديثة
  {
    name: "iPhone 15 Pro Max - Titanium",
    description: "أحدث هاتف آبل مع هيكل التيتانيوم، كاميرا 48 ميجابكسل، معالج A17 Pro، شاشة Super Retina XDR 6.7 بوصة",
    price: 6999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/iphone15promax",
    features: ["هيكل التيتانيوم", "كاميرا 48 ميجابكسل", "معالج A17 Pro", "شاشة 6.7 بوصة", "مقاومة للماء"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "MacBook Pro M3 Max 16-inch",
    description: "لابتوب احترافي مع معالج M3 Max، شاشة Liquid Retina XDR 16.2 بوصة، بطارية تدوم حتى 22 ساعة",
    price: 12999,
    originalPrice: 14999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/macbookprom3",
    features: ["معالج M3 Max", "شاشة 16.2 بوصة", "بطارية 22 ساعة", "أداء احترافي", "تصميم أنيق"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "سماعات لاسلكية فائقة الجودة مع أفضل تقنية إلغاء ضوضاء في العالم، بطارية تدوم 30 ساعة",
    price: 1399,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/sonywh1000xm5",
    features: ["أفضل إلغاء ضوضاء", "بطارية 30 ساعة", "جودة صوت عالية", "شحن سريع", "راحة طويلة"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "هاتف سامسونج الأحدث مع قلم S Pen، كاميرا 200 ميجابكسل، شاشة Dynamic AMOLED 2X 6.8 بوصة",
    price: 5999,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/galaxys24ultra",
    features: ["قلم S Pen", "كاميرا 200 ميجابكسل", "شاشة 6.8 بوصة", "معالج Snapdragon 8 Gen 3", "بطارية 5000mAh"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "Apple Watch Series 9 GPS",
    description: "ساعة ذكية متطورة مع شاشة Retina دائماً مضاءة، تتبع صحي متقدم، مقاومة للماء حتى 50 متر",
    price: 1999,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/applewatch9",
    features: ["شاشة Retina", "تتبع صحي", "مقاومة للماء", "GPS مدمج", "بطارية 18 ساعة"],
    categoryName: "الإلكترونيات"
  },

  // منتجات الجمال والعناية الحديثة
  {
    name: "Charlotte Tilbury Magic Cream",
    description: "كريم سحري للوجه من تشارلوت تيلبري، يرطب ويضيء البشرة، مناسب لجميع أنواع البشرة",
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/charlottetilbury",
    features: ["يرطب البشرة", "يضيء الوجه", "مناسب لجميع البشرة", "مكونات فاخرة", "نتائج فورية"],
    categoryName: "الجمال والعناية"
  },
  {
    name: "Dior Rouge Dior Lipstick",
    description: "أحمر شفاه فاخر من ديور، ألوان نابضة بالحياة، ملمس ناعم، يدوم طويلاً",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/diorrouge",
    features: ["ألوان نابضة", "ملمس ناعم", "يدوم طويلاً", "عبوة فاخرة", "مناسب للمناسبات"],
    categoryName: "الجمال والعناية"
  },
  {
    name: "Tom Ford Black Orchid Perfume",
    description: "عطر فاخر للرجال والنساء، رائحة غامقة ومثيرة مع نفحات من الفانيليا والشوكولاتة",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/tomfordblackorchid",
    features: ["رائحة فاخرة", "يدوم طويلاً", "مناسب للجنسين", "عبوة أنيقة", "رائحة غامقة"],
    categoryName: "الجمال والعناية"
  },

  // إكسسوارات فاخرة حديثة
  {
    name: "Rolex Submariner Date",
    description: "ساعة فاخرة كلاسيكية، مقاومة للماء حتى 300 متر، تصميم أنيق يناسب جميع المناسبات",
    price: 45999,
    originalPrice: 59999,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/rolexsubmariner",
    features: ["مقاومة للماء 300م", "تصميم كلاسيكي", "حركة أوتوماتيكية", "سوار فولاذي", "دقة عالية"],
    categoryName: "الإكسسوارات"
  },
  {
    name: "Hermès Birkin 30cm",
    description: "حقيبة فاخرة مصنوعة يدوياً، جلد عالي الجودة، تصميم كلاسيكي، رمز الفخامة",
    price: 89999,
    originalPrice: 109999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/hermesbirkin",
    features: ["مصنوعة يدوياً", "جلد عالي الجودة", "تصميم كلاسيكي", "رمز الفخامة", "حجم 30سم"],
    categoryName: "الإكسسوارات"
  },
  {
    name: "Ray-Ban Aviator Classic",
    description: "نظارة شمسية كلاسيكية، عدسة مستقطبة، إطار ذهبي أنيق، مناسبة لجميع الوجوه",
    price: 999,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/raybanaviator",
    features: ["عدسة مستقطبة", "إطار ذهبي", "حماية 100% من الأشعة", "تصميم كلاسيكي", "جودة عالية"],
    categoryName: "الإكسسوارات"
  },

  // منتجات المنزل والأثاث الحديثة
  {
    name: "Dyson V15 Detect Vacuum",
    description: "مكنسة كهربائية ذكية مع كشف الليزر للغبار، قوة شفط عالية، بطارية تدوم 60 دقيقة",
    price: 2999,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/dysonv15",
    features: ["كشف الليزر", "قوة شفط عالية", "بطارية 60 دقيقة", "تصفية HEPA", "لاسلكية"],
    categoryName: "المنزل والأثاث"
  },
  {
    name: "Nespresso Vertuo Coffee Machine",
    description: "ماكينة قهوة متطورة، تحضير سريع، كبسولات متنوعة، تصميم أنيق",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/nespressovertuo",
    features: ["تحضير سريع", "كبسولات متنوعة", "تصميم أنيق", "سهولة الاستخدام", "جودة عالية"],
    categoryName: "المنزل والأثاث"
  },
  {
    name: "Samsung 55-inch QLED TV",
    description: "تلفزيون ذكي 55 بوصة، تقنية QLED، دقة 4K، صوت Dolby Atmos، تطبيقات ذكية",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/samsungqled55",
    features: ["تقنية QLED", "دقة 4K", "صوت Dolby Atmos", "تطبيقات ذكية", "تصميم رفيع"],
    categoryName: "المنزل والأثاث"
  },

  // منتجات الرياضة واللياقة الحديثة
  {
    name: "Peloton Bike+",
    description: "دراجة رياضية ذكية مع شاشة 22 بوصة، دروس مباشرة، تتبع الأداء، مناسبة للمنزل",
    price: 8999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/pelotonbike",
    features: ["شاشة 22 بوصة", "دروس مباشرة", "تتبع الأداء", "مناسبة للمنزل", "مجتمع رياضي"],
    categoryName: "الرياضة واللياقة"
  },
  {
    name: "Apple AirPods Pro 2nd Gen",
    description: "سماعات لاسلكية مع إلغاء ضوضاء محسن، شحن MagSafe، مقاومة للماء، صوت عالي الجودة",
    price: 1099,
    originalPrice: 1399,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/airpodspro2",
    features: ["إلغاء ضوضاء محسن", "شحن MagSafe", "مقاومة للماء", "صوت عالي الجودة", "بطارية 6 ساعات"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "Nike Air Max 270",
    description: "حذاء رياضي مريح مع تقنية Air Max، تصميم عصري، مناسب للرياضة واليومية",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/nikeairmax270",
    features: ["تقنية Air Max", "تصميم عصري", "مريح للقدم", "مناسب للرياضة", "ألوان متنوعة"],
    categoryName: "الرياضة واللياقة"
  },

  // منتجات الصحة والعافية الحديثة
  {
    name: "Theragun Elite Massage Gun",
    description: "مسدس تدليك احترافي، 4 رؤوس مختلفة، سرعات متعددة، بطارية تدوم 2.5 ساعة",
    price: 1999,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/theragunelite",
    features: ["4 رؤوس مختلفة", "سرعات متعددة", "بطارية 2.5 ساعة", "تخفيف الألم", "استعادة العضلات"],
    categoryName: "الصحة والعافية"
  },
  {
    name: "Fitbit Charge 6",
    description: "ساعة ذكية للياقة البدنية، تتبع النوم والنشاط، مقاومة للماء، بطارية تدوم 7 أيام",
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/fitbitcharge6",
    features: ["تتبع النوم", "مقاومة للماء", "بطارية 7 أيام", "مناسبة للرياضة", "تطبيق ذكي"],
    categoryName: "الصحة والعافية"
  },

  // منتجات الألعاب والترفيه الحديثة
  {
    name: "PlayStation 5 Console",
    description: "جهاز ألعاب الجيل الجديد، أداء فائق، ألعاب حصرية، تحكم DualSense متطور",
    price: 2999,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/playstation5",
    features: ["أداء فائق", "ألعاب حصرية", "تحكم DualSense", "دقة 4K", "SSD سريع"],
    categoryName: "الألعاب والترفيه"
  },
  {
    name: "DJI Mini 4 Pro Drone",
    description: "طائرة بدون طيار صغيرة، كاميرا 4K، استقرار ذكي، طيران آمن، مناسبة للمبتدئين",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/djimini4pro",
    features: ["كاميرا 4K", "استقرار ذكي", "طيران آمن", "مناسبة للمبتدئين", "بطارية 34 دقيقة"],
    categoryName: "الألعاب والترفيه"
  },

  // منتجات الكتب والتعليم الحديثة
  {
    name: "Kindle Paperwhite 11th Gen",
    description: "قارئ إلكتروني متطور، شاشة 6.8 بوصة، إضاءة مدمجة، مقاوم للماء، بطارية تدوم أسابيع",
    price: 799,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop&crop=center",
    externalLink: "https://amzn.to/kindlepaperwhite11",
    features: ["شاشة 6.8 بوصة", "إضاءة مدمجة", "مقاوم للماء", "بطارية أسابيع", "مكتبة ضخمة"],
    categoryName: "الكتب والتعليم"
  }
];

async function main() {
  console.log('🌱 بدء إضافة المنتجات الحديثة...');

  try {
    // الحصول على المستخدم الأول (أو إنشاء واحد إذا لم يكن موجود)
    let user = await prisma.user.findFirst();
    if (!user) {
      console.log('إنشاء مستخدم تجريبي...');
      user = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJhHm2e', // admin123
          name: 'مدير النظام',
          role: 'ADMIN'
        }
      });
    }

    // الحصول على الفئات أو إنشاؤها
    const categories = await Promise.all(
      ['الإلكترونيات', 'الجمال والعناية', 'الإكسسوارات', 'المنزل والأثاث', 'الرياضة واللياقة', 'الكتب والتعليم', 'الألعاب والترفيه', 'الصحة والعافية'].map(async (categoryName) => {
        let category = await prisma.category.findFirst({
          where: { name: categoryName }
        });
        
        if (!category) {
          category = await prisma.category.create({
            data: {
              name: categoryName,
              slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
              description: `فئة ${categoryName}`,
              isActive: true
            }
          });
        }
        
        return category;
      })
    );

    // إنشاء خريطة للفئات
    const categoryMap = new Map(categories.map(cat => [cat.name, cat.id]));

    // إضافة المنتجات
    for (const productData of modernProducts) {
      const categoryId = categoryMap.get(productData.categoryName);
      if (!categoryId) {
        console.error(`فئة غير موجودة: ${productData.categoryName}`);
        continue;
      }

      // إنشاء slug فريد
      const baseSlug = productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      let slug = baseSlug;
      let counter = 1;
      
      // التحقق من وجود slug مشابه
      while (await prisma.product.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      await prisma.product.create({
        data: {
          name: productData.name,
          slug: slug,
          description: productData.description,
          price: productData.price,
          image: productData.image,
          externalLink: productData.externalLink,
          features: productData.features,
          isActive: true,
          categoryId: categoryId,
          createdById: user.id
        }
      });

      console.log(`✅ تم إضافة: ${productData.name}`);
    }

    console.log('🎉 تم إضافة جميع المنتجات الحديثة بنجاح!');
    console.log(`📊 إجمالي المنتجات المضافة: ${modernProducts.length}`);

  } catch (error) {
    console.error('❌ خطأ في إضافة المنتجات:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
