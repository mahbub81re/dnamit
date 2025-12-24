import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import User from '@/models/User';
import AttendanceListClient from '@/components/AttendanceListClient';
import AdminGuard from '@/components/AdminGuard'
export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    await dbConnect();
    const _ = User;

    const records = await Attendance.find({})
      .populate({ path: 'user', model: User })
      .sort({ createdAt: -1 })
      .lean();

    const serializedRecords = JSON.parse(JSON.stringify(records)) || [];

    // এখানে আমরা একটি প্রোটেকটেড কম্পোনেন্ট রিটার্ন করছি
    return (
      <AdminGuard>
        <AttendanceListClient initialRecords={serializedRecords} />
      </AdminGuard>
    );
  } catch (error) {
    return <div className="p-10 text-center">সার্ভার এরর!</div>;
  }
}

