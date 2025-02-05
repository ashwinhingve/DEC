"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import {
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ContactUs = () => {
  const [preferredContact, setPreferredContact] = useState("");
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   preference: "",
  //   message: "",
  // });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
            </div>
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
              disabled={formStatus !== 'idle'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center transition-colors duration-200 ${
                formStatus === 'success' 
                  ? 'bg-green-500' 
                  : formStatus === 'submitting'
                  ? 'bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {formStatus === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Sent Successfully
                </>
              ) : formStatus === 'submitting' ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Contact Form Section */}
      <div className="min-h-screen">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Section */}
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {/* <Image
                    src="/first/contact-banner.jpg"
                    alt="Contact Us"
                    width={600}
                    height={800}
                    className="w-full h-96 object-cover"
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <h1 className="absolute top-8 left-8 text-5xl font-bold text-white">
                    Contact Us
                  </h1>
                  <div className="absolute bottom-0 w-full p-8">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 space-y-4">
                      <a
                        href="tel:470-601-1911"
                        className="flex items-center group"
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                          <FaPhone className="text-indigo-600" />
                        </div>
                        <span className="ml-4 text-gray-800">+(91) 7722965066</span>
                      </a>
                      <a
                        href="https://demploymentcorner.com"
                        className="flex items-center group"
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                          <FaGlobe className="text-indigo-600" />
                        </div>
                        <span className="ml-4 text-gray-800">
                          demploymentcorner.com
                        </span>
                      </a>
                      <div className="flex items-center group">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FaMapMarkerAlt className="text-indigo-600" />
                        </div>
                        <span className="ml-4 text-gray-800">All India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Section - Form */}
              <motion.div
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <h2 className="text-5xl font-bold text-center mb-8 bg-clip-text text-slate-900">
                  SEND US A MESSAGE
                </h2>
                <form className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-6 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-6 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="w-full px-6 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                    />
                  </motion.div>

                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Preferred Method of Communication
                    </p>
                    <div className="flex justify-center space-x-8">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <div className="relative">
                          <input
                            type="radio"
                            name="contact"
                            value="email"
                            className="hidden"
                            onChange={(e) =>
                              setPreferredContact(e.target.value)
                            }
                          />
                          <div
                            className={`w-5 h-5 border-2 rounded-full ${preferredContact === "email"
                              ? "border-indigo-600"
                              : "border-gray-300"
                              }`}
                          >
                            {preferredContact === "email" && (
                              <div className="absolute inset-1 bg-indigo-600 rounded-full" />
                            )}
                          </div>
                        </div>
                        <span>Email</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <div className="relative">
                          <input
                            type="radio"
                            name="contact"
                            value="phone"
                            className="hidden"
                            onChange={(e) =>
                              setPreferredContact(e.target.value)
                            }
                          />
                          <div
                            className={`w-5 h-5 border-2 rounded-full ${preferredContact === "phone"
                              ? "border-indigo-600"
                              : "border-gray-300"
                              }`}
                          >
                            {preferredContact === "phone" && (
                              <div className="absolute inset-1 bg-indigo-600 rounded-full" />
                            )}
                          </div>
                        </div>
                        <span>Phone</span>
                      </label>
                    </div>
                  </div>

                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-6 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>


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