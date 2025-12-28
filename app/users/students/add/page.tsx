"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, Phone, MapPin, Calendar, 
  Hash, Droplet, Users, ShieldCheck, CheckCircle2 
} from 'lucide-react';

export default function StudentAdmissionForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '', 
    roll: '', 
    class: 'Class 1',
    fatherName: '', 
    motherName: '', 
    phone: '',
    address: '', 
    bloodGroup: '', 
    dob: '',
    gender: 'Male', 
    status: 'Active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ফটো নেই তাই এখন JSON পাঠানো হবে
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert(`অভিনন্দন! আইডি: ${result.studentId} সফলভাবে নিবন্ধিত হয়েছে।`);
        // ফর্ম রিসেট করার জন্য:
        // window.location.reload(); 
      } else {
        alert(result.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      }
    } catch (error) {
      alert("সার্ভারের সাথে যোগাযোগ করা সম্ভব হয়নি।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-10 text-slate-200 selection:bg-emerald-500/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black text-white flex items-center gap-3 italic">
              <UserPlus className="text-emerald-400" size={36} /> নতুন ভর্তি ফরম
            </h2>
            <p className="text-slate-400 mt-2">শিক্ষার্থীর সঠিক তথ্য দিয়ে নিচের ফরমটি পূরণ করুন।</p>
          </div>
          <div className="bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-400 text-sm font-bold flex items-center gap-2">
            <ShieldCheck size={16}/> সিকিউর রেজিস্ট্রেশন
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60">শিক্ষার্থীর নাম</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field" placeholder="আব্দুল্লাহ মামুন" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60">রোল নম্বর</label>
              <input required type="number" value={formData.roll} onChange={e => setFormData({...formData, roll: e.target.value})} className="input-field" placeholder="যেমন: ১০১" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60">ক্লাস / জামাত</label>
              <select value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} className="input-field bg-[#0f172a]">
                <option>Play</option><option>Nursery</option><option>Class 1</option><option>Class 2</option>
                <option>Class 3</option><option>Class 4</option><option>Class 5</option>
              </select>
            </div>
          </div>

          {/* Section 2: Personal & Parents Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/5">
            <div className="space-y-2 lg:col-span-1">
              <label className="text-sm font-bold opacity-60">লিঙ্গ</label>
              <div className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/10">
                 {['Male', 'Female'].map(g => (
                   <label key={g} className="flex items-center gap-2 cursor-pointer text-sm font-bold">
                     <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={() => setFormData({...formData, gender: g as any})} className="accent-emerald-500" />
                     {g === 'Male' ? 'ছাত্র' : 'ছাত্রী'}
                   </label>
                 ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60">পিতার নাম</label>
              <input required type="text" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="input-field" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60">মাতার নাম</label>
              <input required type="text" value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} className="input-field" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 flex items-center gap-2"><Droplet size={14} className="text-red-500"/> রক্তোর গ্রুপ</label>
              <select value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} className="input-field bg-[#0f172a]">
                <option value="">নির্বাচন করুন</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
          </div>

          {/* Section 3: Contact & Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 flex items-center gap-2"><Phone size={14}/> ফোন নম্বর (লগইন আইডি)</label>
              <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input-field" placeholder="017XXXXXXXX" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 flex items-center gap-2"><Calendar size={14}/> জন্ম তারিখ</label>
              <input required type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="input-field [color-scheme:dark]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-60 flex items-center gap-2"><MapPin size={14}/> ঠিকানা</label>
              <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="input-field" placeholder="গ্রাম, উপজেলা, জেলা" />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading}
            type="submit" 
            className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl shadow-emerald-500/20'}`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ডাটা সেভ হচ্ছে...
              </div>
            ) : (
              <><CheckCircle2 size={24} /> তথ্য নিশ্চিত এবং সেভ করুন</>
            )}
          </motion.button>
        </form>
      </motion.div>

      <style jsx>{`
        .input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 0.85rem 1.25rem;
          outline: none;
          font-weight: 500;
          transition: all 0.3s;
        }
        .input-field:focus {
          border-color: #10b981;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.1);
        }
      `}</style>
    </div>
  );
}