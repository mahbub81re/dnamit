"use client";
import React, { useState } from 'react';
import { BookOpen, ChevronRight, Calendar, Menu, X } from 'lucide-react';
import LessonPlan from '@/components/TodayWork';

export default function LessonDashboard() {
  const [selectedClass, setSelectedClass] = useState({ id: 1, name: "Play", range:"B3:D7"});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // মোবাইলের জন্য টগল স্টেট

  const classes = [
    { id: 1, name: "Play" , range:"B3:D7"}, { id: 2, name: "Nursery" , range:"R3:V7"}, { id: 3, name: "One" , range:"R3:V7"},
    { id: 4, name: "Two" , range:"R3:V7" }, { id: 5, name: "Three" , range:"R3:V7"}, { id: 6, name: "Four", range:"R3:V7" },
    { id: 7, name: "Five", range:"R3:V7" }, { id: 8, name: "Six" , range:"R3:V7"}, { id: 9, name: "Seven" , range:"R3:V7"},
    { id: 10, name: "Eight", range:"R3:V7"}, { id: 11, name: "Nine" , range:"R3:V7"}, { id: 12, name: "Ten" , range:"R3:V7"},
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row relative">
      
      {/* মোবাইল টপ বার (শুধুমাত্র মোবাইলের জন্য) */}
      <div className="lg:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2 font-black text-slate-800">
          <BookOpen className="text-emerald-600" size={20} />
          <span>Lesson Plan</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-slate-100 rounded-lg text-slate-600"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar: Mobile Friendly Responsive Drawer */}
      <aside className={`
        fixed inset-0 z-40 lg:relative lg:z-auto
        w-full lg:w-72 bg-white border-r p-6 overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <h2 className="hidden lg:flex text-xl font-black text-slate-800 mb-6 items-center gap-2">
          <BookOpen className="text-emerald-600" /> ক্লাসসমূহ
        </h2>
        
        <div className="flex flex-col gap-2 mt-12 lg:mt-0">
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => {
                setSelectedClass(cls);
                setIsSidebarOpen(false); // ক্লিক করলে মোবাইল মেনু বন্ধ হবে
              }}
              className={`flex items-center justify-between p-4 rounded-xl text-sm font-bold transition-all ${
                selectedClass.id === cls.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${selectedClass.id === cls.id ? "bg-white" : "bg-slate-300"}`} />
                {cls.name}
              </div>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 w-full overflow-hidden">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-3xl font-black text-slate-800 flex items-center gap-2">
              <Calendar className="text-blue-500" size={28} /> 
              {selectedClass.name}
            </h1>
            <p className="text-slate-500 text-xs lg:text-sm mt-1">আজকের নির্ধারিত পাঠ পরিকল্পনা</p>
          </div>
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold self-start">
            তারিখ: {new Date().toLocaleDateString('bn-BD')}
          </div>
        </div>

        {/* LessonPlan Wrapper: Mobile Scroll Handling */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
             <LessonPlan classvalue={selectedClass.id} RANGE={selectedClass.range} />
          </div>
        </div>
      </main>

      {/* মবিল মেনু ওপেন থাকলে ব্যাকগ্রাউন্ড আবছা করার জন্য */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}