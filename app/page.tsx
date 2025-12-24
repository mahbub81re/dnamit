"use client";
import React from 'react';
import Link from 'next/link';
import { 
  QrCode, Users, ShieldCheck, BarChart3, Clock, ArrowRight, 
  BookOpen, Bell, MapPin, Phone, Mail, Award, 
  User
} from 'lucide-react';
import { useEffect, useState } from 'react';
export default function LandingPage() {
  

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setIsLoggedIn(true);
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 1. Navigation Bar */}
      <nav className="border-b sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg shadow-lg shadow-emerald-100">
              <BookOpen className="text-white" size={24} />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-slate-800">
              দারুন নাঈম <span className="text-emerald-600">আলিম মাদরসা</span>
            </span>
          </div>
          
          <div className="hidden lg:flex gap-8 font-semibold text-slate-600">
            <a href="#about" className="hover:text-emerald-600 transition">মাদরাসা পরিচিতি</a>
            <a href="#teachers" className="hover:text-emerald-600 transition">শিক্ষকবৃন্দ</a>
            <a href="#notice" className="hover:text-emerald-600 transition">নোটিশ</a>
            <Link href="/qr/att" className="hover:text-emerald-600 transition">হাজিরা রিপোর্ট</Link>
          </div>

          <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link href="/profile" className="bg-emerald-100 text-emerald-700 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-200 transition flex items-center gap-2 border border-emerald-200">
              <User size={18} /> প্রোফাইল
            </Link>
          ) : (
            <Link href="/qr/login" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition shadow-lg flex items-center gap-2">
              <QrCode size={18} /> স্ক্যানার
            </Link>
          )}
        </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative py-16 md:py-24 bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 px-4 py-2 rounded-full mb-8 shadow-sm animate-bounce">
            <Bell size={16} className="text-emerald-500" />
            <span className="text-xs md:text-sm font-bold text-slate-600">ভর্তি চলছে ২০২৬ শিক্ষাবর্ষে</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
            আধুনিক দ্বীনি শিক্ষার <br /> 
            <span className="text-emerald-600">নির্ভরযোগ্য প্রতিষ্ঠান</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mb-10 leading-relaxed font-medium">
            কুরআনী তালীম ও আধুনিক শিক্ষার সমন্বয়ে একটি আদর্শ প্রজন্ম গড়ার প্রত্যয়ে আমাদের পথচলা। এখন আরও স্মার্ট ডিজিটাল হাজিরা সিস্টেমের সাথে।
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/qr/scanner" className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition shadow-xl shadow-emerald-200 flex items-center gap-2">
              হাজিরা দিন <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Notice Board Section */}
      <section id="notice" className="py-12 bg-white container mx-auto px-6">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">সর্বশেষ নোটিশ:</h3>
              <p className="text-slate-600 text-sm md:text-base">আগামীকাল শীতকালীন ছুটি উপলক্ষে মাদরাসা বন্ধ থাকবে।</p>
            </div>
          </div>
          <button className="text-amber-700 font-bold text-sm underline underline-offset-4">সব নোটিশ দেখুন</button>
        </div>
      </section>

      {/* 4. About Section (মাদরাসা পরিচিতি) */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1577891772247-46fd012f718f?auto=format&fit=crop&q=80&w=800" 
                alt="Madrasa Building" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black text-emerald-600">১০+</div>
                <div className="text-xs font-bold text-slate-500 uppercase">অভিজ্ঞ <br /> শিক্ষক</div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">আমাদের কথা</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-slate-800">মাদরাসা পরিচিতি</h2>
            <p className="text-slate-500 leading-relaxed mb-6 font-medium text-lg">
              দারুন নাঈম আল কুরআন একাডেমী একটি আধুনিক দ্বীনি শিক্ষা প্রতিষ্ঠান। যেখানে শিশু-কিশোরদেরকে হিফজুল কুরআনের পাশাপাশি জেনারেল শিক্ষায় পারদর্শী করে তোলা হয়। আমাদের লক্ষ্য হলো ইসলামের বুনিয়াদি শিক্ষার সাথে জাগতিক শিক্ষার চমৎকার সমন্বয়।
            </p>
            <ul className="space-y-4">
              {['হিফজুল কুরআন বিভাগ', 'নূরানী ও নাজেরা বিভাগ', 'জেনারেল ও আরবী ভাষা শিক্ষা'].map((item) => (
                <li key={item} className="flex items-center gap-3 font-bold text-slate-700">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full"></div> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Teachers Section (শিক্ষক পরিচিতি) */}
      <section id="teachers" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-800">সম্মানিত শিক্ষকবৃন্দ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeacherCard name="মাওলানা ওবায়দুল্লাহ" role="মুহতামিম" image="https://i.pravatar.cc/150?u=1" />
            <TeacherCard name="মাওলানা আব্দুল আজিজ" role="প্রধান শিক্ষক" image="https://i.pravatar.cc/150?u=2" />
            <TeacherCard name="হাফেজ জুবায়ের আহমেদ" role="হিফজ শিক্ষক" image="https://i.pravatar.cc/150?u=3" />
            <TeacherCard name="মাওলানা মাহমুদ উল্লাহ" role="আরবী প্রভাষক" image="https://i.pravatar.cc/150?u=4" />
          </div>
        </div>
      </section>

      {/* 6. Contact & Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 mb-16 border-b border-slate-800 pb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">যোগাযোগ</h3>
            <div className="space-y-4 opacity-70">
              <p className="flex items-center gap-3"><MapPin size={18} /> গৌরীপুর, চট্টগ্রাম বিভাগ, বাংলাদেশ</p>
              <p className="flex items-center gap-3"><Phone size={18} /> +৮৮০ ১২৩৪ ৫৬৭৮৯০</p>
              <p className="flex items-center gap-3"><Mail size={18} /> info@darunnayeem.com</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">গুরুত্বপূর্ণ লিঙ্ক</h3>
            <div className="flex flex-col gap-3 opacity-70">
              <Link href="/qr/att" className="hover:text-emerald-400">হাজিরা রিপোর্ট</Link>
              <Link href="/users" className="hover:text-emerald-400">ইউজার ম্যানেজমেন্ট</Link>
              <Link href="/qr/scanner" className="hover:text-emerald-400">QR স্ক্যানার</Link>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">সোসাল মিডিয়া</h3>
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition">FB</div>
              <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition">YT</div>
            </div>
          </div>
        </div>
        <p className="text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} দারুন নাঈম আল কুরআন একাডেমী। ডেভেলপড বাই আপনার টিম।
        </p>
      </footer>
    </div>
  );
}

// Teacher Card Component
function TeacherCard({ name, role, image }: { name: string, role: string, image: string }) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all">
      <div className="h-32 w-32 rounded-3xl mx-auto mb-6 overflow-hidden ring-4 ring-emerald-50">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-bold text-slate-800">{name}</h3>
      <p className="text-emerald-600 font-bold text-sm mt-1">{role}</p>
    </div>
  );
}




    
