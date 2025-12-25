"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Bell, Clock, Calendar, BookOpen, 
  ChevronRight, ArrowUpRight, Play, Award, GraduationCap 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PremiumMadrasahLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#112428] text-slate-200 font-kalpurush selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* --- Background Elements --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* --- 1. Top Mini Bar --- */}
        <div className="flex justify-between items-center mb-6 px-4 py-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-[10px] md:text-sm font-sans tracking-tight">
         <div></div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Clock size={14}/> 11:13:52 AM</span>
            <span className="flex items-center gap-1.5"><Calendar size={14}/> 25/12/2025</span>
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-1 rounded-full font-bold transition-all text-xs">অনলাইন আবেদন</button>
            <Menu className="cursor-pointer lg:hidden" onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>

        {/* --- 2. Floating Header Area --- */}
        <div className="relative mb-8 p-6 md:p-10 bg-gradient-to-r from-emerald-900/40 to-teal-800/30 backdrop-blur-2xl rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="bg-white p-2 rounded-full shadow-emerald-500/20 shadow-2xl border-2 border-emerald-400/50">
             <div className="bg-white p-1 rounded-full shadow-2xl border-2 border-emerald-400/50">
  <div className="bg-emerald-50 h-16 w-16 md:h-24 md:w-24 rounded-full flex items-center justify-center overflow-hidden">
    <Image 
      src="/logo.jpeg" 
      height={96} 
      width={96} 
      alt="DNAM"
      className="object-cover h-full w-full"
    />
  </div>
</div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">দারুন নাঈম আলিম মাদরাসা</h1>
              <p className="text-sm md:text-xl text-emerald-300/80 font-sans tracking-[0.2em] mt-1">DARUN NAYEEM ALIM MADRASAH</p>
            </div>
          </div>
          <button className="hidden lg:flex items-center gap-2 bg-gradient-to-b from-amber-300 to-amber-500 text-black px-8 py-3 rounded-full font-black shadow-xl hover:scale-105 transition-transform">
             এখনই আবেদন <ArrowUpRight size={20}/>
          </button>
        </div>

        {/* --- 3. Main Body Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Horizontal Nav (Desktop) */}
            <nav className="hidden lg:flex bg-[#e6a119] p-1 rounded-2xl shadow-lg">
              {['হোম', 'পরিচিতি', 'একাডেমিক', 'ভর্তি', 'আবাসন', 'লাইব্রেরি', 'যোগাযোগ'].map((item, i) => (
                <button key={i} className={`flex-1 py-3 font-bold text-black rounded-xl hover:bg-black/5 transition-all ${i === 0 ? 'bg-black/10' : ''}`}>
                  {item}
                </button>
              ))}
            </nav>

            {/* News Ticker */}
            <div className="flex items-center bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
              <div className="bg-red-500 text-white px-6 py-3 font-bold flex items-center gap-2 shrink-0 animate-pulse">
                <Bell size={20}/> নোটিশ:
              </div>
  
  <div className="relative flex overflow-x-hidden">
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "-100%" }}
      transition={{
        repeat: Infinity,
        duration: 20, // গতি কমাতে বা বাড়াতে এই সংখ্যাটি পরিবর্তন করুন
        ease: "linear",
      }}
      className="whitespace-nowrap text-slate-300 font-bold pr-4 italic py-3"
    >
      ২০২৬ শিক্ষাবর্ষে প্লে থেকে আলিম পর্যন্ত ভর্তি ফরম বিতরণ শুরু হয়েছে। আগামী ১০ই জানুয়ারি ভর্তি পরীক্ষা অনুষ্ঠিত হবে।
    </motion.div>
  </div>
            </div>

            {/* Hero Image & Short Message */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group overflow-hidden rounded-[2.5rem] border-4 border-white/5 shadow-2xl">
                <img src="/CM.jpeg" className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" alt="Building"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                 <div className="absolute top-4 right-6 text-emerald-500/20 italic font-serif text-8xl">"</div>
                 <div className="flex items-center gap-4 mb-6">
                    <img src="CM.jpeg" className="w-16 h-16 rounded-2xl border-2 border-emerald-500 object-cover shadow-xl" alt="Principal"/>
                    <div>
                      <h4 className="font-bold text-white">Chairman</h4>
                      <p className="text-xs text-emerald-400 font-sans tracking-widest uppercase">Darun Nayeem Alim Madrasah</p>
                    </div>
                 </div>
                 <p className="text-slate-400 leading-relaxed italic relative z-10">
                    "সুশিক্ষিত ও নৈতিক প্রজন্ম গড়াই আমাদের মূল লক্ষ্য। আধুনিক ও দ্বীনি শিক্ষার অপূর্ব সমন্বয়ে আমরা এগিয়ে যাচ্ছি আগামীর তরে ইনশাআল্লাহ।"
                 </p>
              </div>
            </div>

            {/* About Section Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/5 p-8 rounded-[3rem] border border-white/10">
              <div>
                <h3 className="text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">একাডেমিক কার্যক্রম</h3>
                <p className="text-slate-400 mb-6 font-medium">হাদিস, তাফসির ও আরবি সাহিত্যের পাশাপাশি আধুনিক বিজ্ঞান ও তথ্যপ্রযুক্তিতে আমরা শিক্ষার্থীদের পারদর্শী করে তুলি।</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 flex flex-col items-center">
                    <span className="text-2xl font-black text-emerald-400">৮০০+</span>
                    <span className="text-[10px] uppercase font-bold opacity-50">শিক্ষার্থী</span>
                  </div>
                  <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 flex flex-col items-center">
                    <span className="text-2xl font-black text-amber-400">১০০%</span>
                    <span className="text-[10px] uppercase font-bold opacity-50">পাসের হার</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full"></div>
                <img src="/students.jpeg" className="rounded-3xl shadow-2xl relative z-10 border-4 border-white/5" alt="Students"/>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE NAVIGATION (AI DESIGN STYLE) */}
          <div className="lg:col-span-3">
             <div className="sticky top-28 space-y-4">
                <div className="bg-gradient-to-b from-white/10 to-transparent backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-6 shadow-2xl">
                  <div className="flex flex-col gap-4">
                    {['ভর্তি', 'ফলাফল', 'সিলেবাস', 'প্রশাসন', 'লাইব্রেরি', 'যোগাযোগ'].map((link, i) => (
                      <button key={i} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-all text-sm font-bold border border-transparent hover:border-white/10">
                        <span className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">{link}</span>
                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                          <ChevronRight size={16}/>
                        </div>
                      </button>
                    ))}
                    <Link href={"/qr/login"} className="mt-4 w-full py-4 bg-amber-500 text-black rounded-2xl font-black shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                      <Play size={18} fill="black" /> লগইন
                    </Link>
                  </div>
                </div>
                
                {/* Stats Mini Card */}
                <div className="bg-emerald-950/40 p-6 rounded-[2.5rem] border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="text-amber-500"/>
                    <span className="text-sm font-bold opacity-70 uppercase tracking-tighter">প্রতিষ্ঠিত</span>
                  </div>
                  <h5 className="text-3xl font-black text-white">২০১৪ ইং</h5>
                </div>
             </div>
          </div>

        </div>

        {/* --- Footer Footer --- */}
        <footer className="mt-20 pt-10 border-t border-white/5 text-center text-slate-500 text-sm font-sans tracking-widest pb-10 uppercase">
          &copy; 2025 Darun Nayeem Alim Madrasah. All Rights Reserved.
        </footer>
      </div>

      {/* --- Mobile Overlay Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[100] bg-[#112428] p-8 flex flex-col justify-center items-center gap-8"
          >
            <X className="absolute top-8 right-8 cursor-pointer text-emerald-400" size={32} onClick={() => setIsMobileMenuOpen(false)} />
            <div className="flex flex-col gap-6 text-3xl font-black text-center">
              {['হোম', 'পরিচিতি', 'একাডেমিক', 'ভর্তি', 'যোগাযোগ'].map(item => (
                <button key={item} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 transition-colors">{item}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}