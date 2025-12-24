import dbConnect from '@/libs/dbConnect';
import LessonPlan from '@/models/LessonPlan';
import { NextRequest, NextResponse } from 'next/server';

// ১. GET: সকল লেসন প্ল্যান অথবা ফিল্টার অনুযায়ী ডাটা আনা
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const className = searchParams.get('class');
    const date = searchParams.get('date');

    let query: any = {};
    if (className) query.class = className;
    if (date) query.date = date;

    const lessons = await LessonPlan.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ status: "success", data: lessons });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}

// ২. POST: নতুন লেসন প্ল্যান তৈরি বা আপডেট করা
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { class: className, date, periods, homework } = body;

    if (!className || !date || !periods || !homework) {
      return NextResponse.json({ status: "error", message: "সবগুলো তথ্য প্রদান করুন" }, { status: 400 });
    }

    // একই দিনে একই ক্লাসের প্ল্যান থাকলে সেটি আপডেট হবে (Upsert)
    const updatedLesson = await LessonPlan.findOneAndUpdate(
      { class: className, date: date }, // ফিল্টার
      { periods, homework },           // যা আপডেট হবে
      { new: true, upsert: true }      // অপশন: না থাকলে নতুন তৈরি হবে
    );

    return NextResponse.json({ 
      status: "success", 
      message: "লেসন প্ল্যান সফলভাবে সংরক্ষিত হয়েছে", 
      data: updatedLesson 
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 400 });
  }
}