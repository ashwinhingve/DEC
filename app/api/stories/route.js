import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongod';
import Story from '../../../models/Story';

export async function GET() {
  try {
    await connectToDatabase();
    const stories = await Story.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: stories });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    const story = await Story.create(body);
    
    return NextResponse.json(
      { success: true, data: story },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}