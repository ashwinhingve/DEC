import { NextResponse } from 'next/server';
import { authMiddleware } from '../../../../middleware/authMiddleware';

async function handler(req) {
  // Both admin and regular users can access this route
  return NextResponse.json({
    success: true,
    message: 'User profile data',
    data: {
      // Your user profile data here
    }
  });
}
 
