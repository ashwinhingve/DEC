// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Check if user is authenticated
//   const user = request.cookies.get('user');
//   const path = request.nextUrl.pathname;

//   // Define protected routes
//   const protectedRoutes = ['/Admin', '/Profile'];

//   // If trying to access protected routes without authentication
//   if (protectedRoutes.includes(path) && !user) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // If logged in and trying to access login page, redirect to profile
//   if (path === '/' && user) {
//     return NextResponse.redirect(new URL('/Profile', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/', '/Admin', '/Profile']
// }
