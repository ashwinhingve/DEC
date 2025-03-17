import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Please provide an image path'],
  },
  iconType: {
    type: String,
    required: [true, 'Please provide an icon type'],
    enum: ['BarChart', 'Presentation', 'Users', 'FileSpreadsheet'],
  },
  alt: {
    type: String,
    required: [true, 'Please provide alt text'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
