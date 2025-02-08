'use client'
import React, { useState , useEffect ,useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
// import useResumeHandler from '../../useResumeHandler';
import {
  Upload,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2
} from 'lucide-react';

const useResumeHandler = (formData, resumeFile) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validateFormData = useCallback(() => {
    const errors = [];

    // Validate personal information
    const { personal } = formData;
    if (!personal.fullName?.trim()) errors.push('Full name is required');
    if (!personal.email?.trim()) errors.push('Email is required');
    if (!personal.phone?.trim()) errors.push('Phone number is required');
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (personal.email && !emailRegex.test(personal.email)) {
      errors.push('Invalid email format');
    }

    // Validate phone format
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (personal.phone && !phoneRegex.test(personal.phone)) {
      errors.push('Invalid phone number format');
    }

    // Validate experience entries
    formData.experience.forEach((exp, index) => {
      if (exp.company?.trim() && (!exp.startDate || !exp.position)) {
        errors.push(`Experience ${index + 1}: Start date and position are required`);
      }
    });

    // Validate education entries
    formData.education.forEach((edu, index) => {
      if (edu.school?.trim() && (!edu.degree || !edu.graduationDate)) {
        errors.push(`Education ${index + 1}: Degree and graduation date are required`);
      }
    });

    // Validate skills
    if (formData.skills.every(skill => !skill.trim())) {
      errors.push('At least one skill is required');
    }

    return errors;
  }, [formData]);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }, []);

  const generatePDF = useCallback(async () => {
    const doc = new jsPDF();
    const margin = 20;
    let yPosition = margin;

    // Set fonts
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);

    // Add personal information
    doc.text(formData.personal.fullName, margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    yPosition += 10;
    doc.text([
      formData.personal.email,
      formData.personal.phone,
      formData.personal.website,
    ].filter(Boolean).join(' | '), margin, yPosition);

    // Add summary
    if (formData.personal.summary) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Professional Summary', margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      yPosition += 10;
      doc.text(doc.splitTextToSize(formData.personal.summary, 170), margin, yPosition);
    }

    // Add experience
    if (formData.experience.length > 0) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Experience', margin, yPosition);
      
      formData.experience.forEach(exp => {
        if (exp.company) {
          yPosition += 10;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.text(`${exp.position} at ${exp.company}`, margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          yPosition += 5;
          doc.text(
            `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`,
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
    if (formData.education.length > 0) {
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Education', margin, yPosition);
      
      formData.education.forEach(edu => {
        if (edu.school) {
          yPosition += 10;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.text(edu.school, margin, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          yPosition += 5;
          doc.text(
            `${edu.degree}${edu.field ? ` in ${edu.field}` : ''} - ${formatDate(edu.graduationDate)}`,
            margin,
            yPosition
          );
        }
      });
    }

    // Add skills
    const validSkills = formData.skills.filter(skill => skill.trim());
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
  }, [formData, formatDate]);

  const handleSaveResume = useCallback(async () => {
    try {
      setIsSubmitting(true);
      setError(null);
  
      // Validate form data
      const validationErrors = validateFormData();
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'));
      }
  
      // Save to MongoDB
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for sending cookies
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save resume');
      }
  
      const result = await response.json();
      toast.success('Resume saved successfully!');
  
      // Generate PDF if needed
      if (resumeFile) {
        const downloadLink = URL.createObjectURL(resumeFile);
        window.open(downloadLink);
      } else {
        const doc = await generatePDF();
        doc.save(`${formData.personal.fullName.replace(/\s+/g, '_')}_resume.pdf`);
      }
  
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, resumeFile, validateFormData, generatePDF]);
  return {
    handleSaveResume,
    isSubmitting,
    error
  };
};

const ResumeBuilder = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState('personal');
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      website: '',
      location: '',
      summary: ''
    },
    experience: [
      { company: '', position: '', startDate: '', endDate: '', description: '' }
    ],
    education: [
      { school: '', degree: '', field: '', graduationDate: '', gpa: '' }
    ],
    skills: ['']
  });


  const handlePersonalChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  }, []);

  const handleExperienceChange = useCallback((index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, experience: newExperience }));
  }, []);

  const addExperience = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    }));
  }, []);

  const removeExperience = useCallback( (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  }, []);

  const handleEducationChange = useCallback((index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData(prev => ({ ...prev, education: newEducation }));
  }, []);

  const addEducation = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', field: '', graduationDate: '', gpa: '' }]
    }));
  }, []);

  const removeEducation = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSkillChange = useCallback((index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({ ...prev, skills: newSkills }));
  }, []);

  const addSkill = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  }, []);

  const removeSkill = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  }, []);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  const { handleSaveResume, isSubmitting, error } = useResumeHandler(formData, resumeFile);


  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
      <div className="h-20 bg-teal-800 w-full"></div>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-2xl font-bold mb-6">Create Your Resume</h1>

            {/* Upload Resume Option */}
            <div className="mb-8 p-6 border-2 border-dashed rounded-lg text-center">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-12 h-12 text-blue-500 mb-2" />
                <span className="text-lg font-medium mb-2">Upload Existing Resume</span>
                <span className="text-sm text-gray-500">
                  Drag and drop or click to upload (PDF, DOC, DOCX)
                </span>
              </label>
              {resumeFile && (
                <div className="mt-4 text-sm text-green-600">
                  Uploaded: {resumeFile.name}
                </div>
              )}
            </div>

            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold mb-6">Or Build Your Resume</h2>

              {/* Navigation Tabs */}
              <div className="flex border-b mb-6">
                {['personal', 'experience', 'education', 'skills'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`px-4 py-2 font-medium capitalize transition-colors
                    ${activeSection === section
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {/* Personal Information */}
              <div className={activeSection === 'personal' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.personal.fullName}
                      onChange={handlePersonalChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.personal.email}
                      onChange={handlePersonalChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.personal.phone}
                      onChange={handlePersonalChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.personal.website}
                      onChange={handlePersonalChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Summary
                    </label>
                    <textarea
                      name="summary"
                      value={formData.personal.summary}
                      onChange={handlePersonalChange}
                      rows="4"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className={activeSection === 'experience' ? 'block' : 'hidden'}>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                      {index > 0 && (
                        <button
                          onClick={() => removeExperience(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        type="date"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        type="date"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <div className="md:col-span-2">
                        <textarea
                          placeholder="Description"
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                          rows="4"
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addExperience}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Experience
                </button>
              </div>

              {/* Education */}
              <div className={activeSection === 'education' ? 'block' : 'hidden'}>
                {formData.education.map((edu, index) => (
                  <div key={index} className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Education {index + 1}</h3>
                      {index > 0 && (
                        <button
                          onClick={() => removeEducation(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        placeholder="School"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        type="date"
                        placeholder="Graduation Date"
                        value={edu.graduationDate}
                        onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                      <input
                        placeholder="GPA"
                        value={edu.gpa}
                        onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Education
                </button>
              </div>

              {/* Skills */}
              <div className={activeSection === 'skills' ? 'block' : 'hidden'}>
                <div className="space-y-4">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <input
                        placeholder="Add a skill"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded-lg"
                      />
                      {index > 0 && (
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addSkill}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Skill
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSaveResume}
                  disabled={isSubmitting}
                  className={`px-6 py-2 ${isSubmitting
                      ? 'bg-gray-400'
                      : 'bg-blue-600 hover:bg-blue-700'
                    } text-white rounded-lg transition-colors`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Resume'}
                </button>
              </div>
            </div>


            {/* <div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
            <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-gray-900">{user.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <p className="text-gray-900 capitalize">{user.role}</p>
            </div>
          </div>
            </div> */}
          </div>
        </div>
      </div>
      {error && (
    <div className="mt-4 text-red-600 text-sm">
      {error}
    </div>
  )}
    </>
  );
};

export default ResumeBuilder;