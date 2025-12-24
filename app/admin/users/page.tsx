"use client";
import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Trash2, Edit, ShieldCheck, Search } from 'lucide-react';
import Link from 'next/link';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(data => setUsers(data.data || []));
  }, []);

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Users className="text-blue-600" /> ইউজার ম্যানেজমেন্ট
          </h1>
          <p className="text-slate-500 text-sm">শিক্ষক এবং ছাত্রদের তালিকা নিয়ন্ত্রণ করুন</p>
        </div>
        <Link href="/admin/users/add" className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100 w-full md:w-auto justify-center">
          <UserPlus size={20} /> নতুন ইউজার যোগ করুন
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="নাম দিয়ে খুঁজুন..." 
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">নাম ও ভূমিকা</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">ইমেইল</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">স্ট্যাটাস</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50/50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{user.name}</div>
                      <div className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">{user.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{user.email || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-lg border border-emerald-100">সক্রিয়</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}