import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import { NextRequest, NextResponse } from 'next/server';

// ১. GET: সকল হাজিরা রিপোর্ট দেখা (শিক্ষকের তথ্যসহ)
export async function GET() {
  try {
    await dbConnect();
    // populate('teacherId') দিলে ইউজারের নাম ও অন্যান্য তথ্য চলে আসবে
    const attendanceRecords = await Attendance.find({})
      .populate('teacherId', 'name email role') 
      .sort({ createdAt: -1 });

    return NextResponse.json({ status: "success", data: attendanceRecords });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}

// ২. POST: নতুন হাজিরা এন্ট্রি করা
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { teacherId, status } = await req.json();

    // আজকের তারিখ বের করা (YYYY-MM-DD)
   const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Dhaka',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

    // চেক করা: আজ এই শিক্ষকের হাজিরা ইতিমধ্যে নেওয়া হয়েছে কি না
    const existingEntry = await Attendance.findOne({ teacherId, date: today });
    // if (existingEntry) {
    //   return NextResponse.json(
    //     { status: "error", message: "আজকের হাজিরা ইতিমধ্যে সম্পন্ন হয়েছে" },
    //     { status: 400 }
    //   );
    // }


    const newAttendance = await Attendance.create({
      teacherId,
      status,
      date: today
    });

    return NextResponse.json({ status: "success", data: newAttendance }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 400 });
  }
}