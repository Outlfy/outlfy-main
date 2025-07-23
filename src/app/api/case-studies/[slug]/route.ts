import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CaseStudy from '@/admin/models/CaseStudy';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    
    const resolvedParams = await params;
    const caseStudy = await CaseStudy.findOne({ 
      slug: resolvedParams.slug,
      status: 'published'
    })
    .populate('technologies', 'name category icon')
    .populate('author', 'name avatar')
    .select('-__v')
    .lean();

    if (!caseStudy) {
      return NextResponse.json(
        {
          success: false,
          error: 'Case study not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      caseStudy
    });

  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch case study'
      },
      { status: 500 }
    );
  }
}
