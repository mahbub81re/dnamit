import mongoose, { Schema, model, models } from 'mongoose';

const QuestionSchema = new Schema({
  className: { type: String, required: true },
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  type: { type: String, enum: ['MCQ', 'CQ'], required: true },
  questionText: { type: String, required: true },
  options: [String], // Only for MCQs
  correctAnswer: String,
  createdAt: { type: Date, default: Date.now },
});

export const Question = models.Question || model('Question', QuestionSchema);