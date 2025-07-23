import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/utils/database';
import { checkAdminAuth } from '@/lib/adminAuth';
import FormResponse from '@/admin/models/FormResponse';

// Get specific form response
export async function GET(request, { params }) {
  // Check authentication
  const authCheck = checkAdminAuth(request);
  if (!authCheck.authenticated) {
    return authCheck.response;
  }

  try {
    await connectDB();
    
    const { id } = await params;
    const response = await FormResponse.findById(id);
    
    if (!response) {
      return NextResponse.json(
        { error: 'Form response not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching form response:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form response' },
      { status: 500 }
    );
  }
}

// Update form response status
export async function PUT(request, { params }) {
  // Check authentication
  const authCheck = checkAdminAuth(request);
  if (!authCheck.authenticated) {
    return authCheck.response;
  }

  try {
    await connectDB();
    
    const { id } = await params;
    const data = await request.json();
    
    const response = await FormResponse.findByIdAndUpdate(
      id,
      { 
        status: data.status,
        notes: data.notes,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!response) {
      return NextResponse.json(
        { error: 'Form response not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating form response:', error);
    return NextResponse.json(
      { error: 'Failed to update form response' },
      { status: 500 }
    );
  }
}

// Delete form response
export async function DELETE(request, { params }) {
  // Check authentication
  const authCheck = checkAdminAuth(request);
  if (!authCheck.authenticated) {
    return authCheck.response;
  }

  try {
    await connectDB();
    
    const { id } = await params;
    const response = await FormResponse.findByIdAndDelete(id);
    
    if (!response) {
      return NextResponse.json(
        { error: 'Form response not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Form response deleted successfully' });
  } catch (error) {
    console.error('Error deleting form response:', error);
    return NextResponse.json(
      { error: 'Failed to delete form response' },
      { status: 500 }
    );
  }
}
