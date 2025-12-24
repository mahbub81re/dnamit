"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') {
      router.push('/'); // এডমিন না হলে হোমপেজে পাঠিয়ে দিবে
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return <div className="h-screen flex items-center justify-center">অনুমতি যাচাই করা হচ্ছে...</div>;
  return <>{children}</>;
}