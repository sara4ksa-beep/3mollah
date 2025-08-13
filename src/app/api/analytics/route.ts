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
      orderBy: { clickedAt: 'desc' },
      take: 10,
      include: {
        product: {
          select: {
            name: true,
            category: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    // Get category stats
    const categoryStats = await prisma.category.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    // Calculate total clicks for each category
    const categoryStatsWithClicks = await Promise.all(
      categoryStats.map(async (category) => {
        const totalClicks = await prisma.productAnalytics.count({
          where: {
            product: {
              categoryId: category.id
            }
          }
        });
        return {
          ...category,
          totalClicks
        };
      })
    );

    // Get daily stats for the last 7 days
    const dailyStats = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      const clicks = await prisma.productAnalytics.count({
        where: {
          clickedAt: {
            gte: startOfDay,
            lte: endOfDay
          }
        }
      });
      
      dailyStats.push({
        date: startOfDay.toISOString().split('T')[0],
        clicks
      });
    }

    return NextResponse.json({
      summary: {
        totalProducts,
        totalClicks,
        totalCategories
      },
      topProducts,
      categoryStats: categoryStatsWithClicks,
      dailyStats,
      recentClicks: recentAnalytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب البيانات التحليلية' },
      { status: 500 }
    );
  }
} 