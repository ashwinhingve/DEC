// "use client";
// // import Homes from "../app/home/page"

// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// // import { Card, CardContent } from '/card';
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { FaStar } from "react-icons/fa";
// import Card1 from "../app/components/Card1";
// import Card2 from "../app/components/Card2";
// import Card3 from "../app/components/Card3";
// import Card4 from "../app/components/Card4";
// import Card5 from "../app/components/Card5";
// import {

//   Briefcase, Search, Shield, Target,
//   ArrowRight,
//   Facebook, Twitter, Instagram, Linkedin,
//   ArrowUpRight,
//   BarChart2,
//   UserCheck,
//   PieChart,
//   Users, Check,
//   FileSpreadsheet,
//   Presentation,
//   BarChart, Award, ArrowUp, Star, Building2, LineChart
// } from "lucide-react";

// const icons = [
//   { Icon: Building2, label: "Enterprise Solutions" },
//   { Icon: Users, label: "Team Excellence" },
//   { Icon: LineChart, label: "Growth Strategy" },
//   { Icon: Star, label: "Premium Quality" }
// ];
// const teamMembers = [
//   {
//     name: "Ranjna Adalak",
//     position: "Managing Director",
//     image: "/images/e1.jpg",
//     description:
//       "Ranjna Adalak is our MD. She has done her MBA in HR & Finance. Our Firm is indulged in providing complete staffing and recruitment solutions.",
//   },
//   {
//     name: "Akhilesh Deshmukh",
//     position: "Director Operations",
//     image: "/images/e6.jpg",
//     description:
//       " Strategic planning  Operations management  Process improvement  Budgeting and forecasting  Risk management  Team management",
//   },
//   {
//     name: "Abhishek Deshmukh",
//     position: " Business Head",
//     image: "/images/e7.jpg",
//     description:
//       " Strategic planning  Business development  P&L management  Team leadership  Customer relationships  Market analysis  Innovation and growth",
//   },
//   {
//     name: "Shravan Kumar",
//     position: "SR BDM",
//     image: "/images/e8.jpg",
//     description:
//       "Business planning  Relationship building  Sales and revenue growth  Market analysis  Team leadership  Strategic partnerships  Deal negotiation  Reporting and analysis",
//   },
//   {
//     name: "Aditya Vishwas Gotmare",
//     position: "Manager HR",
//     image: "/images/e2.jpg",
//     description:
//       "Organizational Development, JD Development, Talent management, Employee engagement, Employee relations culture, HR communication  HR Operation",
//   },
//   {
//     name: "Ms Khushi Sahu",
//     position: "HR Assistant",
//     image: "/images/e3.jpg",
//     description:
//       "Recruitment & Development, Induction & Orientation, Talent Acquisition, Employee Hiring, Employe Orientation Exit Interviews and process  Recruiting and Interviewing",
//   },
//   {
//     name: "Raj Sikarwar",
//     position: "Senior Team Leader",
//     image: "/images/e4.jpg",
//     description:
//       "Manage recruitment including sourcing, screening, interviews, onboarding, and induction. Handle HR policies, documentation, Ensure",
//   },
//   {
//     name: "Jiya Singh",
//     position: "HR Recruiters Team Leader",
//     image: "/images/e55.jpg",
//     description:
//       "1. Leads a team of recruiters, Develops recruitment strategies, Manages client relationships, Oversees talent acquisition, Improves recruitment processes",
//   },
//   {
//     name: "Sonam Sen",
//     position: "Recruitment Analysist",
//     image: "/images/e5.jpg",
//     description:
//       "Data analysis,  Reporting,  Process improvement,  Candidate sourcing",
//   },
//   {
//     name: "Bhupendra Maharana",
//     position: "Recruitment Trainer",
//     image: "/images/e100.jpg",
//     description:
//       "Designing and delivering training, Needs assessment, Curriculum development, Coaching and mentoring Evaluation and feedbackg",
//   },
// ];
// interface NewsItem {
//   id: number;
//   title: string;
//   date: string;
//   image: string;
//   link: string;
// }
// const newsItems: NewsItem[] = [
//   {
//     id: 1,
//     title: "Our Strength Proper Business in Your Path",
//     date: "AUG 30, 2024",
//     image: "/first/fni1.jpg",
//     link: "#",
//   },
//   {
//     id: 2,
//     title: "Developing Performance Goals and Standards",
//     date: "AUG 30, 2024",
//     image: "/first/fni2.jpg",
//     link: "#",
//   },
//   {
//     id: 3,
//     title: "Best Service Provides for Small Businesses",
//     date: "AUG 30, 2024",
//     image: "/first/fni3.jpg",
//     link: "#",
//   },
//   {
//     id: 4,
//     title: "Guide to HR Adviser and Clients Lessening",
//     date: "AUG 30, 2024",
//     image: "/first/fni4.jpg",
//     link: "#",
//   },
//   {
//     id: 5,
//     title: "Best Service Provides for Small Businesses",
//     date: "AUG 30, 2024",
//     image: "/first/fni5.jpg",
//     link: "#",
//   },
//   {
//     id: 6,
//     title: "Guide to HR Adviser and Clients Lessening",
//     date: "AUG 30, 2024",
//     image: "/first/fni6.jpg",
//     link: "#",
//   },
//   {
//     id: 7,
//     title: "Best Service Provides for Small Businesses",
//     date: "AUG 30, 2024",
//     image: "/first/fni2.jpg",
//     link: "#",
//   },
//   {
//     id: 8,
//     title: "Guide to HR Adviser and Clients Lessening",
//     date: "AUG 30, 2024",
//     image: "/first/fni6.jpg",
//     link: "#",
//   },
// ];
// interface ServiceItem {
//   id: number;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   image: string;
//   link: string;
// }
// const services: ServiceItem[] = [
//   {
//     id: 1,
//     title: "Identify Talent",
//     description:
//       "Source and select potential candidates",
//     icon: <Users className="w-8 h-8 text-gray-700" />,
//     image: "/first/fni2.jpg",
//     link: "#",
//   },
//   {
//     id: 2,
//     title: " Develop Strategy",
//     description:
//       "Create a recruitment strategy",
//     icon: <BarChart2 className="w-8 h-8 text-gray-700" />,
//     image: "/first/fni3.jpg",
//     link: "#",
//   },
//   {
//     id: 3,
//     title: "Negotiate",
//     description:
//       "Discuss salaries, benefits, and employment terms",
//     icon: <UserCheck className="w-8 h-8 text-gray-700" />,
//     image: "/first/fni4.jpg",
//     link: "#",
//   },
//   {
//     id: 4,
//     title: "Build Relationships",
//     description:
//       "Maintain relationships with clients and candidates",
//     icon: <PieChart className="w-8 h-8 text-gray-700" />,
//     image: "/first/fni1.jpg",
//     link: "#",
//   },
//   {
//     id: 5,
//     title: "Improve Policies",
//     description:
//       "Review and enhance recruitment policies",
//     icon: <BarChart2 className="w-8 h-8 text-gray-700" />,
//     image: "/first/fni5.jpg",
//     link: "#",
//   },
//   {
//     id: 6,
//     title: "Provide Support",
//     description:
//       "Offer feedback to candidates and support to employers",
//     icon: <UserCheck className="w-8 h-8 text-gray-700" />,
//     image: "/first/fni2.jpg",
//     link: "#",
//   },
//   {
//     id: 7,
//     title: "Manage Process",
//     description:
//       "Oversee application process and interviews",
//     icon: <PieChart className="w-8 h-8 text-gray-700" />,
//     image: "/first/fni2.jpg",
//     link: "#",
//   },

