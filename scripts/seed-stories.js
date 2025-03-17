import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Story from '../models/Story.js';

dotenv.config();

const initialStories = [
  {
    image: "/images/t1.jpg",
    iconType: "BarChart",
    alt: "Business growth success",
  },
  {
    image: "/images/t2.jpg",
    iconType: "Presentation",
    alt: "Business growth success",
  },
//   {
//        id: 1,
//        image: "/images/s1.jpg",
//        icon: Users,
//        alt: "Team collaboration success story",
//      },
//      {
//        id: 2,
//        image: "/images/s2.jpg",
//        icon: <FileSpreadsheet className="w-6 h-6" />,
//        alt: "Business documentation success",
//      },
//      {
//        id: 3,
//        image: "/images/s3.jpg",
//        icon: <Presentation className="w-6 h-6" />,
//        alt: "Professional presentation success",
//      },
//      {
//        id: 4,
//        image: "/images/s4.jpg",
//        icon: <BarChart className="w-6 h-6" />,
//        alt: "Business growth success",
//      },
//      {
//        id: 5,
//        image: "/images/s5.jpg",
//        icon: <BarChart className="w-6 h-6" />,
//        alt: "Business growth success",
//      },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing stories
    await Story.deleteMany({});
    console.log('Deleted existing stories');

    // Insert new stories
    await Story.insertMany(initialStories);
    console.log('Inserted new stories');

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();