import React from 'react';
import dbConnect from '@/libs/dbConnect';
import User from '@/models/User';
import Link from 'next/link';

// প্রতিবার লেটেস্ট ডাটা দেখানোর জন্য
export const dynamic = 'force-dynamic';

async function getUsers() {
  await dbConnect();
  // পাসওয়ার্ড বাদে সব তথ্য নিয়ে আসা
  return await User.find({}).sort({ createdAt: -1 });
}

export default async function UserListPage() {
  const users = await getUsers();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">মাদরাসা ইউজার তালিকা</h1>
          <p className="text-gray-500">মোট ইউজার সংখ্যা: {users.length} জন</p>
        </div>
        <Link 
          href="/users/add" 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md"
        >
          + নতুন ইউজার যোগ করুন
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">ইউজারের নাম ও ইমেইল</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">রোল (Role)</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">স্ট্যাটাস</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user: any) => (
                <tr key={user._id} className="hover:bg-blue-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'teacher' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-sm text-gray-600">
                      <span className={`h-2 w-2 rounded-full mr-2 ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {user.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <Link 
                        href={`/profile/${user._id}`}
                        className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded border border-indigo-200"
                      >
                        প্রোফাইল
                      </Link>
                      <Link 
                        href={`/qr/maker?id=${user._id}`}
                        className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded border border-gray-200"
                      >
                        QR কার্ড
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            কোনো ইউজার পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}