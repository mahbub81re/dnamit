"use client";

import React, { useEffect, useState } from "react";

interface SheetData {
  values?: string[][];
}

interface LessonPlanProps {
  classvalue: number;
  RANGE: string;
}

const TodayWork: React.FC<LessonPlanProps> = ({ classvalue, RANGE }) => {
  const [data, setData] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const SHEET_ID = "1yKVQF3fOb62W8eqOeYOS82WQbe__SJsh_GKcmlKGEdg";
  const API_KEY = "AIzaSyAr1sRDRMy6hG0nrek9IdHjc4-dJPIJJhI";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("ডাটা ফেচ করতে সমস্যা হচ্ছে।");
        }

        const result: SheetData = await response.json();
        setData(result.values || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "একটি অজানা সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classvalue, RANGE]); // classvalue বা RANGE পরিবর্তন হলে আবার ডাটা লোড হবে

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium animate-pulse">লোড হচ্ছে...</p>
    </div>
  );

  if (error) return (
    <div className="p-6 text-center bg-red-50 rounded-xl border border-red-100 m-4">
      <p className="text-red-500 font-semibold">ত্রুটি: {error}</p>
    </div>
  );

  return (
    <div className="w-full">
      {/* মোবাইল ফ্রেন্ডলি কন্টেইনার: overflow-x-auto বড় টেবিলকে স্ক্রল করতে সাহায্য করবে */}
      <div className="overflow-hidden bg-white">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50">
                {data[0]?.map((header, idx) => (
                  <th key={idx} className="px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50/50 transition-colors">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-4 text-sm text-slate-700 whitespace-nowrap">
                      {cell || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length === 0 && (
          <div className="p-16 text-center">
            <p className="text-slate-400">এই ক্লাসের জন্য কোনো তথ্য পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayWork;