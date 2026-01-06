import dbConnect from '@/libs/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, password, phoneNumber, role } = body;

    // 1. Save to MongoDB
    const newUser = await User.create({
      name,
      email,
      password, // Note: In production, hash this password first!
      phoneNumber,
      role: role || 'student',
      isActive: true
    });

    // 2. Send to Google Sheets (using your Web App URL)
    // const GOOGLE_SHEET_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";
    // await fetch(GOOGLE_SHEET_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     id: newUser._id,
    //     name: newUser.name,
    //     status: 'Registered', // Custom status for the sheet
    //   }),
    // });

    return NextResponse.json({ status: 'success', data: newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}