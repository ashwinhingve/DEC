

'use client';
import React, { useState, useEffect } from 'react';
import { Job } from '../../types/job'
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Briefcase,
  Search,
  Filter,
  Building2,
  GraduationCap,
  Users,
  Star,
  Building,
  IndianRupee,
  X, Menu, FolderKanban
} from 'lucide-react';

// interface Job {
//   id: number;
//   title: string;
//   company: string;
//   location: string;
//   state: string;
//   type: string;
//   salary: string;
//   department: string;
//   posted: string;
//   description: string;
//   skills: string[];
//   education: string;
//   experience: string;
//   industry: string;
//   occupation: string;
//   benefits: string[];
// }
// async function getJobs() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
//       cache: 'no-store'
//     })

//     if (!res.ok) {
//       throw new Error('Failed to fetch jobs')
//     }

//     return res.json()
//   } catch (error) {
//     console.error('Error:', error)
//     return []
//   }
// }
interface JobDetailsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

interface FilterState {
  location: string;
  state: string;
  city: string;
  type: string;
  department: string;
  salary: string;
  skills: string[];
  education: string;
  experience: string;
  company: string;
  occupation: string;
  industry: string;
}
// Create initial filter state
const initialFilterState: FilterState = {
  location: '',
  state: '',
  city: '',
  type: '',
  department: '',
  salary: '',
  skills: [],
  education: '',
  experience: '',
  company: '',
  occupation: '',
  industry: ''
};

