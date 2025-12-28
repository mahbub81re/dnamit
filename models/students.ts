import mongoose, { Schema, Document } from 'mongoose';

const StudentSchema = new Schema({
  // রিলেশনাল আইডি
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // প্রাতিষ্ঠানিক তথ্য
  session: String,           // শিক্ষাবর্ষ
  admissionDate: { type: String, default: () => new Date().toLocaleDateString('bn-BD') }, 
  studentId: { type: String, unique: true, required: true }, // আইডি নং
  className: String,        // শ্রেণি
  section: String,          // শাখা
  rollNo: Number,           // ক্রমিক নং

  // ব্যক্তিগত তথ্য
  nameBengali: String,      // নাম (বাংলায়)
  nameEnglish: String,      // নাম (ইংরেজিতে)
  gender: { type: String, enum: ['Male', 'Female'] },
  bloodGroup: String,
  dob: String,              // জন্ম তারিখ
  age: String,              // বয়স
  birthRegNo: String,       // জন্ম নিবন্ধন নং
  nationality: { type: String, default: 'Bangladeshi' },
  height: String,
  weight: String,
  image: String,            // প্রোফাইল পিকচার ইউআরএল

  // অভিভাবকের তথ্য
  fatherName: String,
  fatherOccupation: String,
  fatherMobile: String,
  motherName: String,
  motherOccupation: String,
  motherMobile: String,
  annualIncome: String,     // বার্ষিক আয়
  emergencyGuardian: String, // পিতা-মাতার অবর্তমানে অভিভাবক

  // যোগাযোগ
  currentAddress: {
    village: String,
    postOffice: String,
    upazila: String,
    district: String
  },
  permanentAddress: {
    village: String,
    postOffice: String,
    upazila: String,
    district: String
  },
  mobile: String,
  transport: String,        // যাতায়াতের মাধ্যম

  // আবাসিক তথ্য
  residenceType: { type: String, enum: ['আবাসিক', 'অনাবাসিক'] },
  timingType: { type: String, enum: ['নাইট-কেয়ার', 'ফুল টাইমিং'] },

  // পারিবারিক তথ্য
  familyMembers: Number,
  siblings: {
    brothers: Number,
    sisters: Number,
    position: Number        // ভাই-বোনের মধ্যে কত তম?
  },
  familyOccupations: {
    expatriate: Number,     // প্রবাসী
    serviceHolder: Number,  // চাকুরিজীবী
    businessman: Number,    // ব্যবসায়ী
    student: Number,        // ছাত্র
    unemployed: Number,     // বেকার
    others: Number
  },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);