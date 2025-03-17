'use client'
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Contact from './contacts/page';
import Resume from './resume/page';
import Team from './team-members/page';
import Stories from './stories/page';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Users, Briefcase, Bell, Search, Menu, ChevronDown, Download, Eye, ArrowUpDown, Plus, Pencil, Trash2, FileCheck, Calendar, Heart, Award, ThumbsUp, CheckSquare } from 'lucide-react';
import { jsPDF } from 'jspdf';
const BaseCard = ({ className, children }) => (
  <div className={`bg-white rounded-lg shadow ${className || ''}`}>
    {children}
  </div>
);

const StatsCard = ({ title, value, change, icon: Icon }) => (
  <BaseCard className="p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-500" />
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <span className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </span>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </BaseCard>
);

const AdminDashboard = () => {
  
  const emptyJobTemplate = {
    id: Date.now(),
    title: '',
    company: '',
    location: '',
    state: '',
    type: '',
    salary: '',
    department: '',
    posted: 'Just now',
    description: '',
    skills: [],
    education: '',
    experience: '',
    industry: '',
    occupation: '',
    benefits: []
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    id: Date.now(),
    title: '',
    company: '',
    location: '',
    state: '',
    type: '',
    salary: '',
    department: '',
    posted: 'Just now',
    description: '',
    skills: [],
    education: '',
    experience: '',
    industry: '',
    occupation: '',
    benefits: []
  });

  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchAndValidate = async () => {
      // Authentication checks
      if (!isAuthenticated) {
        router.push('/auth');
        return;
      }

      if (user?.role !== 'admin') {
        toast.error('Unauthorized access');
        router.push('/profile');
        return;
      }

      // Job fetching logic
      try {
        const response = await fetch('/api/jobs');
        // console.log('Response:', await response.text());
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        toast.error('Failed to load jobs');
      }
    };

    fetchAndValidate();
  }, [isAuthenticated, user, router]);
 
  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }
   
  const stats = [
    {
      title: 'Total Jobs',
      value: '2,845',
      change: '+12.5%',
      icon: Briefcase
    },
    {
      title: 'Active Candidates',
      value: '10,234',
      change: '+8.2%',
      icon: Users
    },
    {
      title: 'Applications',
      value: '15,673',
      change: '+22.4%',
      icon: FileCheck
    },
    {
      title: 'Interviews',
      value: '1,234',
      change: '+15.3%',
      icon: Calendar
    },
    {
      title: 'Happy Clients',
      value: '456',
      change: '+18.7%',
      icon: Heart
    },
    {
      title: 'Team Experts',
      value: '89',
      change: '+5.3%',
      icon: Award
    },
    {
      title: 'Satisfied Customers',
      value: '4,567',
      change: '+25.8%',
      icon: ThumbsUp
    },
    {
      title: 'Vacancies Closed',
      value: '982',
      change: '+16.4%',
      icon: CheckSquare
    }
  ];
  const filterOptions = {
    state: [
      "Andhra Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi",
      "Uttar Pradesh", "Gujarat", "Telangana", "West Bengal", "Madhya Pradesh"
    ],
    city: [
      "Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai",
      "Pune", "Kolkata", "Ahmedabad", "Bhopal", "Indore"
    ],
    type: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
    department: [
      "ABP CHANNELS", "AGENCY CHANNEL", "DIRECT CHANNEL", "NPS CHENNAL", "DIRECT BCSS CHANNEL",
      "DIRECT LOYALTY CHANNEL", "DEFENCE CHANNEL", "BANCA CHANNEL", "BANCA OTHER", "BROCA CHANNEL", "VRM CHANNEL",
      "CREDIT LIFE CHANNEL", "TELE VERTICAL CHANNEL", "BANCA NBFC CHANNEL", "BANCA SFB CHANNEL", "BANCA ALLIANCE", "SMART ACHIVEVER", "FLS PROFILE", "NFLS PROFILE"
    ],
    salary: [
      "Below 3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA",
      "15-25 LPA", "25-50 LPA", "Above 50 LPA"
    ],
    skills: [
      "JavaScript", "React", "Python", "Java", "Node.js",
      "AWS", "Docker", "Kubernetes", "SQL", "MongoDB"
    ],
    education: [
      "High School", "Bachelor's", "Master's", "Ph.D.",
      "B.Tech", "M.Tech", "BCA", "MCA", "MBA"
    ],
    experience: [
      "Fresher", "1-3 years", "3-5 years", "5-7 years",
      "7-10 years", "10+ years"
    ],
    industry: [
      "Life Insurance", "Banking", "IT", "BPO",
      "Education", "Pharmaceuticals"
    ],
    occupation: [
      "SALES DEPARTMENT MANAGER", "BUSINESS DEVELOPMENT MANAGER", "ASSISTANT SALES MANAGER",
      "SALES MANAGER", "SR. SALES MANAGER", "ASSOCIATE AREA BUSINESS MANAGER", "SR. AREA BUSINESS MANAGER", "RELATIONSHIP MANAGER"
    ]
  };
 
  const handleSave = async (jobData) => {
    try {
      const url = jobData._id
        ? `/api/jobs/${jobData._id}`
        : '/api/jobs';
      const method = jobData._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (method === 'POST') {
        setJobs([...jobs, result]);
      } else {
        setJobs(jobs.map(j => j._id === result._id ? result : j));
      }

      setIsAddingNew(false);
      setEditingJob(null);
      toast.success(jobData._id ? 'Job updated successfully' : 'Job added successfully');
    } catch (error) {
      console.error('Failed to save job:', error);
      toast.error('Failed to save job');
    }
  };
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted job from the state
      setJobs(jobs.filter(job => job._id !== jobId));
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Failed to delete job:', error);
      toast.error('Failed to delete job');
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setEditingJob(null);
    setIsAddingNew(false);
    setNewJob(emptyJobTemplate);
  };

  const JobForm = ({ job, onSave, onCancel }) => {
    const [formData, setFormData] = useState(job);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSkillsChange = (e) => {
      const skills = e.target.value.split(',').map(skill => skill.trim());
      setFormData(prev => ({
        ...prev,
        skills
      }));
    };

    const handleBenefitsChange = (e) => {
      const benefits = e.target.value.split(',').map(benefit => benefit.trim());
      setFormData(prev => ({
        ...prev,
        benefits
      }));
    };
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select State</option>
              {filterOptions.state.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location (City)
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Type</option>
              {filterOptions.type.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <select
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Salary Range</option>
              {filterOptions.salary.map(salary => (
                <option key={salary} value={salary}>{salary}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              {filterOptions.department.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Experience</option>
              {filterOptions.experience.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              value={formData.skills.join(', ')}
              onChange={handleSkillsChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefits (comma-separated)
            </label>
            <input
              type="text"
              value={formData.benefits.join(', ')}
              onChange={handleBenefitsChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => onCancel()}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Job
          </button>
        </div>
      </motion.div>
    );
  };
  return (
    <>
      <div className="h-16 bg-teal-800 w-full"></div>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-teal-800 text-white p-6">
          <h1 className="text-2xl font-bold">Resume Admin Dashboard</h1>
        </div>
        <Resume />
      </div>

      {/* Elegant divider */}
      <div className="relative h-1 mx-auto w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>

      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className={`transition-all duration-300 ease-in-out `}>
          <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Job Listings</h1>
                <button
                  onClick={() => {
                    setIsAddingNew(true);
                    setEditingJob(null);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Job
                </button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Add/Edit Form */}
              {(isAddingNew || editingJob) && (
                <JobForm
                  job={isAddingNew ? newJob : editingJob}
                  onSave={handleSave}
                  // onSave={(data) => {
                  //   handleSave(data);
                  //   handleSaveExtra(data);
                  // }}
                  onCancel={handleCancel}
                />
              )}

              {/* Jobs List */}
              <div className="space-y-6">
                {jobs
                  .filter(job =>
                    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.company.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(job => (
                    <motion.div
                      key={job._id}
                      layout
                      className="bg-white rounded-lg shadow-sm p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleEdit(job)}
                            className="p-2 text-gray-400 hover:text-blue-600"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="p-2 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Location</span>
                          <p>{job.location}, {job.state}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Type</span>
                          <p>{job.type}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Salary</span>
                          <p>{job.salary}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Posted</span>
                          <p>{job.posted}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant divider */}
      <div className="relative h-1 mx-auto w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>

      <Contact />

      {/* Elegant divider */}
      <div className="relative h-1 mx-auto w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>

      <Stories />

      {/* Elegant divider */}
      <div className="relative h-1 mx-auto w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>

      <Team />

      {/* Elegant divider */}
      <div className="relative h-1 mx-auto w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>



      {/* Main Content */}
      <main className="p-6">
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;