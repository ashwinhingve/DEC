// app/api/test-connection/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'Database connected successfully!' });
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }
}