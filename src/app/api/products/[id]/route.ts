import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/utils/auth';

// GET - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب المنتج' },
      { status: 500 }
    );
  }
}

// PUT - Update product (requires authentication)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    if (!payload) {
      return NextResponse.json(
        { error: 'رمز غير صالح' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { name, price, image, externalLink, features, isActive } = await request.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parseFloat(price),
        image,
        externalLink,
        features: features || [],
        isActive
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث المنتج' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product (requires authentication)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    if (!payload) {
      return NextResponse.json(
        { error: 'رمز غير صالح' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف المنتج' },
      { status: 500 }
    );
  }
} 