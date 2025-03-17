import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongo';
import Resume from '../../../models/Resume';
import { revalidatePath } from 'next/cache';

// Helper to convert the uploaded file to Base64
async function convertFileToBase64(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString('base64');
}

export async function GET() {
  try {
    await connectDB();
    const resumes = await Resume.find({}).sort({ createdAt: -1 });
    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { message: 'Failed to fetch resumes', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    // Get the FormData
    const formData = await request.formData();
    
    // Parse the JSON data
    const resumeDataString = formData.get('resumeData');
    const userData = JSON.parse(resumeDataString);
    
    // Get the PDF file
    const pdfFile = formData.get('resumePdf');
    
    if (!pdfFile) {
      return NextResponse.json(
        { message: 'PDF file is required' },
        { status: 400 }
      );
    }
    
    // Convert PDF to Base64 (MongoDB can store as a string)
    const pdfBase64 = await convertFileToBase64(pdfFile);
    
    // Create new resume document
    const newResume = new Resume({
      userData,
      pdfData: {
        fileName: pdfFile.name,
        contentType: pdfFile.type,
        content: pdfBase64
      },
      createdAt: new Date()
    });
    
    await newResume.save();
    
    // Revalidate the path to update the UI
    revalidatePath('/resume-builder');
    revalidatePath('/admin/resumes');
    
    return NextResponse.json({ 
      message: 'Resume saved successfully',
      resumeId: newResume._id
    });
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json(
      { message: 'Failed to save resume', error: error.message },
      { status: 500 }
    );
  }
}