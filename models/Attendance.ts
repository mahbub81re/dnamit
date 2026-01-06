import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './User';

export interface IAttendance extends Document {
  user: mongoose.Types.ObjectId | IUser; // এখানে IUser ইমপোর্ট করে দিতে পারেন
  date: string; 
  status: 'Enter' | 'Late' | 'Exit' | 'Present';
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema: Schema<IAttendance> = new mongoose.Schema({

  date: { 
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Late', 'Exit'],
    default: 'Enter',
  },
  // User মডেলের সাথে কানেকশন
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // নিশ্চিত করুন আপনার User মডেলের নাম এখানে ঠিক আছে
    required: true 
  }
}, {
  timestamps: true,
});

const Attendance: Model<IAttendance> = 
    (mongoose.models.Attendance as Model<IAttendance>) || 
    mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;