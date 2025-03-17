'use client'
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import {
  Upload,
  User,
  Mail,
  Phone,
  Globe,
  Camera,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2
} from 'lucide-react';

const useResumeHandler = (formData, resumeFile, fetchSavedResumes) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validateFormData = useCallback(() => {
    const errors = [];

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.personal.email && !emailRegex.test(formData.personal.email)) {
      errors.push('Invalid email format');
    }

    // Validate phone format
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (formData.personal.phone && !phoneRegex.test(formData.personal.phone)) {
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

    return errors;
  }, [formData]);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }, []);

  const generatePDF = useCallback(async () => {
    // Create new PDF document
    const doc = new jsPDF();

    // Set document properties
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;

    // Theme colors
    const primaryColor = [41, 128, 185]; // Blue
    const secondaryColor = [52, 73, 94]; // Dark gray
    const accentColor = [22, 160, 133]; // Teal

    // Add header with color background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Add profile photo if available
    if (formData.personal.photo) {
      try {
        doc.addImage(formData.personal.photo, 'JPEG', margin, 10, 20, 20, undefined, 'FAST');
        // Add personal information with offset for photo
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text(formData.personal.fullName, margin + 25, 20);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(formData.personal.jobTitle || 'Professional', margin + 25, 28);
      } catch (err) {
        console.error("Error adding photo:", err);
        // If photo fails, add name without offset
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text(formData.personal.fullName, margin, 20);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(formData.personal.jobTitle || 'Professional', margin, 28);
      }
    } else {
      // No photo, add name without offset
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(formData.personal.fullName, margin, 20);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(formData.personal.jobTitle || 'Professional', margin, 28);
    }

    // Reset position after header
    yPosition = 50;

    // Contact information section with icons (simulated)
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(margin, yPosition, pageWidth - (margin * 2), 50, 2, 2, 'FD'); // Increased height to accommodate multiple lines

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    let contactY = yPosition + 15;
    const lineHeight = 10;
    const contactX = margin + 5;

    if (formData.personal.email) {
      doc.text(`Email: ${formData.personal.email}`, contactX, contactY);
      contactY += lineHeight;
    }

    if (formData.personal.phone) {
      doc.text(`Phone: ${formData.personal.phone}`, contactX, contactY);
      contactY += lineHeight;
    }

    if (formData.personal.website) {
      doc.text(`Web: ${formData.personal.website}`, contactX, contactY);
      contactY += lineHeight;
    }

    if (formData.personal.location) {
      doc.text(`Location: ${formData.personal.location}`, contactX, contactY);
    }

    yPosition += 55;

    // Add summary with stylish heading
    if (formData.personal.summary) {
      // Section heading
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.rect(margin, yPosition, pageWidth - (margin * 2), 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('PROFESSIONAL SUMMARY', margin + 5, yPosition + 5.5);

      yPosition += 12;

      // Summary content
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      const summaryLines = doc.splitTextToSize(formData.personal.summary, pageWidth - (margin * 2) - 10);
      doc.text(summaryLines, margin + 5, yPosition);

      yPosition += (summaryLines.length * 5) + 10;
    }

    // Add experience section
    if (formData.experience.length > 0 && formData.experience[0].company) {
      // Section heading
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.rect(margin, yPosition, pageWidth - (margin * 2), 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('PROFESSIONAL EXPERIENCE', margin + 5, yPosition + 5.5);

      yPosition += 15;

      // Experience entries
      formData.experience.forEach((exp, index) => {
        if (exp.company) {
          // Add timeline dot
          doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
          doc.circle(margin + 3, yPosition - 1, 2, 'F');

          // Company and position
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.text(`${exp.position} at ${exp.company}`, margin + 10, yPosition);

          // Dates
          doc.setTextColor(100, 100, 100);
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(9);
          const dateText = `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`;
          doc.text(dateText, pageWidth - margin - doc.getTextWidth(dateText), yPosition);

          yPosition += 6;

          // Description
          if (exp.description) {
            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);

            const descLines = doc.splitTextToSize(exp.description, pageWidth - (margin * 2) - 15);
            doc.text(descLines, margin + 10, yPosition);

            yPosition += (descLines.length * 5) + 8;
          } else {
            yPosition += 8;
          }
        }
      });

      yPosition += 5;
    }

    // Add education section
    if (formData.education.length > 0 && formData.education[0].school) {
      // Check if we need a new page
      if (yPosition > 240) {
        doc.addPage();
        yPosition = margin;
      }

      // Section heading
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.rect(margin, yPosition, pageWidth - (margin * 2), 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('EDUCATION', margin + 5, yPosition + 5.5);

      yPosition += 15;

      // Education entries
      formData.education.forEach((edu) => {
        if (edu.school) {
          // Add timeline dot
          doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
          doc.circle(margin + 3, yPosition - 1, 2, 'F');

          // School
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.text(edu.school, margin + 10, yPosition);

          // Graduation date
          doc.setTextColor(100, 100, 100);
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(9);
          const dateText = formatDate(edu.graduationDate);
          doc.text(dateText, pageWidth - margin - doc.getTextWidth(dateText), yPosition);

          yPosition += 6;

          // Degree and field
          doc.setTextColor(80, 80, 80);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          const degreeText = `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}${edu.gpa ? ` - GPA: ${edu.gpa}` : ''}`;
          doc.text(degreeText, margin + 10, yPosition);

          yPosition += 10;
        }
      });

      yPosition += 5;
    }

    // Add skills section
    const validSkills = formData.skills.filter(skill => skill.trim());
    if (validSkills.length > 0) {
      // Check if we need a new page
      if (yPosition > 240) {
        doc.addPage();
        yPosition = margin;
      }

      // Section heading
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.rect(margin, yPosition, pageWidth - (margin * 2), 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('SKILLS & EXPERTISE', margin + 5, yPosition + 5.5);

      yPosition += 15;

      // Skills with visual elements
      const skillsPerRow = 2;
      const skillWidth = (pageWidth - (margin * 2)) / skillsPerRow;

      for (let i = 0; i < validSkills.length; i += skillsPerRow) {
        for (let j = 0; j < skillsPerRow; j++) {
          if (i + j < validSkills.length) {
            const skill = validSkills[i + j];
            const xPos = margin + (j * skillWidth);

            // Skill bubble
            doc.setFillColor(245, 245, 245);
            doc.roundedRect(xPos, yPosition - 4, skillWidth - 5, 6, 2, 2, 'F');

            // Skill text
            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.text(skill, xPos + 3, yPosition);
          }
        }
        yPosition += 8;
      }
    }

    // Add footer
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.8);
    doc.rect(0, 280, pageWidth, 17, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    const footerText = "Resume generated on " + new Date().toLocaleDateString();
    doc.text(footerText, pageWidth - margin - doc.getTextWidth(footerText), 290);

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
      
      // Generate PDF
      const doc = await generatePDF();
      const pdfBlob = doc.output('blob');
      
      // Create FormData to send both JSON and file
      const formDataToSend = new FormData();
      formDataToSend.append('resumeData', JSON.stringify(formData));
      
      // If using an uploaded file instead of generated one
      if (resumeFile) {
        formDataToSend.append('resumePdf', resumeFile, `${formData.personal.fullName.replace(/\s+/g, '_')}_resume.pdf`);
      } else {
        // Use the generated PDF
        formDataToSend.append('resumePdf', pdfBlob, `${formData.personal.fullName.replace(/\s+/g, '_')}_resume.pdf`);
      }
      
      // Save to MongoDB with PDF file
      const response = await fetch('/api/resumes', {
        method: 'POST',
        credentials: 'include', // Important for sending cookies
        body: formDataToSend, // Send FormData instead of JSON
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save resume');
      }
      
      const result = await response.json();
      toast.success('Resume saved successfully!');
      
      // Refresh saved resumes list
      fetchSavedResumes();
      
      // Download a copy for the user
      if (resumeFile) {
        const downloadLink = URL.createObjectURL(resumeFile);
        window.open(downloadLink);
      } else {
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
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeFile, setResumeFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [savedResumes, setSavedResumes] = useState([]);
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      jobTitle: '',
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

  const [selectedTheme, setSelectedTheme] = useState('blue'); // Default theme

  const themes = {
    blue: {
      primary: '#2980b9',
      secondary: '#34495e',
      accent: '#16a085'
    },
    green: {
      primary: '#27ae60',
      secondary: '#2c3e50',
      accent: '#f39c12'
    },
    purple: {
      primary: '#8e44ad',
      secondary: '#2c3e50',
      accent: '#e74c3c'
    },
    red: {
      primary: '#c0392b',
      secondary: '#2c3e50',
      accent: '#3498db'
    }
  };

  const fetchSavedResumes = useCallback(async () => {
    try {
      const response = await fetch('/api/resumes');

      if (response.ok) {
        const data = await response.json();
        setSavedResumes(data);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error('Failed to fetch saved resumes');
    }
  }, []);

  useEffect(() => {
    fetchSavedResumes();
  }, [fetchSavedResumes]);


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
  }, [formData.experience]);

  const addExperience = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    }));
  }, []);

  const removeExperience = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  }, []);

  const handleEducationChange = useCallback((index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData(prev => ({ ...prev, education: newEducation }));
  }, [formData.education]);

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

  const handlePhotoUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          personal: { ...prev.personal, photo: reader.result }
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const deleteResume = useCallback(async (id) => {
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Resume deleted successfully');
        fetchSavedResumes(); // Refresh the list
      } else {
        toast.error('Failed to delete resume');
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Error deleting resume');
    }
  }, [fetchSavedResumes]);

  const { handleSaveResume, isSubmitting, error } = useResumeHandler(formData, resumeFile, fetchSavedResumes);

  const currentTheme = themes[selectedTheme];

  return (
    <>
      <div className="h-20 bg-teal-800 w-full flex items-center justify-between px-8"></div>

      <div className="container mx-auto p-4">
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap mb-6">
            <button
              onClick={() => setActiveSection('personal')}
              className={`mr-2 mb-2 px-4 py-2 rounded-md ${activeSection === 'personal'
                ? `bg-${selectedTheme}-500 text-white`
                : 'bg-gray-200 text-gray-700'}`}>
              Personal Info
            </button>
            <button
              onClick={() => setActiveSection('experience')}
              className={`mr-2 mb-2 px-4 py-2 rounded-md ${activeSection === 'experience'
                ? `bg-${selectedTheme}-500 text-white`
                : 'bg-gray-200 text-gray-700'}`}>
              Experience
            </button>
            <button
              onClick={() => setActiveSection('education')}
              className={`mr-2 mb-2 px-4 py-2 rounded-md ${activeSection === 'education'
                ? `bg-${selectedTheme}-500 text-white`
                : 'bg-gray-200 text-gray-700'}`}>
              Education
            </button>
            <button
              onClick={() => setActiveSection('skills')}
              className={`mr-2 mb-2 px-4 py-2 rounded-md ${activeSection === 'skills'
                ? `bg-${selectedTheme}-500 text-white`
                : 'bg-gray-200 text-gray-700'}`}>
              Skills
            </button>
            <button
              onClick={() => setActiveSection('theme')}
              className={`mr-2 mb-2 px-4 py-2 rounded-md ${activeSection === 'theme'
                ? `bg-${selectedTheme}-500 text-white`
                : 'bg-gray-200 text-gray-700'}`}>
              Theme
            </button>
          </div>

          {activeSection === 'personal' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.personal.fullName}
                      onChange={handlePersonalChange}
                      className="w-full p-2 border rounded"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.personal.jobTitle}
                      onChange={handlePersonalChange}
                      className="w-full p-2 border rounded"
                      placeholder="Software Developer"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <div className="flex items-center border rounded overflow-hidden">
                      <span className="bg-gray-100 p-2 text-gray-500">
                        <Mail size={20} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.personal.email}
                        onChange={handlePersonalChange}
                        className="flex-1 p-2 outline-none"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <div className="flex items-center border rounded overflow-hidden">
                      <span className="bg-gray-100 p-2 text-gray-500">
                        <Phone size={20} />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.personal.phone}
                        onChange={handlePersonalChange}
                        className="flex-1 p-2 outline-none"
                        placeholder="+1 123-456-7890"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Website</label>
                    <div className="flex items-center border rounded overflow-hidden">
                      <span className="bg-gray-100 p-2 text-gray-500">
                        <Globe size={20} />
                      </span>
                      <input
                        type="url"
                        name="website"
                        value={formData.personal.website}
                        onChange={handlePersonalChange}
                        className="flex-1 p-2 outline-none"
                        placeholder="www.johndoe.com"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.personal.location}
                      onChange={handlePersonalChange}
                      className="w-full p-2 border rounded"
                      placeholder="New York, NY"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Profile Photo</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                        {photoPreview ? (
                          <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User size={40} className="text-gray-400" />
                        )}
                      </div>
                      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded flex items-center">
                        <Camera size={16} className="mr-2" />
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Professional Summary</label>
                <textarea
                  name="summary"
                  value={formData.personal.summary}
                  onChange={handlePersonalChange}
                  className="w-full p-2 border rounded"
                  rows="5"
                  placeholder="Brief overview of your experience and strengths"
                />
              </div>
            </div>
          )}

          {activeSection === 'experience' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <Briefcase size={18} className="mr-2" />
                      Experience #{index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Job Title"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="4"
                      placeholder="Describe your responsibilities and achievements"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addExperience}
                className="flex items-center text-green-600 hover:text-green-800 mt-2"
              >
                <Plus size={18} className="mr-1" /> Add Another Experience
              </button>
            </div>
          )}

          {activeSection === 'education' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <GraduationCap size={18} className="mr-2" />
                      Education #{index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">School/University</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Bachelor of Science"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Graduation Date</label>
                      <input
                        type="date"
                        value={edu.graduationDate}
                        onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">GPA (Optional)</label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="3.8"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addEducation}
                className="flex items-center text-green-600 hover:text-green-800 mt-2"
              >
                <Plus size={18} className="mr-1" /> Add Another Education
              </button>
            </div>
          )}

          {activeSection === 'skills' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Skills & Expertise</h2>
              <div className="space-y-3">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="e.g. Insurance, Project Management, etc."
                    />
                    {index > 0 && (
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addSkill}
                className="flex items-center text-green-600 hover:text-green-800 mt-4"
              >
                <Plus size={18} className="mr-1" /> Add Another Skill
              </button>
            </div>
          )}

          {activeSection === 'theme' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Theme</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(themes).map(([name, colors]) => (
                  <div
                    key={name}
                    onClick={() => setSelectedTheme(name)}
                    className={`cursor-pointer p-4 rounded-lg ${selectedTheme === name ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                      }`}
                    style={{ backgroundColor: colors.primary }}
                  >
                    <div className="h-16 rounded-lg flex flex-col justify-between p-2">
                      <div className="text-white font-semibold capitalize">{name}</div>
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Export Options</h3>
              <p className="text-gray-500">Save your resume or upload an existing file</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded flex items-center justify-center">
                <Upload size={16} className="mr-2" />
                Upload PDF
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleSaveResume}
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? 'Saving...' : 'Save & Download'}
              </button>
            </div>
          </div>
          {resumeFile && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded flex items-center">
              <span className="font-medium">File uploaded: </span>
              <span className="ml-2">{resumeFile.name}</span>
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;