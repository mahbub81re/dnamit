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
    { 
      "id": "g1", 
      "name": "মিনিকেট চাল", 
      "price": 70, 
      "image": "https://img.freepik.com/free-photo/raw-rice-wooden-bowl_1150-34313.jpg",
      "description": "পরিষ্কার ও ফ্রেশ উন্নত মানের মিনিকেট চাল।"
    },
    { 
      "id": "g2", 
      "name": "সয়াবিন তেল", 
      "price": 180, 
      "image": "https://img.freepik.com/free-photo/sunflower-oil-bottle-with-flower_1150-17556.jpg",
      "description": "১০০% খাঁটি সয়াবিন তেল (১ লিটার)।"
    }
  ],
  "vegetables": [
    { 
      "id": "v1", 
      "name": "দেশি আলু", 
      "price": 40, 
      "image": "https://img.freepik.com/free-photo/raw-potatoes_144627-14815.jpg",
      "description": "মাটি ছাড়া পরিষ্কার নতুন আলু।"
    }
  ]
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