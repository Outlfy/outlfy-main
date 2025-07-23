import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/utils/database';
import FormResponse from '@/admin/models/FormResponse';

// Handle contact form submissions
export async function POST(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Create form response
    const formResponse = new FormResponse({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject || 'Contact Form Submission',
      message: data.message,
      formType: 'contact',
      source: data.source || 'contact-page',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      meta: {
        company: data.company,
        website: data.website,
        budget: data.budget,
        timeline: data.timeline,
        services: data.services,
        ...data.customFields
      }
    });
    
    await formResponse.save();
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      id: formResponse._id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}

// Get all contact form submissions (for admin)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status');
    
    const query = {};
    if (status) {
      query.status = status;
    }
    
    const submissions = await FormResponse
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('name email subject formType status createdAt');
      
    const total = await FormResponse.countDocuments(query);
    
    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
