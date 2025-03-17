import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongod';
import Story from '../../../../models/Story';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const story = await Story.findById(params.id);
    
    if (!story) {
      return NextResponse.json(
        { success: false, message: 'Story not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: story });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    const story = await Story.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!story) {
      return NextResponse.json(
        { success: false, message: 'Story not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: story });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const story = await Story.findByIdAndDelete(params.id);
    
    if (!story) {
      return NextResponse.json(
        { success: false, message: 'Story not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}