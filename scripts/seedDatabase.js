// scripts/seedDatabase.js
import mongoose from 'mongoose';
import Job from '../models/Job';
import jobsData from './jobsData.json';

async function seedDatabase() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Job.deleteMany({});
  await Job.insertMany(jobsData);
  console.log('Database seeded');
  mongoose.connection.close();
}

seedDatabase();