// ];
// // interface Story {
// //   id: number;
// //   icon: React.ReactNode;
// //   alt: string;
// //  image: React.ReactNode
// // }

// // const stories: Story[] = [
// //   {
// //     id: 1,
// //     icon: <Users className="w-6 h-6" />,
// //     image:"/first/sst1.jpg",
// //     alt: "Team collaboration success story",
// //   },
// //   {
// //     id: 2,
// //     icon: <FileSpreadsheet className="w-6 h-6" />,
// //     alt: "Business documentation success",
// //   },
// //   {
// //     id: 3,
// //     icon: <Presentation className="w-6 h-6" />,
// //     alt: "Professional presentation success",
// //   },
// //   {
// //     id: 4,
// //     icon: <BarChart className="w-6 h-6" />,
// //     alt: "Business growth success",
// //   },
// // ];

// export default function Home() {
//   const words = ["PAYROLL", "HIRING", "RECRUITMENT", "HR_SOLUTIONS"];
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const [text, setText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentWord = words[currentWordIndex];

//     const timer = setTimeout(() => {
//       if (!isDeleting) {
//         // Typing
//         if (text.length < currentWord.length) {
//           setText(currentWord.slice(0, text.length + 1));
//         } else {
//           // Wait before starting to delete
//           setTimeout(() => setIsDeleting(true), 1500);
//         }
//       } else {
//         // Deleting
//         if (text.length > 0) {
//           setText(text.slice(0, text.length - 1));
//         } else {
//           setIsDeleting(false);
//           setCurrentWordIndex((prev) => (prev + 1) % words.length);
//         }
//       }
//     }, isDeleting ? 50 : 150);

//     return () => clearTimeout(timer);
//   }, [text, isDeleting, currentWordIndex]);


//   const [currentDate, setCurrentDate] = useState("");

//   useEffect(() => {
//     const date = new Date().toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//     setCurrentDate(date);
//   }, []);
//   const services1 = [
//     {
//       title: "End-to-End HRO Services",
//       description: "Comprehensive HR solutions, from hiring to payroll management, ensuring seamless operations.",
//       icon: Briefcase
//     },
//     {
//       title: "Solving Complex HR Challenges",
//       description: "Helping companies tackle complex HR issues through innovative solutions and expertise.",
//       icon: Shield
//     },
//     {
//       title: "Customized Staffing Services",
//       description: "Tailored staffing solutions designed to meet your unique business needs and requirements.",
//       icon: Users
//     },
//     {
//       title: "Expert Talent Acquisition",
//       description: "Access to a pool of highly qualified talent, handpicked for your business success.",
//       icon: Target
//     },
//     {
//       title: "Search and Recruitment",
//       description: "Efficient recruitment strategies to help you find the right candidate for your needs.",
//       icon: Search
//     }
//   ];

//   const steps = [
//     "Understanding Client Requirements",
//     "Lead Generation",
//     "Source Candidates using Databases, Job Portals, & Social Media",
//     "Pre-Interview Screening & Vetting",
//     "Facilitate Win-Win Solution for Candidate and Company",
//   ];
//   const features = [
//     "Strategic Approach",
//     "Leveraging New Skills",
//     "Great Industry Expertise",
//     "Saves Time and Cost",
//     "Compliance to Recruitment Law",
//     "Find the Right Talent",
//     "Improve Profitability and Effectiveness",
//     "Expand Your Business",
//   ];

//   const [activeTab, setActiveTab] = useState("Card1");


//   const stories = [
//     {
//       id: 1,
//       image: "/images/s1.jpg",
//       icon: <Users className="w-6 h-6" />,
//       alt: "Team collaboration success story",
//     },
//     {
//       id: 2,
//       image: "/images/s2.jpg",
//       icon: <FileSpreadsheet className="w-6 h-6" />,
//       alt: "Business documentation success",
//     },
//     {
//       id: 3,
//       image: "/images/s3.jpg",
//       icon: <Presentation className="w-6 h-6" />,
//       alt: "Professional presentation success",
//     },
//     {
//       id: 4,
//       image: "/images/s4.jpg",
//       icon: <BarChart className="w-6 h-6" />,
//       alt: "Business growth success",
//     },
//     {
//       id: 5,
//       image: "/images/s5.jpg",
//       icon: <BarChart className="w-6 h-6" />,
//       alt: "Business growth success",
//     },
//   ];
//   const executives = [
//     {
//       name: "Ranjna Adalak",
//       role: "Managing Director",
//       quote: "Ranjna Adalak is our MD. She has done her MBA in HR & Finance. Our Firm is indulged in providing complete staffing and recruitment solutions.",
//       email: "MD@demploymentcorner.com",
//       phone: "+1 (555) 123-4567",
//       socialLinks: {
//         linkedin: "https://linkedin.com/in/johnanderson",
//         twitter: "https://twitter.com/johnanderson"
//       },
//       image: "/images/e1.jpg"
//     },
//     {
//       name: "Akhilesh Deshmukh",
//       role: "Director Operations",
//       quote: "Strategic thinker specialized in operational excellence and business transformation initiatives.",
//       email: "DM@demploymentcorner.com",
//       phone: "+1 (555) 234-5678",
//       socialLinks: {
//         linkedin: "https://linkedin.com/in/sarahmitchell",
//         twitter: "https://twitter.com/sarahmitchell"
//       },
//       image: "/images/e6.jpg"
//     },
//     {
//       name: "Abhishek Deshmukh",
//       role: "Business Head",
//       quote: "Operations expert with proven track record in optimizing processes and driving organizational efficiency.",
//       email: "BD@demploymentcorner.com",
//       phone: "+1 (555) 345-6789",
//       socialLinks: {
//         linkedin: "https://linkedin.com/in/michaelchen",
//         twitter: "https://twitter.com/michaelchen"
//       },
//       image: "/images/e7.jpg"
//     }
//   ];
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Add form submission logic here
//   };
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "tab1":
//         return <Card1 />;
//       case "tab2":
//         return <Card2 />;
//       case "tab3":
//         return <Card3 />;
//       case "tab4":
//         return <Card4 />;
//       case "tab5":
//         return <Card5 />;
//       default:
//         return <Card1 />;
//     }
//   };
//   const testimonials = [
//     {
//       id: 1,
//       name: "Bhumi Parmar",
//       designation: "CEO, ExampleCorp",
//       image: "/first/images.png",
//       quote:
//         "This platform has transformed the way we work. Highly recommended!",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "PURCHASE DPJ",
//       designation: "Marketing Manager, BrandCo",
//       image: "/first/unnamed3.png",
//       quote: "Exceptional service and amazing results. I couldn't be happier.",
//       rating: 4.5,
//     },
//     {
//       id: 3,
//       name: "Ajay kumar",
//       designation: "Developer, DevSoft",
//       image: "/first/unnamed4.png",
//       quote:
//         "The support team is incredible, and the tools are easy to use. Five stars!",
//       rating: 5,
//     },
//     {
//       id: 4,
//       name: "Bhumi Parmar",
//       designation: "Developer, DevSoft",
//       image: "/first/unnamed2.png",
//       quote:
//         "The support team is incredible, and the tools are easy to use. Five stars!",
//       rating: 4,
//     },
//     {
//       id: 5,
//       name: "KHUSHYAL BHIKON",
//       designation: "Developer, DevSoft",
//       image: "/first/unnamed1.png",
//       quote:
//         "The support team is incredible, and the tools are easy to use. Five stars!",
//       rating: 4.5,
//     },
//     {
//       id: 6,
//       name: "Jyotika Rawat",
//       designation: "Developer, DevSoft",
//       image: "/first/unnamed.png",
//       quote:
//         "The support team is incredible, and the tools are easy to use. Five stars!",
//       rating: 4,
//     },
//   ];
//   // const containerVariants = {
//   //   hidden: { opacity: 0 },
//   //   visible: {
//   //     opacity: 1,
//   //     transition: {
//   //       staggerChildren: 0.2,
//   //     },
//   //   },
//   // };

//   const itemVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
//     );
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut"
//       }
//     }
//   };

//   const titleVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: 0.2,
//         duration: 0.6
//       }
//     }
//   };

//   const subtitleVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: 0.4,
//         duration: 0.6
//       }
//     }
//   };
//   const letterAnimation = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const [currentIcon, setCurrentIcon] = React.useState(0);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIcon((prev) => (prev + 1) % icons.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);
//   return (
//     <section className="container">
//       {/* <Homes /> */}
 
//       <div className="min-h-screen">
//         <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
//           {/* Background with gradient overlay */}
//           <div
//             className="absolute inset-0 bg-[url('/images/bg4.jpg')] bg-cover bg-center"
//           // style={{
//           //   // backgroundImage: "linear-gradient(to bottom, rgba(0,0,20,0.8), rgba(0,0,20,0.95))"
//           //   backgroundImage: "url('/images/bg2.jpg')"

//           // }}
//           >
//             {/* Brick pattern overlay */}
//             <div className="absolute inset-0 opacity-10"
//               style={{
//                 backgroundImage: "linear-gradient(335deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
//                 backgroundSize: "50px 50px"
//               }}
//             />
//           </div>

//           {/* Content */}
//           <div className="relative z-10 text-center ">
//             <h1 className="text-4xl md:text-6xl font-bold font-sans mb-8 text-gray-200 tracking-wider">
//               WELCOME TO DIVY EMPLOYMENT CORNER PRIVATE LIMITED
//             </h1>

//             <div className="flex items-center justify-center text-2xl md:text-4xl font-semibold">
//               <span className="text-orange-400 mr-3">DEC FOR</span>
//               <div className="h-24 flex items-center justify-center p-4 text-white">
//                 <div className="relative">
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-4xl font-bold text-gray-300"
//                   >
//                     {text}
//                     <motion.span
//                       className="inline-block w-0.5 h-8  ml-1"
//                       animate={{ opacity: [1, 0] }}
//                       transition={{
//                         duration: 0.8,
//                         repeat: Infinity,
//                         repeatType: "reverse"
//                       }}
//                     />
//                   </motion.div>
//                 </div>
//               </div>
//             </div>

//             {/* Social Icons */}
//             {/* <div className="flex justify-center items-center pt-5 gap-4 mt-15">
//               <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
//                 <Facebook size={20} />
//               </a>
//               <a href="#" className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
//                 <Twitter size={20} />
//               </a>
//               <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
//                 <Instagram size={20} />
//               </a>
//               <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
//                 <Linkedin size={20} />
//               </a>
//             </div> */}

//             {/* Scroll Indicator */}
//             {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//               <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center p-2">
//                 <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
//               </div>
//             </div> */}
//           </div>
//         </div>




//         {/* Search Section */}
//         <section className="py-20 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8 }}
//               className="max-w-5xl mx-auto"
//             >
//               <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-slate-900">
//                 FIND YOUR DREAM JOB
//               </h1>
//               {/* <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//                 Find Your Dream Job
//               </h1> */}
//               <div className="bg-white rounded-2xl shadow-xl p-8">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Industry
//                     </label>
//                     <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition">
//                       <option>All Industries</option>
//                       <option>Insurance</option>
//                       <option>Finance</option>
//                       <option>Sales</option>
//                       <option>Marketing</option>
//                       <option>Field Officers</option>
//                     </select>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Location
//                     </label>
//                     <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition">
//                       <option>All Locations</option>
//                       <option>Pan India</option>
//                       {/* <option>India</option> */}
//                     </select>
//                   </div>
//                   <div className="space-y-2 pt-6">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-6 py-3 mt-5 md:mt-0 md:ml-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                     >
//                       <a href='/job'> Search </a>
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>

//               {/* Popular Tags */}
//               <div className="mt-8 text-center">
//                 <span className="text-gray-600 font-medium">
//                   Popular Searches:
//                 </span>
//                 <div className="flex flex-wrap justify-center gap-3 mt-4">
//                   {[
//                     "Insurance",
//                     "Finance",
//                     "BFSI",
//                     "Sales",
//                     "Marketing",
//                     "Developer",
//                     "Field Officers",
//                   ].map((tag) => (
//                     <motion.a
//                       key={tag}
//                       href="/job"
//                       whileHover={{ scale: 1.05 }}
//                       className="px-4 py-2 bg-white rounded-full text-blue-600 text-sm font-medium hover:bg-blue-50 transition shadow-sm"
//                     >
//                       {tag}
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </section>


//       </div>

//       <div className="border-t-4 border-gray-400 mx-auto w-full"></div>

//       {/* FNI */}
//       <section className="w-full bg-white max-w-7xl mx-auto px-4 py-16">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-5xl font-sans text-black font-bold mb-4">
//             FEATURED NEWS AND INSIGHTS
//           </h2>
//           <p className="text-gray-950 font-serif">
//             It provides valuable information, in-depth reports, and thought leadership pieces to keep readers informed and ahead of the curve.
//           </p>
//         </div>

//         {/* News Grid */}
//         <Swiper
//           modules={[Pagination, Autoplay]} // Add Autoplay here
//           spaceBetween={30}
//           slidesPerView={1}
//           pagination={{ clickable: true }}
//           autoplay={{
//             delay: 3000, // Delay in milliseconds
//             disableOnInteraction: false, // Keep autoplay running even after user interaction
//           }}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className="px-4"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {newsItems.map((item, index) => (
//               <SwiperSlide key={index}>
//                 <Link href={item.link} key={item.id} className="group">
//                   <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
//                     {/* Image Container */}
//                     <div className="relative w-full h-48 overflow-hidden">
//                       <Image
//                         src={item.image}
//                         alt={item.title}
//                         fill
//                         className=" group-hover:scale-105 transition-transform duration-300"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                         priority={item.id === 1}
//                       />
//                       {/* Date Badge */}
//                       <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
//                         {currentDate}
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-6">
//                       <h3 className="text-xl text-gray-700 font-semibold leading-tight group-hover:text-blue-600 transition-colors duration-300">
//                         {item.title}
//                       </h3>
//                     </div>
//                   </article>
//                 </Link>
//               </SwiperSlide>
//             ))}
//           </div>
//         </Swiper>
//         {/* Scroll to Top Button */}
//         {/* <button
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           className="fixed bottom-8 right-8 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
//           aria-label="Scroll to top"
//         >
//           <ArrowUp className="w-6 h-6" />
//         </button> */}
//       </section>

//       <div className="border-t-4 border-gray-400 mx-auto w-full"></div>

//       {/* Clients Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-50px" }}
//             className="relative py-8"
//           >
//             <motion.h2
//               className="text-4xl font-bold text-center text-slate-900 mb-6"
//             >
//               {/* Animate each word separately */}
//               <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
//                 <motion.span
//                   variants={letterAnimation}
//                   transition={{ duration: 0.5, delay: 0.1 }}
//                   className="inline-block"
//                 >
//                   OUR
//                 </motion.span>
//                 <motion.span
//                   variants={letterAnimation}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="inline-block"
//                 >
//                   TOP
//                 </motion.span>
//                 <motion.span
//                   variants={letterAnimation}
//                   transition={{ duration: 0.5, delay: 0.3 }}
//                   className="inline-block"
//                 >
//                   ESTEEMED
//                 </motion.span>
//                 <motion.span
//                   variants={letterAnimation}
//                   transition={{ duration: 0.5, delay: 0.4 }}
//                   className="inline-block relative"
//                 >
//                   CLIENTS
//                   <motion.div
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{ duration: 0.6, delay: 0.8 }}
//                     className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600 origin-left"
//                   />
//                 </motion.span>
//               </div>
//             </motion.h2>

