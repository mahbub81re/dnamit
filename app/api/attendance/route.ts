import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

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



export async function POST(req: Request) {
  try {
    const { user, status, date } = await req.json();
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour12: true });

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse("AIzaSyAr1sRDRMy6hG0nrek9IdHjc4" as string),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '16UYdrUllWkBK1kjHsVTtBirGWyduQkAkYCfB1fuMerM';

    // ইউজার চেক লজিক (উদাহরণ: শিক্ষক আইডি T001 এভাবে শুরু হলে)
    const isTeacher = user.startsWith('T') || user.includes('teacher');
    const sheetName = isTeacher ? 'Teachers' : 'Students';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:D`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[date, user, status, time]],
      },
    });

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

// GET মেথড আগের মতোই থাকবে...