import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/utils/database';
import { getFeaturedTestimonials } from '@/admin/models/Testimonial';

// CORS helpers
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean)
  .flatMap(o => {
    if (o === '*') return ['*'];
    if (o.startsWith('http://') || o.startsWith('https://')) return [o];
    return [`https://${o}`, `http://${o}`];
  });

const getAllowedOrigin = (origin) => {
  if (ALLOWED_ORIGINS.includes('*')) return '*';
  if (origin && ALLOWED_ORIGINS.includes(origin)) return origin;
  return '';
};

const corsHeaders = (origin) => {
  const allowOrigin = getAllowedOrigin(origin);
  const headers = {
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
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
    headers: corsHeaders(origin),
  });
}

// GET - Get featured testimonials
export async function GET(request) {
  try {
    await connectDB();
    const origin = request.headers.get('origin');

    const result = await getFeaturedTestimonials();
    return NextResponse.json(result, { 
      status: result.success ? 200 : 500,
      headers: corsHeaders(origin) 
    });

  } catch (error) {
    console.error('GET featured testimonials error:', error);
    const origin = request.headers.get('origin');
    return NextResponse.json(
      { 
        success: false, 
        error: error.message, 
        message: 'Failed to retrieve featured testimonials' 
      },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}