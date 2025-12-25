import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';
import './globals.css';

// ১. লোকাল ফন্ট কনফিগার করা
const kalpurush = localFont({
  src: '../public/kalpurush.ttf', // আপনার ফন্ট ফাইলের সঠিক পাথ দিন
  variable: '--font-kalpurush',        // একটি CSS ভেরিয়েবল তৈরি করা
});



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Darun Nayeem Alim Madrasah",
  description: "একটি দ্বীনি প্রতিষ্ঠান",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kalpurush.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
