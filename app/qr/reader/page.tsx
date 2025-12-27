"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
  { ssr: false }
);

function QrScannerComponent() {
  const [scannedResult, setScannedResult] = useState('স্ক্যান করার জন্য ক্যামেরা ধরুন');
  const [loading, setLoading] = useState(false);

  const handleScan = async (result: any[]) => {
    if (result && result.length > 0 && !loading) {
      const teacherlink = result[0].rawValue;
      const segments = teacherlink.split('/');
      const qrcode = "Mahbub"
      
      setLoading(true);
      setScannedResult("শনাক্ত করা হচ্ছে...");

      try {
        const now = new Date();
        const dhakaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
        const hours = dhakaTime.getHours();
        const minutes = dhakaTime.getMinutes();
        const currentTimeInMinutes = hours * 60 + minutes;

        let status = "Enter"; 
        const lateThreshold = 505; // 8:25 AM
        const exitThreshold = 840; // 2:00 PM

        if (currentTimeInMinutes >= exitThreshold) status = "Exit";
        else if (currentTimeInMinutes > lateThreshold) status = "Late";
        else status = "Enter";

        const response = await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ qrcode, status, date: new Date() }),
        });

        const data = await response.json();

        if (data.status === 'success') {
          setScannedResult(`${qrcode} - আপনার ${status} রেকর্ড হয়েছে ✅`);
        } else {
          setScannedResult(`ব্যর্থ: ${data.message} ❌`);
        }
      } catch (error) {
        setScannedResult("সার্ভার কানেকশন এরর! ⚠️");
      } finally {
        // ৩ সেকেন্ড বিরতি যাতে ডাবল স্ক্যান বা লুপ না হয়
        setTimeout(() => {
            setLoading(false);
            setScannedResult('পরবর্তী স্ক্যানের জন্য অপেক্ষা করছি...');
        }, 3000);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full border border-slate-100">
        <h2 className="text-xl font-black mb-6 text-slate-800 text-center">মাদরাসা স্মার্ট হাজিরা</h2>
        <button onClick={() => handleScan([{ rawValue: 'T-Mahbub' }])} className="mt-4 text-xs text-slate-300">Test Scan</button>
        <div className={`relative rounded-2xl overflow-hidden border-4 transition-colors ${loading ? 'border-orange-400' : 'border-emerald-500'}`}>
          <Scanner
            onScan={handleScan}
            constraints={{ facingMode: 'environment' }}
            allowMultiple={false}
            paused={loading}
          />
          {loading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">স্টেটাস</p>
          <div className={`mt-2 p-4 rounded-xl font-bold transition-all ${
            scannedResult.includes('✅') ? 'bg-emerald-50 text-emerald-700' : 
            scannedResult.includes('❌') ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-600'
          }`}>
            {scannedResult}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrScannerComponent;