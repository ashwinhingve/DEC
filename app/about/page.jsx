"use client"
import Image from "next/image";
import React from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Card, CardContent } from '/card';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Navigation, Pagination, Autoplay } from "swiper/modules";
import {   Globe, MapPin,
  ArrowUp, Users, Briefcase, Award, ArrowRight, User, Mail, Phone, Linkedin, Twitter  } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const ExecutiveCard = ({ role, name, quote, email, phone, socialLinks, image }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-64">
          <img
            src={image || "/api/placeholder/400/320"}
            alt={name}
            className="w-full h-full object-cover "
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-60'}`} />
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
            <p className="text-purple-600 font-semibold">{role}</p>
          </div>
          
          <p className="text-gray-600 mb-6">{quote}</p>
          
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-2" />
              <a href={`mailto:${email}`} className="hover:text-purple-600 transition-colors">
                {email}
              </a>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-2" />
              <a href={`tel:${phone}`} className="hover:text-purple-600 transition-colors">
                {phone}
              </a>
            </div>
            
            <div className="flex space-x-4 pt-4 border-t">
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
   
    // const executives = [
    //   {
    //     name: "Steven Dirkse",
    //     role: "FOUNDER & CEO",
    //     quote: "Nunc a scelerisque dolor, in cursus sem. Aenean turpis elit, tempus vel dictum consectetur, consectetur a sem. Vivamus lacinia rutrum justo sed iaculis. Ut eget magna vel elit suscipit scelerisque.",
    //     image: "/api/placeholder/200/200"
    //   },
    //   // Add more executives as needed
    // ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '10K+', label: 'Happy Clients' },
    { icon: <Briefcase className="w-6 h-6" />, value: '100+', label: 'Projects Completed' },
    { icon: <Award className="w-6 h-6" />, value: '7+', label: 'Years Experience' },
  ];

  const teamMembers = [
    // {
    //   id: 1,
    //   name: "Ranjna Adalak",
    //   position: "Managing Director",
    //   image: "/images/e1.jpg",
    //   description:
    //     "Ranjna Adalak is our MD. She has done her MBA in HR & Finance. Our Firm is indulged in providing complete staffing and recruitment solutions.",
    // },
    // {
    //   id: 2,
    //   name: "Akhilesh Deshmukh",
    //   position: "Director Operations",
    //   image: "/images/e6.jpg",
    //   description:
    //     " Strategic planning  Operations management  Process improvement  Budgeting and forecasting  Risk management  Team management",
    // },
    // {
    //   id: 3,
    //   name: "Abhishek Deshmukh",
    //   position: " Business Head",
    //   image: "/images/e7.jpg",
    //   description:
    //     " Strategic planning  Business development  P&L management  Team leadership  Customer relationships  Market analysis  Innovation and growth",
    // },
    {
      id: 4,
      name: "Shravan Kumar",
      position: "SR BDM",
      image: "/images/e8.jpg",
      description:
        "Business planning  Relationship building  Sales and revenue growth  Market analysis  Team leadership  Strategic partnerships  Deal negotiation  Reporting and analysis",
    },
    {
      id: 5,
      name: "Aditya Vishwas Gotmare",
      position: "Manager HR",
      image: "/images/e2.jpg",
      description:
        "Organizational Development, JD Development, Talent management, Employee engagement, Employee relations culture, HR communication  HR Operation",
    },
    {
      id: 6,
      name: "Ms Khushi Sahu",
      position: "HR Assistant",
      image: "/images/e3.jpg",
      description:
        "Recruitment & Development, Induction & Orientation, Talent Acquisition, Employee Hiring, Employe Orientation Exit Interviews and process  Recruiting and Interviewing",
    },
    {
      id: 7,
      name: "Raj Sikarwar",
      position: "HR Recruiters Team Leader",
      image: "/images/e4.jpg",
      description:
        "Manage recruitment including sourcing, screening, interviews, onboarding, and induction. Handle HR policies, documentation, Ensure",
    },
    {
      id: 8,
      name: "Jiya Singh",
      position: "Project Manager",
      image: "/images/e55.jpg",
      description:
        "1. Leads a team of recruiters, Develops recruitment strategies, Manages client relationships, Oversees talent acquisition, Improves recruitment processes",
    },
    {
      id: 9,
      name: "Sonam Sen",
      position: "Recruitment Analysist",
      image: "/images/e5.jpg",
      description:
        "Data analysis,  Reporting,  Process improvement,  Candidate sourcing",
    },
  ];
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 77 229 65066",
      href: "tel:+917722965066"
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.demploymentcorner.com",
      href: "https://www.demploymentcorner.com"
    },
    {
      icon: MapPin,
      label: "Address",
      value: "311, 3rd Floor, Shri-Krishna Divine Shopping Mall, Marimata Square, Indore (MP) 452007",
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide(
        (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
      );
    };
  return (
    <>
     <div className="min-h-screen bg-white">
    {/* Hero Section */}
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-96 bg-gray-900 text-white"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-teal-800 opacity-90"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Innovating for Tomorrow</h1>
          <p className="text-xl text-gray-200">We're a team of passionate individuals dedicated to creating exceptional digital experiences.</p>
        </div>
      </div>
    </motion.section>

    {/* Stats Section */}

    <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{
            duration: 0.6,
            delay: index * 0.3,
            type: "spring",
            stiffness: 120,
          }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform"
        >
          <div className="text-blue-600 mb-4 text-4xl">{stat.icon}</div>
          <div className="text-3xl font-semibold text-gray-900 mb-2">{stat.value}</div>
          <div className="text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            {...fadeIn}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
             {/* Hero Section */}
      <section className="bg-teal-800 text-white rounded-lg py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold mb-4">About Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
          D EMPLOYMENT CORNER PVT LTD was formed in July 2018 and Ranjna Adalak is our MD. She has done her MBA in HR & Finance. Our Firm is indulged in providing complete staffing and recruitment solutions. We help organizations with hiring some of the best and the brightest minds in the country who also are an ideal fit for their culture. 
          </p>
        </div>
      </section>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - About Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  DEC is a leading manpower supply and outsourcing company in India,
                  providing staffing services across diverse industries. We specialize
                  in offering permanent and temporary staffing solutions tailored to
                  the unique needs of our clients.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  With an extensive network and database of resumes across India,
                  we connect talented professionals with top companies, ensuring
                  the perfect match for every role.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-block"
              >
                <p className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Helping You Find The Right Talent.
                </p>
              </motion.div>
              <Link
                href={`/contact`}
                className={` hover:text-blue-500 transition-colors duration-200 text-lg font-medium`}
              > <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 mt-5 md:mt-0 md:ml-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                 Contact us 
                </motion.button>

              </Link>
            </motion.div>

            {/* Right Column - Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-8">
                Get in Touch
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-base sm:text-lg font-semibold text-indigo-600 hover:text-indigo-700 transition-colors break-words"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base sm:text-lg text-gray-800 break-words">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>
      
    {/* Mission Section */}
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-slate-900 relative inline-block"
          >
            Our Mission
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"/>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 leading-relaxed"
          >
            We strive to push the boundaries of digital innovation while maintaining 
            our commitment to sustainability and social responsibility. Our goal is 
            to create solutions that not only solve today's challenges but also 
            pave the way for a better tomorrow.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-xl shadow-2xl"
          >
            <motion.img
              src="/images/t1.jpg"
              alt="Mission"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#1E40AF' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium"
            >
              Learn More 
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="ml-2"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>

    
     
     {/* our team Leader */}
    {/* <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Our Leadership Team
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Meet the visionaries driving our company forward with innovation, 
            strategy, and operational excellence.
          </p>
          
          <div className="container gap-8">
          <Swiper
            modules={[Pagination, Autoplay]} // Add Autoplay here
            spaceBetween={30}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000, // Delay in milliseconds
              disableOnInteraction: false, // Keep autoplay running even after user interaction
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
            }}
            className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {executives.map((executive, index) => (
              <SwiperSlide key={index}>
              <ExecutiveCard
                key={index}
                {...executive}
              />
            </SwiperSlide>
          ))}
          </Swiper>
          </div>
        </div>
      </div> */}
      




      {/* Team Section */}
      <section className="py-20 bg-white text-gray-950">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold font-sans text-center mb-16 bg-clip-text text-slate-900"
          >
            MEET OUR TEAM
          </motion.h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} // Add Autoplay here
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000, // Delay in milliseconds
              disableOnInteraction: false, // Keep autoplay running even after user interaction
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="px-4"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <motion.div whileHover={{ y: -10 }} className="p-6">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center">
                    <div className="relative mb-6 mx-auto w-40 h-40">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur"></div>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="rounded-full relative z-10 object-cover object-top w-40 h-40"
                      />
                    </div>
                    <h3 className="text-2xl text-gray-100 font-bold mb-2">{member.name}</h3>
                    <p className="text-purple-400 mb-4">{member.position}</p>
                    <p className="text-gray-200 text-sm">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
  
  </div>
    <div className="bg-gray-50">
     

      {/* Call to Action Section */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Work with Us?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Let’s do something extraordinary together. Contact us today to
            get started.
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
    </>
  );
}
