import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { qrcode, status, date } = await req.json();
    
    // সময় নির্ধারণ (ঢাকা টাইমজোন)
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Dhaka', 
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // ১. সার্ভিস অ্যাকাউন্ট অথেন্টিকেশন (এটি এপিআই কি দিয়ে হয় না)
    // আপনার সার্ভিস অ্যাকাউন্টের JSON ডাটাটি এনভায়রনমেন্ট ভেরিয়েবলে রাখতে হবে
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // আপনার নতুন স্প্রেডশিট আইডি
    const spreadsheetId = '16UYdrUllWkBK1kjHsVTtBirGWyduQkAkYCfB1fuMerM';

 
    // ৩. গুগল শিটে ডাটা পাঠানো (সরাসরি 'Attendance' নামক ট্যাবে)
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Attendance!A:E', // কলাম: তারিখ, আইডি, টাইপ, স্ট্যাটাস, সময়
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[date, qrcode, status, time]],
      },
    });

    return NextResponse.json({ status: 'success' });
    
  } catch (error: any) {
    console.error("Google Sheets Error:", error);
    return NextResponse.json(
      { status: 'error', message: "অথেন্টিকেশন বা শিট পারমিশন জনিত সমস্যা" }, 
      { status: 500 }
    );
  }
}