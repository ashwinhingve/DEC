// app/api/submissions/[id]/route.js
import clientPromise from '../../../../lib/mongodbb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ 
        message: "Invalid submission ID" 
      }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("contactFormDB");
    
    const result = await db.collection("submissions").deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ 
        message: "Submission not found" 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: "Submission deleted successfully" 
    });
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ 
      message: "Failed to delete submission", 
      error: error.message 
    }, { status: 500 });
  }
}