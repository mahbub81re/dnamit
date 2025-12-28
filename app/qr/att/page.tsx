import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import User from '@/models/User';
import AttendanceListClient from '@/components/AttendanceListClient';
import AdminGuard from '@/components/AdminGuard'
export const dynamic = 'force-dynamic';

// ... (অন্যান্য ইমপোর্ট আগের মতোই থাকবে)

export default async function Page() {
  try {
    await dbConnect();
    const _ = User; // মডেল রেজিস্ট্রেশন নিশ্চিত করা

    const records = await Attendance.find({})
      .populate({ 
        path: 'user', 
        model: User,
        select: 'name role email' // আমরা নিশ্চিত করছি যেন role ডাটাটি আসে
      })
      .sort({ createdAt: -1 })
      .lean();

    const serializedRecords = JSON.parse(JSON.stringify(records)) || [];

    return (
      // <AdminGuard>
        <AttendanceListClient initialRecords={serializedRecords} />
      // </AdminGuard>
    );
  } catch (error) {
    return <div className="p-10 text-center text-red-500 font-bold">সার্ভার কানেকশন এরর!</div>;
  }
}