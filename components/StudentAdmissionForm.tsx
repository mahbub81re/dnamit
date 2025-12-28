"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Phone, MapPin, Calendar, Droplet, 
  ShieldCheck, CheckCircle2, Users, Home, 
  ArrowRight, ArrowLeft, GraduationCap, Briefcase, HeartPulse
} from 'lucide-react';

interface Props {
  initialData?: any;
  onSuccess?: () => void;
}

export default function StudentAdmissionForm({ initialData, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  // সম্পূর্ণ ডাটা স্ট্রাকচার যা আপনি আগে চেয়েছিলেন
  const [formData, setFormData] = useState({
    // প্রাতিষ্ঠানিক
    session: '২০২৫-২৬', admissionDate: '', studentId: '', className: 'Class 1', section: '', roll: '',
    // ব্যক্তিগত
    nameBengali: '', nameEnglish: '', gender: 'Male', bloodGroup: '', dob: '', birthRegNo: '', 
    nationality: 'Bangladeshi', height: '', weight: '', age: '',
    // অভিভাবক
    fatherName: '', fatherOccupation: '', fatherMobile: '', 
    motherName: '', motherOccupation: '', motherMobile: '',
    annualIncome: '', emergencyGuardian: '', phone: '', address: '',
    // ঠিকানা
    currentAddress: { village: '', postOffice: '', upazila: '', district: '' },
    permanentAddress: { village: '', postOffice: '', upazila: '', district: '' },
    residenceType: 'অনাবাসিক', timingType: 'ফুল টাইমিং', transport: '',
    // পারিবারিক তথ্য
    familyMembers: '', brothers: '', sisters: '', position: '',
    expatriate: 0, serviceHolder: 0, businessman: 0, studentCount: 0, unemployed: 0,
    status: 'Active'
  });

  // initialData থাকলে স্টেট আপডেট হবে (Edit Mode এর জন্য)
  useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return setStep(step + 1);

    setLoading(true);
    const url = initialData ? `/api/students/${initialData._id}` : '/api/students';
    const method = initialData ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(initialData ? "তথ্য সফলভাবে আপডেট হয়েছে!" : "শিক্ষার্থী ভর্তি সফল হয়েছে!");
        if (onSuccess) onSuccess();
      } else {
        const err = await res.json();
        alert(err.message || "সমস্যা হয়েছে!");
      }
    } catch (error) {
      alert("সার্ভারের সাথে যোগাযোগ করা সম্ভব হয়নি।");
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
        {/* Glow Effect */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black text-white flex items-center gap-3 italic">
              <GraduationCap className="text-emerald-400" size={36} /> 
              {initialData ? "তথ্য সংশোধন করুন" : "নতুন ভর্তি ফরম"}
            </h2>
            <p className="text-slate-400 mt-2">ধাপ {step} এর তথ্য পূরণ করুন (মোট ৩টি ধাপ)</p>
          </div>
          <div className="bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-400 text-sm font-bold flex items-center gap-2">
            <ShieldCheck size={16}/> {initialData ? "এডিট মোড" : "নিরাপদ রেজিস্ট্রেশন"}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            
            {/* ধাপ ১: প্রাতিষ্ঠানিক ও ব্যক্তিগত */}
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 col-span-full border-b border-white/5 pb-2 mb-2">
                  <h3 className="text-emerald-400 font-bold flex items-center gap-2"><UserPlus size={18}/> ব্যক্তিগত তথ্য</h3>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60">নাম (বাংলায়)</label>
                  <input required type="text" value={formData.nameBengali} onChange={e => setFormData({...formData, nameBengali: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60">নাম (ইংরেজিতে)</label>
                  <input required type="text" value={formData.nameEnglish} onChange={e => setFormData({...formData, nameEnglish: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60">রোল নম্বর</label>
                  <input required type="number" value={formData.roll} onChange={e => setFormData({...formData, roll: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60">ক্লাস / জামাত</label>
                  <select value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="input-field bg-[#0f172a]">
                    <option>Play</option><option>Nursery</option><option>Class 1</option><option>Class 2</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60">জন্ম নিবন্ধন নং</label>
                  <input type="text" value={formData.birthRegNo} onChange={e => setFormData({...formData, birthRegNo: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold opacity-60">লিঙ্গ</label>
                   <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="input-field bg-[#0f172a]">
                     <option value="Male">ছাত্র</option>
                     <option value="Female">ছাত্রী</option>
                   </select>
                </div>
              </motion.div>
            )}

            {/* ধাপ ২: অভিভাবক ও যোগাযোগ */}
            {step === 2 && (
              <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2 col-span-full border-b border-white/5 pb-2 mb-2">
                  <h3 className="text-emerald-400 font-bold flex items-center gap-2"><Briefcase size={18}/> অভিভাবকের তথ্য</h3>
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
                  <label className="text-sm font-bold opacity-60">ফোন নম্বর (লগইন আইডি)</label>
                  <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60">আবাসিক অবস্থা</label>
                  <select value={formData.residenceType} onChange={e => setFormData({...formData, residenceType: e.target.value})} className="input-field bg-[#0f172a]">
                    <option>আবাসিক</option><option>অনাবাসিক</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold opacity-60">বর্তমান ঠিকানা</label>
                  <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="input-field" placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা" />
                </div>
              </motion.div>
            )}

            {/* ধাপ ৩: পারিবারিক তথ্য */}
            {step === 3 && (
              <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="space-y-2 border-b border-white/5 pb-2 mb-2">
                  <h3 className="text-emerald-400 font-bold flex items-center gap-2"><Users size={18}/> পারিবারিক পরিসংখ্যান</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
                  <div className="space-y-1">
                    <label className="text-xs opacity-50">মোট সদস্য</label>
                    <input type="number" value={formData.familyMembers} onChange={e => setFormData({...formData, familyMembers: e.target.value})} className="input-field" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs opacity-50">ভাই</label>
                    <input type="number" value={formData.brothers} onChange={e => setFormData({...formData, brothers: e.target.value})} className="input-field" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs opacity-50">বোন</label>
                    <input type="number" value={formData.sisters} onChange={e => setFormData({...formData, sisters: e.target.value})} className="input-field" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs opacity-50">ভাই-বোনের মধ্যে কততম?</label>
                    <input type="number" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="input-field" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   <div className="space-y-2">
                      <label className="text-sm font-bold opacity-60">রক্তের গ্রুপ</label>
                      <select value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} className="input-field bg-[#0f172a]">
                        <option value="">নির্বাচন করুন</option>
                        {['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold opacity-60">স্ট্যাটাস</label>
                      <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="input-field bg-[#0f172a]">
                        <option value="Active">সক্রিয় (Active)</option>
                        <option value="Inactive">নিষ্ক্রিয় (Inactive)</option>
                      </select>
                   </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-white/5">
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition font-bold">
                <ArrowLeft size={20}/> পূর্ববর্তী
              </button>
            )}
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit" 
              className={`ml-auto px-10 py-4 rounded-2xl font-black text-lg flex items-center gap-3 transition-all ${loading ? 'bg-slate-700' : 'bg-emerald-500 text-black shadow-xl shadow-emerald-500/20'}`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  অপেক্ষা করুন...
                </div>
              ) : (
                step < 3 ? <>{ "পরবর্তী" } <ArrowRight size={20}/></> : <><CheckCircle2 size={24} /> {initialData ? "তথ্য আপডেট করুন" : "ভর্তি সম্পন্ন করুন"}</>
              )}
            </motion.button>
          </div>
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