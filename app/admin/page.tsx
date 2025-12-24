"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Users, BookOpen, Bell, QrCode, 
  TrendingUp, Calendar, ArrowRight, Settings, 
  LogOut, LayoutDashboard 
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      
      {/* Sidebar - Desktop */}
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-400 p-6 flex flex-col sticky top-0 h-screen hidden lg:flex">
        <div className="flex items-center gap-3 text-white mb-10 px-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-xl font-black tracking-tight">এডমিন প্যানেল</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem href="/admin" icon={<LayoutDashboard size={18} />} label="ড্যাশবোর্ড" active />
          <NavItem href="/qr/att" icon={<Calendar size={18} />} label="হাজিরা রিপোর্ট" />
          <NavItem href="/lessons/add" icon={<BookOpen size={18} />} label="লেসন প্ল্যান" />
          <NavItem href="/admin/notices/add" icon={<Bell size={18} />} label="নোটিশ বোর্ড" />
          <NavItem href="/users" icon={<Users size={18} />} label="ইউজার লিস্ট" />
          <NavItem href="/qr/reader" icon={<QrCode size={18} />} label="QR স্ক্যানার" />
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <NavItem href="/settings" icon={<Settings size={18} />} label="সেটিংস" />
          <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-500/10 hover:text-red-500 rounded-xl transition font-bold text-sm">
            <LogOut size={18} /> লগআউট
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">আস-সালামু আলাইকুম!</h1>
            <p className="text-slate-500 font-medium mt-1">আজকের মাদরাসার সংক্ষিপ্ত চিত্র এখানে দেখুন।</p>
          </div>
          <div className="bg-white p-2 rounded-2xl shadow-sm border flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">A</div>
            <div className="pr-4">
              <p className="text-xs font-bold text-slate-400 uppercase leading-none">এডমিন</p>
              <p className="text-sm font-black text-slate-800">মুহতামিম সাহেব</p>
            </div>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<Users className="text-blue-600" />} label="মোট ছাত্র/শিক্ষক" value="১২৪" trend="+৫ জন নতুন" />
          <StatCard icon={<Calendar className="text-emerald-600" />} label="আজকের হাজিরা" value="১০৮" trend="৮৫% উপস্থিতি" />
          <StatCard icon={<BookOpen className="text-purple-600" />} label="আজকের লেসন" value="১২/১২" trend="সম্পন্ন হয়েছে" />
          <StatCard icon={<Bell className="text-orange-600" />} label="সক্রিয় নোটিশ" value="০৩" trend="সর্বশেষ ২ দিন আগে" />
        </div>

        {/* Action Shortcuts */}
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" /> কুইক অ্যাকশন
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionLink 
            href="/admin/notices/add" 
            title="নতুন নোটিশ দিন" 
            desc="পিডিএফ বা টেক্সট নোটিশ পাবলিশ করুন" 
            color="bg-orange-500"
          />
          <ActionLink 
            href="/lessons/add" 
            title="লেসন প্ল্যান এন্ট্রি" 
            desc="প্রতিদিনের ডায়েরি ও পড়া আপডেট করুন" 
            color="bg-blue-600"
          />
          <ActionLink 
            href="/users/add" 
            title="নতুন ইউজার যোগ" 
            desc="নতুন ছাত্র বা শিক্ষক রেজিস্টার করুন" 
            color="bg-emerald-600"
          />
        </div>
      </main>
    </div>
  );
}

// Helper Components
function NavItem({ href, icon, label, active = false }: any) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
      {icon} {label}
    </Link>
  );
}

function StatCard({ icon, label, value, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition">
      <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">{icon}</div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
      <h3 className="text-3xl font-black text-slate-900 my-1">{value}</h3>
      <p className="text-xs font-bold text-emerald-500">{trend}</p>
    </div>
  );
}

function ActionLink({ href, title, desc, color }: any) {
  return (
    <Link href={href} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-transparent hover:shadow-xl transition-all relative overflow-hidden">
      <div className={`absolute top-0 right-0 h-2 w-full ${color}`}></div>
      <h4 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-slate-500 text-sm mt-2 mb-4 leading-relaxed">{desc}</p>
      <div className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">
        অ্যাকশন নিন <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
      </div>
    </Link>
  );
}