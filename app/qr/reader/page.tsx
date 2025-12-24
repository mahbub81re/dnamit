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
      const now = new Date();
      const dhakaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
      const hours = dhakaTime.getHours();
      const minutes = dhakaTime.getMinutes();
      const currentTimeInMinutes = hours * 60 + minutes;

      // লজিক ভেরিয়েবল
      let status = "Enter"; 
      const lateThreshold = 505; // ৮:২৫ AM
      const exitThreshold = 840; // ২:০০ PM

      // সময়ের ভিত্তিতে স্ট্যাটাস নির্ধারণ
      if (currentTimeInMinutes >= exitThreshold) {
        status = "Exit";
      } else if (currentTimeInMinutes > lateThreshold) {
        status = "Late";
      } else {
        status = "Enter";
      }

      setScannedResult(`প্রসেসিং: ${status}...`);

      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId, status, date: new Date().toISOString().split('T')[0] }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setScannedResult(`অভিনন্দন! আপনার ${status} রেকর্ড হয়েছে।`);
      } else {
        setScannedResult(`দুঃখিত: ${data.message}`);
      }
    } catch (error) {
      setScannedResult("সার্ভার কানেকশন এরর!");
    } finally {
      setTimeout(() => setLoading(false), 2000); // ২ সেকেন্ড বিরতি যাতে ডাবল স্ক্যান না হয়
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