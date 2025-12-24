"use client";
import React, { useState, useEffect } from 'react';
import { Bell, FileText, ExternalLink, Calendar, Plus } from 'lucide-react';
import Link from 'next/link';

export default function NoticeManagement() {
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/notices').then(res => res.json()).then(data => setNotices(data.data || []));
  }, []);

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3"><Bell className="text-orange-500" /> নোটিশ বোর্ড</h1>
        <Link href="/admin/notices/add" className="bg-slate-900 text-white p-3 rounded-xl hover:bg-orange-600 transition shadow-lg">
          <Plus size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.map((notice) => (
          <div key={notice._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-orange-200 transition">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full border border-orange-100">
                  {notice.category || 'General'}
                </span>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                  <Calendar size={14} /> {notice.date}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">{notice.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{notice.content}</p>
            </div>
            
            {notice.pdfUrl && (
              <div className="mt-6 pt-4 border-t border-slate-50">
                <a href={notice.pdfUrl} target="_blank" className="flex items-center justify-between text-blue-600 font-bold text-xs hover:underline">
                  <span className="flex items-center gap-2"><FileText size={16} /> সংযুক্ত পিডিএফ (PDF)</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}