'use client'
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
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
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [modalOpen, setModalOpen] = useState(false);

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  // const fetchResumes = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch('/api/admin/resumes', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include', // Important for sending cookies
  //     });

  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(`Failed to fetch resumes: ${errorMessage}`);
  //     }

  //     const data = await response.json();
  //     setResumes(data);
  //   } catch (err) {
  //     setError(err.message);
  //     console.error('Error fetching resumes:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/resumes", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch resumes: ${response.statusText}`);
      }
  
      const data = await response.json();
      setResumes(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching resumes:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchResumes();
  }, []);
  const sortedResumes = React.useMemo(() => {
    const sortableItems = [...resumes];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        // Handle nested properties like personal.fullName
        const keyParts = sortConfig.key.split('.');
        let aValue = a;
        let bValue = b;

        for (const part of keyParts) {
          aValue = aValue?.[part];
          bValue = bValue?.[part];
        }

        if (aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [resumes, sortConfig]);


  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }







  const filteredResumes = sortedResumes.filter(resume => {
    const fullName = resume.personal?.fullName?.toLowerCase() || '';
    const email = resume.personal?.email?.toLowerCase() || '';
    const searchTermLower = searchTerm.toLowerCase();

    return fullName.includes(searchTermLower) || email.includes(searchTermLower);
  });
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


  // Filter options (reuse from your jobs page)
  // const filterOptions = {
  //   state: [
  //     "Andhra Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi",
  //     "Uttar Pradesh", "Gujarat", "Telangana", "West Bengal", "Madhya Pradesh"
  //   ],
  //   type: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
  //   department: [
  //     "Engineering", "Design", "Product", "Marketing", "Sales",
  //     "HR", "Finance", "Operations", "Customer Support", "Research"
  //   ],
  //   salary: [
  //     "Below 3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA",
  //     "15-25 LPA", "25-50 LPA", "Above 50 LPA"
  //   ],
  //   experience: [
  //     "Fresher", "1-3 years", "3-5 years", "5-7 years",
  //     "7-10 years", "10+ years"
  //   ],
  //   industry: [
  //     "Technology", "Healthcare", "Finance", "Education",
  //     "E-commerce", "Manufacturing", "Consulting", "Media"
  //   ]
  // };
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



  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewResume = (resume) => {
    setSelectedResume(resume);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedResume(null);
  };

  const handleDeleteResume = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;

    try {
      const response = await fetch(`/api/admin/resumes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete resume');
      }

      // Remove the deleted resume from state
      setResumes(resumes.filter(resume => resume._id !== id));
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('Failed to delete resume: ' + err.message);
    }
  };

  const handleDownloadResume = async (resume) => {
    try {
      const doc = generatePDF(resume);
      doc.save(`${resume.personal.fullName.replace(/\s+/g, '_')}_resume.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF: ' + err.message);
    }
  };

  const generatePDF = (resumeData) => {
    const doc = new jsPDF();
    const margin = 20;
    let yPosition = margin;

    // Set fonts
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);

    // Add personal information
    doc.text(resumeData.personal.fullName || 'Unnamed', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    yPosition += 10;
    doc.text([
      resumeData.personal.email,
      resumeData.personal.phone,
      resumeData.personal.website,
    ].filter(Boolean).join(' | '), margin, yPosition);

    // Add summary
    if (resumeData.personal.summary) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Professional Summary', margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      yPosition += 10;
      doc.text(doc.splitTextToSize(resumeData.personal.summary, 170), margin, yPosition);
    }

    // Add experience
    if (resumeData.experience?.length > 0) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Experience', margin, yPosition);

      resumeData.experience.forEach(exp => {
        if (exp.company) {
          yPosition += 10;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.text(`${exp.position} at ${exp.company}`, margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          yPosition += 5;
          doc.text(
            `${formatDateForPDF(exp.startDate)} - ${exp.endDate ? formatDateForPDF(exp.endDate) : 'Present'}`,
            margin,
            yPosition
          );
          if (exp.description) {
            yPosition += 5;
            doc.text(doc.splitTextToSize(exp.description, 170), margin, yPosition);
          }
        }
      });
    }

    // Add education
    if (resumeData.education?.length > 0) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Education', margin, yPosition);

      resumeData.education.forEach(edu => {
        if (edu.school) {
          yPosition += 10;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.text(edu.school, margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          yPosition += 5;
          doc.text(
            `${edu.degree}${edu.field ? ` in ${edu.field}` : ''} - ${formatDateForPDF(edu.graduationDate)}`,
            margin,
            yPosition
          );
        }
      });
    }

    // Add skills
    const validSkills = resumeData.skills?.filter(skill => skill.trim()) || [];
    if (validSkills.length > 0) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Skills', margin, yPosition);
      yPosition += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(validSkills.join(' • '), margin, yPosition);
    }

    return doc;
  };

  const formatDateForPDF = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // const emptyJobTemplate = {
  //   id: Date.now(),
  //   title: '',
  //   company: '',
  //   location: '',
  //   state: '',
  //   type: '',
  //   salary: '',
  //   department: '',
  //   posted: 'Just now',
  //   description: '',
  //   skills: [],
  //   education: '',
  //   experience: '',
  //   industry: '',
  //   occupation: '',
  //   benefits: []
  // };

  // const [newJob, setNewJob] = useState(emptyJobTemplate);



  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to load jobs');
    }
  };
  // const handleSave = async (jobData) => {
  //   try {
  //     const response = await fetch('/api/jobs', {
  //       method: jobData._id ? 'PUT' : 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(jobData),
  //     });

  //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  //     const result = await response.json();
  //     setJobs(jobData._id 
  //       ? jobs.map(j => j._id === result._id ? result : j)
  //       : [...jobs, result]
  //     );
  //     setIsAddingNew(false);
  //     setEditingJob(null);
  //   } catch (error) {
  //     console.error('Failed to save job:', error);
  //     toast.error('Failed to save job');
  //   }
  // };
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

  // const handleDeletes = (jobId) => {
  //   if (window.confirm('Are you sure you want to delete this job?')) {
  //     setJobs(jobs.filter(job => job._id !== jobId));
  //   }
  // };

  // const handleSaveExtra = (job) => {
  //   if (isAddingNew) {
  //     setJobs([...jobs, job]);
  //     setIsAddingNew(false);
  //     setNewJob(emptyJobTemplate);
  //   } else {
  //     setJobs(jobs.map(j => j.id === job._id ? job : j));
  //     setEditingJob(null);
  //   }
  // };

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

        {/* Main content */}
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Search and filters */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchResumes}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Resumes table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Loading resumes...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-600">
                {error}
              </div>
            ) : filteredResumes.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                No resumes found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('personal.fullName')}
                      >
                        <div className="flex items-center">
                          Name
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('personal.email')}
                      >
                        <div className="flex items-center">
                          Email
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('createdAt')}
                      >
                        <div className="flex items-center">
                          Date
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredResumes.map((resume) => (
                      <tr key={resume._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {resume.personal?.fullName || 'Unnamed'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {resume.personal?.email || 'No email'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(resume.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewResume(resume)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="View Resume"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDownloadResume(resume)}
                              className="text-green-600 hover:text-green-900"
                              title="Download as PDF"
                            >
                              <Download className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteResume(resume._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Resume"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal for viewing resume details */}
        {modalOpen && selectedResume && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Resume Details</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold border-b pb-2 mb-3">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedResume.personal?.fullName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedResume.personal?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedResume.personal?.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <p className="font-medium">{selectedResume.personal?.website || 'N/A'}</p>
                    </div>
                  </div>
                  {selectedResume.personal?.summary && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Professional Summary</p>
                      <p className="mt-1">{selectedResume.personal.summary}</p>
                    </div>
                  )}
                </div>

                {/* Experience */}
                {selectedResume.experience?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold border-b pb-2 mb-3">Experience</h3>
                    <div className="space-y-4">
                      {selectedResume.experience.map((exp, index) => (
                        exp.company && (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                              <h4 className="font-medium">{exp.position} at {exp.company}</h4>
                              <p className="text-sm text-gray-500">
                                {formatDateForPDF(exp.startDate)} - {exp.endDate ? formatDateForPDF(exp.endDate) : 'Present'}
                              </p>
                            </div>
                            {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {selectedResume.education?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold border-b pb-2 mb-3">Education</h3>
                    <div className="space-y-4">
                      {selectedResume.education.map((edu, index) => (
                        edu.school && (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                              <h4 className="font-medium">{edu.school}</h4>
                              <p className="text-sm text-gray-500">
                                {formatDateForPDF(edu.graduationDate)}
                              </p>
                            </div>
                            <p className="text-sm">
                              {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                              {edu.gpa ? ` - GPA: ${edu.gpa}` : ''}
                            </p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {selectedResume.skills?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold border-b pb-2 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedResume.skills.filter(skill => skill.trim()).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 border-t flex justify-end">
                <button
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  onClick={() => handleDownloadResume(selectedResume)}
                >
                  Download as PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Elegant divider */}
      <div className="relative h-1 mx-auto w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>

      <div className="min-h-screen bg-gray-50">


        {/* Main Content */}
        <div className={`transition-all duration-300 ease-in-out `}>
          {/* Header */}
          {/* <header className="bg-white border-b sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center flex-1 ml-4">
                <div className="relative w-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/logo.png"
                    alt="Admin"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </header> */}


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
            {/* 
          <CustomCard>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Applications</h2>
              <button className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                View All
              </button>
            </div>
            <div className="divide-y">
              {recentApplications.map((application) => (
                <div
                  key={application.name}
                  className="flex items-center justify-between py-4 transition-colors hover:bg-gray-50 px-4 -mx-4"
                >
                  <div>
                    <p className="font-medium">{application.name}</p>
                    <p className="text-sm text-gray-500">{application.position}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    application.status === 'Hired' ? 'bg-green-100 text-green-800' :
                    application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </CustomCard> */}
          </main>
        </div>

      </div>

    </>
  );
};

export default AdminDashboard;