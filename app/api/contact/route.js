// app/api/contact/route.js
import clientPromise from '../../../lib/mongodbb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("contactFormDB");
    
    // Get the form data from the request
    const formData = await request.json();
    
    // Add timestamp to the form data
    formData.createdAt = new Date();
    
    // Insert the form data into the MongoDB collection
    const result = await db.collection("submissions").insertOne(formData);
    
    // Return a success response
    return NextResponse.json({ 
      message: "Form submitted successfully",
      insertedId: result.insertedId 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ 
      message: "Failed to submit form", 
      error: error.message 
    }, { status: 500 });
  }
}