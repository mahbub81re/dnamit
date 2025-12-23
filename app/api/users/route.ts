import dbConnect from '@/libs/dbConnect';
import User from '@/models/User';
import { NextRequest } from 'next/server';

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

// ২. POST: নতুন ইউজার (ছাত্র/শিক্ষক) তৈরি করা
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // ইমেইল চেক করা
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return Response.json({ status: "error", message: "Email already exists" }, { status: 400 });
    }

    const newUser = await User.create(body);
    return Response.json({ status: "success", data: newUser }, { status: 201 });
  } catch (error: any) {
    return Response.json({ status: "error", message: error.message }, { status: 400 });
  }
}