//             {/* Decorative elements */}
//             <motion.div
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 0.1 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="absolute -left-4 -top-4 w-16 h-16 bg-blue-600 rounded-full blur-2xl"
//             />
//             <motion.div
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 0.1 }}
//               transition={{ duration: 0.8, delay: 0.7 }}
//               className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-600 rounded-full blur-2xl"
//             />
//           </motion.div>
//           <div className="flex flex-wrap gap-4 justify-center mb-8">
//             {[
//               { id: "tab1", label: "Banking & Insurance" },
//               { id: "tab2", label: "IT" },
//               { id: "tab3", label: "BPO" },
//               { id: "tab4", label: "Education Sectors" },
//               { id: "tab5", label: "Pharmaceutical Industries" },
//             ].map(({ id, label }) => (
//               <motion.button
//                 key={id}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setActiveTab(id)}
//                 className={`px-6 py-3 rounded-full text-sm font-medium transition
//                   ${activeTab === id
//                     ? "bg-blue-700 text-white shadow-lg"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//               >
//                 {label}
//               </motion.button>
//             ))}
//           </div>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-gray-50 rounded-2xl p-8 min-h-96 shadow-lg"
//           >
//             {renderTabContent()}
//           </motion.div>
//         </div>
//       </section>

//       <div className="border-t-4 border-gray-400 mx-auto w-full"></div>

