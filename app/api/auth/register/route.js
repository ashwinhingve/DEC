// /app/api/auth/register/route.js
// import { NextResponse } from 'next/server';
// import connectDB from '../../../../lib/db';
// import User from '../../../../models/User';
// import { generateToken } from '../../../../lib/auth';
// import { ADMIN_EMAILS } from '../../../../config/admin';
// export async function POST(req) {
//   try {
//     await connectDB();
    
//     const { name, email, password, role } = await req.json();

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return NextResponse.json(
//         { success: false, message: 'User already exists' },
//         { status: 400 }
//       );
//     }

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password,
//       role: role || 'user'
//     });

//     return NextResponse.json(
//       { 
//         success: true,
//         message: 'Registration successful',
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role
//         }
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Registration error:', error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import User from '../../../../models/User';
import { ADMIN_EMAILS } from '../../../../config/admin';

export async function POST(req) {
  try {
    await connectDB();
    
    // Parse request body
    const { name, email, password } = await req.json();
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 409 }
      );
    }
    
    // Determine role based on email
    const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'user';
    
    // Create user with determined role
    const user = await User.create({
      name,
      email,
      password,
      role
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}