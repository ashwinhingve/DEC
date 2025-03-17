"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
// import { toast, Toaster } from 'sonner';

// Define the initial form state
const initialFormData = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
  contactType: 'applicant',
  company: '',
  jobOffers: '',
  industry: ''
};

// Form statuses
const FORM_STATUS = {
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error'
};


const ContactUs = () => {
  const [preferredContact, setPreferredContact] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [formStatus, setFormStatus] = useState(FORM_STATUS.IDLE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      contactType: preferredContact
    }));
  }, [preferredContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Sending message...');

    try {
      setIsSubmitting(true);

      // Add the contactType to your form data
      const formDataWithContactType = {
        ...formData,
        contactType: preferredContact // Use the preferredContact state as your contactType
      };

      validateForm();
      setFormStatus(FORM_STATUS.SUBMITTING);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithContactType) // Send the updated data
      });

      // Rest of your code remains the same
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.dismiss(loadingToast);
      toast.success('Message sent successfully!');
      setFormStatus(FORM_STATUS.SUCCESS);
      setFormData(initialFormData);

      setTimeout(() => {
        setFormStatus(FORM_STATUS.IDLE);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.dismiss(loadingToast);
      toast.error(error.message || 'Failed to connect to server');
      setFormStatus(FORM_STATUS.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };
  const validateForm = () => {
    try {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Phone number validation (basic)
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error('Please enter a valid phone number');
      }

      // Check for empty required fields based on contact type
      const requiredFields = ['name', 'phone', 'email', 'subject', 'message'];

      // Add recruiter-specific fields if that option is selected
      if (preferredContact === "recruiter") {
        requiredFields.push('company', 'jobOffers', 'industry');
      }

      for (const field of requiredFields) {
        if (!formData[field] || !formData[field].trim()) {
          throw new Error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        }
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
        },
      });
      throw error; // Re-throw to be caught by handleSubmit
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+(91) 7722965066", "+(0) 7317967745"]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["admin@demploymentcorner.com", "vacancy@demploymentcorner.com"]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["Shri Krishna Divine mall 3rd floor, 313 Marimata Square, Indore (MP)"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Toaster position="top-center" expand={true} richColors /> */}
      {/* <Toaster /> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          style: {
            padding: '16px',
            borderRadius: '8px',
          },
        }}
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-teal-800 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center ">
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-50 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4">{info.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setPreferredContact("applicant")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${preferredContact === "recruiter" ? "text-gray-700" : "bg-blue-600 text-white"
                  }`}
              >
                Applicant
              </button>
              <button
                onClick={() => setPreferredContact("recruiter")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${preferredContact === "recruiter" ? "bg-blue-600 text-white" : "text-gray-700"
                  }`}
              >
                Recruiter
              </button>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>

              {/* Conditional fields based on selected option */}
              {preferredContact === "recruiter" && (
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company || ""}
                    onChange={handleChange}
                    required={preferredContact === "recruiter"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              )}
            </div>

            {preferredContact === "recruiter" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="jobOffers" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Offers
                  </label>
                  <input
                    type="text"
                    id="jobOffers"
                    name="jobOffers"
                    value={formData.jobOffers || ""}
                    onChange={handleChange}
                    required={preferredContact === "recruiter"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry || ""}
                    onChange={handleChange}
                    required={preferredContact === "recruiter"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting || formStatus !== FORM_STATUS.IDLE}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`
          w-full py-3 px-6 
          rounded-lg text-white font-medium 
          flex items-center justify-center 
          transition-all duration-200
          disabled:cursor-not-allowed
          ${formStatus === FORM_STATUS.SUCCESS
                  ? 'bg-green-500 hover:bg-green-600'
                  : formStatus === FORM_STATUS.SUBMITTING
                    ? 'bg-gray-400'
                    : formStatus === FORM_STATUS.ERROR
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-blue-600 hover:bg-blue-700'
                }
        `}
            >
              {formStatus === FORM_STATUS.SUCCESS ? (
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Sent Successfully</span>
                </div>
              ) : formStatus === FORM_STATUS.SUBMITTING ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  <span>Send Message</span>
                </div>
              )}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            {/* Replace this div with your map component */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  className="w-full h-72 md:h-96 transition-transform transform hover:scale-105"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.850324171921!2d75.84765747515561!3d22.733803979377267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd1cc5a4a043%3A0xb2f50858a3f56c1b!2sShri%20Krishna%20DIVINE!5e0!3m2!1sen!2sin!4v1738318437792!5m2!1sen!2sin"
                  frameBorder="0"
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;