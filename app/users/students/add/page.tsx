"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  UserPlus, Phone, MapPin, Calendar, 
  Droplet, ShieldCheck, CheckCircle2, 
  Users, Home, ArrowRight, ArrowLeft, GraduationCap
} from 'lucide-react';

export default function StudentAdmissionForm() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState({
    // প্রাতিষ্ঠানিক
    session: '২০২৫-২৬', admissionDate: '', studentId: '', className: 'Class 1', section: '', rollNo: '',
    // ব্যক্তিগত
    nameBengali: '', nameEnglish: '', gender: 'Male', bloodGroup: '', dob: '', age: '', birthRegNo: '', 
    nationality: 'Bangladeshi', height: '', weight: '', image: '',
    // অভিভাবক ও যোগাযোগ
    fatherName: '', fatherOccupation: '', fatherMobile: '', motherName: '', motherOccupation: '', motherMobile: '',
    annualIncome: '', emergencyGuardian: '', phone: '', address: '',
    currentAddress: { village: '', postOffice: '', upazila: '', district: '' },
    permanentAddress: { village: '', postOffice: '', upazila: '', district: '' },
    transport: '', residenceType: 'অনাবাসিক', timingType: 'ফুল টাইমিং',
    // পারিবারিক
    familyMembers: '', brothers: '', sisters: '', position: '',
    expatriate: 0, serviceHolder: 0, businessman: 0, studentCount: 0, unemployed: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return setStep(step + 1); // পরের ধাপে যাও

    setLoading(true);
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        alert(`অভিনন্দন! সফলভাবে নিবন্ধিত হয়েছে।`);
        router.push(`/users/students/${result.id}`); 
      } else {
        alert(result.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      }
    } catch (error) {
      alert("সার্ভারের সাথে যোগাযোগ করা সম্ভব হয়নি।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-10 text-slate-200">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-12 rounded-[3rem] shadow-2xl relative"
      >
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between mb-12 max-w-md mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step >= s ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/20 text-white/40'}`}>
                {s}
              </div>
              {s !== 3 && <div className={`h-1 w-20 mx-2 rounded-full ${step > s ? 'bg-emerald-500' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white flex justify-center items-center gap-3 italic">
             <GraduationCap className="text-emerald-400" size={40} /> 
             {step === 1 ? "প্রাতিষ্ঠানিক ও ব্যক্তিগত তথ্য" : step === 2 ? "অভিভাবক ও যোগাযোগ" : "পারিবারিক তথ্য"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">শিক্ষাবর্ষ</label>
                  <input type="text" value={formData.session} onChange={e => setFormData({...formData, session: e.target.value})} className="input-field" placeholder="২০২৫-২৬" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">নাম (বাংলায়)</label>
                  <input required type="text" value={formData.nameBengali} onChange={e => setFormData({...formData, nameBengali: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">নাম (ইংরেজিতে)</label>
                  <input required type="text" value={formData.nameEnglish} onChange={e => setFormData({...formData, nameEnglish: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">শ্রেণি</label>
                  <select value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="input-field bg-[#0f172a]">
                    <option>Play</option><option>Nursery</option><option>Class 1</option><option>Class 2</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">রোল</label>
                  <input type="number" value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">জন্ম নিবন্ধন নং</label>
                  <input type="text" value={formData.birthRegNo} onChange={e => setFormData({...formData, birthRegNo: e.target.value})} className="input-field" />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Parents & Contact */}
            {step === 2 && (
              <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">পিতার নাম</label>
                  <input type="text" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">পিতার পেশা</label>
                  <input type="text" value={formData.fatherOccupation} onChange={e => setFormData({...formData, fatherOccupation: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">মোবাইল নং</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value, fatherMobile: e.target.value})} className="input-field" placeholder="017XXXXXXXX" />
                </div>
                     <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">মাতার নাম</label>
                  <input type="text" value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">মাতার পেশা</label>
                  <input type="text" value={formData.motherOccupation} onChange={e => setFormData({...formData, motherOccupation: e.target.value})} className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">মোবাইল নং</label>
                  <input type="text" value={formData.motherMobile} onChange={e => setFormData({...formData, motherMobile: e.target.value})} className="input-field" placeholder="017XXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold opacity-60 uppercase">আবাসিক অবস্থা</label>
                  <select value={formData.residenceType} onChange={e => setFormData({...formData, residenceType: e.target.value})} className="input-field bg-[#0f172a]">
                    <option>আবাসিক</option><option>অনাবাসিক</option>
                  </select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold opacity-60 uppercase">বর্তমান ঠিকানা</label>
                  <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="input-field" placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা" />
                </div>
              </motion.div>
            )}

            {/* STEP 3: Family & Final */}
            {step === 3 && (
              <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold opacity-60 uppercase">পরিবারের সদস্য</label>
                    <input type="number" value={formData.familyMembers} onChange={e => setFormData({...formData, familyMembers: e.target.value})} className="input-field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold opacity-60 uppercase">ভাই</label>
                    <input type="number" value={formData.brothers} onChange={e => setFormData({...formData, brothers: e.target.value})} className="input-field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold opacity-60 uppercase">বোন</label>
                    <input type="number" value={formData.sisters} onChange={e => setFormData({...formData, sisters: e.target.value})} className="input-field" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold opacity-60 uppercase">ভাই-বোনের মধ্যে কততম?</label>
                    <input type="number" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="input-field" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-10 border-t border-white/5">
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
              {loading ? "সেভ হচ্ছে..." : step < 3 ? <>{ "পরবর্তী" } <ArrowRight size={20}/></> : <><CheckCircle2 size={24} /> ফাইনাল সাবমিট</>}
            </motion.button>
          </div>
        </form>
      </motion.div>

      <style jsx>{`
        .input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.25rem;
          padding: 0.9rem 1.25rem;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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