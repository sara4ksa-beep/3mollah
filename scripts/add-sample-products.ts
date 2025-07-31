import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: "سماعات AirPods Pro اللاسلكية",
    description: "سماعات لاسلكية عالية الجودة مع ميزة إلغاء الضوضاء النشط، مقاومة للماء والعرق، بطارية تدوم حتى 6 ساعات",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example1",
    features: ["إلغاء الضوضاء النشط", "مقاومة للماء", "بطارية 6 ساعات", "شحن لاسلكي"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "ساعة Apple Watch Series 9",
    description: "ساعة ذكية متطورة مع شاشة Retina دائماً مضاءة، تتبع صحي متقدم، مقاومة للماء حتى 50 متر",
    price: 1899,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example2",
    features: ["شاشة Retina", "تتبع صحي", "مقاومة للماء", "GPS مدمج"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "لابتوب MacBook Air M2",
    description: "لابتوب خفيف وسريع مع معالج M2، شاشة Retina 13.6 بوصة، بطارية تدوم حتى 18 ساعة",
    price: 4999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example3",
    features: ["معالج M2", "شاشة Retina", "بطارية 18 ساعة", "خفيف الوزن"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "كاميرا Canon EOS R6",
    description: "كاميرا احترافية مع مستشعر 20 ميجابكسل، تتبع العين المتقدم، تصوير فيديو 4K",
    price: 8999,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example4",
    features: ["20 ميجابكسل", "تتبع العين", "فيديو 4K", "مقاومة للطقس"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "عطر Tom Ford Black Orchid",
    description: "عطر فاخر للرجال والنساء، رائحة غامقة ومثيرة مع نفحات من الفانيليا والشوكولاتة",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example5",
    features: ["رائحة فاخرة", "يدوم طويلاً", "مناسب للجنسين", "عبوة أنيقة"],
    categoryName: "الجمال والعناية"
  },
  {
    name: "مجموعة أدوات تجميل MAC",
    description: "مجموعة شاملة من أدوات التجميل عالية الجودة، تشمل ظلال العيون وأحمر الشفاه والكونسيلر",
    price: 599,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example6",
    features: ["ألوان متنوعة", "جودة عالية", "مناسبة لجميع أنواع البشرة", "حقيبة أنيقة"],
    categoryName: "الجمال والعناية"
  },
  {
    name: "ساعة Rolex Submariner",
    description: "ساعة فاخرة كلاسيكية، مقاومة للماء حتى 300 متر، تصميم أنيق يناسب جميع المناسبات",
    price: 45999,
    originalPrice: 59999,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example7",
    features: ["مقاومة للماء 300م", "تصميم كلاسيكي", "حركة أوتوماتيكية", "سوار فولاذي"],
    categoryName: "الإكسسوارات"
  },
  {
    name: "حقيبة Louis Vuitton Neverfull",
    description: "حقيبة أنيقة وعملية، مصنوعة من الجلد عالي الجودة، مناسبة للعمل والسفر",
    price: 8999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example8",
    features: ["جلد عالي الجودة", "حجم كبير", "مقاومة للتمزق", "تصميم كلاسيكي"],
    categoryName: "الإكسسوارات"
  },
  {
    name: "نظارة Ray-Ban Aviator",
    description: "نظارة شمسية كلاسيكية، عدسات مستقطبة، إطار ذهبي أنيق، مناسبة لجميع الوجوه",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example9",
    features: ["عدسات مستقطبة", "إطار ذهبي", "حماية 100% من الأشعة فوق البنفسجية", "تصميم كلاسيكي"],
    categoryName: "الإكسسوارات"
  },
  {
    name: "عطر Chanel N°5",
    description: "عطر أسطوري للنساء، رائحة أنيقة ومتطورة، مناسب للمناسبات الخاصة واليومية",
    price: 1299,
    originalPrice: 1899,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example10",
    features: ["رائحة أسطورية", "يدوم طويلاً", "عبوة فاخرة", "مناسب للمناسبات"],
    categoryName: "الجمال والعناية"
  },
  {
    name: "هاتف iPhone 15 Pro Max",
    description: "أحدث هواتف آبل مع كاميرا متطورة، شاشة Super Retina XDR، معالج A17 Pro",
    price: 5999,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example11",
    features: ["كاميرا 48 ميجابكسل", "معالج A17 Pro", "شاشة 6.7 بوصة", "مقاومة للماء"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "سماعات Sony WH-1000XM5",
    description: "سماعات لاسلكية فائقة الجودة مع أفضل تقنية إلغاء ضوضاء في العالم، بطارية تدوم 30 ساعة",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example12",
    features: ["أفضل إلغاء ضوضاء", "بطارية 30 ساعة", "جودة صوت عالية", "شحن سريع"],
    categoryName: "الإلكترونيات"
  },
  // المنتجات الجديدة المضافة
  {
    name: "ساعة Samsung Galaxy Watch 6",
    description: "ساعة ذكية متطورة مع نظام Android Wear، شاشة AMOLED، تتبع صحي شامل، مقاومة للماء",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example13",
    features: ["شاشة AMOLED", "تتبع صحي", "مقاومة للماء", "بطارية طويلة"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "كاميرا GoPro Hero 11",
    description: "كاميرا أكشن متطورة، تصوير فيديو 5.3K، مقاومة للماء والصدمات، مثالية للمغامرات",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example14",
    features: ["فيديو 5.3K", "مقاومة للماء", "تصوير بطيء", "شاشة لمس"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "عطر Dior Sauvage",
    description: "عطر رجالي عصري، رائحة منعشة وقوية، مناسب للاستخدام اليومي والمناسبات",
    price: 799,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example15",
    features: ["رائحة منعشة", "يدوم طويلاً", "مناسب للرجال", "عبوة أنيقة"],
    categoryName: "الجمال والعناية"
  },
  {
    name: "مجموعة أدوات تجميل Dior",
    description: "مجموعة فاخرة من أدوات التجميل، تشمل أحمر شفاه وظلال عيون وكونسيلر عالي الجودة",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example16",
    features: ["ألوان فاخرة", "جودة عالية", "مناسبة للبشرة الحساسة", "حقيبة فاخرة"],
    categoryName: "الجمال والعناية"
  },
  {
    name: "ساعة Cartier Tank",
    description: "ساعة فاخرة كلاسيكية، تصميم مستطيل أنيق، حركة أوتوماتيكية، مناسبة للمناسبات الرسمية",
    price: 25999,
    originalPrice: 32999,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example17",
    features: ["تصميم كلاسيكي", "حركة أوتوماتيكية", "سوار جلد", "مناسبة للمناسبات"],
    categoryName: "الإكسسوارات"
  },
  {
    name: "حقيبة Gucci Marmont",
    description: "حقيبة فاخرة مع تصميم GG المميز، جلد عالي الجودة، مناسبة للعمل والحفلات",
    price: 12999,
    originalPrice: 15999,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example18",
    features: ["جلد عالي الجودة", "تصميم GG", "حجم متوسط", "مناسبة للحفلات"],
    categoryName: "الإكسسوارات"
  },
  {
    name: "نظارة Prada Linea Rossa",
    description: "نظارة شمسية رياضية، عدسات مستقطبة، إطار أسود أنيق، مناسبة للرياضة واليومية",
    price: 1299,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example19",
    features: ["عدسات مستقطبة", "إطار رياضي", "حماية من الأشعة", "مناسبة للرياضة"],
    categoryName: "الإكسسوارات"
  },
  {
    name: "عطر Yves Saint Laurent Black Opium",
    description: "عطر نسائي جريء، رائحة غامقة ومثيرة، مناسب للحفلات والمناسبات الخاصة",
    price: 999,
    originalPrice: 1399,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example20",
    features: ["رائحة جريئة", "يدوم طويلاً", "مناسب للحفلات", "عبوة فاخرة"],
    categoryName: "الجمال والعناية"
  },
  {
    name: "سماعات Bose QuietComfort 45",
    description: "سماعات لاسلكية مع إلغاء ضوضاء متقدم، جودة صوت عالية، راحة طويلة الأمد",
    price: 1099,
    originalPrice: 1399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example21",
    features: ["إلغاء ضوضاء متقدم", "جودة صوت عالية", "راحة طويلة", "بطارية 24 ساعة"],
    categoryName: "الإلكترونيات"
  },
  {
    name: "لابتوب Dell XPS 13",
    description: "لابتوب فاخر مع شاشة InfinityEdge، معالج Intel Core i7، تصميم أنيق وخفيف الوزن",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    externalLink: "https://amzn.to/3example22",
    features: ["شاشة InfinityEdge", "معالج Core i7", "تصميم أنيق", "خفيف الوزن"],
    categoryName: "الإلكترونيات"
  }
];

async function main() {
  console.log('🌱 بدء إضافة المنتجات التجريبية...');

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
      ['الإلكترونيات', 'الجمال والعناية', 'الإكسسوارات'].map(async (categoryName) => {
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
    for (const productData of sampleProducts) {
      const categoryId = categoryMap.get(productData.categoryName);
      if (!categoryId) {
        console.error(`فئة غير موجودة: ${productData.categoryName}`);
        continue;
      }

      await prisma.product.create({
        data: {
          name: productData.name,
          slug: productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
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

    console.log('🎉 تم إضافة جميع المنتجات بنجاح!');
    console.log(`📊 إجمالي المنتجات المضافة: ${sampleProducts.length}`);

  } catch (error) {
    console.error('❌ خطأ في إضافة المنتجات:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 