import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongo';
import Resume from '../../../../models/Resume';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const resume = await Resume.findById(id);
    
    if (!resume) {
      return NextResponse.json(
        { message: 'Resume not found' },
        { status: 404 }
      );
    }
    
    // If we want to return PDF content directly
    const pdfBase64 = resume.pdfData.content;
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    
    // Return the PDF file
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': resume.pdfData.contentType,
        'Content-Disposition': `inline; filename="${resume.pdfData.fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { message: 'Failed to fetch resume', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const result = await Resume.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { message: 'Resume not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { message: 'Failed to delete resume', error: error.message },
      { status: 500 }
    );
  }
}