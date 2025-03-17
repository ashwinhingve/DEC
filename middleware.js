 

import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get token and user data from localStorage through cookies
  const token = request.cookies.get('token')?.value;
  const userDataCookie = request.cookies.get('user')?.value;
  
  // Get the pathname
  const { pathname } = request.nextUrl;

  // If no token exists and trying to access protected routes
  if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/profile'))) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // If token exists, verify role for admin routes
  if (token && pathname.startsWith('/admin')) {
    try {
      const userData = JSON.parse(userDataCookie);
      if (userData.role !== 'admin') {
        // Redirect non-admin users to profile
        return NextResponse.redirect(new URL('/profile', request.url));
      }
    } catch (error) {
      // If there's an error parsing user data, redirect to login
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}

// Specify which routes to protect
export const config = {
  matcher: ['/admin/:path*', '/profile/:path*']
};