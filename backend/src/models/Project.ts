import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  images: [{ type: String }],
  githubLink: { type: String },
  demoLink: { type: String },
});

export const Project = mongoose.model('Project', ProjectSchema);
