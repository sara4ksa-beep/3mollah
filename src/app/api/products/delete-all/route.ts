import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/utils/auth';

// DELETE - Delete all products (requires authentication)
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader || undefined);
    if (!token) {
      return NextResponse.json(
        { error: 'غير مصرح لك' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload || (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { error: 'صلاحيات غير كافية' },
        { status: 403 }
      );
    }

    // Delete all products
    const deleteResult = await prisma.product.deleteMany({});

    // Delete all product analytics
    await prisma.productAnalytics.deleteMany({});

    return NextResponse.json({
      message: 'تم حذف جميع المنتجات بنجاح',
      deletedCount: deleteResult.count
    });
  } catch (error) {
    console.error('Error deleting all products:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف المنتجات' },
      { status: 500 }
    );
  }
}
