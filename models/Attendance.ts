import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './User';

export interface IAttendance extends Document {
  user: mongoose.Types.ObjectId | IUser;
  date: string; 
  // 1. Interface must exactly match the logic in your scanner component
  status: 'Present' | 'Late' | 'Exit'; 
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
    // 2. Add 'Enter' here so it matches your Interface and your Scanner logic
    enum: ['Present', 'Late', 'Exit'], 
    default: 'Present',
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true,
});

const Attendance: Model<IAttendance> = 
    (mongoose.models.Attendance as Model<IAttendance>) || 
    mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;