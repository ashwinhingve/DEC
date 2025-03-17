// models/Resume.js
import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userData: {
    personal: {
      fullName: String,
      jobTitle: String,
      email: String,
      phone: String,
      website: String,
      location: String,
      summary: String,
      photo: String, // Base64 string
    },
    experience: [{
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String
    }],
    education: [{
      school: String,
      degree: String,
      field: String,
      graduationDate: String,
      gpa: String
    }],
    skills: [String]
  },
  pdfData: {
    fileName: String,
    contentType: String,
    content: String // Base64 encoded PDF content
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent model overwrite error on hot reloads in development
const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

export default Resume;