import dbConnect from '@/libs/dbConnect';
import Students from '@/models/students';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

// ১. GET: নির্দিষ্ট একজনের তথ্য দেখা
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  try {
    const { id } = await params;
    const student = await Students.findOne({userId:id});
    if (!student) return NextResponse.json({ message: "পাওয়া যায়নি" }, { status: 404 });
    return NextResponse.json({ success: true, data: student });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// ২. PUT: তথ্য আপডেট করা (Update)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {

 const { id } = await params;
  await dbConnect();
  try {
    const body = await req.json();
    const updatedStudent = await Students.findByIdAndUpdate(id, body, { new: true });
    
    // যদি নাম পরিবর্তন হয়, তবে ইউজার টেবিলেও আপডেট করা উচিত
    if (body.name) {
      await User.findByIdAndUpdate(updatedStudent.userId, { name: body.name });
    }

    return NextResponse.json({ success: true, data: updatedStudent });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// ৩. DELETE: তথ্য মুছে ফেলা (Delete)
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
 const { id } = await params;

  await dbConnect();
  try {
    const student = await Students.findById(id);
    if (!student) return NextResponse.json({ message: "শিক্ষার্থী খুঁজে পাওয়া যায়নি" }, { status: 404 });

    // ইউজার এবং স্টুডেন্ট উভয় প্রোফাইল ডিলিট করা
    await User.findByIdAndDelete(student.userId);
    await Students.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "সফলভাবে মুছে ফেলা হয়েছে" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