//       {/* Services Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="py-24 bg-slate-50"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16 max-w-3xl mx-auto"
//           >
//             <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
//               OUR SERVICES
//             </h2>
//             <p className="text-lg sm:text-xl text-slate-600">
//               Comprehensive HR solutions tailored to your needs
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {services1.map((service, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 whileHover={{ y: -8, scale: 1.02 }}
//                 className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

//                 <div className="flex flex-col h-full">
//                   <div className="mb-6">
//                     <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
//                       <service.icon className="w-6 h-6 text-indigo-600" />
//                     </div>
//                     <h3 className="text-xl font-bold text-slate-900 mb-3">
//                       {service.title}
//                     </h3>
//                     <p className="text-slate-600">
//                       {service.description}
//                     </p>
//                   </div>

//                   {/* <motion.div
//                     className="mt-auto flex items-center text-indigo-600 font-medium"
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     Learn more
//                     <svg
//                       className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </motion.div> */}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       <div className="border-t-4 border-gray-400 mx-auto w-full"></div>

//       <section className="relative overflow-hidden bg-teal-900   py-24">
//         <div className="absolute inset-0 opacity-20">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
//               backgroundSize: "30px 30px"
//             }}
//           />
//         </div>
//         <Swiper
//           modules={[Pagination, Autoplay]}
//           spaceBetween={30}
//           slidesPerView={1}
//           pagination={{
//             clickable: true,
//             bulletClass: 'swiper-pagination-bullet !bg-white/30 !w-2 !h-2',
//             bulletActiveClass: 'swiper-pagination-bullet-active !bg-white'
//           }}
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           className="max-w-6xl mx-auto"
//         >
//           <div className="relative w-auto mx-auto px-4 sm:px-6 lg:px-8">

//             {executives.map((executive, index) => (
//               <SwiperSlide key={index}>
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6 }}
//                   className="grid md:grid-cols-2 gap-12 items-center"
//                 >
//                   <div className="text-white space-y-8">
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.5 }}
//                       className="relative"
//                     >
//                       <div className="bg-teal-800/30 rounded-lg p-6 backdrop-blur-sm">
//                         <motion.div
//                           key={currentIcon}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           transition={{ duration: 0.3 }}
//                           className="flex items-center space-x-4"
//                         >
//                           <div className="p-3 bg-teal-700/50 rounded-lg">
//                             {React.createElement(icons[currentIcon].Icon, {
//                               className: "w-8 h-8 text-white/90"
//                             })}
//                           </div>
//                           <p className="text-lg font-semibold text-white/90">
//                             {icons[currentIcon].label}
//                           </p>
//                         </motion.div>
//                       </div>
//                     </motion.div>

