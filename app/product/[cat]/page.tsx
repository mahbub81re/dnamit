"use client";

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';

/** * Type Definitions 
 */

interface CartItem {
  name: string;
  price: number;
  qty: number;
}
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;      // পণ্যর ছবি
  description: string; // পণ্যর ছোট বর্ণনা
}

type CartState = Record<string, CartItem>;


const PRODUCTS_DATA: Record<string, Product[]> = {
  "grocery": [
    { "id": "g1", "name": "মিনিকেট চাল", "price": 72, "image": "https://placehold.co/400x400?text=Rice", "description": "উন্নত মানের পলিশ করা চাল।" },
    { "id": "g2", "name": "নাজিরশাইল চাল", "price": 85, "image": "https://placehold.co/400x400?text=Rice", "description": "প্রিমিয়াম কোয়ালিটি নাজিরশাইল।" },
    { "id": "g3", "name": "সয়াবিন তেল (৫লি)", "price": 810, "image": "https://placehold.co/400x400?text=Oil", "description": "পুষ্টিগুণ সম্পন্ন ফ্রেশ তেল।" },
    { "id": "g4", "name": "মসুর ডাল (দেশি)", "price": 140, "image": "https://placehold.co/400x400?text=Dal", "description": "দ্রুত সেদ্ধ হওয়া দেশি ডাল।" },
    { "id": "g5", "name": "চিনি (সাদা)", "price": 135, "image": "https://placehold.co/400x400?text=Sugar", "description": "পরিষ্কার দানাদার সাদা চিনি।" },
    { "id": "g6", "name": "লবণ (আয়োডিনযুক্ত)", "price": 42, "image": "https://placehold.co/400x400?text=Salt", "description": "বিশুদ্ধ আয়োডিনযুক্ত লবণ।" },
    { "id": "g7", "name": "আটা (২ কেজি)", "price": 115, "image": "https://placehold.co/400x400?text=Atta", "description": "লাল বা সাদা আটা।" },
    { "id": "g8", "name": "ময়দা (২ কেজি)", "price": 130, "image": "https://placehold.co/400x400?text=Maida", "description": "উন্নত মানের রিফাইনড ময়দা।" },
    { "id": "g9", "name": "গুড়ো দুধ (৫০০ গ্রাম)", "price": 450, "image": "https://placehold.co/400x400?text=Milk", "description": "ফুল ক্রিম মিল্ক পাউডার।" },
    { "id": "g10", "name": "চা পাতা (৪০০ গ্রাম)", "price": 220, "image": "https://placehold.co/400x400?text=Tea", "description": "সুগন্ধি ও কড়া লিকারের চা।" },
    { "id": "g11", "name": "হলুদ গুড়ো", "price": 60, "image": "https://placehold.co/400x400?text=Spice", "description": "১০০ গ্রাম খাঁটি হলুদ গুড়ো।" },
    { "id": "g12", "name": "মরিচ গুড়ো", "price": 80, "image": "https://placehold.co/400x400?text=Spice", "description": "১০০ গ্রাম ঝাল মরিচ গুড়ো।" },
    { "id": "g13", "name": "জিরা (১০০ গ্রাম)", "price": 120, "image": "https://placehold.co/400x400?text=Spice", "description": "আস্ত ফ্রেশ জিরা।" },
    { "id": "g14", "name": "গরম মশলা", "price": 150, "image": "https://placehold.co/400x400?text=Spice", "description": "মিক্সড মশলার প্যাকেট।" },
    { "id": "g15", "name": "সুজি (৫০০ গ্রাম)", "price": 45, "image": "https://placehold.co/400x400?text=Suji", "description": "পরিষ্কার ও ফ্রেশ সুজি।" },
    { "id": "g16", "name": "পোলাও চাল (১ কেজি)", "price": 150, "image": "https://placehold.co/400x400?text=Rice", "description": "সুগন্ধি চিনিগুড়া চাল।" },
    { "id": "g17", "name": "ঘি (২০০ গ্রাম)", "price": 350, "image": "https://placehold.co/400x400?text=Ghee", "description": "খাঁটি গাওয়া ঘি।" },
    { "id": "g18", "name": "মধু (২৫০ গ্রাম)", "price": 280, "image": "https://placehold.co/400x400?text=Honey", "description": "সুন্দরবনের প্রাকৃতিক মধু।" },
    { "id": "g19", "name": "কালোজিরা", "price": 50, "image": "https://placehold.co/400x400?text=Spice", "description": "৫০ গ্রাম ফ্রেশ কালোজিরা।" },
    { "id": "g20", "name": "ছোলা (১ কেজি)", "price": 110, "image": "https://placehold.co/400x400?text=Chola", "description": "দেশি উন্নত মানের ছোলা।" }
  ],

  "ramadan": [
    { "id": "r1", "name": "মসুর ডাল (১ কেজি)", "price": 140, "image": "https://placehold.co/400x400?text=Lentils", "description": "দ্রুত সেদ্ধ হওয়া দেশি মসুর ডাল।" },
    { "id": "r2", "name": "মাষকলাই ডাল (১ কেজি)", "price": 180, "image": "https://placehold.co/400x400?text=BlackGram", "description": "উন্নত মানের বাছাইকৃত মাষকলাই।" },
    { "id": "r3", "name": "মুগ ডাল (১ কেজি)", "price": 160, "image": "https://placehold.co/400x400?text=MoongDal", "description": "সোনালী ভাজা সুগন্ধি মুগ ডাল।" },
    { "id": "r4", "name": "খেজুর (জাহিদি)", "price": 280, "image": "https://placehold.co/400x400?text=Dates", "description": "৫০০ গ্রাম প্রিমিয়াম জাহিদি খেজুর।" },
    { "id": "r5", "name": "বেসন (১ কেজি)", "price": 145, "image": "https://placehold.co/400x400?text=Besan", "description": "খাঁটি বুটের ডালের মিহি বেসন।" },
    { "id": "r6", "name": "মুড়ি (৫০০ গ্রাম)", "price": 60, "image": "https://placehold.co/400x400?text=PuffedRice", "description": "ইউরিয়া মুক্ত মচমচে দেশি মুড়ি।" },
    { "id": "r7", "name": "চিড়া (১ কেজি)", "price": 95, "image": "https://placehold.co/400x400?text=Chira", "description": "পরিষ্কার সাদা ও পাতলা চিড়া।" },
    { "id": "r8", "name": "রুহ আফজা (৮০০ মিলি)", "price": 490, "image": "https://placehold.co/400x400?text=RoohAfza", "description": "হামদর্দ এর আসল শরবত-এ-আযম।" },
    { "id": "r9", "name": "ট্যাং (৫০০ গ্রাম)", "price": 670, "image": "https://placehold.co/400x400?text=Tang", "description": "অরেঞ্জ ফ্লেভারের ইনস্ট্যান্ট ড্রিংক পাউডার।" },
    { "id": "r10", "name": "ইসবগুলের ভুষি", "price": 220, "image": "https://placehold.co/400x400?text=Isabgul", "description": "১০০ গ্রাম প্যাকেটজাত বিশুদ্ধ ভুষি।" },
    { "id": "r11", "name": "লাচ্ছা সেমাই", "price": 70, "image": "https://placehold.co/400x400?text=Semai", "description": "২০০ গ্রাম ঘিয়ে ভাজা মচমচে সেমাই।" },
    { "id": "r12", "name": "টোকমা দানা", "price": 120, "image": "https://placehold.co/400x400?text=Tokma", "description": "১০০ গ্রাম পরিষ্কার টোকমা দানা।" },
    { "id": "r13", "name": "মটর ডাল (১ কেজি)", "price": 110, "image": "https://placehold.co/400x400?text=Peas", "description": "পিঁয়াজুর জন্য উপযুক্ত মটর ডাল।" },
    { "id": "r14", "name": "আগা আগা পাউডার", "price": 180, "image": "https://placehold.co/400x400?text=AgarAgar", "description": "পুডিং ও জেলি তৈরির জন্য উপযুক্ত।" },
    { "id": "r15", "name": "কাসুন্দি (৩০০ গ্রাম)", "price": 130, "image": "https://placehold.co/400x400?text=Kasundi", "description": "ঝাল ও মুখরোচক খাঁটি সরিষার কাসুন্দি।" },
    { "id": "r16", "name": "সাদা তিল (১০০ গ্রাম)", "price": 85, "image": "https://placehold.co/400x400?text=Sesame", "description": "পিঠা ও রান্নায় ব্যবহারের জন্য ফ্রেশ তিল।" },
    { "id": "r17", "name": "নুডলস (৮ প্যাক)", "price": 160, "image": "https://placehold.co/400x400?text=Noodles", "description": "ইনস্ট্যান্ট মশলাসহ এগ নুডলস।" },
    { "id": "r18", "name": "মেথি (১০০ গ্রাম)", "price": 65, "image": "https://placehold.co/400x400?text=Fenugreek", "description": "পরিষ্কার আস্ত মেথি।" },
    { "id": "r19", "name": "বিরিয়ানি মশলা", "price": 55, "image": "https://placehold.co/400x400?text=BiryaniMasala", "description": "৪০ গ্রাম রাঁধুনী বিরিয়ানি মশলা।" },
    { "id": "r20", "name": "আচার (মিক্সড)", "price": 190, "image": "https://placehold.co/400x400?text=Pickle", "description": "৪০০ গ্রাম টক-ঝাল-মিষ্টি ঘরোয়া আচার।" },
    { "id": "r21", "name": "সরিষার তেল (১ লি)", "price": 310, "image": "https://placehold.co/400x400?text=MustardOil", "description": "১০০% খাঁটি ও কড়া ঝাঁঝালো তেল।" },
    { "id": "r22", "name": "কাবলি ছোলা (৫০০ গ্রাম)", "price": 140, "image": "https://placehold.co/400x400?text=Chickpeas", "description": "বড় দানার সাদা কাবলি ছোলা।" },
    { "id": "r23", "name": "মিছরি (২৫০ গ্রাম)", "price": 75, "image": "https://placehold.co/400x400?text=CandySugar", "description": "শরবতে ব্যবহারের জন্য বড় দানার মিছরি।" }
  ],
  "vegetables": [
    { "id": "v1", "name": "দেশি আলু", "price": 45, "image": "https://placehold.co/400x400?text=Potato", "description": "মাটি ছাড়া পরিষ্কার নতুন আলু।" },
    { "id": "v2", "name": "পেঁয়াজ", "price": 90, "image": "https://placehold.co/400x400?text=Onion", "description": "পাবনার ভালো মানের পেঁয়াজ।" },
    { "id": "v3", "name": "রসুন", "price": 220, "image": "https://placehold.co/400x400?text=Garlic", "description": "বড় দানা দেশি রসুন।" },
    { "id": "v4", "name": "আদা", "price": 240, "image": "https://placehold.co/400x400?text=Ginger", "description": "ফ্রেশ থাইল্যান্ড/চায়না আদা।" },
    { "id": "v5", "name": "কাঁচামরিচ", "price": 120, "image": "https://placehold.co/400x400?text=Chili", "description": "ঝাল ও তাজা কাঁচামরিচ।" },
    { "id": "v6", "name": "টমেটো", "price": 60, "image": "https://placehold.co/400x400?text=Tomato", "description": "লাল পাকা টমেটো।" },
    { "id": "v7", "name": "বেগুন", "price": 50, "image": "https://placehold.co/400x400?text=Brinjal", "description": "লম্বা বা গোল ফ্রেশ বেগুন।" },
    { "id": "v8", "name": "ফুলকপি", "price": 40, "image": "https://placehold.co/400x400?text=Vegetable", "description": "মাঝারি সাইজ প্রতি পিস।" },
    { "id": "v9", "name": "বাঁধাকপি", "price": 30, "image": "https://placehold.co/400x400?text=Vegetable", "description": "তাজা বাঁধাকপি প্রতি পিস।" },
    { "id": "v10", "name": "পেঁপে", "price": 35, "image": "https://placehold.co/400x400?text=Papaya", "description": "রান্নার জন্য সবুজ পেঁপে।" },
    { "id": "v11", "name": "লাউ", "price": 60, "image": "https://placehold.co/400x400?text=Gourd", "description": "কচি ও সতেজ লাউ।" },
    { "id": "v12", "name": "গাজর", "price": 55, "image": "https://placehold.co/400x400?text=Carrot", "description": "টাটকা ও রসালো গাজর।" },
    { "id": "v13", "name": "শসা", "price": 40, "image": "https://placehold.co/400x400?text=Cucumber", "description": "দেশি হাইব্রিড শসা।" },
    { "id": "v14", "name": "করল্লা", "price": 70, "image": "https://placehold.co/400x400?text=Vegetable", "description": "কচি উচ্ছে বা করল্লা।" },
    { "id": "v15", "name": "সিম", "price": 60, "image": "https://placehold.co/400x400?text=Bean", "description": "বিচি ছাড়া নরম সিম।" },
    { "id": "v16", "name": "ঢেঁড়স", "price": 50, "image": "https://placehold.co/400x400?text=Vegetable", "description": "কচি ও টাটকা ঢেঁড়স।" },
    { "id": "v17", "name": "বরবটি", "price": 80, "image": "https://placehold.co/400x400?text=Vegetable", "description": "সবুজ ও কচি বরবটি।" },
    { "id": "v18", "name": "চিচিঙ্গা", "price": 45, "image": "https://placehold.co/400x400?text=Vegetable", "description": "ফ্রেশ চিচিঙ্গা।" },
    { "id": "v19", "name": "লেবু (৪ পিস)", "price": 20, "image": "https://placehold.co/400x400?text=Lemon", "description": "বেশি রসালো পাতি লেবু।" },
    { "id": "v20", "name": "ধনেপাতা", "price": 10, "image": "https://placehold.co/400x400?text=Coriander", "description": "সুগন্ধি দেশি ধনেপাতা (মুঠা)।" }
  ],
  "cleaning": [
    { "id": "c1", "name": "হুইল পাউডার (১ কেজি)", "price": 110, "image": "https://placehold.co/400x400?text=Clean", "description": "কাপড় ধোয়ার ডিটারজেন্ট পাউডার।" },
    { "id": "c2", "name": "বাসন ধোয়ার লিকুইড", "price": 85, "image": "https://placehold.co/400x400?text=Clean", "description": "ভিম লিকুইড ২৫০ মিলি।" },
    { "id": "c3", "name": "টয়লেট ক্লিনার", "price": 160, "image": "https://placehold.co/400x400?text=Clean", "description": "হারপিক ৫০০ মিলি।" },
    { "id": "c4", "name": "সাবান (লাক্স)", "price": 65, "image": "https://placehold.co/400x400?text=Soap", "description": "১০০ গ্রাম বিউটি সোপ।" }
  ],
"personal": [
    { "id": "pc1", "name": "লাক্স সাবান (১৫০ গ্রাম)", "price": 85, "image": "https://placehold.co/400x400?text=Lux+Soap", "description": "সফট স্কিন ও সুগন্ধি বিউটি সোপ।" },
    { "id": "pc2", "name": "ডেটল সাবান (১২৫ গ্রাম)", "price": 75, "image": "https://placehold.co/400x400?text=Dettol", "description": "জীবাণু নাশক এন্টিসেপটিক সাবান।" },
    { "id": "pc3", "name": "লাইফবয় হ্যান্ডওয়াশ (রিফিল)", "price": 85, "image": "https://placehold.co/400x400?text=Handwash", "description": "৯৯.৯% জীবাণু থেকে সুরক্ষা।" },
    { "id": "pc4", "name": "সানসিল্ক শ্যাম্পু (১৮০ মিলি)", "price": 85, "image": "https://placehold.co/400x400?text=Sunsilk", "description": "চুলের সিল্কি ভাব ধরে রাখতে সাহায্য করে।" },
    { "id": "pc5", "name": "ডোভ শ্যাম্পু (১৭৫ মিলি)", "price": 85, "image": "https://placehold.co/400x400?text=Dove", "description": "ড্যামেজ চুলের যত্নে সেরা শ্যাম্পু।" },
    { "id": "pc6", "name": "ক্লোজআপ পেস্ট (১৪৫ গ্রাম)", "price": 85, "image": "https://placehold.co/400x400?text=Closeup", "description": "দীর্ঘ সময় ফ্রেশ নিঃশ্বাস নিশ্চিত করে।" },
    { "id": "pc7", "name": "সেনসোডাইন পেস্ট", "price": 85, "image": "https://placehold.co/400x400?text=Sensodyne", "description": "দাঁতের শিরশিরানি দূর করতে কার্যকর।" },
    { "id": "pc8", "name": "ওরাল-বি টুথব্রাশ", "price": 85, "image": "https://placehold.co/400x400?text=Toothbrush", "description": "দাঁতের প্রতিটি কোণা পরিষ্কার করে।" },
    { "id": "pc9", "name": "প্যারাসুট নারিকেল তেল (২০০ মিলি)", "price": 85, "image": "https://placehold.co/400x400?text=Coconut+Oil", "description": "১০০% খাঁটি নারিকেল তেল।" },
    { "id": "pc10", "name": "কুমারিকা হেয়ার অয়েল", "price": 85, "image": "https://placehold.co/400x400?text=Hair+Oil", "description": "চুল পড়া কমাতে সাহায্য করে।" },
    { "id": "pc11", "name": "পন্ডস ফেসওয়াশ (১০০ গ্রাম)", "price": 85, "image": "https://placehold.co/400x400?text=Facewash", "description": "ত্বকের গভীর থেকে ময়লা পরিষ্কার করে।" },
    { "id": "pc12", "name": "ফেয়ার অ্যান্ড লাভলী (৫০ গ্রাম)", "price": 85, "image": "https://placehold.co/400x400?text=Fair+%26+Lovely", "description": "গ্লো অ্যান্ড লাভলী মাল্টিভিটামিন ক্রিম।" },
    { "id": "pc13", "name": "নিভিয়া লোশন (২০০ মিলি)", "price": 85, "image": "https://placehold.co/400x400?text=Lotion", "description": "শীতকালে ত্বকের ময়েশ্চার ধরে রাখে।" },
    { "id": "pc14", "name": "মেরিল পেট্রোলিয়াম জেলি", "price": 85, "image": "https://placehold.co/400x400?text=Jelly", "description": "ফাটা ঠোঁট ও ত্বকের যত্নে।" },
    { "id": "pc15", "name": "জিলেট শেভিং ফোম", "price": 85, "image": "https://placehold.co/400x400?text=Shaving+Foam", "description": "স্মুদ ও আরামদায়ক শেভিং এর জন্য।" },
    { "id": "pc16", "name": "ফগ ডিওডোরেন্ট (বডি স্প্রে)", "price": 85, "image": "https://placehold.co/400x400?text=Fogg", "description": "দীর্ঘস্থায়ী সুগন্ধি বডি স্প্রে।" },
    { "id": "pc17", "name": "পাউডার (পন্ডস/তিব্বত)", "price": 85, "image": "https://placehold.co/400x400?text=Powder", "description": "শরীরে সতেজ ভাব বজায় রাখে।" },
    { "id": "pc18", "name": "স্যনিটারি প্যাড (হুইস্পার)", "price": 85, "image": "https://placehold.co/400x400?text=Whisper", "description": "মেয়েদের পিরিয়ডকালীন স্বস্তি ও সুরক্ষা।" },
    { "id": "pc19", "name": "টিস্যু পেপার (বক্স)", "price": 85, "image": "https://placehold.co/400x400?text=Tissue", "description": "নরম ও শোষন ক্ষমতাসম্পন্ন টিস্যু।" },
    { "id": "pc20", "name": "স্যাভলন লিকুইড (১০০ মিলি)", "price": 85, "image": "https://placehold.co/400x400?text=Savlon", "description": "ক্ষত ও মেঝে পরিষ্কার করার জন্য।" }
  ],
  "snacks": [],        // বিস্কুট, চানাচুর, চিপস, নুডলস
  "dairy": [],         // দুধ, দই, মাখন, পনির
  "baby_care": [],     // ডায়াপার, লোশন, বেবি সোপ
  "beverages": [],     // জুস, সফট ড্রিংকস, পানি
  "medicine": [],      // নাপা, গ্যাস্ট্রিকের ওষুধ, ব্যান্ডেজ
  "fish_meat": []      // মাছ, মুরগি, গরুর মাংস
};

