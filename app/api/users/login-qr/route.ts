import dbConnect from '@/libs/dbConnect';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { userId } = await req.json();

    // ১. আইডি দিয়ে ইউজার খোঁজা
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return NextResponse.json({ status: "error", message: "ইউজার পাওয়া যায়নি!" }, { status: 404 });
    }

    if (!user.isActive) {
      return NextResponse.json({ status: "error", message: "আপনার অ্যাকাউন্টটি নিষ্ক্রিয়।" }, { status: 403 });
    }

    // ২. লগইন সফল হলে ইউজার ডাটা পাঠানো
    return NextResponse.json({ 
      status: "success", 
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email
      } 
    });

  } catch (error: any) {
    return NextResponse.json({ status: "error", message: "আইডি সঠিক নয় বা সার্ভার এরর" }, { status: 400 });
  }
}