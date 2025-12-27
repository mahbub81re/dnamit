import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { qrcode, status, date } = await req.json();

    // ১. lean() ব্যবহার করলে কুয়েরি অনেক দ্রুত হয় (এটি শুধু JSON ডাটা দেয়)
    const userData = await User.findById(qrcode).select('_id name').lean();

    if (!userData) {
      return NextResponse.json({ status: 'error', message: 'ইউজার নেই!' }, { status: 404 });
    }

    const attendanceDate = date.split('T')[0];

    // ২. চেক এবং সেভ করার লজিককে অপ্টিমাইজ করা
    // findOneAndUpdate ব্যবহার করলে চেক এবং ইনসার্ট এর কাজ দ্রুত করা যায় (Atomic Operation)
    const filter = { user: userData._id, date: attendanceDate, status };
    const update = { $setOnInsert: { user: userData._id, date: attendanceDate, status } };
    
    // এটি চেক করবে যদি আগে থেকে থাকে তবে নতুন করে তৈরি করবে না (upsert)
    const result = await Attendance.findOneAndUpdate(filter, update, { 
      upsert: true, 
      new: false // আগের ডাটা থাকলে সেটি দিবে
    }).lean();

    if (result) {
      return NextResponse.json({ status: 'error', message: 'ইতিমধ্যে হাজিরা নিয়েছেন' }, { status: 400 });
    }

    return NextResponse.json({ 
      status: 'success', 
      message: `${userData.name} - ${status} সফল ✅` 
    });

  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: 'সার্ভার সমস্যা' }, { status: 500 });
  }
}


export async function GET() {
  try {
    await dbConnect();

    // ১. আজকের তারিখ থেকে ৪০ দিন আগের সময় নির্ধারণ
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - 40);
    const dateString = thresholdDate.toISOString().split('T')[0];

    // ২. ব্যাকগ্রাউন্ডে ডিলিট অপারেশন (await ছাড়া দিলে রেসপন্স ফাস্ট হবে)
    // ৪০ দিনের আগের সব ডাটা মুছে ফেলা
    Attendance.deleteMany({ date: { $lt: dateString } }).exec();

    // ৩. গত ৪০ দিনের হাজিরা রিট্রিভ করা
    // .populate('user', 'name') দিয়ে ইউজারের নামসহ আনা হচ্ছে
    const attendanceRecords = await Attendance.find({ 
      date: { $gte: dateString } 
    })
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .lean();

    return NextResponse.json({ 
      status: 'success', 
      count: attendanceRecords.length,
      data: attendanceRecords 
    });

  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}