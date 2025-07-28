import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/utils/auth';

// GET - Get all settings
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
    if (!payload || (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { error: 'صلاحيات غير كافية' },
        { status: 403 }
      );
    }

    const settings = await prisma.siteSettings.findMany();
    
    // Convert settings array to object
    const settingsObject: any = {};
    settings.forEach(setting => {
      let value: any = setting.value;
      
      // Parse value based on type
      switch (setting.type) {
        case 'number':
          value = Number(value);
          break;
        case 'boolean':
          value = value === 'true';
          break;
        case 'json':
          try {
            value = JSON.parse(value);
          } catch {
            value = value;
          }
          break;
        default:
          value = value;
      }
      
      settingsObject[setting.key] = value;
    });

    return NextResponse.json(settingsObject);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب الإعدادات' },
      { status: 500 }
    );
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
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

    const settings = await request.json();

    // Update each setting
    for (const [key, value] of Object.entries(settings)) {
      let stringValue: string;
      let type: string;

      // Determine type and convert value
      if (typeof value === 'boolean') {
        stringValue = value.toString();
        type = 'boolean';
      } else if (typeof value === 'number') {
        stringValue = value.toString();
        type = 'number';
      } else if (typeof value === 'object') {
        stringValue = JSON.stringify(value);
        type = 'json';
      } else {
        stringValue = value as string;
        type = 'string';
      }

      // Upsert setting
      await prisma.siteSettings.upsert({
        where: { key },
        update: {
          value: stringValue,
          type
        },
        create: {
          key,
          value: stringValue,
          type
        }
      });
    }

    return NextResponse.json({ message: 'تم حفظ الإعدادات بنجاح' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حفظ الإعدادات' },
      { status: 500 }
    );
  }
} 