"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText } from 'lucide-react';

interface Question {
  id: string;
  className: string;
  subject: string;
  chapter: string;
  type: 'MCQ' | 'CQ';
  questionText: string;
}

export default function QuestionBuilder() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  
  // Filters
  const [filterClass, setFilterClass] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterChapter, setFilterChapter] = useState('');

  useEffect(() => {
    fetch('/api/questions').then(res => res.json()).then(setAllQuestions);
  }, []);

  const filtered = allQuestions.filter(q => 
    (!filterClass || q.className === filterClass) &&
    (!filterSubject || q.subject === filterSubject) &&
    (!filterChapter || q.chapter === filterChapter)
  );

  const toggleQuestion = (q: Question) => {
    if (selectedQuestions.find(sq => sq.id === q.id)) {
      setSelectedQuestions(selectedQuestions.filter(sq => sq.id !== q.id));
    } else {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex gap-8">
      {/* Selection Area */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Question Bank</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <select onChange={(e) => setFilterClass(e.target.value)} className="border p-2 rounded">
            <option value="">All Classes</option>
            {[...new Set(allQuestions.map(q => q.className))].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {/* Repeat similar selects for Subject and Chapter */}
        </div>

        <div className="space-y-3">
          {filtered.map(q => (
            <div key={q.id} className="border p-4 rounded flex justify-between items-center bg-white shadow-sm">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">{q.type}</span>
                <p className="font-medium">{q.questionText}</p>
                <p className="text-sm text-gray-500">{q.subject} • Ch: {q.chapter}</p>
              </div>
              <button 
                onClick={() => toggleQuestion(q)}
                className={`p-2 rounded-full ${selectedQuestions.find(sq => sq.id === q.id) ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
              >
                {selectedQuestions.find(sq => sq.id === q.id) ? <Trash2 size={20}/> : <Plus size={20}/>}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Selected List / Preview */}
      <div className="w-80 bg-gray-50 p-6 rounded-lg border h-fit sticky top-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileText size={20}/> My Paper
        </h3>
        <p className="mb-4 text-sm text-gray-600">{selectedQuestions.length} Questions Selected</p>
        <ul className="space-y-2 mb-6">
          {selectedQuestions.map((q, i) => (
            <li key={q.id} className="text-sm border-b pb-2 truncate">{i+1}. {q.questionText}</li>
          ))}
        </ul>
        <button className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">
          Generate PDF
        </button>
      </div>
    </div>
  );
}