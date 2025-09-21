import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/utils/database';
import FormResponse from '@/admin/models/FormResponse';

// CORS helpers
const RAW_ALLOWED = ('store.outlfy.com,www.store.outlfy.com,localhost:3000,localhost:3001,localhost:3002,localhost:3003,localhost:3004,localhost:3005,localhost:3006,localhost:3007,localhost:3008,localhost:3009');

// Expand host entries to full origins with schemes so they match the browser's Origin header
const ALLOWED_ORIGINS = RAW_ALLOWED
  .split(',')
  .map(o => o.trim())
  .filter(Boolean)
  .flatMap(o => {
    if (o === '*') return ['*'];
    if (o.startsWith('http://') || o.startsWith('https://')) return [o];
    // default: include both https and http variants
    return [`https://${o}`, `http://${o}`];
  });

const getAllowedOrigin = (origin) => {
  if (ALLOWED_ORIGINS.includes('*')) return '*';
  if (origin && ALLOWED_ORIGINS.includes(origin)) return origin;
  return ''; // no match => no CORS header
};

const corsHeaders = (origin) => {
  const allowOrigin = getAllowedOrigin(origin);
  const headers = {
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin',
  };
  if (allowOrigin) headers['Access-Control-Allow-Origin'] = allowOrigin;
  return headers;
};

// Preflight handler
export async function OPTIONS(request) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders(origin),
    },
  });
}

// Handle contact form submissions
export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();
    const origin = request.headers.get('origin');

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400, headers: { ...corsHeaders(origin) } }
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
        ...data.customFields,
      },
    });

    await formResponse.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
        id: formResponse._id,
      },
      { status: 201, headers: { ...corsHeaders(origin) } }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    const origin = request.headers.get('origin');

    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500, headers: { ...corsHeaders(origin) } }
    );
  }
}

// Get all contact form submissions (for admin)
export async function GET(request) {
  try {
    await connectDB();

    const origin = request.headers.get('origin');
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

    return NextResponse.json(
      {
        submissions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { headers: { ...corsHeaders(origin) } }
    );
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    const origin = request.headers.get('origin');
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500, headers: { ...corsHeaders(origin) } }
    );
  }
}