export default function CategoryPage() {
  const params = useParams();
  const slug = (params?.cat as string) || "";
  console.log(slug)
  const [cart, setCart] = useState<CartState>({});

  const products = useMemo(() => PRODUCTS_DATA[slug] || [], [slug]);

  // ক্যালকুলেশনস
  const totalAmount = Object.values(cart).reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalItems = Object.keys(cart).length;

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      if (!prev[id]) return prev;
      const newQty = Math.max(1, prev[id].qty + delta);
      return { ...prev, [id]: { ...prev[id], qty: newQty } };
    });
  };

  const toggleSelect = (product: Product) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[product.id]) {
        delete newCart[product.id];
      } else {
        newCart[product.id] = { name: product.name, price: product.price, qty: 1 };
      }
      return newCart;
    });
  };

  const generateMessage = (): string => {
    let text = `*নতুন অর্ডার - ${slug.toUpperCase()}*\n`;
    text += `------------------------\n`;
    Object.values(cart).forEach(item => {
      text += `• ${item.name} (${item.qty} টি) = ৳${item.price * item.qty}\n`;
    });
    text += `------------------------\n`;
    text += `*সর্বমোট: ৳${totalAmount}*`;
    return encodeURIComponent(text);
  };

  const handleOrder = async (platform: 'whatsapp' | 'imo') => {
    const message = generateMessage();
    const myNumber = "8801301607901"; // এখানে আপনার সঠিক নম্বর দিন

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
    } else {
      try {
        await navigator.clipboard.writeText(decodeURIComponent(message));
        alert("অর্ডারটি কপি করা হয়েছে। এখন Imo-তে পেস্ট করুন।");
        window.location.href = "imo:-1"; // অথবা আপনার নির্দিষ্ট লিঙ্ক
      } catch (err) {
        alert("মেসেজ কপি করা যায়নি, দয়া করে আবার চেষ্টা করুন।");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 font-sans pb-36">
      {/* Header */}
      <header className="bg-white p-6 shadow-sm sticky top-0 z-10 border-b">
        <h1 className="text-2xl font-black text-slate-800 text-center uppercase tracking-tight">
          {slug || "ক্যাটাগরি"}
        </h1>
      </header>

      {/* Product List */}
     {/* Product List */}
<div className="p-4 space-y-4">
  {products.map((product) => {
    const isSelected = !!cart[product.id];
    return (
      <div 
        key={product.id}
        className={`p-3 rounded-3xl border-2 transition-all flex flex-col gap-3 ${
          isSelected ? 'bg-white border-green-500 shadow-xl scale-[1.02]' : 'bg-white border-transparent shadow-sm'
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-slate-800 text-lg truncate leading-tight">
                {product.name}
              </h3>
              <input 
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelect(product)}
                className="w-6 h-6 accent-green-600 rounded-lg cursor-pointer flex-shrink-0"
              />
            </div>
            
            {/* Description */}
            <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex justify-between items-center mt-2">
               <p className="text-green-600 font-black text-lg">৳{product.price}</p>
               
               {/* Quantity Selector */}
               {isSelected && (
                <div className="flex items-center bg-green-50 rounded-xl p-1 border border-green-100">
                  <button 
                    onClick={() => updateQuantity(product.id, -1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-green-700 hover:bg-white rounded-lg transition-colors"
                  >-</button>
                  <span className="w-8 text-center font-bold text-green-700">{cart[product.id].qty}</span>
                  <button 
                    onClick={() => updateQuantity(product.id, 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-green-700 hover:bg-white rounded-lg transition-colors"
                  >+</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>

      {/* Floating Order Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 inset-x-0 p-6 bg-white/80 backdrop-blur-lg border-t border-slate-200 rounded-t-[2.5rem] shadow-2xl z-20">
          <div className="flex justify-between items-end mb-4 px-2">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total Items</p>
              <p className="text-slate-800 font-black text-xl">{totalItems} টি পণ্য</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Grand Total</p>
              <p className="text-green-600 font-black text-2xl">৳{totalAmount}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleOrder('whatsapp')}
              className="bg-[#25D366] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-200 hover:scale-[1.02] active:scale-95 transition-all"
            >
              WHATSAPP
            </button>
            <button 
              onClick={() => handleOrder('imo')}
              className="bg-[#1C92FF] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all"
            >
              IMO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}