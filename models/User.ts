
import mongoose, { Schema, Document, Model } from 'mongoose';

// ইউজারের রোলের ধরন নির্ধারণ
export type UserRole = 'admin' | 'teacher' | 'student';

// ইউজার ইন্টারফেস
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phoneNumber?: string;
  profileImage?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const UserSchema: Schema<IUser> = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'নাম প্রদান করা আবশ্যক'], 
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'ইমেইল আবশ্যক'], 
      unique: true, 
      lowercase: true,
      trim: true 
    },
    password: { 
      type: String, 
      required: [true, 'পাসওয়ার্ড দিন'],
      select: false // ডাটা রিট্রিভ করার সময় পাসওয়ার্ড অটোমেটিক আসবে না
    },
    role: { 
      type: String, 
      enum: ['admin', 'teacher', 'student'], 
      default: 'student' 
    },
    phoneNumber: { 
      type: String, 
      trim: true 
    },
    profileImage: { 
      type: String, 
      default: '' 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
  },
  { 
    timestamps: true // এটি অটোমেটিক createdAt এবং updatedAt তৈরি করবে
  }
);

// মডেল তৈরি বা এক্সিস্টিং মডেল ব্যবহার (Next.js এর জন্য গুরুত্বপূর্ণ)
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;