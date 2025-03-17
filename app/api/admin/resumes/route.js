import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function GET(request) {
  try {
    // Check admin authorization using a header
    const adminKey = request.headers.get('admin-api-key');
    
    if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }
    
    const { db } = await connectToDatabase();
    
    // Fetch all resumes but exclude the PDF binary data
    const resumes = await db.collection('resumes')
      .find({})
      .project({ 'pdfFile.data': 0 }) // Exclude binary data
      .sort({ createdAt: -1 })
      .toArray();
      
    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error in admin resumes fetch:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}