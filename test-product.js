const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addTestProduct() {
  try {
    // First, get or create a user
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@test.com',
          password: 'hashedpassword',
          name: 'Admin User',
          role: 'ADMIN'
        }
      });
    }

    const product = await prisma.product.create({
      data: {
        name: 'هاتف ذكي تجريبي',
        description: 'هذا منتج تجريبي لاختبار عرض الصور',
        price: 999.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', // External URL
        externalLink: 'https://example.com/product',
        features: ['شاشة عالية الدقة', 'بطارية طويلة المدى'],
        isActive: true,
        slug: 'test-phone-123',
        createdById: user.id
      }
    });
    
    console.log('✅ تم إضافة المنتج التجريبي:', product);
    console.log('Product ID:', product.id);
    console.log('Image:', product.image);
  } catch (error) {
    console.error('❌ خطأ في إضافة المنتج:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestProduct(); 