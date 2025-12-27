import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { qrcode, status, date } = await req.json();

    // ১. QR কোড থেকে আসা ID দিয়ে ডাটাবেসে ইউজারকে খুঁজে বের করা
    // এখানে ধরা হয়েছে আপনার User মডেলে 'studentId' বা 'teacherId' কলাম আছে
    const userData = await User.findById(qrcode);

    if (!userData) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'ইউজার খুঁজে পাওয়া যায়নি!' 
      }, { status: 404 });
    }

    // ২. আজকের দিনের ফরম্যাট (YYYY-MM-DD)
    const attendanceDate = new Date(date).toISOString().split('T')[0];

    // ৩. একই দিনে একই স্ট্যাটাস (যেমন দুইবার Enter) চেক করা (অপশনাল কিন্তু ভালো)
    const existingRecord = await Attendance.findOne({
      user: userData._id,
      date: attendanceDate,
      status: status
    });

    if (existingRecord) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'আজকের হাজিরা ইতিমধ্যে নেওয়া হয়েছে' 
      }, { status: 400 });
    }

    // ৪. ডাটাবেসে সেভ করা
    const newAttendance = await Attendance.create({
      user: userData._id, // MongoDB Object ID
      date: attendanceDate,
      status: status
    });

    return NextResponse.json({ 
      status: 'success', 
      message: `${userData.name} - আপনার ${status} সফল হয়েছে ✅`,
      data: newAttendance 
    });

  } catch (error: any) {
    console.error("Attendance Error:", error);
    return NextResponse.json({ 
      status: 'error', 
      message: error.message 
    }, { status: 500 });
  }
}