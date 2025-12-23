// components/AttendanceList.tsx
"use client";

import React, { useState, useEffect } from 'react';

// Define the interface for the attendance data structure
interface IAttendance {
  _id: string; // MongoDB ID
  teacherId: string;
  status: 'Present' | 'Late';
  createdAt: string; // Date string from the server
  updatedAt: string;
}

export default function AttendanceList() {
  const [attendance, setAttendance] = useState<IAttendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/attendance', {
          method: 'GET',
        });

        const data: { success: boolean; data: IAttendance[] | null; message?: string } = await response.json();

        if (response.ok && data.success && data.data) {
          // Type guard: ensure data.data is an array before setting
          if (Array.isArray(data.data)) {
            setAttendance(data.data);
          } else {
            throw new Error('Data format is incorrect.');
          }
        } else {
          throw new Error(data.message || 'Failed to fetch attendance data.');
        }
      } catch (err: any) {
        console.error('Fetch Error:', err);
        setError(`Error loading attendance: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAttendance();
  }, []); // Empty dependency array means this runs only once on mount

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // --- RENDERING LOGIC ---

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading Attendance Records...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;
  }

  if (attendance.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>No attendance records found.</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>📋 Teacher Attendance Report</h2>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th style={tableHeaderStyle}>Teacher ID</th>
              <th style={tableHeaderStyle}>Time Recorded</th>
              <th style={tableHeaderStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => (
              <tr key={record._id} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? 'white' : '#fafafa' }}>
                <td style={tableCellStyle}>
                  <strong>{record.teacherId}</strong>
                </td>
                <td style={tableCellStyle}>
                  {formatDate(record.createdAt)}
                </td>
                <td style={tableCellStyle}>
                  <span style={{ 
                      color: record.status === 'Present' ? 'green' : 'orange', 
                      fontWeight: 'bold' 
                  }}>
                      {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Simple styles for the table
const tableHeaderStyle = {
    padding: '12px 15px',
    borderBottom: '2px solid #ddd',
    position: 'sticky' as const, // Sticky headers for better scrolling
    top: 0,
    backgroundColor: '#f4f4f4',
};

const tableCellStyle = {
    padding: '10px 15px',
};