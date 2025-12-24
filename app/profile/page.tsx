"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Shield, LogOut, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/qr/scanner'); // লগইন না থাকলে স্ক্যানারে পাঠাবে
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">লোড হচ্ছে...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Top Header */}
      <div className="bg-emerald-600 h-48 w-full relative">
        <Link href="/" className="absolute top-6 left-6 text-white bg-white/20 p-2 rounded-full backdrop-blur-md">
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div className="container mx-auto px-4 -mt-20">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden max-w-2xl mx-auto">
          {/* Profile Avatar */}
          <div className="flex flex-col items-center pt-10 pb-6 border-b border-slate-50">
            <div className="h-32 w-32 bg-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-4 border-4 border-white shadow-lg">
              <User size={60} />
            </div>
            <h1 className="text-2xl font-black text-slate-800">{user.name}</h1>
            <span className="bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase mt-2 border border-emerald-100">
              {user.role}
            </span>
          </div>

          {/* Details */}
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="bg-white p-3 rounded-xl text-slate-400 shadow-sm"><Mail size={20} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ইমেইল এড্রেস</p>
                <p className="font-semibold text-slate-700">{user.email || 'তথ্য নেই'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="bg-white p-3 rounded-xl text-slate-400 shadow-sm"><Shield size={20} /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ইউজার আইডি</p>
                <p className="font-mono text-sm text-slate-500">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 pb-10 flex flex-col gap-3">
            <Link href="/qr/att" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition">
              <Calendar size={20} /> আমার হাজিরার রিপোর্ট
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition border border-red-100"
            >
              <LogOut size={20} /> লগআউট করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}