//                     <div className="space-y-4">
//                       <h2 className="text-3xl font-bold text-white">
//                         Your Future, Your Career—Start Here!
//                       </h2>
//                       <p className="text-white/80 text-lg">
//                         Connecting job seekers with the right opportunities and employers with the perfect talent.
//                       </p>
//                     </div>
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6, delay: 0.2 }}
//                     className="flex flex-col md:flex-row items-center gap-8"
//                   >
//                     <div className="relative">
//                       <motion.div
//                         whileHover={{ scale: 1.05 }}
//                         transition={{ duration: 0.3 }}
//                         className="w-60 h-60 rounded-full overflow-hidden ring-4 ring-teal-600/30"
//                       >
//                         <Image
//                           src={executive.image}
//                           alt={executive.name}
//                           width={500}
//                           height={500}
//                           className="w-full h-full object-cover object-top"
//                         />
//                       </motion.div>
//                       <div className="absolute -bottom-4 -right-4 bg-teal-600 rounded-full p-3 shadow-lg">
//                         <Star className="w-6 h-6 text-white" />
//                       </div>
//                     </div>

//                     <div className="flex-1 space-y-4">
//                       <blockquote className="text-lg font-bold font-serif md:text-xl text-white/90 italic leading-relaxed">
//                         {executive.quote}
//                       </blockquote>
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.4, delay: 0.4 }}
//                         className="border-l-4 border-teal-500/30 pl-4"
//                       >
//                         <h3 className="text-xl font-semibold text-white">
//                           {executive.name}
//                         </h3>
//                         <p className="text-white/70 text-sm mt-1">
//                           {executive.role}
//                         </p>
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               </SwiperSlide>
//             ))}


