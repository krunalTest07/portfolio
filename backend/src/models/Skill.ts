import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Testing, Tools, Tech
  level: { type: Number, required: true }, // 1 to 100
});

export const Skill = mongoose.model('Skill', SkillSchema);
