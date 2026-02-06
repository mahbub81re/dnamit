"use client";
import React, { useState } from 'react';
import { Save, Send, HelpCircle } from 'lucide-react';

export default function BulkQuestionForm() {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const parseAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Logic: Split text into lines and parse symbols
    // Format: Question Text # Option 1 # Option 2 #* Correct Option # Option 4
    const lines = bulkText.split('\n').filter(line => line.trim() !== '');
    
    const parsedQuestions = lines.map(line => {
      const parts = line.split('#').map(p => p.trim());
      const questionText = parts[0];
      const optionsWithMarkers = parts.slice(1);
      
      const isMCQ = optionsWithMarkers.length > 0;
      
      if (isMCQ) {
        const options = optionsWithMarkers.map(opt => opt.replace('*', ''));
        const correctIndex = optionsWithMarkers.findIndex(opt => opt.includes('*'));
        return {
          className, subject, chapter,
          type: 'MCQ',
          questionText,
          options,
          correctAnswer: options[correctIndex] || options[0]
        };
      } else {
        return {
          className, subject, chapter,
          type: 'CQ',
          questionText,
          options: [],
          correctAnswer: ''
        };
      }
    });

    // Send to API (Looping through or modifying your API to handle arrays)
    const res = await fetch('/api/questions/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions: parsedQuestions }),
    });

    if (res.ok) {
      setStatus('success');
      setBulkText('');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <form onSubmit={parseAndSave} className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <Send className="text-blue-600" size={24} /> Fast Entry Mode
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <input placeholder="Class" className="border p-2 rounded" value={className} onChange={e => setClassName(e.target.value)} required />
        <input placeholder="Subject" className="border p-2 rounded" value={subject} onChange={e => setSubject(e.target.value)} required />
        <input placeholder="Chapter" className="border p-2 rounded" value={chapter} onChange={e => setChapter(e.target.value)} required />
      </div>

      <div className="mb-4 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
        <p className="text-xs font-mono text-gray-600">
          <strong>Format:</strong> Question Text # Option A #* Correct Option # Option C # Option D <br/>
          <strong>Example:</strong> What is 2+2? # 3 #* 4 # 5 # 6
        </p>
      </div>

      <textarea 
        className="w-full h-80 border-2 border-gray-200 p-4 rounded-xl font-mono text-sm focus:border-blue-500 outline-none"
        placeholder="Type each question on a new line..."
        value={bulkText}
        onChange={e => setBulkText(e.target.value)}
        required
      />

      <button 
        className={`mt-4 w-full py-4 rounded-xl font-bold text-white transition ${status === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}
      >
        {status === 'loading' ? 'Processing...' : status === 'success' ? 'All Questions Saved!' : 'Upload All Questions'}
      </button>
    </form>
  );
}