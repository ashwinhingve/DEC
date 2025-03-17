import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongod';
import TeamMember from '../../../../models/TeamMember';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const teamMember = await TeamMember.findById(params.id);
    
    if (!teamMember) {
      return NextResponse.json(
        { success: false, message: 'Team member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: teamMember });
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
    
    const teamMember = await TeamMember.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!teamMember) {
      return NextResponse.json(
        { success: false, message: 'Team member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: teamMember });
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
    const teamMember = await TeamMember.findByIdAndDelete(params.id);
    
    if (!teamMember) {
      return NextResponse.json(
        { success: false, message: 'Team member not found' },
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