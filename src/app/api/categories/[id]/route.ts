import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/utils/auth';

// PUT - Update category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    if (!payload || (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { error: 'صلاحيات غير كافية' },
        { status: 403 }
      );
    }

    const { name, slug, description, image, sortOrder, isActive } = await request.json();

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'الاسم والرابط مطلوبان' },
        { status: 400 }
      );
    }

    // Check if slug already exists for other categories
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug,
        id: { not: params.id }
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'الرابط مستخدم بالفعل' },
        { status: 400 }
      );
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
        image,
        sortOrder: sortOrder || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث الفئة' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    if (!payload || (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { error: 'صلاحيات غير كافية' },
        { status: 403 }
      );
    }

    // Check if category has products
    const categoryWithProducts = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    if (categoryWithProducts && categoryWithProducts._count.products > 0) {
      return NextResponse.json(
        { error: 'لا يمكن حذف الفئة لأنها تحتوي على منتجات' },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'تم حذف الفئة بنجاح' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف الفئة' },
      { status: 500 }
    );
  }
} 