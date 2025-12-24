"use client";
import React, { useState, useMemo } from 'react';
import { Calendar, Clock, User as UserIcon, CheckCircle, AlertCircle, LogOut, Search, Filter } from 'lucide-react';

export default function AttendanceListPage({ initialRecords }: { initialRecords: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ফিল্টারিং লজিক
  const filteredRecords = useMemo(() => {
    return initialRecords.filter((record) => {
      const matchesSearch = record.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || record.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, initialRecords]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      {/* Header & Filters */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                হাজিরা <span className="text-blue-600">ফিল্টার</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="নাম দিয়ে খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select
                  className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm appearance-none font-medium text-slate-600 cursor-pointer"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">সব স্ট্যাটাস</option>
                  <option value="Enter">শুধু প্রবেশ</option>
                  <option value="Late">শুধু বিলম্ব</option>
                  <option value="Exit">শুধু প্রস্থান</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {/* Results Counter */}
        <p className="text-sm text-slate-500 mb-4 font-medium">
          ফলাফল পাওয়া গেছে: <span className="text-blue-600 font-bold">{filteredRecords.length} টি</span>
        </p>

        {/* Table/Card View Logic */}
        {filteredRecords.length > 0 ? (
          <>
            {/* Desktop View */}
            <div className="hidden md:block overflow-hidden bg-white rounded-3xl shadow-sm border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">ইউজার</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold">তারিখ</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold text-center">অবস্থা</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-widest text-slate-400 font-bold text-right">সময়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((record: any) => (
                    <tr key={record._id} className="hover:bg-blue-50/20 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold">
                            {record.user?.name?.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">{record.user?.name || 'অজানা'}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">{record.user?.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium text-sm">{record.date}</td>
                      <td className="px-6 py-4"><StatusBadge status={record.status} /></td>
                      <td className="px-6 py-4 text-right font-mono text-slate-500 text-sm">{formatTime(record.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-3">
              {filteredRecords.map((record: any) => (
                <div key={record._id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {record.user?.name?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">{record.user?.name}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{record.user?.role}</p>
                      </div>
                    </div>
                    <StatusBadge status={record.status} />
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-50 text-[12px]">
                    <span className="text-slate-400">{record.date}</span>
                    <span className="font-bold text-slate-700">{formatTime(record.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
             <Search size={40} className="mx-auto text-slate-200 mb-4" />
             <p className="text-slate-500 font-medium">আপনার খোঁজা তথ্যের সাথে কোনো রেকর্ড মিলেনি!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// নিচের ফাংশন এবং কম্পোনেন্টগুলো আগের মতোই থাকবে
function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('bn-BD', {
    timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hour12: true
  });
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Enter: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Late: "bg-amber-50 text-amber-700 border-amber-100",
    Exit: "bg-blue-50 text-blue-700 border-blue-100",
  };
  const labels: any = { Enter: "প্রবেশ", Late: "বিলম্ব", Exit: "প্রস্থান" };
  return (
    <div className={`flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-sm ${styles[status]}`}>
      {labels[status]}
    </div>
  );
}