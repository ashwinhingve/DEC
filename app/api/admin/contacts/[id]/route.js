import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb'; // Your MongoDB connection utility
import { ObjectId } from 'mongodb';

// DELETE a contact
export async function DELETE(request, { params }) {
  const { id } = params;
  
  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: 'Invalid contact ID' },
      { status: 400 }
    );
  }
  
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('contacts').deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}

// PATCH a contact (update read status)
export async function PATCH(request, { params }) {
  const { id } = params;
  const data = await request.json();
  
  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: 'Invalid contact ID' },
      { status: 400 }
    );
  }
  
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    
    // Get the updated contact
    const updatedContact = await db.collection('contacts').findOne({
      _id: new ObjectId(id)
    });
    
    return NextResponse.json({
      ...updatedContact,
      id: updatedContact._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}