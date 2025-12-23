"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
//import { toast, Toaster } from 'react-hot-toast'; // নোটিফিকেশনের জন্য (ঐচ্ছিক)

const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
  { ssr: false }
);

function QrScannerComponent() {
  const [scannedResult, setScannedResult] = useState('স্ক্যান করার জন্য অপেক্ষা করছি...');
  const [loading, setLoading] = useState(false);

const handleScan = async (result: any[]) => {
    if (result && result.length > 0 && !loading) {
      const teacherlink = result[0].rawValue;
      const segments = teacherlink.split('/');
      const teacherId = segments[segments.length - 1];
      
      setLoading(true);

      try {
        // ১. বাংলাদেশের বর্তমান সময় বের করা
        const now = new Date();
        const dhakaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
        const hours = dhakaTime.getHours();
        const minutes = dhakaTime.getMinutes();
        const currentTimeInMinutes = hours * 60 + minutes;

        // ২. সময়ের লজিক সেট করা
        // ৮:২৫ = (৮ * ৬০) + ২৫ = ৫০৫ মিনিট
        // ১৪:০০ (২:০০ PM) = ১৪ * ৬০ = ৮৪০ মিনিট
        
        let status = "Enter"; // ডিফল্ট

        if (currentTimeInMinutes >= 840) {
          status = "Exit"; // দুপুর ২টার পর
        } else if (currentTimeInMinutes > 505) {
          status = "Late"; // সকাল ৮:২৫ এর পর
        } else {
          status = "Enter"; // ৮:২৫ এর আগে
        }

        setScannedResult(`প্রসেসিং: ${status} (${teacherId})`);

        // ৩. API কল করা
        const response = await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            teacherId, 
            status: status 
          }),
        });

        const data = await response.json();

        if (data.status === 'success') {
          setScannedResult(`সফল ভাবে ${status} হয়েছে: ${teacherId}`);
        } else {
          setScannedResult(`ভুল: ${data.message}`);
        }
      } catch (error) {
        console.error(error);
        setScannedResult("সার্ভার এরর!");
      } finally {
        // ১ সেকেন্ড পর আবার স্ক্যান করার সুযোগ দিবে
        setTimeout(() => setLoading(false), 1000);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 text-center">
      {/* <Toaster /> */}
      {scannedResult}
      <h2 className="text-2xl font-bold mb-4">মাদরাসা হাজিরা সিস্টেম (QR)</h2>

      <div className="border-4 border-green-500 rounded-lg overflow-hidden shadow-xl">
        <Scanner
          onScan={handleScan}
          constraints={{ facingMode: 'environment' }}
          allowMultiple={false}
          paused={loading} // প্রসেসিং চলাকালীন স্ক্যানার বন্ধ থাকবে
        />
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">স্ক্যান রেজাল্ট:</p>
        <p className="text-lg font-mono font-bold text-blue-700">{scannedResult}</p>
      </div>

      {loading && <p className="mt-2 text-orange-500 animate-pulse">ডাটাবেসে সেভ হচ্ছে...</p>}
    </div>
  );
}

export default QrScannerComponent;