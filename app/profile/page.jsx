'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import Photo from "./photo"
import { jsPDF } from 'jspdf';
import {
  Upload,
  User,
  Mail,
  Phone,
  Globe,
  Camera,
  Briefcase, Image as ImageIcon,
  GraduationCap,
  Plus, Eye, Loader, Check, CheckCircle,
  Trash2, Save, FileText, Palette, Star, MapPin, Download
} from 'lucide-react';

const useResumeHandler = (formData, resumeFile, fetchSavedResumes) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);


  const validateFormData = useCallback(() => {
    const errors = [];

    const { personal } = formData;
    if (!personal.fullName?.trim()) errors.push('Full name is required');
    if (!personal.email?.trim()) errors.push('Email is required');
    if (!personal.phone?.trim()) errors.push('Phone number is required');

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

  const handleSaveResumes = useCallback(async () => {
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

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, resumeFile, validateFormData, generatePDF]);

  return {
    handleSaveResume,
    handleSaveResumes,
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
      summary: '',
      photo: null
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
  // const [formData, setFormData] = useState({
  //   personal: { photo: null }
  // });

  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

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

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser doesn't support camera access or you're not using HTTPS");
        return;
      }

      // Get the stream with constraints that work well on mobile
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.error("Video play error:", e));
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access your camera. Please check permissions.");
    }
  }, []);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    }
  }, []);

  // Take photo from camera
  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg');

      setPhotoPreview(dataUrl);
      setFormData(prev => ({
        ...prev,
        personal: { ...prev.personal, photo: dataUrl }
      }));

      // Stop the camera after taking photo
      stopCamera();
    }
  }, [stopCamera]);

  useEffect(() => {
    if (isCameraActive && videoRef.current) {
      console.log("Camera should be active now");
      console.log("Video element:", videoRef.current);
      console.log("Stream active:", videoRef.current.srcObject !== null);
    }
  }, [isCameraActive]);

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

  // const handlePhotoUpload = useCallback((e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPhotoPreview(reader.result);
  //       setFormData(prev => ({
  //         ...prev,
  //         personal: { ...prev.personal, photo: reader.result }
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }, []);

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
  const { handleSaveResumes } = useResumeHandler(formData, resumeFile, fetchSavedResumes);

  const currentTheme = themes[selectedTheme];

  return (
    <>
      <div className="h-20 bg-teal-800 w-full flex items-center justify-between px-8"></div>

      <div className="container mx-auto p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Header Section with enhanced animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <div className="relative">
              <h1 className="text-5xl font-extrabold text-teal-700">
                Resume Builder
              </h1>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-teal-800 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </div>
          </motion.div>

          <motion.p
            className="text-gray-600 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Create a professional resume in minutes with our easy-to-use builder
          </motion.p>
        </motion.div>

        {/* Upload Resume Section with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-4 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <motion.span
              className="inline-block mr-2 text-blue-600"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Upload size={24} />
            </motion.span>
            Upload an Existing Resume
          </motion.h1>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="mb-4 group">
                  <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.personal.fullName}
                    onChange={handlePersonalChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="mb-4 group">
                  <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Phone</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                    <span className="bg-gray-100 p-3 text-gray-500">
                      <Phone size={20} />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.personal.phone}
                      onChange={handlePersonalChange}
                      className="flex-1 p-3 outline-none"
                      placeholder="+1 123-456-7890"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-4 group">
                  <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Email</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                    <span className="bg-gray-100 p-3 text-gray-500">
                      <Mail size={20} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.personal.email}
                      onChange={handlePersonalChange}
                      className="flex-1 p-3 outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="flex flex-col md:flex-row md:items-center justify-between mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <motion.label
                  className="cursor-pointer bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 py-3 px-5 rounded-lg flex items-center justify-center border border-gray-300 shadow-sm transform transition-transform duration-200 hover:scale-105"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload size={18} className="mr-2 text-blue-600" />
                  Upload PDF
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </motion.label>
                <motion.button
                  onClick={handleSaveResumes}
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 px-6 rounded-lg flex items-center justify-center shadow-md transform transition-transform duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Loader size={18} />
                      </motion.span>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save size={18} className="mr-2" />
                      Save Resume
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {resumeFile && (
              <motion.div
                className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <Check size={20} className="mr-2 text-green-500" />
                <span className="font-medium">File uploaded: </span>
                <span className="ml-2">{resumeFile.name}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle size={20} className="mr-2 text-red-500" />
                {error}
              </motion.div>
            )}
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mb-8"
        >
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-4 flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <motion.span
              className="inline-block mr-2 text-blue-600"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <FileText size={24} />
            </motion.span>
            Create Your Resume
          </motion.h1>

          <div className="mt-6 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex flex-wrap mb-6 gap-2">
              {['personal', 'experience', 'education', 'skills', 'theme'].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeSection === section
                    ? `bg-${selectedTheme}-500 text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section === 'personal' && <User size={16} className="inline mr-2" />}
                  {section === 'experience' && <Briefcase size={16} className="inline mr-2" />}
                  {section === 'education' && <GraduationCap size={16} className="inline mr-2" />}
                  {section === 'skills' && <Star size={16} className="inline mr-2" />}
                  {section === 'theme' && <Palette size={16} className="inline mr-2" />}
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Personal Information</h2>
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                      <div className="mb-4 group">
                        <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.personal.fullName}
                          onChange={handlePersonalChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="mb-4 group">
                        <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Job Title</label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.personal.jobTitle}
                          onChange={handlePersonalChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          placeholder="Software Developer"
                        />
                      </div>
                      <div className="mb-4 group">
                        <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                          <span className="bg-gray-100 p-3 text-gray-500">
                            <Mail size={20} />
                          </span>
                          <input
                            type="email"
                            name="email"
                            value={formData.personal.email}
                            onChange={handlePersonalChange}
                            className="flex-1 p-3 outline-none"
                            placeholder="name@example.com"
                          />
                        </div>
                      </div>
                      <div className="mb-4 group">
                        <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Phone</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                          <span className="bg-gray-100 p-3 text-gray-500">
                            <Phone size={20} />
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.personal.phone}
                            onChange={handlePersonalChange}
                            className="flex-1 p-3 outline-none"
                            placeholder="+1 123-456-7890"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-4 group">
                        <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Website</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                          <span className="bg-gray-100 p-3 text-gray-500">
                            <Globe size={20} />
                          </span>
                          <input
                            type="url"
                            name="website"
                            value={formData.personal.website}
                            onChange={handlePersonalChange}
                            className="flex-1 p-3 outline-none"
                            placeholder="www.demploymentcorner.com"
                          />
                        </div>
                      </div>
                      <div className="mb-4 group">
                        <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Location</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                          <span className="bg-gray-100 p-3 text-gray-500">
                            <MapPin size={20} />
                          </span>
                          <input
                            type="text"
                            name="location"
                            value={formData.personal.location}
                            onChange={handlePersonalChange}
                            className="flex-1 p-3 outline-none"
                            placeholder="New Delhi, IND"
                          />
                        </div>
                      </div>
                      {/* <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-medium">Profile Photo</label>
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-300 shadow-md"
                            whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
                            transition={{ duration: 0.2 }}
                          >
                            {photoPreview ? (
                              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <User size={40} className="text-gray-400" />
                            )}
                          </motion.div>
                          <motion.label
                            className="cursor-pointer bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center border border-gray-300 shadow-sm"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Camera size={16} className="mr-2 text-blue-600" />
                            Upload Photo
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </motion.label>
                        </div>
                      </div> */}
                      <Photo />
                    </div>
                  </div>
                  <div className="mb-4 group">
                    <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Professional Summary</label>
                    <textarea
                      name="summary"
                      value={formData.personal.summary}
                      onChange={handlePersonalChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      rows="5"
                      placeholder="Brief overview of your experience and strengths"
                    />
                  </div>
                </div>
              )}

              {activeSection === 'experience' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Professional Experience</h2>
                  {formData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="mb-6 p-5 border rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-300 shadow-sm hover:shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex justify-between mb-4">
                        <h3 className="font-medium text-lg flex items-center text-gray-800">
                          <Briefcase size={18} className="mr-2 text-blue-600" />
                          Experience #{index + 1}
                        </h3>
                        {index > 0 && (
                          <motion.button
                            onClick={() => removeExperience(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="group">
                          <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            placeholder="Company Name"
                          />
                        </div>
                        <div className="group">
                          <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Position</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            placeholder="Job Title"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="group">
                          <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Start Date</label>
                          <input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        </div>
                        <div className="group">
                          <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">End Date</label>
                          <input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="group">
                        <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          rows="4"
                          placeholder="Describe your responsibilities and achievements"
                        />
                      </div>
                    </motion.div>
                  ))}
                  <motion.button
                    onClick={addExperience}
                    className="flex items-center text-green-600 hover:text-green-800 mt-2 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={18} className="mr-1" /> Add Another Experience
                  </motion.button>
                </div>
              )}

              {activeSection === 'education' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Education</h2>
                  {formData.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="mb-6 p-5 border rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-300 shadow-sm hover:shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex justify-between mb-4">
                        <h3 className="font-medium text-lg flex items-center text-gray-800">
                          <GraduationCap size={18} className="mr-2 text-blue-600" />
                          Education #{index + 1}
                        </h3>
                        {index > 0 && (
                          <motion.button
                            onClick={() => removeEducation(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="group">
                          <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">School/University</label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            placeholder="University Name"
                          />
                        </div>
                        <div className="group">
                          <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Degree</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            placeholder="Bachelor of Science"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="group">
                          <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Field of Study</label>
                          <input
                            type="text"
                            value={edu.field}
                            onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            placeholder="Computer Science"
                          />
                        </div>
                        <div className="group">
                          <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">Graduation Date</label>
                          <input
                            type="date"
                            value={edu.graduationDate}
                            onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        </div>
                        <div className="group">
                          <label className="block text-gray-700 mb-2 font-medium group-hover:text-blue-600 transition-colors duration-300">GPA (Optional)</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            placeholder="3.8"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button
                    onClick={addEducation}
                    className="flex items-center text-green-600 hover:text-green-800 mt-2 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={18} className="mr-1" /> Add Another Education
                  </motion.button>
                </div>
              )}

              {activeSection === 'skills' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Skills & Expertise</h2>
                  <div className="space-y-3">
                    {formData.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
                            <span className="bg-gray-100 p-3 text-gray-500">
                              <Star size={16} className="text-blue-600" />
                            </span>
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => handleSkillChange(index, e.target.value)}
                              className="flex-1 p-3 outline-none"
                              placeholder="e.g. Insurance, Project Management, etc."
                            />
                          </div>
                        </div>
                        {index > 0 && (
                          <motion.button
                            onClick={() => removeSkill(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    onClick={addSkill}
                    className="flex items-center text-green-600 hover:text-green-800 mt-4 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={18} className="mr-1" /> Add Another Skill
                  </motion.button>
                </div>
              )}

              {activeSection === 'theme' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">Select Theme</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(themes).map(([name, colors]) => (
                      <motion.div
                        key={name}
                        onClick={() => setSelectedTheme(name)}
                        className={`cursor-pointer p-4 rounded-lg ${selectedTheme === name ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                          }`}
                        style={{ backgroundColor: colors.primary }}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="h-16 rounded-lg flex flex-col justify-between p-2">
                          <div className="text-white font-semibold capitalize">{name}</div>
                          <div className="flex space-x-2">
                            <motion.div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: colors.secondary }}
                              whileHover={{ scale: 1.2 }}
                            ></motion.div>
                            <motion.div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: colors.accent }}
                              whileHover={{ scale: 1.2 }}
                            ></motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <motion.button
                  onClick={handleSaveResume}
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-6 rounded-lg flex items-center justify-center shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="mr-2 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Download size={18} className="mr-2" /> Save & Download
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {resumeFile && (
              <motion.div
                className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center border border-green-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle size={18} className="mr-2 text-green-600" />
                <span className="font-medium">File ready: </span>
                <span className="ml-2">{resumeFile.name}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <AlertTriangle size={18} className="mr-2 text-red-600 inline" />
                {error}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ResumeBuilder;