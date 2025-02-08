
// app/api/contact/route.js
import { connectDB } from '../../../lib/mongodbs';
import Contact from '../../../models/Contact';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    await connectDB();
    
    const contact = await Contact.create(body);
    
    return NextResponse.json(
      { message: 'Message sent successfully', contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
}
 