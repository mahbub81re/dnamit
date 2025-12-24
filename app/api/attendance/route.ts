import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import { NextRequest, NextResponse } from 'next/server';

// ১. GET: সকল হাজিরা রিপোর্ট দেখা (শিক্ষকের তথ্যসহ)
export async function GET() {
  try {
    await dbConnect();
    // populate('teacherId') দিলে ইউজারের নাম ও অন্যান্য তথ্য চলে আসবে
    const attendanceRecords = await Attendance.find({})
      .populate('user', 'name email role') 
      .sort({ createdAt: -1 });

    return NextResponse.json({ status: "success", data: attendanceRecords });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { user, status } = await req.json();

    // ১. আজকের তারিখ (ঢাকা টাইমজোন অনুযায়ী)
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());

    // ২. ৪০ দিন পূর্বের তারিখ বের করা
    const fortyDaysAgo = new Date();
    fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 40);

    // ৩. ৪০ দিনের বেশি পুরনো হাজিরা ডিলিট করা
    // এটি ব্যাকগ্রাউন্ডে চলবে যাতে ইউজারের হাজিরা নিতে দেরি না হয়
    await Attendance.deleteMany({
      createdAt: { $lt: fortyDaysAgo }
    });

    // ৪. নতুন হাজিরা তৈরি
    const newAttendance = await Attendance.create({
      status,
      user,
      date: today
    });

    return NextResponse.json({ status: "success", data: newAttendance }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 400 });
  }
}

// GET মেথড আগের মতোই থাকবে...