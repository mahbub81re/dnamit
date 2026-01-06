"use client";
import { useQRCode } from 'next-qrcode';
import { useState, useEffect } from 'react';

export default function UserManagement() {
  const { Canvas } = useQRCode();
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  // নতুন ইউজারের জন্য স্টেট
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'password123', // ডিফল্ট পাসওয়ার্ড
    role: 'teacher'
  });

  // ১. ডাটাবেস থেকে ইউজারদের নিয়ে আসা
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const json = await res.json();
      if (json.status === 'success') {
        setNames(json.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ২. নতুন ইউজার যোগ করার ফাংশন
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === 'success') {
        alert("ইউজার যোগ করা হয়েছে!");
        setFormData({ name: '', email: '', password: 'password123', role: 'teacher' });
        fetchUsers(); // লিস্ট রিফ্রেশ করা
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ইউজার যোগ করার ফর্ম */}
      {/* <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-bold mb-4 text-center">নতুন শিক্ষক/ছাত্র যোগ করুন</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="নাম"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="ইমেইল"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <select 
            className="w-full p-2 border rounded"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="teacher">শিক্ষক</option>
            <option value="student">ছাত্র</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            সেভ করুন
          </button>
        </form>
      </div>

      <hr className="my-10" /> */}

      {/* ইউজারদের QR কোড লিস্ট */}
      <h2 className="text-2xl font-bold mb-6 text-center">আইডি কার্ড ও QR কোড তালিকা</h2>
      
      {loading ? <p className="text-center">লোড হচ্ছে...</p> : (
        <div className='flex flex-row flex-wrap gap-6 justify-center items-center'>
          {names.map((n: any) => (
            <div key={n._id} className="bg-white p-4 rounded-xl shadow-lg border text-center w-64">
              <h3 className="font-bold text-lg text-gray-800">{n.name}{n.role}</h3>
              <div className="flex justify-center border-2 border-dashed rounded-lg bg-gray-50">
                <Canvas
                  text={`https://vercel.dnamit.com/profile/${n._id}`}
                  options={{
                    errorCorrectionLevel: 'M',
                    margin: 2,
                    scale: 4,
                    width: 160,
                    color: { dark: '#000000ff', light: '#ffffffff' },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}