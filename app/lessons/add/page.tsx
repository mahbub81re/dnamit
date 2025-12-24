"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, PlusCircle, Trash2, BookOpen, Calendar as CalendarIcon, ClipboardList } from 'lucide-react';

const CLASSES = ["Play", "Nursery", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

export default function AddLessonPlan() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    class: "Class 1",
    date: new Date().toISOString().split('T')[0],
    homework: "",
    periods: Array.from({ length: 7 }, (_, i) => ({
      periodNumber: i + 1,
      subject: "",
      topic: ""
    }))
  });

  const handlePeriodChange = (index: number, field: string, value: string) => {
    const updatedPeriods = [...formData.periods];
    updatedPeriods[index] = { ...updatedPeriods[index], [field]: value };
    setFormData({ ...formData, periods: updatedPeriods });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("লেসন প্ল্যান সফলভাবে সেভ হয়েছে!");
        router.push('/lessons');
      } else {
        alert("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-100">
            <PlusCircle className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">নতুন লেসন প্ল্যান</h1>
            <p className="text-slate-500 font-medium">আজকের পাঠদান ও বাড়ির কাজ এন্ট্রি দিন</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <BookOpen size={16} className="text-emerald-500" /> ক্লাস নির্বাচন করুন
              </label>
              <select 
                value={formData.class}
                onChange={(e) => setFormData({...formData, class: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700"
              >
                {CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <CalendarIcon size={16} className="text-emerald-500" /> তারিখ
              </label>
              <input 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700"
              />
            </div>
          </div>

          {/* Periods Entry List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 px-2 flex items-center gap-2">
               ঘণ্টা ভিত্তিক লেসন (১ম - ৭ম)
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {formData.periods.map((period, index) => (
                <div key={index} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4 transition-all hover:border-emerald-200">
                  <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black shrink-0 border border-emerald-100">
                    {period.periodNumber}
                  </div>
                  <div className="flex-1 w-full">
                    <input 
                      type="text"
                      placeholder="বিষয়ের নাম (উদা: আরবী)"
                      required
                      value={period.subject}
                      onChange={(e) => handlePeriodChange(index, 'subject', e.target.value)}
                      className="w-full bg-transparent border-b border-slate-100 py-1 focus:border-emerald-500 outline-none text-sm font-bold text-slate-800"
                    />
                  </div>
                  <div className="flex-[2] w-full">
                    <input 
                      type="text"
                      placeholder="আজকের আলোচনার বিষয় বা অধ্যায়"
                      required
                      value={period.topic}
                      onChange={(e) => handlePeriodChange(index, 'topic', e.target.value)}
                      className="w-full bg-transparent border-b border-slate-100 py-1 focus:border-emerald-500 outline-none text-sm text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Homework Section */}
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <ClipboardList size={18} className="text-orange-500" /> আজকের ডায়েরি / হোম ওয়ার্ক
            </label>
            <textarea 
              rows={4}
              placeholder="শিক্ষার্থীদের জন্য বাড়ির কাজ এখানে লিখুন..."
              required
              value={formData.homework}
              onChange={(e) => setFormData({...formData, homework: e.target.value})}
              className="w-full bg-orange-50/30 border border-orange-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none font-medium text-slate-700"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {loading ? "সেভ হচ্ছে..." : <><Save size={24} /> লেসন প্ল্যান সেভ করুন</>}
          </button>
        </form>
      </div>
    </div>
  );
}