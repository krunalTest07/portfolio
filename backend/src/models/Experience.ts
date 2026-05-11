import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  responsibilities: [{ type: String }],
});

export const Experience = mongoose.model('Experience', ExperienceSchema);