//           </div>
//         </Swiper>
//       </section>

//       <div className="border-t-4 border-gray-400 mx-auto w-full"></div>

//     <section className="container">
//     <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="bg-white py-24"
//       >
//         <motion.div
//           className="mx-auto max-w-7xl container px-4 sm:px-6 lg:px-8"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Why Choose Us Section */}
//           <div className="text-center mb-16">
//             <motion.h2
//               className="text-5xl font-extrabold font-sans text-slate-900"
//               initial={{ y: 50 }}
//               whileInView={{ y: 0 }}
//             >
//               WHY CHOOSE US?
//             </motion.h2>
//             <motion.p
//               className="text-xl text-gray-600 mt-4"
//               initial={{ y: 50 }}
//               whileInView={{ y: 0 }}
//             >
//               We provide innovative solutions to ensure long-term success for
//               our clients.
//             </motion.p>
//           </div>

//           <section className="py-16 bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="grid lg:grid-cols-2 gap-12 items-center">
//                 {/* Left Column with Image and Features */}
//                 <div className="space-y-8">
//                   {/* Image Section */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6 }}
//                     className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0"
//                   >
//                     <Image
//                       src="/images/person1.png"
//                       alt="Professional woman with laptop"
//                       width={220}
//                       height={220}
//                       className="rounded-2xl shadow-xl w-full h-full"
//                     />
//                     {/* Decorative Background */}
//                     <div className="absolute -z-10 top-8 -left-8 w-full h-full bg-indigo-100 rounded-2xl" />
//                   </motion.div>


//                 </div>

//                 {/* Right Column Content Area */}
//                 <motion.div
//                   initial={{ opacity: 0, x: 30 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.8 }}
//                   className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 h-full"
//                 >
//                   <div className="prose prose-lg">
//                     <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                       Transform Your Recruitment Process
//                     </h2>
//                     <p className="text-gray-600 mb-6">
//                       Our comprehensive recruitment solutions help businesses find and retain top talent while optimizing their hiring processes for better efficiency and results.
//                     </p>
//                     <div className="space-y-4">
//                       <div className="p-4 bg-indigo-50 rounded-lg">
//                         <h3 className="text-lg font-semibold text-indigo-900 mb-2">
//                           Expert Guidance
//                         </h3>
//                         <p className="text-indigo-700">
//                           Get personalized recruitment strategies tailored to your industry and needs.
//                         </p>
//                       </div>
//                       <div className="p-4 bg-indigo-50 rounded-lg">
//                         <h3 className="text-lg font-semibold text-indigo-900 mb-2">
//                           Efficient Process
//                         </h3>
//                         <p className="text-indigo-700">
//                           Streamline your hiring with our proven methodologies and tools.
//                         </p>
//                       </div>
//                     </div>
//                     {/* Features List */}
//                     <motion.ul
//                       className="grid sm:grid-cols-2 gap-4 mt-8"
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.6, delay: 0.2 }}
//                     >
//                       {features.map((feature, index) => (
//                         <motion.li
//                           key={index}
//                           className="flex items-center space-x-3 text-gray-700"
//                           initial={{ opacity: 0, x: -20 }}
//                           whileInView={{ opacity: 1, x: 0 }}
//                           viewport={{ once: true }}
//                           transition={{ duration: 0.4, delay: index * 0.1 }}
//                           whileHover={{ x: 5 }}
//                         >
//                           <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
//                             <Check className="w-4 h-4 text-indigo-600" />
//                           </span>
//                           <span className="text-sm font-medium">{feature}</span>
//                         </motion.li>
//                       ))}
//                     </motion.ul>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </section>
          
