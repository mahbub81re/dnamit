"use client";
import React, { useState, useMemo } from 'react';
import { Search, Filter, Users } from 'lucide-react';

export default function AttendanceListClient({ initialRecords = [] }: { initialRecords: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All"); // 'All', 'Teacher', 'Student'

  // ফিল্টারিং লজিক
  const filteredRecords = useMemo(() => {
    return initialRecords.filter((record) => {
      const matchesSearch = record.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "All" || record.user?.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [searchTerm, roleFilter, initialRecords]);

  return (
    <div className="p-4 md:p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <Users className="text-blue-600" /> হাজিরা রিপোর্ট
        </h2>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* সার্চ বক্স */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="নাম দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* রোল ফিল্টার ড্রপডাউন */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-600 appearance-none"
            >
              <option value="All">সকল ইউজার</option>
              <option value="teacher">শিক্ষক</option>
              <option value="student">ছাত্র</option>
            </select>
          </div>
        </div>
      </div>

      {/* টেবিল বা লিস্ট ডাটা */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">নাম ও রোল</th>
              <th className="px-6 py-4">সময়</th>
              <th className="px-6 py-4">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredRecords.map((record: any) => (
              <tr key={record._id} className="hover:bg-slate-50/50 transition">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{record.user?.name}</div>
                  <div className={`text-[10px] font-bold uppercase ${record.user?.role === 'Teacher' ? 'text-purple-600' : 'text-blue-500'}`}>
                    {record.user?.role}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(record.createdAt).toLocaleTimeString('bn-BD')}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    record.status === 'Late' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredRecords.length === 0 && (
          <div className="text-center py-10 text-slate-400 font-medium">
            কোনো তথ্য পাওয়া যায়নি!
          </div>
        )}
      </div>
    </div>
  );
}