const JobDetailsPopover: React.FC<JobDetailsPopoverProps> = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{job.title}</h2>

            <div className="space-y-6">
              {/* Company Info */}
              <div className="flex items-center space-x-2 text-gray-600">
                <Building2 className="w-5 h-5" />
                <span className="font-medium">{job.company}</span>
              </div>

              {/* Job Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{job.location}, {job.state}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <IndianRupee className="w-4 h-4 mr-2" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span>{job.education}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{job.description}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-semibold mb-2">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex justify-end pt-4 border-t">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <a href="/profile">Apply Now</a>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


const JobsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  // const [filters, setFilters] = useState<FilterState>({
  //   location: '',
  //   state: '',
  //   city: '',
  //   type: '',
  //   department: '',
  //   salary: '',
  //   skills: [],
  //   education: '',
  //   experience: '',
  //   company: '',
  //   occupation: '',
  //   industry: ''
  // });
  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      if (!res.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);


  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowDetails(true);
  };

  // Reset filters to initial state
  const handleClearFilters = () => {
    setFilters(initialFilterState);
  };

  // Filter section component with proper typing
  const FilterSection: React.FC<{
    title: string;
    options: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    icon: React.ElementType;
  }> = ({ title, options, value, onChange, icon: Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center mb-2">
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-600" />}
        <h3 className="text-sm font-medium text-gray-700 capitalize">{title}</h3>
      </div>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">All {title}s</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </motion.div>
  );
  // Enhanced filter options
  const filterOptions = {
    state: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
      "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
      "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
      "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
      "Uttar Pradesh", "Uttarakhand", "West Bengal",
      "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
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
      "Below 1 LPA", "1-1.5 LPA", "1.5-2.0 LPA", "2-2.5 LPA",
      "2.5-3.0 LPA", "3.0-3.5 LPA", "3.5-4 LPA", "4-4.5 LPA", "4.5-5.0 LPA", "Above 5 LPA"
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
      "Fresher", "≤ 6 Months", "0.5-1 year", "1-2 years", "2-3 years", "3-5 years",
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

  // Filter jobs based on all criteria
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = !filters.state || job.state === filters.state;
    const matchesCity = !filters.city || job.location === filters.city;
    const matchesType = !filters.type || job.type === filters.type;
    const matchesDepartment = !filters.department || job.department === filters.department;
    const matchesSalary = !filters.salary || job.salary === filters.salary;
    const matchesEducation = !filters.education || job.education === filters.education;
    const matchesExperience = !filters.experience || job.experience === filters.experience;
    const matchesIndustry = !filters.industry || job.industry === filters.industry;
    const matchesOccupation = !filters.occupation || job.occupation === filters.occupation;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCity &&
      matchesType &&
      matchesDepartment &&
      matchesSalary &&
      matchesEducation &&
      matchesExperience &&
      matchesIndustry &&
      matchesOccupation
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // const FilterSection = ({ title, options, value, onChange, icon: Icon }) => (
  //   <motion.div
  //     initial={{ opacity: 0, y: 20 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     className="mb-6"
  //   >
  //     <div className="flex items-center mb-2">
  //       {Icon && <Icon className="w-4 h-4 mr-2 text-gray-600" />}
  //       <h3 className="text-sm font-medium text-gray-700 capitalize">{title}</h3>
  //     </div>
  //     <select
  //       value={value}
  //       onChange={onChange}
  //       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //     >
  //       <option value="">All {title}s</option>
  //       {options.map(option => (
  //         <option key={option} value={option}>{option}</option>
  //       ))}
  //     </select>
  //   </motion.div>
  // );

  const SidebarContent = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Keep your existing FilterSection components */}
      <FilterSection
        title="state"
        options={filterOptions.state}
        value={filters.state}
        onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
        icon={MapPin}
      />

      <FilterSection
        title="city"
        options={filterOptions.city}
        value={filters.city}
        onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
        icon={Building2}
      />

      <FilterSection
        title="experience"
        options={filterOptions.experience}
        value={filters.experience}
        onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
        icon={Briefcase}
      />

      <FilterSection
        title="education"
        options={filterOptions.education}
        value={filters.education}
        onChange={(e) => setFilters(prev => ({ ...prev, education: e.target.value }))}
        icon={GraduationCap}
      />

      <FilterSection
        title="salary"
        options={filterOptions.salary}
        value={filters.salary}
        onChange={(e) => setFilters(prev => ({ ...prev, salary: e.target.value }))}
        icon={IndianRupee}
      />

      <FilterSection
        title="industry"
        options={filterOptions.industry}
        value={filters.industry}
        onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
        icon={Building}
      />

      <FilterSection
        title="department"
        options={filterOptions.department}
        value={filters.department}
        onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
        icon={Users}
      />

      <FilterSection
        title="occupation"
        options={filterOptions.occupation}
        value={filters.occupation}
        onChange={(e) => setFilters(prev => ({ ...prev, occupation: e.target.value }))}
        icon={Briefcase}
      />
      {/* ... Add all other FilterSection components ... */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-teal-800  text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-bold mb-4"
            >
              Find Your Dream Job in India
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-100 mb-8"
            >
              Discover opportunities across top companies and cities
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="max-w-2xl mx-auto relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, skills, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Filters and Job Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Hamburger Menu Button - Only visible on mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="fixed bottom-4 right-4 lg:hidden z-30 bg-blue-600 text-white p-3 rounded-full shadow-lg"
              aria-label="Open Filters"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <SidebarContent />
            </div>

            {/* Mobile Sidebar with Overlay */}
            <AnimatePresence>
              {isSidebarOpen && (
                <>
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black lg:hidden z-40"
                  />

                  {/* Mobile Sidebar */}
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl lg:hidden z-50 overflow-y-auto"
                  >
                    <SidebarContent />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Filters Sidebar */}
            {/* <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    <h2 className="text-lg font-semibold">Filters</h2>
                  </div>
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>

                <FilterSection
                  title="state"
                  options={filterOptions.state}
                  value={filters.state}
                  onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                  icon={MapPin}
                />

                <FilterSection
                  title="city"
                  options={filterOptions.city}
                  value={filters.city}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                  icon={Building2}
                />

                <FilterSection
                  title="experience"
                  options={filterOptions.experience}
                  value={filters.experience}
                  onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
                  icon={Briefcase}
                />

                <FilterSection
                  title="education"
                  options={filterOptions.education}
                  value={filters.education}
                  onChange={(e) => setFilters(prev => ({ ...prev, education: e.target.value }))}
                  icon={GraduationCap}
                />

                <FilterSection
                  title="salary"
                  options={filterOptions.salary}
                  value={filters.salary}
                  onChange={(e) => setFilters(prev => ({ ...prev, salary: e.target.value }))}
                  icon={IndianRupee}
                />

                <FilterSection
                  title="industry"
                  options={filterOptions.industry}
                  value={filters.industry}
                  onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                  icon={Building}
                />

                <FilterSection
                  title="department"
                  options={filterOptions.department}
                  value={filters.department}
                  onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                  icon={Users}
                />

                <FilterSection
                  title="occupation"
                  options={filterOptions.occupation}
                  value={filters.occupation}
                  onChange={(e) => setFilters(prev => ({ ...prev, occupation: e.target.value }))}
                  icon={Briefcase}
                />
              </div>
            </motion.div> */}

            {/* Job Listings */}
            {/* Job Listings Section */}
            <div className="lg:col-span-3">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <AnimatePresence>
                  {filteredJobs.slice().reverse().map(job => (
                    <motion.div
                      key={job.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 20 }}
                      layout
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                    >
                      {/* Header Section */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <div className="flex items-center text-gray-600">
                            <Building2 className="w-4 h-4 mr-1" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-yellow-500"
                          >
                            <Star className="w-5 h-5" />
                          </motion.button>
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            {job.type}
                          </motion.span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4">{job.description}</p>

                      {/* Skills Section */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Job Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{job.location}, {job.state}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="w-4 h-4 mr-1" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <GraduationCap className="w-4 h-4 mr-1" />
                          <span>{job.education}</span>
                        </div>
                      </div>

                      {/* Benefits Section */}
                      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mr-5">
                        <div className="flex flex-col">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.benefits.map((benefit, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FolderKanban className="w-4 h-4 mr-1" />
                          <span>{job.department}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500">{job.posted}</span>
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleViewDetails(job)}
                            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                          >
                            View Details
                          </motion.button>
                          {showDetails && (
                            <JobDetailsPopover
                              isOpen={showDetails}
                              onClose={() => {
                                setShowDetails(false);
                                setSelectedJob(null);
                              }}
                              job={selectedJob}
                            />
                          )}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            <a href="/profile">Apply Now</a>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>


                {/* No Results Message */}
                {filteredJobs.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <p className="text-gray-600">No jobs found matching your criteria.</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}
export default JobsPage