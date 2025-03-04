/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Card, CardContent } from '/card';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProcessWheel } from '../home/ProcessWheel';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import Card1 from "../../app/components/Card1";
import Card2 from "../../app/components/Card2";
import Card3 from "../../app/components/Card3";
import Card4 from "../../app/components/Card4";
import Card5 from "../../app/components/Card5";
import {

  Briefcase, Search, Shield, Target,
  ArrowRight,
  Facebook, Twitter, Instagram, Linkedin,
  ArrowUpRight,
  BarChart2,
  UserCheck,
  PieChart,
  Users, Check,
  FileSpreadsheet,
  Presentation,
  BarChart, Award, ArrowUp, Star, Building2, LineChart
} from "lucide-react";

const icons = [
  { Icon: Building2, label: "Enterprise Solutions" },
  { Icon: Users, label: "Team Excellence" },
  { Icon: LineChart, label: "Growth Strategy" },
  { Icon: Star, label: "Premium Quality" }
];
const teamMembers = [
  {
    name: "Ranjna Adalak",
    position: "Managing Director",
    image: "/images/e1.jpg",
    description:
      "Ranjna Adalak is our MD. She has done her MBA in HR & Finance. Our Firm is indulged in providing complete staffing and recruitment solutions.",
  },
  {
    name: "Akhilesh Deshmukh",
    position: "Director Operations",
    image: "/images/e6.jpg",
    description:
      " Strategic planning  Operations management  Process improvement  Budgeting and forecasting  Risk management  Team management",
  },
  {
    name: "Abhishek Deshmukh",
    position: " Business Head",
    image: "/images/e7.jpg",
    description:
      " Strategic planning  Business development  P&L management  Team leadership  Customer relationships  Market analysis  Innovation and growth",
  },
  {
    name: "Shravan Kumar",
    position: "SR BDM",
    image: "/images/e8.jpg",
    description:
      "Business planning  Relationship building  Sales and revenue growth  Market analysis  Team leadership  Strategic partnerships  Deal negotiation  Reporting and analysis",
  },
  {
    name: "Aditya Vishwas Gotmare",
    position: "Manager HR",
    image: "/images/e2.jpg",
    description:
      "Organizational Development, JD Development, Talent management, Employee engagement, Employee relations culture, HR communication  HR Operation",
  },
  {
    name: "Ms Khushi Sahu",
    position: "HR Assistant",
    image: "/images/e3.jpg",
    description:
      "Recruitment & Development, Induction & Orientation, Talent Acquisition, Employee Hiring, Employe Orientation Exit Interviews and process  Recruiting and Interviewing",
  },
  {
    name: "Raj Sikarwar",
    position: "Senior Team Leader",
    image: "/images/e4.jpg",
    description:
      "Manage recruitment including sourcing, screening, interviews, onboarding, and induction. Handle HR policies, documentation, Ensure",
  },
  {
    name: "Jiya Singh",
    position: "HR Recruiters Team Leader",
    image: "/images/e55.jpg",
    description:
      "1. Leads a team of recruiters, Develops recruitment strategies, Manages client relationships, Oversees talent acquisition, Improves recruitment processes",
  },
  {
    name: "Sonam Sen",
    position: "Recruitment Analysist",
    image: "/images/e5.jpg",
    description:
      "Data analysis,  Reporting,  Process improvement,  Candidate sourcing",
  },
  {
    name: "Bhupendra Maharana",
    position: "Recruitment Trainer",
    image: "/images/e100.jpg",
    description:
      "Designing and delivering training, Needs assessment, Curriculum development, Coaching and mentoring Evaluation and feedbackg",
  },
];
interface NewsItem {
  id: number;
  title: string;
  categories: object;
  image: string;
  link: string;
}
const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Our Strength Proper Business in Your Path",
    categories: ["BUSINESS", "CONSULTATION"],
    image: "/first/fni1.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Developing Performance Goals and Standards",
    categories: ["ECONOMY", "FRANCHISING"],
    image: "/first/fni2.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Best Service Provides for Small Businesses",
    categories: ["CONSULTATION", "LEADERSHIP"],
    image: "/first/fni3.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Guide to HR Adviser and Clients Lessening",
    categories: ["BUSINESS", "CONSULTATION"],
    image: "/first/fni4.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Best Service Provides for Small Businesses",
    categories: ["BUSINESS", "LEADERSHIP"],
    image: "/first/fni5.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "Guide to HR Adviser and Clients Lessening",
    categories: ["ECONOMY", "FRANCHISING"],
    image: "/first/fni6.jpg",
    link: "#",
  },
  {
    id: 7,
    title: "Best Service Provides for Small Businesses",
    categories: ["CONSULTATION", "LEADERSHIP"],
    image: "/first/fni2.jpg",
    link: "#",
  },
  {
    id: 8,
    title: "Guide to HR Adviser and Clients Lessening",
    categories: ["BUSINESS", "CONSULTATION"],
    image: "/first/fni6.jpg",
    link: "#",
  },
];
const newsItem = [
  {
    id: 1,
    title: "Our Strength Proper Business in Your Path",
    image: "/first/fni1.jpg",
    categories: ["BUSINESS", "CONSULTATION"],
    link: "#"
  },
  {
    id: 2,
    title: "Developing Performance Goals and Standards",
    image: "/path-to-your-image-2.jpg",
    categories: ["CONSULTATION", "LEADERSHIP"],
    link: "#"
  },
  {
    id: 3,
    title: "Best Service Provides for Small Businesses",
    image: "/path-to-your-image-3.jpg",
    categories: ["ECONOMY", "FRANCHISING"],
    link: "#"
  },
  {
    id: 4,
    title: "Guide to HR Adviser and Clients Lessening",
    image: "/path-to-your-image-4.jpg",
    categories: ["BUSINESS", "LEADERSHIP"],
    link: "#"
  }
];
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  link: string;
}
const services: ServiceItem[] = [
  {
    id: 1,
    title: "Identify Talent",
    description:
      "Source and select potential candidates",
    icon: <Users className="w-8 h-8 text-gray-700" />,
    image: "/first/fni2.jpg",
    link: "#",
  },
  {
    id: 2,
    title: " Develop Strategy",
    description:
      "Create a recruitment strategy",
    icon: <BarChart2 className="w-8 h-8 text-gray-700" />,
    image: "/first/fni3.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Negotiate",
    description:
      "Discuss salaries, benefits, and employment terms",
    icon: <UserCheck className="w-8 h-8 text-gray-700" />,
    image: "/first/fni4.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Build Relationships",
    description:
      "Maintain relationships with clients and candidates",
    icon: <PieChart className="w-8 h-8 text-gray-700" />,
    image: "/first/fni1.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Improve Policies",
    description:
      "Review and enhance recruitment policies",
    icon: <BarChart2 className="w-8 h-8 text-gray-700" />,
    image: "/first/fni5.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "Provide Support",
    description:
      "Offer feedback to candidates and support to employers",
    icon: <UserCheck className="w-8 h-8 text-gray-700" />,
    image: "/first/fni2.jpg",
    link: "#",
  },
  {
    id: 7,
    title: "Manage Process",
    description:
      "Oversee application process and interviews",
    icon: <PieChart className="w-8 h-8 text-gray-700" />,
    image: "/first/fni2.jpg",
    link: "#",
  },

];


