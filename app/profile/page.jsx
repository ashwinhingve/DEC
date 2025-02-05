'use client'
import React, { useState } from 'react';
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

const ResumeBuilder = () => {
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

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', field: '', graduationDate: '', gpa: '' }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

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
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResumeBuilder;