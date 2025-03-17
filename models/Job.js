 import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  state: { type: String, required: true },
  type: { type: String, required: true },
  salary: { type: String, required: true },
  department: { type: String, required: true },
  posted: { type: String, default: 'Just now' },
  description: { type: String, required: true },
  skills: { type: [String], default: [] },
  education: { type: String },
  experience: { type: String },
  industry: { type: String },
  occupation: { type: String },
  benefits: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);