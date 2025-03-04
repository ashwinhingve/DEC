// /lib/auth.js
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { connectToDatabase } from './mongodb';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
export async function verifyAdminSession(req) {
  try {
    // Get the authentication token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return false;
    }

    // Verify the JWT token
    const decoded = verify(token, JWT_SECRET);
    
    // Connect to the database
    const { db } = await connectToDatabase();
    
    // Check if user exists and is an admin
    const user = await db.collection('users').findOne({
      _id: decoded.userId,
      role: 'admin'
    });

    if (!user) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

export async function getUserFromSession(req) {
  try {
    // Get the authentication token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return null;
    }

    // Verify the JWT token
    const decoded = verify(token, JWT_SECRET);
    
    // Connect to the database
    const { db } = await connectToDatabase();
    
    // Fetch user data
    const user = await db.collection('users').findOne({
      _id: decoded.userId
    });

    if (!user) {
      return null;
    }

    // Remove sensitive data
    delete user.password;
    
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}