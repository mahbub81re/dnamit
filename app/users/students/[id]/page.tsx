"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tiro_Bangla } from 'next/font/google'; // গুগল ফন্ট ইম্পোর্ট
import { Printer, ArrowLeft, GraduationCap, Phone, MapPin } from 'lucide-react';

// Tiro Bangla ফন্ট সেটআপ
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
      const res = await fetch(`/api/students/${id}`);
      const json = await res.json();
      if (json.success) setStudent(json.data);
      setLoading(false);
    };
    fetchStudent();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold">অপেক্ষা করুন...</div>;

  return (
    <div className={`${tiroBangla.className} min-h-screen bg-stone-100 py-10 print:p-0 print:bg-white`}>
      
      {/* অ্যাকশন বাটন */}
      <div className="max-w-[794px] mx-auto mb-6 flex justify-between items-center print:hidden px-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-stone-600 hover:text-black transition-all">
          <ArrowLeft size={18} /> ফিরে যান
        </button>
        <button onClick={() => window.print()} className="bg-stone-800 text-white px-8 py-2 rounded-md font-bold shadow-md flex items-center gap-2 hover:bg-black">
          <Printer size={18} /> প্রিন্ট করুন
        </button>
      </div>

      {/* A4 পেজ বডি */}
      <div className="mx-auto bg-white w-[794px] min-h-[1123px] relative shadow-[0_0_40px_rgba(0,0,0,0.1)] print:shadow-none print:m-0 print:border-none border border-stone-200">
        
        {/* ক্লাসিক্যাল বর্ডার ডিজাইন */}
        <div className="absolute inset-8 border border-stone-300 pointer-events-none"></div>
        <div className="absolute inset-10 border-2 border-stone-800 pointer-events-none"></div>

        <div className="p-20 relative z-10 flex flex-col h-full">
          
          {/*Header - Tiro Bangla-এ এটি খুব রাজকীয় দেখাবে */}
          <div className="text-center mb-12">
            <h1 className="text-5xl text-stone-900 mb-2">দারুন নাঈম আলিম মাদ্রাসা</h1>
            <p className="text-xl text-stone-700">গৌরীপুর, দাউদকান্দি, কুমিল্লা</p>
            <div className="mt-6 flex justify-center">
              <span className="border-y-2 border-stone-800 py-1 px-10 text-2xl font-bold text-stone-900 uppercase tracking-widest">
                শিক্ষার্থী নিবন্ধন পত্র
              </span>
            </div>
          </div>

          {/* আইডি ও তথ্য ব্লক */}
          <div className="flex justify-between mb-8">
            <div className="space-y-1">
              <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Student Database ID</p>
              <h2 className="text-3xl font-bold text-stone-900 font-mono tracking-tighter">{student.studentId}</h2>
              <p className="text-stone-600 italic">তারিখ: {new Date().toLocaleDateString('bn-BD')}</p>
            </div>
            {/* ফটো ফ্রেম */}
            <div className="w-32 h-32 border-2 border-stone-800 bg-stone-50 flex items-center justify-center p-2">
               <div className="w-full h-full border border-dashed border-stone-300 flex items-center justify-center text-[10px] text-stone-400 text-center italic">
                  ছবি সংযুক্ত করুন
               </div>
            </div>
          </div>

          {/* ডাটা গ্রিড - প্রথাগত স্টাইল */}
          <div className="grid grid-cols-1 gap-y-6 text-stone-800">
            <PrintRow label="শিক্ষার্থীর নাম" value={student.name} isLarge />
            <div className="grid grid-cols-2 gap-x-10">
               <PrintRow label="শ্রেণি / জামাত" value={student.class} />
               <PrintRow label="রোল নম্বর" value={student.roll} />
            </div>
            <div className="grid grid-cols-2 gap-x-10">
               <PrintRow label="পিতার নাম" value={student.fatherName} />
               <PrintRow label="মাতার নাম" value={student.motherName} />
            </div>
            <div className="grid grid-cols-3 gap-x-6">
               <PrintRow label="জন্ম তারিখ" value={student.dob} />
               <PrintRow label="লিঙ্গ" value={student.gender === 'Male' ? 'ছাত্র' : 'ছাত্রী'} />
               <PrintRow label="রক্তের গ্রুপ" value={student.bloodGroup || 'অজানা'} />
            </div>
            <PrintRow label="যোগাযোগের নম্বর" value={student.phone} />
            <PrintRow label="বর্তমান ও স্থায়ী ঠিকানা" value={student.address} />
          </div>

          {/* অফিসিয়াল ডিক্লেয়ারেশন */}
          <div className="mt-6 text-sm text-stone-600 leading-relaxed italic border-l-4 border-stone-200 pl-4">
            আমি এই মর্মে অঙ্গীকার করছি যে, উপরে বর্ণিত তথ্যসমূহ সম্পূর্ণ সত্য। মাদ্রাসার সকল নিয়ম ও শৃঙ্খলা মেনে চলতে আমি প্রতিশ্রুতিবদ্ধ।
          </div>

          {/* স্বাক্ষর সেকশন */}
          <div className="mt-auto pt-10 flex justify-between items-end px-4">
            <div className="text-center">
              <div className="w-40 border-t border-stone-800 pt-2 text-sm">অভিভাবকের স্বাক্ষর</div>
            </div>
            <div className="text-center">
              <div className="w-40 border-t-2 border-stone-900 pt-2 text-lg font-bold">অধ্যক্ষ / অফিস প্রধান</div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}

// প্রিন্ট রো কম্পোনেন্ট
function PrintRow({ label, value, isLarge = false }: any) {
  return (
    <div className="border-b border-stone-200 pb-1 flex flex-col gap-1">
      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">{label}</span>
      <span className={`${isLarge ? 'text-2xl' : 'text-lg'} text-stone-900`}>{value}</span>
    </div>
  );
}