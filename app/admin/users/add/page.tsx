"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, User, Mail, Lock, ShieldCheck, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student', // ডিফল্ট রোল
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("ইউজার সফলভাবে তৈরি হয়েছে!");
        router.push('/admin/users'); // ইউজার লিস্টে পাঠিয়ে দিবে
      } else {
        alert(data.message || "কিছু একটা সমস্যা হয়েছে!");
      }
    } catch (error) {
      alert("সার্ভার এরর! আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Back Button */}
        <Link href="/admin/users" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-6 transition">
          <ArrowLeft size={18} /> ফিরে যান
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-8 text-white">
            <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
              <UserPlus size={30} />
            </div>
            <h1 className="text-2xl font-black">নতুন ইউজার যোগ করুন</h1>
            <p className="text-blue-100 text-sm mt-1 font-medium">মাদরাসার ডাটাবেসে নতুন ছাত্র বা শিক্ষক রেজিস্টার করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">পুরো নাম</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  placeholder="উদা: আব্দুল্লাহ ইবনে আলী"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition font-medium"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">ইমেইল (লগইন এর জন্য)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition font-medium"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Role & Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">ইউজার রোল</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition font-bold text-slate-700 appearance-none"
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="student">ছাত্র (Student)</option>
                    <option value="teacher">শিক্ষক (Teacher)</option>
                    <option value="admin">এডমিন (Admin)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">পাসওয়ার্ড</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    required
                    placeholder="******"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? "প্রসেসিং হচ্ছে..." : <><Save size={20} /> ইউজার সেভ করুন</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}