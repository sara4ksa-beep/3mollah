import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader, hashPassword } from '@/utils/auth';

// POST - Create demo user automatically
export async function POST(request: NextRequest) {
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

    // Check if any users exist
    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
      return NextResponse.json(
        { error: 'يوجد مستخدمين بالفعل في النظام' },
        { status: 400 }
      );
    }

    // Check if demo user already exists
    const existingDemoUser = await prisma.user.findUnique({
      where: { email: 'demo@example.com' }
    });

    if (existingDemoUser) {
      return NextResponse.json(
        { error: 'المستخدم التجريبي موجود بالفعل' },
        { status: 400 }
      );
    }

    // Create demo user data
    const demoUserData = {
      name: 'مستخدم تجريبي',
      email: 'demo@example.com',
      password: 'demo123456',
      role: 'ADMIN' as const,
      isActive: true
    };

    // Hash password
    const hashedPassword = await hashPassword(demoUserData.password);

    // Create the demo user
    const demoUser = await prisma.user.create({
      data: {
        email: demoUserData.email.toLowerCase(),
        password: hashedPassword,
        name: demoUserData.name,
        role: demoUserData.role,
        isActive: demoUserData.isActive
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            products: true,
            analytics: true
          }
        }
      }
    });

    return NextResponse.json({
      user: demoUser,
      message: 'تم إنشاء مستخدم تجريبي بنجاح',
      credentials: {
        email: demoUserData.email,
        password: demoUserData.password
      },
      note: 'يمكنك استخدام هذه البيانات للدخول إلى النظام أو إنشاء مستخدمين جدد'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating demo user:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء المستخدم التجريبي' },
      { status: 500 }
    );
  }
} 