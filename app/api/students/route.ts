import dbConnect from '@/libs/dbConnect';
import Students from '@/models/students';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  await dbConnect();
  try {
    // স্টুডেন্ট ডাটার সাথে ইউজারের ইনফরমেশনও (যেমন: রোল) পপুলেট করা যায়
    const students = await Students.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: students });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const { nameEnglish, nameBengali, phone, password, ...restData } = body;

    // ১. ফোন নম্বর চেক (ইউনিকনেস নিশ্চিত করা)
    const existingUser = await User.findOne({ email: phone });
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        message: "এই ফোন নম্বর দিয়ে ইতিপূর্বে রেজিস্ট্রেশন করা হয়েছে" 
      }, { status: 400 });
    }

    // ২. পাসওয়ার্ড ম্যানেজমেন্ট
    const salt = await bcrypt.genSalt(10);
    // যদি পাসওয়ার্ড না থাকে তবে ফোন নম্বরই পাসওয়ার্ড
    const hashedPassword = await bcrypt.hash(password || phone, salt);

    // ৩. ইউজার ক্রিয়েশন (Auth Table)
    const newUser = await User.create({
      name: nameEnglish || nameBengali,
      email: phone, 
      password: hashedPassword,
      role: 'student'
    });

    // ৪. ডাইনামিক স্টুডেন্ট আইডি জেনারেশন (DN-2025-001 ফরম্যাট)
    const currentYear = new Date().getFullYear();
    const count = await Students.countDocuments({ 
      createdAt: { 
        $gte: new Date(`${currentYear}-01-01`), 
        $lte: new Date(`${currentYear}-12-31`) 
      } 
    });
    const generatedId = `DN${currentYear}${(count + 1).toString().padStart(3, '0')}`;

    // ৫. স্টুডেন্ট প্রোফাইল ক্রিয়েশন
    // ফ্রন্টএন্ড থেকে আসা restData এর মধ্যে পারিবারিক এবং ঠিকানার সব তথ্য আছে
    const student = await Students.create({
      ...restData,
      nameEnglish,
      nameBengali,
      phone,
      userId: newUser._id, 
      studentId: generatedId,
      status: 'Active'
    });

    // ৬. সাকসেস রেসপন্স (রিডাইরেক্টের জন্য স্টুডেন্ট ডাটাবেস আইডি পাঠানো হচ্ছে)
    return NextResponse.json({ 
      success: true, 
      id: newUser._id, // ফ্রন্টএন্ডে router.push(`/users/students/${student._id}`) এর জন্য
      studentId: generatedId,
      message: "নিবন্ধন সফল হয়েছে"
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating student:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "ডাটা সেভ করতে সমস্যা হয়েছে" 
    }, { status: 400 });
  }
}