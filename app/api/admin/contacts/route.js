import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb'; // Your MongoDB connection utility
import { ObjectId } from 'mongodb';

// GET all contacts
export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    const contacts = await db
      .collection('contacts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Convert MongoDB _id to string id for frontend
    const formattedContacts = contacts.map(contact => ({
      ...contact,
      id: contact._id.toString(),
      _id: undefined
    }));
    
    return NextResponse.json(formattedContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}