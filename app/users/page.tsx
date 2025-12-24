"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'teacher',
    password: 'password123', // আপনি চাইলে এটি ইনপুট ফিল্ড হিসেবেও নিতে পারেন
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === 'success') {
        alert("ইউজার সফলভাবে যোগ করা হয়েছে!");
        router.push('/users'); // লিস্ট পেজে পাঠিয়ে দিবে
        router.refresh();
      } else {
        alert(data.message || "কিছু ভুল হয়েছে");
      }
    } catch (error) {
      alert("সার্ভার এরর!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">নতুন ইউজার যোগ করুন</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">নাম</label>
          <input
            type="text"
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="পুরো নাম লিখুন"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ইমেইল</label>
          <input
            type="email"
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="example@gmail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">রোল (Role)</label>
          <select
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="teacher">শিক্ষক (Teacher)</option>
            <option value="student">ছাত্র (Student)</option>
            <option value="admin">এডমিন (Admin)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'
          }`}
        >
          {loading ? "সেভ হচ্ছে..." : "ইউজার তৈরি করুন"}
        </button>
      </form>
    </div>
  );
}