import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const resumes = await db
      .collection("resumes")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
  }
}
