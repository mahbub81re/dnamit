import dbConnect from '@/libs/dbConnect';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // পাসওয়ার্ড এনক্রিপ্ট করার জন্য (npm install bcryptjs)


// ১. GET: সব ইউজার দেখা
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    return Response.json({ status: "success", data: users });
  } catch (error: any) {
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}





export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, email, password, role } = await req.json();

    // ১. চেক করা ইউজার আগে থেকে আছে কি না
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ status: "error", message: "এই ইমেইল দিয়ে আগেই ইউজার তৈরি করা হয়েছে!" }, { status: 400 });
    }

    // ২. পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(password, 10);

    // ৩. নতুন ইউজার তৈরি
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return NextResponse.json({ status: "success", data: newUser }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}