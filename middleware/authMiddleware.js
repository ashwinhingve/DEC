import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/auth';

export async function authMiddleware(request) {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export async function adminMiddleware(request) {
  const token = request.cookies.get('token')?.value;
  const userDataCookie = request.cookies.get('user')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    const userData = JSON.parse(userDataCookie);
    if (userData.role !== 'admin') {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}