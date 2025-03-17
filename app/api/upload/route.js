// import { NextResponse } from 'next/server';
// import { writeFile } from 'fs/promises';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file');

//     if (!file) {
//       return NextResponse.json(
//         { success: false, message: 'No file uploaded' },
//         { status: 400 }
//       );
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Generate unique filename
//     const fileName = `${uuidv4()}-${file.name.replace(/\s/g, '_')}`;
//     const filePath = path.join(process.cwd(), 'public/images', fileName);

//     // Write file to the public directory
//     await writeFile(filePath, buffer);

//     return NextResponse.json({ 
//       success: true, 
//       filePath: `/images/${fileName}`
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Define a constant for the upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/images');

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Ensure the upload directory exists
    try {
      await fs.promises.access(UPLOAD_DIR);
    } catch {
      await fs.promises.mkdir(UPLOAD_DIR, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileName = `${uuidv4()}-${file.name.replace(/\s/g, '_')}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Write file to the directory
    await writeFile(filePath, buffer);

    // The URL path that will be used to access the image
    const publicPath = `/uploads/images/${fileName}`;
    
    console.log(`File saved to: ${filePath}`);
    console.log(`Public URL: ${publicPath}`);

    return NextResponse.json({ 
      success: true, 
      filePath: publicPath
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}