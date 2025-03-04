import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET;

export async function verifyAdminSession() {
  try {
    const cookieStore = cookies(); 
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      console.warn("Admin token is missing");
      return false;
    }
 
    const decoded = verify(token, JWT_SECRET);

    if (!decoded || !decoded.userId) {
      console.warn("Invalid or missing userId in token");
      return false;
    }

    // ✅ Convert userId to ObjectId (MongoDB format)
    const userId = new ObjectId(decoded.userId);

    // ✅ Connect to the database
    const { db } = await connectToDatabase();

    // ✅ Check if user exists and is an admin
    const user = await db.collection('users').findOne({
      _id: userId,
      role: 'admin'
    });

    if (!user) {
      console.warn("User not found or not an admin");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
}

export async function getUserFromSession() {
  try {
    const cookieStore = cookies(); // ✅ Get cookies correctly
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      console.warn("User token is missing");
      return null;
    }

    // ✅ Verify the JWT token
    const decoded = verify(token, JWT_SECRET);

    if (!decoded || !decoded.userId) {
      console.warn("Invalid or missing userId in token");
      return null;
    }

    // ✅ Convert userId to ObjectId (MongoDB format)
    const userId = new ObjectId(decoded.userId);

    // ✅ Connect to the database
    const { db } = await connectToDatabase();

    // ✅ Fetch user data
    const user = await db.collection('users').findOne({ _id: userId });

    if (!user) {
      console.warn("User not found");
      return null;
    }

    // ✅ Remove sensitive data
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
