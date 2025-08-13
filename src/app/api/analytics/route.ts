import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get analytics data
export async function GET(request: NextRequest) {
  try {
    // Get basic analytics
    const [totalProducts, totalClicks, totalCategories] = await Promise.all([
      prisma.product.count(),
      prisma.productAnalytics.count(),
      prisma.category.count()
    ]);

    // Get top products by clicks
    const topProducts = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { clicks: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        clicks: true,
        image: true
      }
    });

    // Get recent analytics
    const recentAnalytics = await prisma.productAnalytics.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        product: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json({
      totalProducts,
      totalClicks,
      totalCategories,
      topProducts,
      recentAnalytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب البيانات التحليلية' },
      { status: 500 }
    );
  }
} 