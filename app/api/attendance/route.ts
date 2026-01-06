import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { qrcode, status, date } = await req.json();

    const userData = await User.findById(qrcode).select('_id name').lean();
    if (!userData) {
      return NextResponse.json({ status: 'error', message: 'ইউজার নেই!' }, { status: 404 });
    }

    const attendanceDate = date.split('T')[0];
    const filter = { user: userData._id, date: attendanceDate, status };
    const update = { $setOnInsert: { user: userData._id, date: attendanceDate, status } };
    
    const result = await Attendance.findOneAndUpdate(filter, update, { 
      upsert: true, 
      new: false 
    }).lean();

    if (result) {
      return NextResponse.json({ status: 'error', message: 'ইতিমধ্যে হাজিরা নিয়েছেন' }, { status: 400 });
    }

    // --- NEW: SEND TO GOOGLE SHEETS ---
    // Replace with your Apps Script Web App URL
    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbztx6_1dKKpxotFdjqNo0NfGYq68c8TeRTtEnJCze4NFFCtVyO8IZsbXMF3znQdP3unJA/exec";
    
    // We fire this and don't necessarily need to 'await' it if you want 
    // the UI to respond instantly, but awaiting is safer for data integrity.
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: qrcode,
        name: userData.name, // Now we have the name from User model!
        status: status
      }),
    });
    // ----------------------------------

    return NextResponse.json({ 
      status: 'success', 
      message: `${userData.name} - ${status} সফল ✅` 
    });

  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: 'সার্ভার সমস্যা' }, { status: 500 });
  }
}