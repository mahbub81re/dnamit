"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, BookOpen, Bell, QrCode, 
  TrendingUp, Calendar, ArrowRight, Settings, 
  LogOut, LayoutDashboard, Menu, X, CheckCircle 
} from 'lucide-react';

export default function AdminDashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    todayAttendance: 0,
    activeNotices: 0
  });

  // ড্রয়ার বন্ধ করার ফাংশন
  const closeDrawer = () => setIsDrawerOpen(false);

  // ডামি ডাটা ফেচিং (এখানে আপনার API কল করতে পারেন)
  useEffect(() => {
    // উদাহরণ: fetch('/api/admin/stats').then(...)
    setStats({
      totalUsers: 124,
      todayAttendance: 108,
      activeNotices: 3
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      
      {/* --- 1. MOBILE HEADER --- */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-black tracking-tight text-lg">দারুন নাঈম এডমিন</span>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 hover:bg-slate-800 rounded-xl transition"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* --- 2. MOBILE DRAWER OVERLAY --- */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeDrawer}
        ></div>
      )}

      {/* --- 3. SIDEBAR / DRAWER --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-72 bg-slate-900 text-slate-400 p-6 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen
        ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button onClick={closeDrawer} className="lg:hidden absolute top-5 right-5 p-2 text-slate-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 text-white mb-10 px-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-xl font-black tracking-tight">এডমিন প্যানেল</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem href="/admin" icon={<LayoutDashboard size={18} />} label="ড্যাশবোর্ড" active onClick={closeDrawer} />
          <NavItem href="/qr/att" icon={<Calendar size={18} />} label="হাজিরা রিপোর্ট" onClick={closeDrawer} />
          <NavItem href="/lessons" icon={<BookOpen size={18} />} label="লেসন প্ল্যান" onClick={closeDrawer} />
          <NavItem href="/admin/notices" icon={<Bell size={18} />} label="নোটিশ বোর্ড" onClick={closeDrawer} />
          <NavItem href="/admin/users" icon={<Users size={18} />} label="ইউজার লিস্ট" onClick={closeDrawer} />
          <NavItem href="/qr/scanner" icon={<QrCode size={18} />} label="QR স্ক্যানার" onClick={closeDrawer} />
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <NavItem href="/settings" icon={<Settings size={18} />} label="সেটিংস" onClick={closeDrawer} />
          <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-500/10 hover:text-red-500 rounded-xl transition font-bold text-sm">
            <LogOut size={18} /> লগআউট
          </button>
        </div>
      </aside>

      {/* --- 4. MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        
        {/* Top Welcome Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">আস-সালামু আলাইকুম!</h1>
            <p className="text-slate-500 font-medium mt-1">মাদরাসার বর্তমান অবস্থা ও কার্যক্রম পরিচালনা করুন।</p>
          </div>
          <div className="bg-white p-2 pr-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100 uppercase">
              Admin
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">মুহতামিম</p>
              <p className="text-sm font-black text-slate-800">অ্যাডমিন ইউজার</p>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={<Users className="text-blue-600" size={24} />} 
            label="মোট ছাত্র ও শিক্ষক" 
            value={stats.totalUsers} 
            color="border-blue-100"
          />
          <StatCard 
            icon={<Calendar className="text-emerald-600" size={24} />} 
            label="আজকের উপস্থিতি" 
            value={stats.todayAttendance} 
            color="border-emerald-100"
          />
          <StatCard 
            icon={<Bell className="text-orange-600" size={24} />} 
            label="সক্রিয় নোটিশ" 
            value={stats.activeNotices} 
            color="border-orange-100"
          />
        </div>

        {/* Quick Action Cards */}
        <div className="mb-8 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">কুইক অ্যাকশন</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard 
            href="/admin/users/add" 
            title="নতুন ইউজার" 
            desc="নতুন ছাত্র বা শিক্ষক যোগ করুন" 
            icon={<Users size={20} />} 
            btnColor="bg-blue-600" 
          />
          <ActionCard 
            href="/lessons/add" 
            title="লেসন এন্ট্রি" 
            desc="আজকের পিরিয়ড ও হোমওয়ার্ক" 
            icon={<BookOpen size={20} />} 
            btnColor="bg-emerald-600" 
          />
          <ActionCard 
            href="/admin/notices/add" 
            title="নোটিশ পাবলিশ" 
            desc="পিডিএফ লিঙ্ক সহ নোটিশ দিন" 
            icon={<Bell size={20} />} 
            btnColor="bg-orange-600" 
          />
        </div>

      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function NavItem({ href, icon, label, active = false, onClick }: any) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
        active 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
        : 'hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon} {label}
    </Link>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className={`bg-white p-8 rounded-[2.5rem] border ${color} shadow-sm flex items-center gap-6`}>
      <div className="bg-slate-50 p-4 rounded-2xl">{icon}</div>
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</p>
        <h3 className="text-4xl font-black text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );
}

function ActionCard({ href, title, desc, icon, btnColor }: any) {
  return (
    <Link href={href} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all">
      <div className={`w-12 h-12 ${btnColor} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-100`}>
        {icon}
      </div>
      <h4 className="text-xl font-black text-slate-800 mb-2">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
        অ্যাকশন নিন <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
      </div>
    </Link>
  );
}