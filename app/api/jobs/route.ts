//  // app/api/jobs/route.ts
// import { NextResponse } from 'next/server';
// import dbConnect from '../../../lib/dbConnect';
// import Job from '../../../models/Job';

// export const dynamic = 'force-dynamic';

// export async function GET() {
//   await dbConnect();
  
//   try {
//     const jobs = await Job.find({})
//       .sort({ createdAt: -1 });
    
//     return NextResponse.json(jobs);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch jobs' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   await dbConnect();
  
//   try {
//     const data = await request.json();
//     const job = await Job.create(data);
    
//     return NextResponse.json(job, { status: 201 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { error: error.message },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json(
//       { error: 'Failed to create job' },
//       { status: 500 }
//     );
//   }
// }


// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const jobs = await db.collection('jobs').find({}).toArray();
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const data = await request.json();
    
    const result = await db.collection('jobs').insertOne(data);
    
    if (!result.insertedId) {
      throw new Error('Failed to insert job');
    }
    
    const newJob = await db.collection('jobs').findOne({ _id: result.insertedId });
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create job' },
      { status: 400 }
    );
  }
}