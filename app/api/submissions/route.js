// app/api/submissions/route.js
import clientPromise from '../../../lib/mongodbb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("contactFormDB");
    
    // Get all submissions, sorted by createdAt in descending order (newest first)
    const submissions = await db.collection("submissions")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(submissions);
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ 
      message: "Failed to retrieve submissions", 
      error: error.message 
    }, { status: 500 });
  }
}