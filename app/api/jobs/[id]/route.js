import dbConnect from '../../../../lib/dbConnect';
import Job from '../../../../models/Job';

export async function PUT(request, { params }) {
  await dbConnect();
  
  try {
    const { id } = params;
    const data = await request.json();
    
    const job = await Job.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!job) {
      return Response.json(
        { message: 'Job not found' },
        { status: 404 }
      );
    }

    return Response.json(job);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  
  try {
    const { id } = params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return Response.json(
        { message: 'Job not found' },
        { status: 404 }
      );
    }

    return Response.json({ message: 'Job deleted successfully' });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}