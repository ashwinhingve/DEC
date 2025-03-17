// models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  contactType: {
    type: String,
    enum: ['applicant', 'recruiter'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  // Recruiter specific fields
  company: {
    type: String,
    required: function() {
      return this.contactType === 'recruiter';
    }
  },
  jobOffers: {
    type: String,
    required: function() {
      return this.contactType === 'recruiter';
    }
  },
  industry: {
    type: String,
    required: function() {
      return this.contactType === 'recruiter';
    }
  },
  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  }
});

// Create the model based on the schema
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;