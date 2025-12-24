import React from 'react';
import dbConnect from '@/libs/dbConnect';
import Attendance from '@/models/Attendance';
import User from '@/models/User'; 

export const dynamic = 'force-dynamic';

async function getAttendanceData() {
  await dbConnect();
  

  const _ = User; 

  const records = await Attendance.find({})
    .populate({
      path: 'user',
      model: User // সরাসরি মডেল অবজেক্টটি পাস করে দেওয়া ভালো
    }) 
    .sort({ createdAt: -1 });
    
  return records;
}


export default async function AttendanceListPage() {
  const attendanceRecords = await getAttendanceData();

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">মাদরাসা হাজিরার রিপোর্ট</h1>
          <p className="text-sm text-gray-500">বাংলাদেশ সময় (BST) অনুযায়ী প্রদর্শিত</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm">
          মোট রেকর্ড: {attendanceRecords.length}
        </span>
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-xs tracking-widest">
              <th className="px-6 py-4 font-bold">নাম ও পদবী</th>
              <th className="px-6 py-4 font-bold">তারিখ</th>
              <th className="px-6 py-4 font-bold text-center">স্ট্যাটাস</th>
              <th className="px-6 py-4 font-bold text-right">সময়</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {attendanceRecords.map((record: any) => (
              <tr key={record._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">
                    {/* আমরা user এবং teacherId দুই ব্যাকআপই রাখছি */}
                    {record.user?.name || 'অজানা'}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {record.user?.role || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {/* তারিখটিকেও বাংলায় ফরম্যাট করতে পারেন চাইলে */}
                  {record.date}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                    record.status === 'Enter' ? 'bg-green-100 text-green-700 border border-green-200' :
                    record.status === 'Late' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                    'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {record.status === 'Enter' ? 'প্রবেশ' : 
                     record.status === 'Late' ? 'বিলম্ব' : 'প্রস্থান'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                  {new Date(record.createdAt).toLocaleTimeString('bn-BD', {
                    timeZone: 'Asia/Dhaka',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {attendanceRecords.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">আজকের কোনো হাজিরার তথ্য পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
}