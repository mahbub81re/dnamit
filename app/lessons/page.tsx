"use client";
import React, { useState } from 'react';
import { BookOpen, Home, ChevronRight, Clock, ClipboardList,Calendar } from 'lucide-react';

const CLASSES = ["Play", "Nursery", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

export default function LessonDashboard() {
  const [selectedClass, setSelectedClass] = useState("Class 1");

  // ডামি ডাটা (পরবর্তীতে API থেকে আসবে)
  const todayData = {
    class: selectedClass,
    homework: "গণিত অনুশীলনী ২.৩ এর ১-১০ নং অংক সমাধান করবে এবং আরবী ৫টি নতুন শব্দ মুখস্থ করবে।",
    periods: [
      { id: 1, subject: "আরবী", topic: "কুরআন তিলাওয়াত ও তাজবীদ" },
      { id: 2, subject: "বাংলা", topic: "গদ্য: অমর একুশে" },
      { id: 3, subject: "গণিত", topic: "শতকরার হিসাব" },
      { id: 4, subject: "ইংরেজি", topic: "Tense: Present Continuous" },
      { id: 5, subject: "ইতিহাস", topic: "প্রাচীন বাংলা" },
      { id: 6, subject: "বিজ্ঞান", topic: "সালোকসংশ্লেষণ" },
      { id: 7, subject: "দ্বীনিয়াত", topic: "সালাতের মাসায়েল" },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      
      {/* Sidebar: Class List (১২টি ক্লাস) */}
      <aside className="w-full lg:w-72 bg-white border-r p-6 overflow-y-auto">
        <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <BookOpen className="text-emerald-600" /> ক্লাসসমূহ
        </h2>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
          {CLASSES.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`p-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                selectedClass === cls 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 scale-105' 
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {cls}
              <ChevronRight size={14} className={selectedClass === cls ? 'block' : 'hidden md:block opacity-30'} />
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content: Lesson Plan & Homework */}
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase">{selectedClass}</h1>
              <p className="text-slate-500 font-medium">আজকের লেসন প্ল্যান ও ডায়েরি</p>
            </div>
            <div className="bg-white px-5 py-2 rounded-2xl border shadow-sm flex items-center gap-3">
              <Calendar size={18} className="text-emerald-500" />
              <span className="font-bold text-slate-700">{new Date().toLocaleDateString('bn-BD')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 7 Periods Table */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Clock className="text-blue-500" size={20} /> ঘণ্টা ভিত্তিক পাঠদান
              </h3>
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                {todayData.periods.map((p, index) => (
                  <div key={p.id} className={`flex items-center p-4 md:p-6 transition-colors hover:bg-slate-50 ${index !== 6 ? 'border-b border-slate-50' : ''}`}>
                    <div className="h-10 w-10 md:h-12 md:w-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 mr-4 shrink-0">
                      ০{p.id}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-extrabold text-slate-800 text-sm md:text-base">{p.subject}</h4>
                      <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">{p.topic}</p>
                    </div>
                    <div className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-lg uppercase tracking-tighter">
                      ৪০ মিনিট
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Homework (Diary) */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Home className="text-orange-500" size={20} /> আজকের হোম ওয়ার্ক
              </h3>
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-orange-100 relative overflow-hidden">
                <ClipboardList className="absolute -bottom-4 -right-4 opacity-20" size={120} />
                <p className="relative z-10 leading-relaxed font-medium italic">
                  "{todayData.homework}"
                </p>
                <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
                  <p className="text-xs font-bold uppercase opacity-70">দ্রষ্টব্য:</p>
                  <p className="text-[10px] mt-1 opacity-90">শিক্ষার্থীরা ডায়েরি লিখে ক্লাসের শেষে শিক্ষককে দেখাবে।</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}