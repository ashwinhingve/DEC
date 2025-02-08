import { NextResponse } from 'next/server';
import { adminMiddleware } from '@/middleware/authMiddleware';

async function handler(req) {
  // Only admin can access this route
  return NextResponse.json({
    success: true,
    message: 'Admin dashboard data',
    data: {
      // Your admin dashboard data here
    }
  });
}

export const GET = adminMiddleware(handler);