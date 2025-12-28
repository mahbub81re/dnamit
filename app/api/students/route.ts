import dbConnect from '@/libs/dbConnect';
import Students from '@/models/students';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
export async function GET() {
  await dbConnect();
  try {
    const students = await Students.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: students });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json(); // JSON ডাটা রিসিভ করা হচ্ছে
    const { name, phone, password, ...studentData } = body;

    // ১. ইউজার আগে থেকে আছে কিনা চেক করা (ইউনিক ফোন নম্বর)
    const existingUser = await User.findOne({ email: phone });
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        message: "এই ফোন নম্বর দিয়ে ইতিপূর্বে রেজিস্ট্রেশন করা হয়েছে" 
      }, { status: 400 });
    }

    // ২. পাসওয়ার্ড হ্যাশ করা (ডিফল্ট হিসেবে ফোন নম্বর ব্যবহার করা হয়েছে)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password || phone, salt);

    // ৩. ইউজার টেবিল এ ডাটা তৈরি করা
    const newUser = await User.create({
      name: name,
      email: phone, // ফোন নম্বরকেই ইমেইল/ইউজারনেম হিসেবে রাখা হচ্ছে
      password: hashedPassword,
      role: 'student'
    });

    // ৪. স্টুডেন্ট আইডি জেনারেশন লজিক
    const count = await Students.countDocuments();
    const currentYear = new Date().getFullYear();
    const generatedId = `DN-${currentYear}-${(count + 1).toString().padStart(3, '0')}`;

    // ৫. স্টুডেন্ট টেবিল এ ডাটা সেভ করা (ফটো ছাড়াই)
    const student = await Students.create({
      ...studentData,
      name,
      phone,
      userId: newUser._id, // ইউজারের সাথে কানেক্ট করা
      studentId: generatedId,
      status: 'Active'
    });

    return NextResponse.json({ 
      success: true, 
      message: "শিক্ষার্থী এবং ইউজার সফলভাবে তৈরি হয়েছে",
      studentId: generatedId 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating student:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "ডাটা সেভ করতে সমস্যা হয়েছে" 
    }, { status: 400 });
  }
}