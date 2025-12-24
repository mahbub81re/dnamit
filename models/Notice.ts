import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotice extends Document {
  title: string;
  content: string;
  pdfUrl?: string; // পিডিএফ লিঙ্কের জন্য
  category: 'General' | 'Exam' | 'Holiday' | 'Admission';
  date: string;
}

const NoticeSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  pdfUrl: { type: String },
  category: { type: String, default: 'General' },
  date: { type: String, required: true },
}, { timestamps: true });

const Notice: Model<INotice> = mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);
export default Notice;