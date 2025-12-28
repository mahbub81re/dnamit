import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  studentId: string;
  name: string;
  roll: number;
  class: string;
  fatherName: string;
  motherName: string;
  userId: mongoose.Types.ObjectId; // User মডেলের সাথে রিলেশন
  phone: string;
  address: string;
  bloodGroup?: string;
  dob: string;
  gender: 'Male' | 'Female';
  status: 'Active' | 'Inactive';
}

const StudentSchema = new Schema({
  studentId: { 
    type: String, 
    required: true, 
    unique: true 
  }, // ইউনিক আইডি (যেমন: DN-2025-001)
  name: { type: String, required: true },
  roll: { type: Number, required: true },
  class: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // User কালেকশনের সাথে লিঙ্ক করা হয়েছে
    required: true 
  },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  bloodGroup: { type: String },
  dob: { type: String, required: true },
  gender: { 
    type: String, 
    enum: ['Male', 'Female'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'], 
    default: 'Active' 
  },
}, { 
  timestamps: true // এর মাধ্যমে স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt তৈরি হবে
});

// মডেলটি যদি ইতিমধ্যে তৈরি থাকে তবে সেটি ব্যবহার করবে, নাহলে নতুন করে তৈরি করবে
export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);