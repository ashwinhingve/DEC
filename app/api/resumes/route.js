// app/api/resumes/route.js
import { connectToDatabase } from '../../../lib/mongodb';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const getUser = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  if (!token) {
    return null;
  }

  try {
    // Verify the token using your JWT_SECRET
    const decoded = verify(token.value, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export async function POST(req) {
  try {
    const user = await getUser();
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { db } = await connectToDatabase();
    const data = await req.json();

    const resume = {
      userId: user.id, // or user._id depending on your user object structure
      personal: data.personal,
      experience: data.experience,
      education: data.education,
      skills: data.skills,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('resumes').insertOne(resume);

    return new Response(JSON.stringify({ 
      message: 'Resume saved successfully',
      resumeId: result.insertedId 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(req) {
  try {
    const user = await getUser();
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { db } = await connectToDatabase();
    
    const resumes = await db.collection('resumes')
      .find({ userId: user.id }) // or user._id depending on your user object structure
      .sort({ updatedAt: -1 })
      .toArray();

    return new Response(JSON.stringify(resumes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

//  // app/api/resumes/route.js
// import { connectToDatabase } from '../../../lib/mongodb';
// import { getServerSession } from 'next-auth';
// // import { authOptions } from '@/app/api/auth/[...auth]/route';

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session) {
//       return new Response(JSON.stringify({ error: 'Unauthorized' }), {
//         status: 401,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const { db } = await connectToDatabase();
//     const data = await req.json();

//     const resume = {
//       userId: session.user.id,
//       personal: data.personal,
//       experience: data.experience,
//       education: data.education,
//       skills: data.skills,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };

//     const result = await db.collection('resumes').insertOne(resume);

//     return new Response(JSON.stringify({ 
//       message: 'Resume saved successfully',
//       resumeId: result.insertedId 
//     }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }