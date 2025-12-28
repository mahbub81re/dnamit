"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tiro_Bangla } from 'next/font/google';
import { Printer, ArrowLeft, GraduationCap, Users, Home, MapPin, BookOpen } from 'lucide-react';

const tiroBangla = Tiro_Bangla({ 
  weight: ['400'],
  subsets: ['bengali'],
  display: 'swap',
});

export default function TiroBanglaPrintView() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/${id}`);
        const json = await res.json();
        if (json.success) setStudent(json.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchStudent();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold italic">মাদ্রাসার রেকর্ড রুম থেকে তথ্য আনা হচ্ছে...</div>;
  if (!student) return <div className="h-screen flex items-center justify-center font-bold">শিক্ষার্থী খুঁজে পাওয়া যায়নি!</div>;

  return (
    <div className={`${tiroBangla.className} min-h-screen bg-stone-100 py-10 print:p-0 print:bg-white`}>
      
      {/* অ্যাকশন বাটন */}
      <div className="max-w-[794px] mx-auto mb-6 flex justify-between items-center print:hidden px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-stone-600 hover:text-black transition-all font-bold">
          <ArrowLeft size={18} /> ফিরে যান
        </button>
        <button onClick={() => window.print()} className="bg-emerald-700 text-white px-8 py-2 rounded-md font-bold shadow-md flex items-center gap-2 hover:bg-emerald-800 transition-all">
          <Printer size={18} /> এডমিশন কপি প্রিন্ট
        </button>
      </div>

      {/* A4 পেজ বডি */}
      <div className="mx-auto bg-white w-[794px] min-h-[1123px] relative shadow-[0_0_50px_rgba(0,0,0,0.1)] print:shadow-none print:m-0 print:border-none border border-stone-200 overflow-hidden">
        
        {/* ক্লাসিক্যাল বর্ডার ডিজাইন */}
        <div className="absolute inset-4 border border-stone-200 pointer-events-none"></div>
        <div className="absolute inset-6 border-2 border-stone-800 pointer-events-none"></div>

        <div className="p-16 relative z-10 flex flex-col h-full">
          
          {/*Header*/}
          <div className="text-center mb-10">
            <h1 className="text-5xl text-stone-900 mb-2 font-bold">দারুন নাঈম আলিম মাদ্রাসা</h1>
            <p className="text-lg text-stone-700">গৌরীপুর, দাউদকান্দি, কুমিল্লা</p>
            <div className="mt-4 flex justify-center">
              <span className="bg-stone-900 text-white py-1 px-8 text-xl font-bold rounded-sm uppercase tracking-widest">
                ভর্তি আবেদন ফরম
              </span>
            </div>
          </div>

          {/* আইডি ও বেসিক রো */}
          <div className="flex justify-between items-start mb-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-stone-400 uppercase">শিক্ষাবর্ষ</span>
                <span className="text-lg border-b border-stone-300 w-24">{student.session || '২০২৫-২৬'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-stone-400 uppercase">আইডি নং</span>
                <span className="text-xl font-bold text-stone-900">{student.studentId}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase">ভর্তির তারিখ</span>
                <span className="text-md italic">{student.admissionDate || new Date().toLocaleDateString('bn-BD')}</span>
              </div>
            </div>

            {/* ফটো ফ্রেম */}
            <div className="w-32 h-40 border-2 border-stone-800 bg-stone-50 flex items-center justify-center p-1">
               <div className="w-full h-full border border-dashed border-stone-300 flex items-center justify-center text-[10px] text-stone-400 text-center italic">
                 {student.image ? <img src={student.image} className="w-full h-full object-cover" /> : "ছবি সংযুক্ত করুন"}
               </div>
            </div>
          </div>

          {/* তথ্য সেকশন - ১: ব্যক্তিগত */}
          <div className="space-y-5">
            <SectionHeader title="ব্যক্তিগত তথ্য" icon={<GraduationCap size={16}/>} />
            <div className="grid grid-cols-1 gap-y-4">
               <PrintRow label="শিক্ষার্থীর নাম (বাংলায়)" value={student.nameBengali} isLarge />
               <PrintRow label="শিক্ষার্থীর নাম (ইংরেজিতে)" value={student.nameEnglish} />
               <div className="grid grid-cols-3 gap-6">
                 <PrintRow label="শ্রেণি" value={student.className} />
                 <PrintRow label="শাখা" value={student.section || 'সাধারণ'} />
                 <PrintRow label="ক্রমিক নং (রোল)" value={student.rollNo || student.roll} />
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <PrintRow label="জন্ম নিবন্ধন নং" value={student.birthRegNo} />
                 <PrintRow label="জন্ম তারিখ" value={student.dob} />
               </div>
               <div className="grid grid-cols-3 gap-6">
                 <PrintRow label="লিঙ্গ" value={student.gender === 'Male' ? 'ছাত্র' : 'ছাত্রী'} />
                 <PrintRow label="রক্তের গ্রুপ" value={student.bloodGroup} />
                 <PrintRow label="জাতীয়তা" value={student.nationality || 'বাংলাদেশী'} />
               </div>
            </div>

            {/* তথ্য সেকশন - ২: অভিভাবক ও ঠিকানা */}
            <SectionHeader title="অভিভাবক ও যোগাযোগ" icon={<Home size={16}/>} />
            <div className="grid grid-cols-1 gap-y-4">
               <div className="grid grid-cols-2 gap-6">
                 <PrintRow label="পিতার নাম" value={student.fatherName} />
                 <PrintRow label="মাতার নাম" value={student.motherName} />
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <PrintRow label="পিতার পেশা" value={student.fatherOccupation} />
                 <PrintRow label="জরুরী মোবাইল" value={student.phone} />
               </div>
               <PrintRow label="বর্তমান ঠিকানা" value={student.address} />
               <div className="grid grid-cols-2 gap-6">
                 <PrintRow label="আবাসিক ধরন" value={student.residenceType} />
                 <PrintRow label="টাইমিং" value={student.timingType} />
               </div>
            </div>

            {/* তথ্য সেকশন - ৩: পারিবারিক */}
            <SectionHeader title="পারিবারিক তথ্য" icon={<Users size={16}/>} />
            <div className="grid grid-cols-4 gap-6">
               <PrintRow label="পরিবারের সদস্য" value={student.familyMembers} />
               <PrintRow label="ভাই" value={student.brothers || student.siblings?.brothers} />
               <PrintRow label="বোন" value={student.sisters || student.siblings?.sisters} />
               <PrintRow label="কততম সন্তান" value={student.position || student.siblings?.position} />
            </div>
          </div>

          {/* ডিক্লেয়ারেশন ও স্বাক্ষর */}
          <div className="mt-auto">
            <div className="text-[11px] text-stone-500 italic mb-10 border-t border-stone-100 pt-4">
              * আমি অঙ্গীকার করছি যে, উপরে প্রদত্ত সকল তথ্য সঠিক। তথ্যের কোনো ভুল প্রমাণিত হলে কর্তৃপক্ষ ভর্তি বাতিল করার অধিকার রাখে।
            </div>
            
            <div className="flex justify-between items-end px-4">
              <div className="text-center space-y-2">
                <div className="w-36 h-12 border-b border-stone-400"></div>
                <p className="text-xs font-bold text-stone-800">অভিভাবকের স্বাক্ষর</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-36 h-12 border-b border-stone-400"></div>
                <p className="text-xs font-bold text-stone-800">ভর্তি অফিসারের স্বাক্ষর</p>
              </div>
              <div className="text-center space-y-2">
                <div className="px-6 py-2 border-2 border-double border-stone-900 font-black text-lg">অধ্যক্ষ</div>
                <p className="text-[10px] text-stone-400 uppercase">Seal & Signature</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact; background: white; }
          .print-hidden { display: none; }
        }
      `}</style>
    </div>
  );
}

// সেকশন হেডার কম্পোনেন্ট
function SectionHeader({ title, icon }: any) {
  return (
    <div className="flex items-center gap-2 border-b-2 border-stone-800 pb-1 mt-4">
      <span className="text-stone-800">{icon}</span>
      <span className="text-sm font-black uppercase tracking-wider text-stone-900">{title}</span>
    </div>
  );
}

// প্রিন্ট রো কম্পোনেন্ট
function PrintRow({ label, value, isLarge = false }: any) {
  return (
    <div className="flex flex-col gap-0.5 min-h-[40px]">
      <span className="text-[9px] uppercase font-bold text-stone-400 tracking-tighter leading-none">{label}</span>
      <span className={`${isLarge ? 'text-xl font-bold' : 'text-md'} text-stone-800 border-b border-stone-100 pb-1`}>
        {value || '---'}
      </span>
    </div>
  );
}