//           {/* Passion for Excellence Section */}
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ opacity: 1 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             whileHover={{ y: -10 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-center mt-24 mb-16"
//           >
//             <h2 className="text-5xl font-extrabold text-slate-900">
//               WE BELIEVE IN PASSION FOR EXCELLENCE
//             </h2>
//             <p className="text-xl font-mono text-gray-600 mt-4">
//               Right Candidate for Right Job – Our core belief drives us to
//               deliver the best results.
//             </p>
//           </motion.div>

//           {/* How We Work Section */}
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ opacity: 1 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             whileHover={{ y: -10 }}
//             transition={{ duration: 0.8, delay: 0.1 }}
//             className="text-center mt-24 mb-16"
//           >
//             <h2 className="text-5xl font-sans font-extrabold text-slate-900">
//               HOW WE WORK
//             </h2>
//             <p className="text-xl font-serif text-gray-600 mt-4">
//               Our systematic approach ensures a smooth and effective recruitment
//               process.
//             </p>
//           </motion.div>

//           <section className="py-16  bg-gradient-to-br from-gray-50 to-white">
//             <div className="mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="grid lg:grid-cols-2 gap-12 container items-center">
//                 {/* Left Column - Process Steps */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6 }}
//                   className="space-y-8"
//                 >
//                   <div className="w-auto">
//                     <motion.h2
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       className="text-3xl font-bold text-gray-900 mb-4"
//                     >
//                       Our Recruitment Process
//                     </motion.h2>
//                     <motion.p
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: 0.2 }}
//                       className="text-lg text-gray-600 mb-8"
//                     >
//                       We follow a systematic approach to ensure the best matches between candidates and companies.
//                     </motion.p>
//                   </div>

//                   <ul className="space-y-6">
//                     {steps.map((step, index) => (
//                       <motion.li
//                         key={index}
//                         initial={{ opacity: 0, x: -30 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.5, delay: index * 0.1 }}
//                         className="flex items-start space-x-4 group"
//                       >
//                         <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-200">
//                           <ArrowRight className="w-5 h-5 text-indigo-600 transform group-hover:translate-x-1 transition-transform duration-200" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-lg font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
//                             {step}
//                           </p>
//                         </div>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </motion.div>

//                 {/* Right Column - Image */}
//                 <motion.div
//                   initial={{ opacity: 0, x: 30 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.8 }}
//                   className="relative"
//                 >
//                   <div className="relative aspect-[4/5] max-w-md mx-auto lg:ml-auto">
//                     <Image
//                       src="/images/person2.jpg"
//                       alt="Professional business man"
//                       width={220}
//                       height={220}
//                       className="rounded-2xl shadow-xl object-cover w-full h-full"
//                     />
//                     {/* Decorative Elements */}
//                     <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-indigo-50 rounded-2xl" />
//                     <div className="absolute -z-20 -bottom-12 -right-12 w-full h-full bg-indigo-100/50 rounded-2xl" />
//                   </div>

//                   {/* Stats or Additional Info */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.4 }}
//                     className="absolute -bottom-8 left-0 bg-white p-6 rounded-xl shadow-lg max-w-xs"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="text-4xl font-bold text-indigo-600">95%</div>
//                       <p className="text-sm text-gray-600">Success rate in matching candidates with their ideal positions</p>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               </div>
//             </div>
//           </section>
//         </motion.div>
//       </motion.section>
//     </section>

//       <div className="border-t-4 border-gray-400 mx-auto w-full"></div>

//       {/* HRS */}
//       <section className="w-full max-w-7xl mx-auto px-4 py-16">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-5xl font-sans text-black font-bold mb-4">
//             HUMAN REASOURCES SERVICES
//           </h2>
//           <p className="text-gray-950 font-serif">
//             Encompass a wide range of solutions designed to support businesses in managing their workforce effectively.
//           </p>
//         </div>

//         <Swiper
//           modules={[Pagination, Autoplay]} // Add Autoplay here
//           spaceBetween={30}
//           slidesPerView={1}
//           pagination={{ clickable: true }}
//           autoplay={{
//             delay: 3000, // Delay in milliseconds
//             disableOnInteraction: false, // Keep autoplay running even after user interaction
//           }}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className="px-4"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.map((service, index) => (
//               <SwiperSlide key={index}>
//                 <div
//                   key={service.id}
//                   className="bg-white max-h-80 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
//                 >
//                   <div className="flex lg:gap-36 md:gap-28 sm:gap-20">
//                     {/* Icon */}
//                     <div className="mb-6">{service.icon}</div>

//                     {/* Circular Image */}
//                     <div className="relative w-20 h-20 mb-6">
//                       <Image
//                         src={service.image}
//                         alt={service.title}
//                         fill
//                         className="rounded-full object-cover"
//                         sizes="80px"
//                       />
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <h3 className="text-2xl font-semibold mb-4">
//                     {service.title}
//                   </h3>
//                   <p className="text-gray-600 mb-8">{service.description}</p>

//                   {/* Action Button */}
//                   <Link
//                     href={service.link}
//                     className="inline-flex items-center mr-auto justify-center w-12 h-12 rounded-full bg-teal-800 hover:bg-teal-900 transition-colors duration-300"
//                   >
//                     <ArrowUpRight className="w-5 h-5 text-white" />
//                   </Link>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </div>
//         </Swiper>
//       </section>

