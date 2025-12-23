import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAttendance extends Document {
  teacherId: string;
  date: string;       // <--- এটি ইন্টারফেসে থাকতে হবে
  status: 'Present' | 'Late';
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema: Schema<IAttendance> = new mongoose.Schema({
  teacherId: {
    type: String, 
    required: [true, 'Please provide a teacher ID'],
  },
  date: {             // স্কিমাতেও আছে
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Late'],
    default: 'Present',
  },
}, {
  timestamps: true,
});

const Attendance: Model<IAttendance> = 
    (mongoose.models.Attendance as Model<IAttendance>) || 
    mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;