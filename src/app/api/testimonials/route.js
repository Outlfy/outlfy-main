import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/utils/database';
import { getTestimonials } from '@/admin/models/Testimonial';

export async function GET(request) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const projectType = searchParams.get('projectType');
    const featured = searchParams.get('featured');

    // Build filter for approved testimonials only
    const filter = { status: 'approved' };

    if (projectType && projectType !== 'all') {
      filter.projectType = projectType;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    // Get testimonials with pagination
    const result = await getTestimonials({
      filter,
      page,
      limit,
      sort: { displayOrder: 1, createdAt: -1 } // Sort by display order first, then newest
    });

    return NextResponse.json({
      success: true,
      testimonials: result.testimonials,
      pagination: {
        page,
        limit,
        totalPages: result.totalPages,
        total: result.total,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage
      }
    });

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch testimonials' 
      },
      { status: 500 }
    );
  }
}