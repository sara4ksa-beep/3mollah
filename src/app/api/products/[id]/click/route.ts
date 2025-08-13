import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'معرف المنتج مطلوب' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    // Get client information
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || 'unknown';

    // Record the click
    await prisma.productAnalytics.create({
      data: {
        productId: id,
        ipAddress: ipAddress.toString(),
        userAgent,
        referrer
      }
    });

    // Update product click count
    await prisma.product.update({
      where: { id },
      data: {
        clicks: {
          increment: 1
        }
      }
    });

    // Return the external link for redirection
    return NextResponse.json({
      externalLink: product.externalLink,
      message: 'تم تسجيل النقر بنجاح'
    });

  } catch (error) {
    console.error('Error recording click:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تسجيل النقر' },
      { status: 500 }
    );
  }
} 