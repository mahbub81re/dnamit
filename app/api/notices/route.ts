import dbConnect from '@/libs/dbConnect';
import Notice from '@/models/Notice';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const newNotice = await Notice.create(body);
    return NextResponse.json({ status: 'success', data: newNotice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const notices = await Notice.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ status: 'success', data: notices });
  } catch (error: any) {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}