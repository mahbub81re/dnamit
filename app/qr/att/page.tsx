import React from 'react';
import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import User from '@/models/User'; // populate করার জন্য প্রয়োজন

// রিফ্রেশ করলে যাতে নতুন ডাটা আসে
export const dynamic = 'force-dynamic';

async function getAttendanceData() {
  await dbConnect();
  // populate ব্যবহার করে শিক্ষকের নাম এবং রোল নিয়ে আসা
  const records = await Attendance.find({})
    .populate('teacherId', 'name role') 
    .sort({ createdAt: -1 });
  return records;
}

export default async function AttendanceListPage() {
  const attendanceRecords = await getAttendanceData();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">মাদরাসা হাজিরার তালিকা</h1>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          মোট রেকর্ড: {attendanceRecords.length}
        </span>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm tracking-wider">
              <th className="px-5 py-3 border-b-2">শিক্ষকের নাম</th>
              <th className="px-5 py-3 border-b-2">রোল (Role)</th>
              <th className="px-5 py-3 border-b-2">তারিখ</th>
              <th className="px-5 py-3 border-b-2">স্ট্যাটাস</th>
              <th className="px-5 py-3 border-b-2">সময়</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record: any) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 font-semibold">
                    {record.teacherId?.name || 'অজানা ইউজার'}
                  </p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  <span className="capitalize text-gray-600">{record.teacherId?.role || 'N/A'}</span>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-700">
                  {record.date}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    record.status === 'Present' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                  }`}>
                    {record.status === 'Present' ? 'উপস্থিত' : 'বিলম্বিত'}
                  </span>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-500">
                  {new Date(record.createdAt).toLocaleTimeString('bn-BD')}
                </td>
              </tr>
            ))}
            {attendanceRecords.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  আজকের কোনো হাজিরার রেকর্ড পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}