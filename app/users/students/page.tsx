"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Edit2, Trash2, Copy, Check,
  User, Phone, GraduationCap, X 
} from 'lucide-react';
import StudentAdmissionForm from '@/components/StudentAdmissionForm';
import Link from 'next/link';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null); // এডিটের জন্য
  const [copied, setCopied] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const json = await res.json();
      if (json.success) setStudents(json.data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStudents(); }, []);

  // --- Copy Table Function ---
  const copyToClipboard = () => {
    const tableData = filteredStudents.map((s: any) => 
      `${s.studentId}\t${s.name}\t${s.class}\t${s.roll}\t${s.phone}`
    ).join('\n');
    
    const header = "ID\tName\tClass\tRoll\tPhone\n";
    navigator.clipboard.writeText(header + tableData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Edit Handler ---
  const handleEdit = (student: any) => {
    setSelectedStudent(student); // ডাটা সেট করা হচ্ছে
    setIsModalOpen(true); // ফর্ম ওপেন
  };

  const handleDelete = async (id: string) => {
    if (confirm("মুছে ফেলতে চান?")) {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (res.ok) fetchStudents();
    }
  };

  const filteredStudents = students.filter((s: any) => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black flex items-center gap-2">
            <GraduationCap className="text-emerald-400" /> ম্যানেজমেন্ট
          </h1>
          <div className="flex gap-3">
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl border border-white/10 hover:bg-slate-700 transition-all text-sm font-bold"
            >
              {copied ? <Check size={16} className="text-emerald-400"/> : <Copy size={16}/>}
              {copied ? "Copied!" : "Copy Table"}
            </button>
            <button 
              onClick={() => { setSelectedStudent(null); setIsModalOpen(true); }}
              className="bg-emerald-500 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2"
            >
              <Plus size={18} /> New Student
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 outline-none focus:border-emerald-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs uppercase text-slate-500 font-bold">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Class & Roll</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.map((student: any) => (
                <tr key={student._id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <p className="font-bold">{student.name}</p>
                    <p className="text-xs opacity-50">{student.studentId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{student.class} | Roll: {student.roll}</p>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(student)} className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-black">
                      <Edit2 size={14} />
                    </button>
                     <Link href={`/users/students/${student._id}`} className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-black">
                      view
                    </Link>
                    <button onClick={() => handleDelete(student._id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div initial={{y: 50}} animate={{y: 0}} className="bg-[#0f172a] w-full max-w-4xl rounded-[2.5rem] border border-white/10 overflow-hidden relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-8 z-10 text-slate-400 hover:text-white"><X /></button>
              <div className="max-h-[85vh] overflow-y-auto">
                {/* Form Component Pass initialData */}
                <StudentAdmissionForm 
                  initialData={selectedStudent} 
                  onSuccess={() => { setIsModalOpen(false); fetchStudents(); }} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}