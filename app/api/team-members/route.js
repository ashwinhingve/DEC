import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongod';
import TeamMember from '../../../models/TeamMember';

export async function GET() {
  try {
    await connectToDatabase();
    const teamMembers = await TeamMember.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: teamMembers });
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
    
    const teamMember = await TeamMember.create(body);
    
    return NextResponse.json(
      { success: true, data: teamMember },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}