// /app/api/auth/login/route.js
// import { NextResponse } from 'next/server';
// import connectDB from '../../../../lib/db';
// import User from '../../../../models/User';
// import { generateToken } from '../../../../lib/auth';
// import { ADMIN_EMAILS } from '../../../../config/admin';

// export async function POST(req) {
//   const { email } = req.body;
  
//   // Determine role based on email
//   const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'user';
//   try {
//     await connectDB();
    
//     const { email, password } = await req.json();

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     // Check password
//     const isPasswordMatch = await user.comparePassword(password);
//     if (!isPasswordMatch) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     // Generate token
//     const token = generateToken(user);

//     return NextResponse.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       },
//       token
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import User from '../../../../models/User';
import { generateToken } from '../../../../lib/auth';
import { ADMIN_EMAILS } from '../../../../config/admin';

export async function POST(req) {
  try {
    await connectDB();
    
    // Parse request body
    const { email, password } = await req.json();
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user);
    
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