// interface Story {
//   id: number;
//   icon: React.ReactNode;
//   alt: string;
//  image: React.ReactNode
// }

// const stories: Story[] = [
//   {
//     id: 1,
//     icon: <Users className="w-6 h-6" />,
//     image:"/first/sst1.jpg",
//     alt: "Team collaboration success story",
//   },
//   {
//     id: 2,
//     icon: <FileSpreadsheet className="w-6 h-6" />,
//     alt: "Business documentation success",
//   },
//   {
//     id: 3,
//     icon: <Presentation className="w-6 h-6" />,
//     alt: "Professional presentation success",
//   },
//   {
//     id: 4,
//     icon: <BarChart className="w-6 h-6" />,
//     alt: "Business growth success",
//   },
// ];
const page = () => {
  const words = ["PAYROLL", "HIRING", "RECRUITMENT", "HR_SOLUTIONS"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(text.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, currentWordIndex]);


  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-US", {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(date);
  }, []);
  const services1 = [
    {
      title: "End-to-End HRO Services",
      description: "Comprehensive HR solutions, from hiring to payroll management, ensuring seamless operations.",
      icon: Briefcase
    },
    {
      title: "Solving Complex HR Challenges",
      description: "Helping companies tackle complex HR issues through innovative solutions and expertise.",
      icon: Shield
    },
    {
      title: "Customized Staffing Services",
      description: "Tailored staffing solutions designed to meet your unique business needs and requirements.",
      icon: Users
    },
    {
      title: "Expert Talent Acquisition",
      description: "Access to a pool of highly qualified talent, handpicked for your business success.",
      icon: Target
    },
    {
      title: "Search and Recruitment",
      description: "Efficient recruitment strategies to help you find the right candidate for your needs.",
      icon: Search
    }
  ];

  const steps = [
    "Understanding Client Requirements",
    "Lead Generation",
    "Source Candidates using Databases, Job Portals, & Social Media",
    "Pre-Interview Screening & Vetting",
    "Facilitate Win-Win Solution for Candidate and Company",
  ];
  const features = [
    "Strategic Approach",
    "Leveraging New Skills",
    "Great Industry Expertise",
    "Saves Time and Cost",
    "Compliance to Recruitment Law",
    "Find the Right Talent",
    "Improve Profitability and Effectiveness",
    "Expand Your Business",
  ];

  const [activeTab, setActiveTab] = useState("Card1");
  const stories = [
    {
      id: 1,
      image: "/images/s1.jpg",
      icon: <Users className="w-6 h-6" />,
      alt: "Team collaboration success story",
    },
    {
      id: 2,
      image: "/images/s2.jpg",
      icon: <FileSpreadsheet className="w-6 h-6" />,
      alt: "Business documentation success",
    },
    {
      id: 3,
      image: "/images/s3.jpg",
      icon: <Presentation className="w-6 h-6" />,
      alt: "Professional presentation success",
    },
    {
      id: 4,
      image: "/images/s4.jpg",
      icon: <BarChart className="w-6 h-6" />,
      alt: "Business growth success",
    },
    {
      id: 5,
      image: "/images/s5.jpg",
      icon: <BarChart className="w-6 h-6" />,
      alt: "Business growth success",
    },
  ];
  const executives = [
    {
      name: "Ranjna Adalak",
      role: "Managing Director",
      quote: "Ranjna Adalak is our MD. She has done her MBA in HR & Finance. Our Firm is indulged in providing complete staffing and recruitment solutions.",
      email: "MD@demploymentcorner.com",
      phone: "+1 (555) 123-4567",
      p1: "Empowering businesses, one hire at a time.",
      p2: "Leading our recruitment efforts with a focus on talent and strategic growth.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/johnanderson",
        twitter: "https://twitter.com/johnanderson"
      },
      image: "/images/e1.jpg"
    },
    {
      name: "Akhilesh Deshmukh",
      role: "Director Operations",
      quote: "Strategic thinker specialized in operational excellence and business transformation initiatives.",
      email: "DM@demploymentcorner.com",
      phone: "+1 (555) 234-5678",
      p1: "Optimizing operations for unparalleled success.",
      p2: "Driving operational excellence and transforming business strategies.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahmitchell",
        twitter: "https://twitter.com/sarahmitchell"
      },
      image: "/images/e6.jpg"
    },
    {
      name: "Abhishek Deshmukh",
      role: "Business Head",
      quote: "Operations expert with proven track record in optimizing processes and driving organizational efficiency.",
      email: "BD@demploymentcorner.com",
      phone: "+1 (555) 345-6789",
      p1: "Streamlining operations to fuel success.",
      p2: "Championing business growth through process innovation and efficiency.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/michaelchen",
        twitter: "https://twitter.com/michaelchen"
      },
      image: "/images/e7.jpg"
    }
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return <Card1 />;
      case "tab2":
        return <Card2 />;
      case "tab3":
        return <Card3 />;
      case "tab4":
        return <Card4 />;
      case "tab5":
        return <Card5 />;
      default:
        return <Card1 />;
    }
  };
  const testimonials = [
    {
      id: 1,
      name: "Bhumi Parmar",
      designation: "CEO, ExampleCorp",
      image: "/first/images.png",
      quote:
        "This platform has transformed the way we work. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "PURCHASE DPJ",
      designation: "Marketing Manager, BrandCo",
      image: "/first/unnamed3.png",
      quote: "Exceptional service and amazing results. I couldn't be happier.",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Ajay kumar",
      designation: "Developer, DevSoft",
      image: "/first/unnamed4.png",
      quote:
        "The support team is incredible, and the tools are easy to use. Five stars!",
      rating: 5,
    },
    {
      id: 4,
      name: "Bhumi Parmar",
      designation: "Developer, DevSoft",
      image: "/first/unnamed2.png",
      quote:
        "The support team is incredible, and the tools are easy to use. Five stars!",
      rating: 4,
    },
    {
      id: 5,
      name: "KHUSHYAL BHIKON",
      designation: "Developer, DevSoft",
      image: "/first/unnamed1.png",
      quote:
        "The support team is incredible, and the tools are easy to use. Five stars!",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Jyotika Rawat",
      designation: "Developer, DevSoft",
      image: "/first/unnamed.png",
      quote:
        "The support team is incredible, and the tools are easy to use. Five stars!",
      rating: 4,
    },
  ];
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.6
      }
    }
  };
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const [currentIcon, setCurrentIcon] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section with Parallax Effect */}
        <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
          {/* Background with more dramatic parallax effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[url('/images/bg4.jpg')] bg-cover bg-center"
          >
            {/* Overlay with animated gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"
            />

            {/* Animated brick pattern overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(335deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
                backgroundSize: "50px 50px"
              }}
            />
          </motion.div>

          {/* Content with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-5xl px-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold font-sans mb-8 text-white tracking-wider"
            >
              WELCOME TO
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 ml-2"
              >
                DIVY EMPLOYMENT CORNER
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-center text-2xl md:text-4xl font-semibold"
            >
              <span className="text-orange-400 mr-3">DEC FOR</span>
              <div className="h-24 flex items-center justify-center p-4 text-white">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gray-200"
                  >
                    {text}
                    <motion.span
                      className="inline-block w-0.5 h-8 bg-orange-400 ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Call to action button with hover effect */}
           
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium text-lg shadow-lg"
            >
               <a href="/job">Explore Opportunities</a>
            </motion.button>
          </motion.div>

          {/* Animated scroll indicator */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full"
              />
            </motion.div>
          </motion.div> */}
        </div>


        {/* Search Section with improved animations */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                FIND YOUR DREAM JOB
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition">
                      <option>All Industries</option>
                      <option>Life Insurance</option>
                      <option>Banking</option>
                      <option>IT</option>
                      <option>BPO</option>
                      <option>Education</option>
                      <option>Pharmaceuticals</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition">
                      <option>All Locations</option>
                      <option>Pan India</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="space-y-2 pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
                    >
                      <a href='/job' className="flex items-center justify-center">
                        Search
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Popular Tags with staggered animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 text-center"
              >
                <span className="text-gray-600 font-medium">
                  Popular Searches:
                </span>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {[
                    "Insurance",
                    "Finance",
                    "BFSI",
                    "Sales",
                    "Marketing",
                    "Developer",
                    "Field Officers",
                  ].map((tag, index) => (
                    <motion.a
                      key={tag}
                      href="/job"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#EEF2FF",
                        boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)"
                      }}
                      className="px-4 py-2 bg-white rounded-full text-blue-600 text-sm font-medium transition shadow-sm border border-gray-100"
                    >
                      {tag}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Elegant divider */}
        <div className="relative h-1 mx-auto w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>



        {/* Rest of the sections would follow the same enhanced pattern... */}
        {/* For brevity, I've focused on the first few key sections */}

        {/* You would continue with your Services, Executive Profiles, Why Choose Us, etc. sections */}
        {/* Each would use similar animation patterns and the unified design theme */}
      </div>


      {/* Clients Section */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative py-8"
          >
            <motion.h2
              className="text-4xl font-bold text-center text-indigo-900 mb-10"
            >
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <motion.span
                  variants={letterAnimation}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-block"
                >
                  OUR
                </motion.span>
                <motion.span
                  variants={letterAnimation}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block"
                >
                  TOP
                </motion.span>
                <motion.span
                  variants={letterAnimation}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-block"
                >
                  ESTEEMED
                </motion.span>
                <motion.span
                  variants={letterAnimation}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-block relative"
                >
                  CLIENTS
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-400 origin-left"
                  />
                </motion.span>
              </div>
            </motion.h2>

            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -left-4 -top-4 w-16 h-16 bg-indigo-600 rounded-full blur-2xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute -right-4 -bottom-4 w-16 h-16 bg-orange-500 rounded-full blur-2xl"
            />
          </motion.div>

          {/* Industry Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {[
              { id: "tab1", label: "Banking & Insurance" },
              { id: "tab2", label: "IT" },
              { id: "tab3", label: "BPO" },
              { id: "tab4", label: "Education Sectors" },
              { id: "tab5", label: "Pharmaceutical Industries" },
            ].map(({ id, label }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition duration-300
                ${activeTab === id
                    ? "bg-indigo-700 text-white shadow-lg"
                    : "bg-white text-indigo-700 border border-indigo-100 hover:bg-indigo-50"
                  }`}
              >
                {label}
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 min-h-96 shadow-xl border border-indigo-50"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </section>


      <div className="border-t-4 border-gray-400 mx-auto w-full"></div>
      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-5xl font-bold text-indigo-900 mb-6">
              OUR SERVICES
            </h2>
            <p className="text-lg sm:text-xl text-indigo-600">
              Comprehensive HR solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services1.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-xl border border-indigo-50 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors duration-300">
                      <service.icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600">
                      {service.description}
                    </p>
                  </div>

                  <motion.div
                    className="mt-auto flex items-center text-indigo-600 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="border-t border-indigo-100 mx-auto w-full"></div>

      {/* Executive Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-900 py-24">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
              backgroundSize: "30px 30px"
            }}
          />
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white/30 !w-2 !h-2',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-white'
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative w-auto mx-auto px-4 sm:px-6 lg:px-8">
            {executives.map((executive, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  <div className="text-white space-y-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                        <motion.div
                          key={currentIcon}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center space-x-4"
                        >
                          <div className="p-3 bg-white/10 rounded-lg">
                            {React.createElement(icons[currentIcon].Icon, {
                              className: "w-8 h-8 text-orange-400"
                            })}
                          </div>
                          <p className="text-lg font-semibold text-white/90">
                            {icons[currentIcon].label}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>

                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-white">
                        {executive.p1}
                      </h2>
                      <p className="text-white/80 text-lg">
                        {executive.p2}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col md:flex-row items-center gap-8"
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-60 h-60 rounded-full overflow-hidden ring-4 ring-white/20"
                      >
                        <Image
                          src={executive.image}
                          alt={executive.name}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover object-top"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -bottom-4 -right-4 bg-orange-400 rounded-full p-3 shadow-lg"
                      >
                        <Star className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <blockquote className="text-lg font-bold font-serif md:text-xl text-white/90 italic leading-relaxed">
                        {executive.quote}
                      </blockquote>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="border-l-4 border-orange-400 pl-4"
                      >
                        <h3 className="text-xl font-semibold text-white">
                          {executive.name}
                        </h3>
                        <p className="text-white/70 text-sm mt-1">
                          {executive.role}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </section>

      <div className="border-t border-indigo-100 mx-auto w-full"></div>

      {/* Why Choose Us Section */}
      <section className="bg-white py-24">
        <motion.div
          className="mx-auto max-w-7xl container px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-5xl font-extrabold text-indigo-900"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              WHY CHOOSE US?
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 w-24 bg-orange-400 mx-auto my-6"
            />
            <motion.p
              className="text-xl text-gray-600 mt-4"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              We provide innovative solutions to ensure long-term success for
              our clients.
            </motion.p>
          </div>

          <section className="py-16 bg-gradient-to-br from-indigo-50/50 to-white rounded-3xl overflow-hidden shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column with Image and Features */}
                <div className="space-y-8">
                  {/* Image Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0"
                  >
                    <Image
                      src="/images/person1.png"
                      alt="Professional woman with laptop"
                      width={220}
                      height={220}
                      className="rounded-2xl shadow-xl w-full h-full z-10 relative"
                    />
                    {/* Animated decorative backgrounds */}
                    <motion.div
                      initial={{ x: 20, y: 20, opacity: 0 }}
                      whileInView={{ x: 0, y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="absolute -z-10 top-8 -left-8 w-full h-full bg-indigo-100 rounded-2xl"
                    />
                    <motion.div
                      initial={{ x: 35, y: 35, opacity: 0 }}
                      whileInView={{ x: 15, y: 15, opacity: 0.5 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="absolute -z-20 top-8 -left-8 w-full h-full bg-orange-200 rounded-2xl"
                    />
                  </motion.div>
                </div>

                {/* Right Column Content Area */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-indigo-50"
                >
                  <div className="prose prose-lg">
                    <h2 className="text-3xl font-bold text-indigo-900 mb-4">
                      Where Talent Meets Opportunity
                    </h2>
                    <p className="text-gray-600 mb-6">
                      At D EMPLOYMENT CORNER PVT LTD, we specialize in delivering tailored recruitment solutions that perfectly match your business needs. Our experienced team of professionals ensures that your staffing challenges are met with efficient and innovative approaches.
                    </p>
                    <div className="space-y-4">
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border-l-4 border-indigo-500"
                      >
                        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                          Expert Guidance
                        </h3>
                        <p className="text-indigo-700">
                          Get personalized recruitment strategies tailored to your industry and needs.
                        </p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border-l-4 border-indigo-500"
                      >
                        <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                          Efficient Process
                        </h3>
                        <p className="text-indigo-700">
                          Streamline your hiring with our proven methodologies and tools.
                        </p>
                      </motion.div>
                    </div>
                    {/* Features List */}
                    <motion.ul
                      className="grid sm:grid-cols-2 gap-4 mt-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center space-x-3 text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ x: 5, color: "#4f46e5" }}
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-indigo-600" />
                          </span>
                          <span className="text-sm font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

        </motion.div>
      </section>

      <div className="border-t-4 border-gray-400 mx-auto w-full"></div>

{/* Passion for Excellence Section */}
{/* <motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="py-24 bg-white"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16 max-w-3xl mx-auto"
    >
      <h2 className="text-5xl font-bold text-indigo-900 mb-6">
        WE BELIEVE IN PASSION FOR EXCELLENCE
      </h2>
      <p className="text-lg sm:text-xl text-indigo-600">
        Right Candidate for Right Job – Our core belief drives us to
        deliver the best results.
      </p>
    </motion.div>
  </div>
</motion.section> */}

{/* <div className="border-t border-indigo-100 mx-auto w-full"></div> */}

{/* How We Work Section */}
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="py-24 bg-white"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16 max-w-3xl mx-auto"
    >
      <h2 className="text-5xl font-bold text-indigo-900 mb-6">
        HOW WE WORK
      </h2>
      <p className="text-lg sm:text-xl text-indigo-600">
        Our systematic approach ensures a smooth and effective recruitment
        process.
      </p>
    </motion.div>

    <section className="py-16 bg-gradient-to-br from-indigo-50/50 to-white rounded-3xl overflow-hidden shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Process Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="w-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-indigo-900 mb-4"
              >
                Our Recruitment Process
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-600 mb-8"
              >
                We follow a systematic approach to ensure the best matches between candidates and companies.
              </motion.p>
            </div>

            <ul className="space-y-6">
              {steps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 text-indigo-600 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-indigo-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {step}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Image */}
          
          <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    <div className="relative aspect-[4/5] max-w-md mx-auto lg:ml-auto">
                      <Image
                        src="/images/person2.jpg"
                        alt="Professional business man"
                        width={220}
                        height={220}
                        className="rounded-2xl shadow-xl object-cover w-full h-full"
                      />
                      {/* Decorative Elements */}
                      {/* <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-indigo-50 rounded-2xl" /> */}
                      {/* <div className="absolute -z-20 -bottom-12 -right-12 w-full h-full bg-indigo-100/50 rounded-2xl" /> */}
                    </div>

                    {/* Stats or Additional Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="absolute -bottom-8 left-0 bg-white p-6 rounded-xl shadow-lg max-w-xs"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl font-bold text-indigo-600">95%</div>
                        <p className="text-sm text-gray-600">Success rate in matching candidates with their ideal positions</p>
                      </div>
                    </motion.div>
                  </motion.div>
        </div>
      </div>
    </section>
  </div>
</motion.section>

<div className="border-t border-indigo-100 mx-auto w-full"></div>

{/* HR & Recruitment Processes Section */}
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="py-24 bg-white"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16 max-w-3xl mx-auto"
    >
      <h2 className="text-5xl font-bold text-indigo-900 mb-6">
        HR & RECRUITMENT PROCESSES
      </h2>
      <p className="text-lg sm:text-xl text-indigo-600">
        Our comprehensive approach to manage your human capital needs
      </p>
    </motion.div>

    {/* Recruitment Process Wheel */}
    <div className="mb-16">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-semibold mb-8 text-center text-indigo-900"
      >
        Recruitment Process
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ProcessWheel type="recruitment" />
      </motion.div>
    </div>

    {/* HR Process Wheel */}
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-semibold mb-8 text-center text-indigo-900"
      >
        HR Functions
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ProcessWheel type="hr" />
      </motion.div>
    </div>
  </div>
</motion.section>

<div className="border-t border-indigo-100 mx-auto w-full"></div>

{/* Testimonials Section */}
<section className="py-24 bg-gradient-to-r from-indigo-900 to-blue-900 relative overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
        backgroundSize: "30px 30px"
      }}
    />
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-5xl font-bold mb-6 text-white">
        WHAT PEOPLE SAY ABOUT US
      </h2>
      <p className="text-white/80 text-lg max-w-2xl mx-auto">
        Discover why companies trust us with their recruitment needs
      </p>
    </motion.div>

    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet !bg-white/30 !w-2 !h-2',
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-white'
      }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="max-w-6xl mx-auto"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full blur-[2px]" />
                <div className="relative">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-white/20 shadow-lg"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-1">
                {testimonial.name}
              </h3>
              <p className="text-sm text-white/70 mb-4">
                {testimonial.designation}
              </p>

              {/* Rating stars with animation */}
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <FaStar
                      className={`w-5 h-5 ${
                        i + 1 <= Math.floor(testimonial.rating)
                          ? "text-orange-400"
                          : i < testimonial.rating
                            ? "text-orange-400 opacity-50"
                            : "text-white/30"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg font-serif text-white/90 italic leading-relaxed">
                {testimonial.quote}
              </blockquote>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>

<div className="border-t border-indigo-100 mx-auto w-full"></div>

{/* Success Stories Section */}
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="py-24 bg-white"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16 max-w-3xl mx-auto"
    >
      <div className="inline-block px-4 py-1 bg-indigo-50 rounded-full text-sm text-indigo-600 mb-4">
        CASE STUDY
      </div>
      <h2 className="text-5xl font-bold text-indigo-900 mb-6">
        SUCCESS STORIES THAT INSPIRE
      </h2>
      <p className="text-lg sm:text-xl text-indigo-600">
        A collection of real-life achievements, transformative journeys, and impactful experiences that showcase perseverance, innovation, and determination.
      </p>
    </motion.div>

    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet !bg-indigo-300 !w-2 !h-2',
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-indigo-600'
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="px-4"
    >
      {stories.map((story, index) => (
        <SwiperSlide key={index}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-xl border border-indigo-50 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
            
            <div className="relative">
              <div className="relative w-full h-full">
                <Image
                  src={story.image}
                  alt={story.alt}
                  width={500}
                  height={500}
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={story.id === 1}
                />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute bottom-0 right-0 transform translate-y-1/2 mr-4 bg-orange-400 rounded-full p-3 shadow-lg"
              >
                {story.icon}
              </motion.div>
            </div>
            
            <motion.div
              className="mt-8 flex items-center text-indigo-600 font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Learn more
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</motion.section>

    </section>
  );
}

export default page
