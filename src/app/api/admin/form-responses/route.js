import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/utils/database';
import { checkAdminAuth } from '@/lib/adminAuth';
import FormResponse from '@/admin/models/FormResponse';

// Get all form responses for admin
export async function GET(request) {
  // Check authentication
  const authCheck = checkAdminAuth(request);
  if (!authCheck.authenticated) {
    return authCheck.response;
  }

  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status');
    const formType = searchParams.get('formType');
    
    const query = {};
    if (status) query.status = status;
    if (formType) query.formType = formType;
    
    const responses = await FormResponse
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
      
    const total = await FormResponse.countDocuments(query);
    
    return NextResponse.json({
      responses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching form responses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form responses' },
      { status: 500 }
    );
  }
}
