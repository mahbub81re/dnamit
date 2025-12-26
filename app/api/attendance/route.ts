import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { qrcode, status, date } = await req.json();
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Dhaka', 
      hour12: true 
    });

    // ১. সার্ভিস অ্যাকাউন্ট অথেন্টিকেশন
 const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    // .replace লজিকটি নিশ্চিত করে যে কী-টি ডিকোডারের জন্য পঠনযোগ্য
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '16UYdrUllWkBK1kjHsVTtBirGWyduQkAkYCfB1fuMerM';

    // ২. আইডি প্যাটার্ন অনুযায়ী টাইপ নির্ধারণ
    const userType =  'Teacher' ;

    // ৩. 'Attendance' নামক শিটে ডাটা পাঠানো
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Attendance!A:E', // শিটের নাম 'Attendance' হতে হবে
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[date, qrcode, userType, status, time]],
      },
    });

    return NextResponse.json({ status: 'success', message: `${userType} হাজিরা সফল` });
    
  } catch (error: any) {
    console.error("Sheet Error:", error.message);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}