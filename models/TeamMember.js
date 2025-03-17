import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  position: {
    type: String,
    required: [true, 'Please provide a position'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Please provide an image path'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
