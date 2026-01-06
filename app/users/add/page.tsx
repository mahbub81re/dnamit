"use client";
import React, { useState } from 'react';

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'student'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) alert("ছাত্র সফলভাবে যোগ করা হয়েছে!");
    } catch (err) {
      alert("ব্যর্থ হয়েছে!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Users Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-2 border rounded" 
          placeholder="নাম" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <input 
          className="w-full p-2 border rounded" 
          type="email" 
          placeholder="ইমেইল" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          className="w-full p-2 border rounded" 
          type="password" 
          placeholder="পাসওয়ার্ড" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <input 
          className="w-full p-2 border rounded" 
          placeholder="ফোন নম্বর" 
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} 
        />
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded font-bold hover:bg-emerald-700">
          জমা দিন (Submit)
        </button>
      </form>
    </div>
  );
}