//       <div className="border-t-4 border-gray-400 mx-auto w-full"></div>

//       {/* testimoril */}
//       <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
//         {/* Background decoration */}
//         <div className="absolute inset-0 z-0">
//           <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
//           <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
//         </div>
//         <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
//           {/* Background decoration */}
//           <div className="absolute inset-0 z-0">
//             <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
//             <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
//           </div>

//           <div className="container mx-auto px-4 relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-center mb-16"
//             >
//               <h2 className="text-5xl md:text-5xl font-bold mb-6 bg-clip-text text-slate-900  ">
//                 WHAT PEOPLE SAY ABOUT US
//               </h2>
//               <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//                 Discover why companies trust us with their recruitment needs
//               </p>
//             </motion.div>
//             <Swiper
//               modules={[Navigation, Pagination, Autoplay]} // Add Autoplay here
//               spaceBetween={30}
//               slidesPerView={1}
//               navigation
//               pagination={{ clickable: true }}
//               autoplay={{
//                 delay: 3500, // Delay in milliseconds
//                 disableOnInteraction: false, // Keep autoplay running even after user interaction
//               }}
//               breakpoints={{
//                 640: { slidesPerView: 1 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 3 },
//               }}
//               className="px-4"
//             >
//               <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, margin: "-50px" }}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//               >
//                 {testimonials.map(
//                   ({ id, name, designation, image, quote, rating }, index) => (
//                     <SwiperSlide key={index}>
//                       <motion.div
//                         key={id}
//                         variants={itemVariants}
//                         whileHover={{ y: -10 }}
//                         className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
//                       >
//                         <div className="flex flex-col items-center">
//                           <div className="relative mb-6">
//                             {/* Decorative circle behind image */}
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-[2px]" />
//                             <div className="relative">
//                               <Image
//                                 src={image}
//                                 alt={name}
//                                 width={80}
//                                 height={80}
//                                 className="rounded-full object-cover border-4 border-white shadow-lg"
//                               />
//                             </div>
//                           </div>

//                           <h3 className="text-xl font-semibold text-gray-800 mb-1">
//                             {name}
//                           </h3>
//                           <p className="text-sm text-gray-500 mb-4">
//                             {designation}
//                           </p>

//                           {/* Rating stars with animation */}
//                           <div className="flex items-center justify-center mb-6">
//                             {[...Array(5)].map((_, i) => (
//                               <motion.div
//                                 key={i}
//                                 initial={{ opacity: 0, scale: 0 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ delay: i * 0.1, duration: 0.3 }}
//                               >
//                                 <FaStar
//                                   className={`w-5 h-5 ${i + 1 <= Math.floor(rating)
//                                     ? "text-yellow-400"
//                                     : i < rating
//                                       ? "text-yellow-400 opacity-50"
//                                       : "text-gray-300"
//                                     }`}
//                                 />
//                               </motion.div>
//                             ))}
//                           </div>

//                           {/* Quote with gradient border */}
//                           <div className="relative p-6 rounded-xl bg-gray-50">
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20" />
//                             <p className="relative text-gray-600 italic text-sm leading-relaxed">
//                               {quote}
//                             </p>
//                           </div>
//                         </div>
//                       </motion.div>
//                     </SwiperSlide>
//                   )
//                 )}
//               </motion.div>
//             </Swiper>
//           </div>
//         </section>
//       </section>

//       <div className="border-t-4 border-gray-400 mx-auto w-full"></div>

//       {/* ssti */}
//       <section className="w-full max-w-7xl mx-auto px-4 py-16">
//         <div className="text-center mb-12">
//           <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-600 mb-4">
//             CASE STUDY
//           </div>
//           <h2 className="text-5xl font-bold font-sans mb-4">
//             SUCCESS STORIES THAT INSPIRE
//           </h2>
//           <p className="text-gray-600 font-serif">
//             A collection of real-life achievements, transformative journeys, and impactful experiences that showcase perseverance, innovation, and determination.
//           </p>
//         </div>

//         <Swiper
//           modules={[Pagination, Autoplay]} // Add Autoplay here
//           spaceBetween={30}
//           slidesPerView={1}
//           pagination={{ clickable: true }}
//           autoplay={{
//             delay: 3000, // Delay in milliseconds
//             disableOnInteraction: false, // Keep autoplay running even after user interaction
//           }}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className="px-4"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {stories.map((story, index) => (
//               <SwiperSlide key={index}>
//                 <div key={story.id} className="overflow-hidden">
//                   <div className="relative">
//                     <div className="relative w-full h-full ">
//                       <Image
//                         src={story.image}
//                         alt={story.alt}
//                         // fill
//                         width={500}
//                         height={500}
//                         className="object-contain rounded-lg"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                         priority={story.id === 1}
//                       />
//                     </div>
//                     <div className="absolute bottom-0 right-0 transform translate-y-1/2 mr-4">
//                       <div className="bg-yellow-300 rounded-full p-4">
//                         {story.icon}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="pt-8">
//                     <div className="h-24 flex items-center justify-center">
//                       <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </div>
//         </Swiper>
//       </section>

//       <div className="border-t-4 border-gray-400 mx-auto w-full"></div>


//     </section>
//   );
// }


import React from 'react'
import Homes from "../app/home/page"

export default function Home() {
  return (
      <Homes /> 

  )
}
