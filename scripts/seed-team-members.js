import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TeamMember from '../models/TeamMember.js';

dotenv.config();

const initialTeamMembers = [
  {
    name: "Shravan Kumar",
    position: "SR BDM",
    image: "/images/e8.jpg",
    description: "Business planning, Relationship building, Sales and revenue growth  Market analysis, Team leadership, Strategic partnerships, Deal negotiation  Reporting and analysis",
  },
  {
    name: "Aditya Vishwas Gotmare",
    position: "Manager HR",
    image: "/images/e2.jpg",
    description: "Organizational Development, JD Development, Talent management, Employee engagement, Employee relations culture, HR communication HR Operation",
  },
  {
    name: "Ms Khushi Sahu",
    position: "HR Assistant",
    image: "/images/e3.jpg",
    description: "Recruitment & Development, Induction & Orientation, Talent Acquisition, Employee Hiring, Employe Orientation Exit Interviews and process  Recruiting and Interviewing",
  },
  {
    name: "Raj Sikarwar",
    position: "Sr.Team Leader",
    image: "/images/e4.jpg",
    description: "Manage recruitment including sourcing, screening, interviews, onboarding, and induction. Handle HR policies, documentation, Ensure",
  },
  {
    name: "Jiya Singh",
    position: "Team Leader",
    image: "/images/e55.jpg",
    description: "Leads a team of recruiters, Develops recruitment strategies, Manages client relationships, Oversees talent acquisition, Improves recruitment processes",
  },
  {
    name: "Sonam Sen",
    position: "Recruitment Analysist",
    image: "/images/e5.jpg",
    description: "Data analysis,  Reporting,  Process improvement,  Candidate sourcing",
  },
  {
    name: "Bhupendra Maharana",
    position: "Recruitment Trainers",
    image: "/images/e100.jpg",
    description: "Designing and delivering training , Needs assessment, Curriculum development, Coaching and mentoring, Evaluation and feedback",
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing team members
    await TeamMember.deleteMany({});
    console.log('Deleted existing team members');

    // Insert new team members
    await TeamMember.insertMany(initialTeamMembers);
    console.log('Inserted new team members');

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();