import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import User from '@/models/User';
import AttendanceListClient from '@/components/AttendanceListClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    await dbConnect();
    const _ = User; // Model registration fix

    const records = await Attendance.find({})
      .populate({
        path: 'user',
        model: User
      })
      .sort({ createdAt: -1 })
      .lean();

    // ডাটা সিরিয়ালাইজ করা (Next.js এ অবজেক্ট পাঠানোর জন্য নিরাপদ পদ্ধতি)
    const serializedRecords = JSON.parse(JSON.stringify(records)) || [];

    return <AttendanceListClient initialRecords={serializedRecords} />;
  } catch (error) {
    console.error("Database Error:", error);
    return <AttendanceListClient initialRecords={[]} />; // এরর হলেও খালি অ্যারে পাঠান
  }
}