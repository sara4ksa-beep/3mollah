import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/utils/auth';

// GET - Get all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    console.log('API: Fetching products');
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause - for admin, show all products
    const where: any = {};
    
    // Only filter by isActive if not admin
    const isAdmin = request.headers.get('authorization');
    console.log('API: Is admin request:', !!isAdmin);
    
    if (!isAdmin) {
      where.isActive = true;
    }
    
    console.log('API: Where clause:', where);
    
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true, slug: true }
          },
          createdBy: {
            select: { id: true, name: true }
          }
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit
      }),
      prisma.product.count({ where })
    ]);

    console.log('API: Found products:', products.length);
    console.log('API: Total products:', total);

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب المنتجات' },
      { status: 500 }
    );
  }
}

// POST - Create new product (requires authentication)
export async function POST(request: NextRequest) {
  try {
    console.log('API: Creating new product');
    
    // Verify authentication
    const token = extractTokenFromHeader(request.headers.get('authorization'));
    if (!token) {
      console.log('API: No token provided');
      return NextResponse.json(
        { error: 'غير مصرح لك' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      console.log('API: Invalid token');
      return NextResponse.json(
        { error: 'رمز غير صالح' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('API: Request body:', body);
    
    const { name, description, price, image, categoryId } = body;

    if (!name || !price) {
      console.log('API: Missing required fields');
      return NextResponse.json(
        { error: 'اسم المنتج والسعر مطلوبان' },
        { status: 400 }
      );
    }

    // Generate slug from name with timestamp to ensure uniqueness
    const baseSlug = name.toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
    
    const timestamp = Date.now();
    let slug = `${baseSlug}-${timestamp}`;
    
    // Check if slug already exists (shouldn't happen with timestamp, but just in case)
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });

    if (existingProduct) {
      // If somehow it exists, add more randomness
      slug = `${baseSlug}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    console.log('API: Generated slug:', slug);

    console.log('API: Creating product with data:', {
      name,
      slug,
      description: description || null,
      price: parseFloat(price),
      image: image || null,
      categoryId: categoryId || null,
      createdById: payload.userId
    });

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || null,
        price: parseFloat(price),
        image: image || null,
        externalLink: '', // Default empty string
        features: [],
        categoryId: categoryId || null,
        createdById: payload.userId
      },
      include: {
        category: {
          select: { id: true, name: true, slug: true }
        },
        createdBy: {
          select: { id: true, name: true }
        }
      }
    });

    console.log('API: Product created successfully:', product.id);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء المنتج' },
      { status: 500 }
    );
  }
} 