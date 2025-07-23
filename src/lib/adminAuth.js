import { NextResponse } from 'next/server';

export function checkAdminAuth(request) {
  try {
    // For server-side API routes, we'll check for a specific header
    // that the frontend can send with authenticated requests
    const authHeader = request.headers.get('x-admin-auth');
    const adminPassword = "outlfy will handle my tech 7122 times";
    
    // Simple authentication check
    // In a real application, you'd use JWT tokens or sessions
    const expectedHeader = Buffer.from(adminPassword).toString('base64');
    if (authHeader === expectedHeader) {
      return { authenticated: true };
    }
    
    return { 
      authenticated: false, 
      response: NextResponse.json(
        { error: 'Unauthorized access' }, 
        { status: 401 }
      )
    };
  } catch (error) {
    return { 
      authenticated: false, 
      response: NextResponse.json(
        { error: 'Authentication error' }, 
        { status: 401 }
      )
    };
  }
}

export function createAuthHeader() {
  const adminPassword = "outlfy will handle my tech 7122 times";
  return Buffer.from(adminPassword).toString('base64');
}
