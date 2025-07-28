import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/utils/auth';

// GET - Get analytics data
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = extractTokenFromHeader(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json(
        { error: 'غير مصرح لك' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'رمز غير صالح' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d'; // 7d, 30d, 90d, all
    const categoryId = searchParams.get('categoryId');

    // Calculate date range
    const now = new Date();
    let startDate: Date | undefined;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = undefined;
    }

    // Build where clause
    const whereClause: any = {};
    if (startDate) {
      whereClause.clickedAt = {
        gte: startDate
      };
    }
    if (categoryId) {
      whereClause.product = {
        categoryId: categoryId
      };
    }

    // Get analytics data
    const [
      totalClicks,
      totalProducts,
      totalCategories,
      topProducts,
      categoryStats,
      dailyStats,
      recentClicks
    ] = await Promise.all([
      // Total clicks
      prisma.productAnalytics.count({
        where: whereClause
      }),
      
      // Total products
      prisma.product.count({
        where: { isActive: true }
      }),
      
      // Total categories
      prisma.category.count({
        where: { isActive: true }
      }),
      
      // Top performing products
      prisma.product.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          clicks: true,
          category: {
            select: { name: true }
          }
        },
        orderBy: { clicks: 'desc' },
        take: 10
      }),
      
      // Category statistics
      prisma.category.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          _count: {
            select: { products: true }
          },
          products: {
            select: {
              clicks: true
            }
          }
        }
      }),
      
      // Daily statistics (last 7 days)
      prisma.productAnalytics.groupBy({
        by: ['clickedAt'],
        where: {
          clickedAt: {
            gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        _count: {
          id: true
        }
      }),
      
      // Recent clicks
      prisma.productAnalytics.findMany({
        where: whereClause,
        include: {
          product: {
            select: { name: true, category: { select: { name: true } } }
          }
        },
        orderBy: { clickedAt: 'desc' },
        take: 20
      })
    ]);

    // Calculate category totals
    const categoryTotals = categoryStats.map(cat => ({
      ...cat,
      totalClicks: cat.products.reduce((sum, p) => sum + p.clicks, 0)
    }));

    // Format daily stats
    const formattedDailyStats = dailyStats.map(stat => ({
      date: stat.clickedAt.toISOString().split('T')[0],
      clicks: stat._count.id
    }));

    return NextResponse.json({
      summary: {
        totalClicks,
        totalProducts,
        totalCategories
      },
      topProducts,
      categoryStats: categoryTotals,
      dailyStats: formattedDailyStats,
      recentClicks
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الإحصائيات' },
      { status: 500 }
    );
  }
} 