"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BellPlus, FileText, Link as LinkIcon, Send, AlertCircle } from 'lucide-react';

export default function AddNoticePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    pdfUrl: '',
    category: 'General',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("নোটিশটি সফলভাবে প্রকাশ করা হয়েছে!");
        router.push('/#notice'); // হোমপেজের নোটিশ সেকশনে পাঠাবে
      }
    } catch (error) {
      alert("Error: নোটিশ সেভ করা সম্ভব হয়নি।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-slate-900 p-8 text-white flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-2xl">
              <BellPlus size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black">নতুন নোটিশ প্রকাশ</h1>
              <p className="text-slate-400 text-sm">প্রয়োজনীয় তথ্য ও পিডিএফ লিঙ্ক যুক্ত করুন</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">নোটিশের শিরোনাম</label>
              <input
                type="text"
                required
                placeholder="উদা: পবিত্র রমজানের ছুটি সংক্রান্ত নোটিশ"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* Category & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">ক্যাটেগরি</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none"
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="General">সাধারণ</option>
                  <option value="Exam">পরীক্ষা</option>
                  <option value="Holiday">ছুটি</option>
                  <option value="Admission">ভর্তি</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">তারিখ</label>
                <input
                  type="date"
                  value={formData.date}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none"
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">বিস্তারিত বর্ণনা</label>
              <textarea
                rows={4}
                required
                placeholder="নোটিশের বিস্তারিত এখানে লিখুন..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none"
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </div>

            {/* PDF URL Link */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <label className="block text-sm font-bold text-blue-700 mb-2 flex items-center gap-2">
                <LinkIcon size={16} /> পিডিএফ লিঙ্ক (ঐচ্ছিক)
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/file/d/..."
                className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 outline-none text-sm font-mono"
                onChange={(e) => setFormData({...formData, pdfUrl: e.target.value})}
              />
              <p className="text-[10px] text-blue-500 mt-2 flex items-center gap-1 italic">
                <AlertCircle size={10} /> গুগল ড্রাইভ বা ড্রপবক্স লিঙ্ক ব্যবহার করা ভালো।
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {loading ? "আপলোড হচ্ছে..." : <><Send size={20} /> নোটিশ পাবলিশ করুন</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}