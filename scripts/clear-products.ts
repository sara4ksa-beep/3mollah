import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearProducts() {
  console.log('🗑️ Starting to clear all products...');

  try {
    // Delete all product analytics first (due to foreign key constraint)
    const deletedAnalytics = await prisma.productAnalytics.deleteMany({});
    console.log(`✅ Deleted ${deletedAnalytics.count} product analytics records`);

    // Delete all products
    const deletedProducts = await prisma.product.deleteMany({});
    console.log(`✅ Deleted ${deletedProducts.count} products`);

    console.log('🎉 All products have been successfully deleted!');
  } catch (error) {
    console.error('❌ Error deleting products:', error);
    throw error;
  }
}

clearProducts()
  .catch((e) => {
    console.error('❌ Error during clearing products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 