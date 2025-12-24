import mongoose, { Document, Schema, Model } from 'mongoose';

// ১. TypeScript Interface আপডেট
export interface IAttendance extends Document {
  teacherId: string;
  date: string; 
  status: 'Enter' | 'Late' | 'Exit'; // ইন্টারফেস এবং এনাম একই হতে হবে
  createdAt: Date;
  updatedAt: Date;
}

// ২. Mongoose Schema আপডেট
const AttendanceSchema: Schema<IAttendance> = new mongoose.Schema({
  teacherId: {
    type: String, 
    required: [true, 'Please provide a teacher ID'],
  },
  date: { 
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Enter', 'Late', 'Exit'], // ইন্টারফেসের সাথে মিল রেখে পরিবর্তন করা হয়েছে
    default: 'Enter',               // ডিফল্ট মান Enter করা হয়েছে
  },
}, {
  timestamps: true,
});

const Attendance: Model<IAttendance> = 
    (mongoose.models.Attendance as Model<IAttendance>) || 
    mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;