
import dbConnect from '@/libs/dbConnect';
import { Question } from '@/models/Question';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Get URL params for filtering (optional but recommended)
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const subject = searchParams.get('subject');

    let query: any = {};
    if (className) query.className = className;
    if (subject) query.subject = subject;

    const questions = await Question.find(query).sort({ chapter: 1 });
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { questions } = await request.json();
    
    // insertMany is much faster for bulk data
    const result = await Question.insertMany(questions);
    
    return NextResponse.json({ success: true, count: result.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save bulk data' }, { status: 500 });
  }
}