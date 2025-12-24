import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILessonPlan extends Document {
  class: string; // Play, Nursery, 1 to 10
  date: string;
  periods: {
    subject: string;
    topic: string;
    periodNumber: number; // 1 to 7
  }[];
  homework: string; // আজকের বাড়ির কাজ
  createdAt: Date;
}

const LessonPlanSchema = new Schema({
  class: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  periods: [
    {
      subject: String,
      topic: String,
      periodNumber: Number
    }
  ],
  homework: { type: String, required: true },
}, { timestamps: true });

const LessonPlan: Model<ILessonPlan> = mongoose.models.LessonPlan || mongoose.model<ILessonPlan>('LessonPlan', LessonPlanSchema);
export default LessonPlan;