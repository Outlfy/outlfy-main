import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/utils/database';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connected successfully',
      database: mongoose.connection.name,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      collections: mongoose.connection.db ? await mongoose.connection.db.listCollections().toArray() : []
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
        details: 'Failed to connect to MongoDB'
      },
      { status: 500 }
    );
  }
}
