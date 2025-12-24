"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'; // পেজ পরিবর্তনের জন্য

const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
  { ssr: false }
);

function QrScannerComponent() {
  const [scannedResult, setScannedResult] = useState('স্ক্যান করার জন্য অপেক্ষা করছি...');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleScan = async (result: any[]) => {
    if (result && result.length > 0 && !loading) {
      const rawValue = result[0].rawValue;
      // আইডি বের করা: লিঙ্ক হোক বা শুধু আইডি স্ট্রিং
      const segments = rawValue.split('/');
      const userId = segments[segments.length - 1];
      
      setLoading(true);
      setScannedResult("ভেরিফাই করা হচ্ছে...");

      try {
        // ১. সার্ভারে চেক করা এই আইডি'র কোনো ইউজার আছে কি না
        // আমরা এটেনডেন্স API-কেই কিছুটা মডিফাই করে লগইন চেক করতে পারি অথবা নতুন লগইন API
        const response = await fetch('/api/users/login-qr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();

        if (data.status === 'success') {
          // ২. ব্রাউজারে ইউজার ডাটা সেভ করা (লগইন সেশন)
          localStorage.setItem('user', JSON.stringify(data.user));
          
          setScannedResult(`স্বাগতম, ${data.user.name}! লগইন সফল।`);
          
          // ৩. ২ সেকেন্ড পর ড্যাশবোর্ডে পাঠিয়ে দেওয়া
          setTimeout(() => {
            router.push(''); // অথবা ইউজারের প্রোফাইল পেজ
          }, 1500);
        } else {
          setScannedResult(`ভুল কিউআর কোড: ${data.message}`);
        }
      } catch (error) {
        setScannedResult("সার্ভার কানেকশন এরর!");
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 text-center min-h-screen flex flex-col justify-center">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800">QR লগইন</h2>
        <p className="text-slate-500 mt-2">আপনার আইডি কার্ডের কিউআর কোডটি স্ক্যান করুন</p>
      </div>

      <div className="relative border-4 border-blue-600 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-black">
        <Scanner
          onScan={handleScan}
          constraints={{ facingMode: 'environment' }}
          paused={loading}
        />
        {/* স্ক্যানার ওভারলে অ্যানিমেশন */}
        <div className="absolute inset-0 border-[40px] border-black/20 pointer-events-none"></div>
        {!loading && <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan"></div>}
      </div>

      <div className={`mt-10 p-6 rounded-3xl transition-all ${loading ? 'bg-blue-50' : 'bg-gray-50'}`}>
        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-2">স্ট্যাটাস</p>
        <p className={`text-lg font-bold ${loading ? 'text-blue-600 animate-pulse' : 'text-slate-700'}`}>
          {scannedResult}
        </p>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan {
          position: absolute;
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default QrScannerComponent;