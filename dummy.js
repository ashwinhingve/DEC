// const useResumeHandler = (formData, resumeFile) => {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState(null);
  
//     const validateFormData = () => {
//       const errors = [];
  
//       // Validate personal information
//       const { personal } = formData;
//       if (!personal.fullName?.trim()) errors.push('Full name is required');
//       if (!personal.email?.trim()) errors.push('Email is required');
//       if (!personal.phone?.trim()) errors.push('Phone number is required');
      
//       // Validate email format
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (personal.email && !emailRegex.test(personal.email)) {
//         errors.push('Invalid email format');
//       }
  
//       // Validate phone format
//       const phoneRegex = /^\+?[\d\s-]{10,}$/;
//       if (personal.phone && !phoneRegex.test(personal.phone)) {
//         errors.push('Invalid phone number format');
//       }
  
//       // Validate experience entries
//       formData.experience.forEach((exp, index) => {
//         if (exp.company?.trim() && (!exp.startDate || !exp.position)) {
//           errors.push(`Experience ${index + 1}: Start date and position are required`);
//         }
//       });
  
//       // Validate education entries
//       formData.education.forEach((edu, index) => {
//         if (edu.school?.trim() && (!edu.degree || !edu.graduationDate)) {
//           errors.push(`Education ${index + 1}: Degree and graduation date are required`);
//         }
//       });
  
//       // Validate skills
//       if (formData.skills.every(skill => !skill.trim())) {
//         errors.push('At least one skill is required');
//       }
  
//       return errors;
//     };
  
//     const formatDate = (dateString) => {
//       if (!dateString) return '';
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
//     };
  
//     const generatePDF = async () => {
//       const doc = new jsPDF();
//       const margin = 20;
//       let yPosition = margin;
  
//       // Set fonts
//       doc.setFont('helvetica', 'bold');
//       doc.setFontSize(20);
  
//       // Add personal information
//       doc.text(formData.personal.fullName, margin, yPosition);
//       doc.setFont('helvetica', 'normal');
//       doc.setFontSize(10);
//       yPosition += 10;
//       doc.text([
//         formData.personal.email,
//         formData.personal.phone,
//         formData.personal.website,
//       ].filter(Boolean).join(' | '), margin, yPosition);
  
//       // Add summary
//       if (formData.personal.summary) {
//         yPosition += 15;
//         doc.setFont('helvetica', 'bold');
//         doc.setFontSize(12);
//         doc.text('Professional Summary', margin, yPosition);
//         doc.setFont('helvetica', 'normal');
//         doc.setFontSize(10);
//         yPosition += 10;
//         doc.text(doc.splitTextToSize(formData.personal.summary, 170), margin, yPosition);
//       }
  
//       // Add experience
//       if (formData.experience.length > 0) {
//         yPosition += 15;
//         doc.setFont('helvetica', 'bold');
//         doc.setFontSize(12);
//         doc.text('Experience', margin, yPosition);
        
//         formData.experience.forEach(exp => {
//           if (exp.company) {
//             yPosition += 10;
//             doc.setFont('helvetica', 'bold');
//             doc.setFontSize(11);
//             doc.text(`${exp.position} at ${exp.company}`, margin, yPosition);
//             doc.setFont('helvetica', 'normal');
//             doc.setFontSize(10);
//             yPosition += 5;
//             doc.text(
//               `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`,
//               margin,
//               yPosition
//             );
//             if (exp.description) {
//               yPosition += 5;
//               doc.text(doc.splitTextToSize(exp.description, 170), margin, yPosition);
//             }
//           }
//         });
//       }
  
//       // Add education
//       if (formData.education.length > 0) {
//         yPosition += 15;
//         doc.setFont('helvetica', 'bold');
//         doc.setFontSize(12);
//         doc.text('Education', margin, yPosition);
        
//         formData.education.forEach(edu => {
//           if (edu.school) {
//             yPosition += 10;
//             doc.setFont('helvetica', 'bold');
//             doc.setFontSize(11);
//             doc.text(edu.school, margin, yPosition);
//             doc.setFont('helvetica', 'normal');
//             doc.setFontSize(10);
//             yPosition += 5;
//             doc.text(
//               `${edu.degree}${edu.field ? ` in ${edu.field}` : ''} - ${formatDate(edu.graduationDate)}`,
//               margin,
//               yPosition
//             );
//           }
//         });
//       }
  
//       // Add skills
//       const validSkills = formData.skills.filter(skill => skill.trim());
//       if (validSkills.length > 0) {
//         yPosition += 15;
//         doc.setFont('helvetica', 'bold');
//         doc.setFontSize(12);
//         doc.text('Skills', margin, yPosition);
//         yPosition += 5;
//         doc.setFont('helvetica', 'normal');
//         doc.setFontSize(10);
//         doc.text(validSkills.join(' • '), margin, yPosition);
//       }
  
//       return doc;
//     };
  
//     const handleSaveResume = async () => {
//       try {
//         setIsSubmitting(true);
//         setError(null);
  
//         // Validate form data
//         const validationErrors = validateFormData();
//         if (validationErrors.length > 0) {
//           throw new Error(validationErrors.join('\n'));
//         }
  
//         if (resumeFile) {
//           // Handle uploaded resume file
//           // You can implement file handling logic here
//           const downloadLink = URL.createObjectURL(resumeFile);
//           window.open(downloadLink);
//         } else {
//           // Generate PDF from form data
//           const doc = await generatePDF();
//           doc.save(`${formData.personal.fullName.replace(/\s+/g, '_')}_resume.pdf`);
//         }
  
//         // Optional: Save to backend
//         // await saveResumeToBackend(formData);
  
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsSubmitting(false);
//       }
//     };
  
//     return {
//       handleSaveResume,
//       isSubmitting,
//       error
//     };
//   };




//   {/* Contact Form Section */}
//   <div className="min-h-screen">
//   <motion.section
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 0.6 }}
//     className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50"
//   >
//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//       <div className="grid lg:grid-cols-2 gap-8 items-center">
//         {/* Left Section */}
//         <motion.div
//           initial={{ x: -50 }}
//           animate={{ x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative"
//         >
//           <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//             {/* <Image
//               src="/first/contact-banner.jpg"
//               alt="Contact Us"
//               width={600}
//               height={800}
//               className="w-full h-96 object-cover"
//             /> */}
//             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
//             <h1 className="absolute top-8 left-8 text-5xl font-bold text-white">
//               Contact Us
//             </h1>
//             <div className="absolute bottom-0 w-full p-8">
//               <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 space-y-4">
//                 <a
//                   href="tel:470-601-1911"
//                   className="flex items-center group"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
//                     <FaPhone className="text-indigo-600" />
//                   </div>
//                   <span className="ml-4 text-gray-800">+(91) 7722965066</span>
//                 </a>
//                 <a
//                   href="https://demploymentcorner.com"
//                   className="flex items-center group"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
//                     <FaGlobe className="text-indigo-600" />
//                   </div>
//                   <span className="ml-4 text-gray-800">
//                     demploymentcorner.com
//                   </span>
//                 </a>
//                 <div className="flex items-center group">
//                   <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                     <FaMapMarkerAlt className="text-indigo-600" />
//                   </div>
//                   <span className="ml-4 text-gray-800">All India</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right Section - Form */}
//         <motion.div
//           initial={{ x: 50 }}
//           animate={{ x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white p-8 rounded-2xl shadow-xl"
//         >
//           <h2 className="text-5xl font-bold text-center mb-8 bg-clip-text text-slate-900">
//             SEND US A MESSAGE
//           </h2>
//           <form className="space-y-6">
//             <motion.div
//               whileHover={{ scale: 1.01 }}
//               className="space-y-4"
//             >
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full px-6 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full px-6 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone"
//                 className="w-full px-6 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
//               />
//             </motion.div>

//             <div className="space-y-4">
//               <p className="text-gray-600">
//                 Preferred Method of Communication
//               </p>
//               <div className="flex justify-center space-x-8">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <div className="relative">
//                     <input
//                       type="radio"
//                       name="contact"
//                       value="email"
//                       className="hidden"
//                       onChange={(e) =>
//                         setPreferredContact(e.target.value)
//                       }
//                     />
//                     <div
//                       className={`w-5 h-5 border-2 rounded-full ${preferredContact === "email"
//                         ? "border-indigo-600"
//                         : "border-gray-300"
//                         }`}
//                     >
//                       {preferredContact === "email" && (
//                         <div className="absolute inset-1 bg-indigo-600 rounded-full" />
//                       )}
//                     </div>
//                   </div>
//                   <span>Email</span>
//                 </label>
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <div className="relative">
//                     <input
//                       type="radio"
//                       name="contact"
//                       value="phone"
//                       className="hidden"
//                       onChange={(e) =>
//                         setPreferredContact(e.target.value)
//                       }
//                     />
//                     <div
//                       className={`w-5 h-5 border-2 rounded-full ${preferredContact === "phone"
//                         ? "border-indigo-600"
//                         : "border-gray-300"
//                         }`}
//                     >
//                       {preferredContact === "phone" && (
//                         <div className="absolute inset-1 bg-indigo-600 rounded-full" />
//                       )}
//                     </div>
//                   </div>
//                   <span>Phone</span>
//                 </label>
//               </div>
//             </div>

//             <textarea
//               placeholder="Message"
//               rows={4}
//               className="w-full px-6 py-4 rounded-3xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
//             />

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               Send Message
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   </motion.section>
// </div>




// <section className="relative overflow-hidden bg-teal-900 py-24">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-teal-800" />
      
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
//           {executives.map((executive, index) => (
//             <SwiperSlide key={index}>
//               <div className="grid md:grid-cols-2 gap-12 items-center">
//                 {/* Left side with icon and text */}
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.6 }}
//                   className="text-white space-y-6"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="p-3 bg-teal-800/50 rounded-lg">
//                       <Award className="w-8 h-8 text-white/80" />
//                     </div>
//                     <p className="text-lg font-semibold text-white/80">
//                       Helping world-class company by creative design.
//                     </p>
//                   </div>
//                 </motion.div>

//                 {/* Right side with testimonial */}
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.6 }}
//                   className="flex flex-col md:flex-row items-center gap-8"
//                 >
//                <div className="relative">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ duration: 0.3 }}
//                   className="w-60 h-60 rounded-full overflow-hidden ring-4 ring-teal-600/30"
//                 >
//                   <Image
//                     src={executive.image}
//                     alt={executive.name}
//                     width={500}
//                     height={500}
//                     className="w-full h-full object-cover"
//                   />
//                 </motion.div>
//                 <div className="absolute -bottom-4 -right-4 bg-teal-600 rounded-full p-3 shadow-lg">
//                   <Star className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//                   <div className="flex-1 space-y-4">
//                 <blockquote className="text-lg font-bold font-serif md:text-xl text-white/90 italic leading-relaxed">
//                   {executive.quote}
//                 </blockquote>
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: 0.4 }}
//                   className="border-l-4 border-teal-500/30 pl-4"
//                 >
//                   <h3 className="text-xl font-semibold text-white">
//                     {executive.name}
//                   </h3>
//                   <p className="text-white/70 text-sm mt-1">
//                     {executive.role}
//                   </p>
//                 </motion.div>
//               </div>
//                 </motion.div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>


//   {/* Team Section */}
//   <section className="py-16 bg-white">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Leadership Team</h2>
//     <div className="container mx-auto px-4 gap-8">
//     <Swiper
//         modules={[Navigation,Pagination, Autoplay]} // Add Autoplay here
//         spaceBetween={30}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{
//           delay: 3000, // Delay in milliseconds
//           disableOnInteraction: false, // Keep autoplay running even after user interaction
//         }}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         }}
//         className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8"
//       >
//       {teamMembers.map((member, index) => (
//         <SwiperSlide key={index}>
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.2 }}
//           className="text-center "
//         >
//           <div className="w-32 h-32 mx-auto mb-4  rounded-full bg-gray-200 flex items-center justify-center">
//             {/* <Users className="w-12 h-12 text-gray-400" /> */}
//             <Image
//                                       src={member.image}
//                                       alt={member.name}
//                                       width={50}
//                                       height={50}
//                                       className="rounded-full pt-2 object-cover border-4 border-white shadow-lg w-40 h-40"
//                                     />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
//           <p className="text-gray-600">{member.position}</p>
//         </motion.div>
//         </SwiperSlide>
//       ))}
//       </Swiper>
//     </div>
//   </div>
// </section>// {/* <>

// {/* Sidebar */}
// {/* Overlay for mobile */}
// {isMobile && isSidebarOpen && (
// <div 
//   className="fixed inset-0 bg-black bg-opacity-50 z-30"
//   onClick={handleSidebarClose}
// />
// )}

// {/* Sidebar */}
// <aside 
// className={`
//   fixed mt-16 top-0 left-0 z-40 h-screen bg-white border-r
//   transition-all duration-300 ease-in-out
//   ${isSidebarOpen 
//     ? 'translate-x-0 w-64' 
//     : '-translate-x-full w-0 md:translate-x-0 md:w-64'
//   }
// `}
// >
// <div className="flex items-center justify-between p-4 border-b">
//   <h2 className="text-xl font-bold text-blue-600">JobAdmin</h2>
//   {isMobile && (
//     <button 
//       onClick={handleSidebarClose}
//       className="p-1 hover:bg-gray-100 rounded-lg"
//     >
//       <X className="w-6 h-6" />
//     </button>
//   )}
// </div>

// <nav className="p-4">
//   {menuItems.map((item) => (
//     <button
//       key={item.title}
//       onClick={() => {
//         setActiveMenu(item.title);
//         handleSidebarClose();
//       }}
//       className={`
//         flex items-center w-full p-3 mb-2 rounded-lg
//         transition-all duration-200 ease-in-out
//         ${activeMenu === item.title 
//           ? 'bg-blue-50 text-blue-600' 
//           : 'hover:bg-gray-50'
//         }
//       `}
//     >
//       <item.icon className="w-5 h-5 mr-3" />
//       <span className="whitespace-nowrap">{item.title}</span>
//     </button>
//   ))}
// </nav>
// </aside>

// {/* Toggle button for mobile */}
// {isMobile && !isSidebarOpen && (
// <button
//   onClick={() => setIsSidebarOpen(true)}
//   className="fixed top-20 left-4 z-40 p-2 bg-blue-600 text-white rounded-lg"
// >
//   <LayoutDashboard className="w-6 h-6" />
// </button>
// )}
// </> */}
// 'use client';
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {  
//   MapPin, 
//   Clock, 
//   Briefcase,
//   Search,
//   Filter,
//   Building2,
//   GraduationCap,
//   Users,
//   Star,
//   Languages,
//   BadgeCheck,
//   DollarSign,
//   IndianRupee , 

// } from 'lucide-react';

// const JobsPage = () => {
//   const [filters, setFilters] = useState({
//     location: '',
//     type: '',
//     department: '',
//     salary:'',
//     state: "",
//     city: "",
//     education: "",
//     experience: "",
//     industry: "",
//     occupation: "",
//     language: "",
//     skills: "",
//   });

//   const [searchQuery, setSearchQuery] = useState('');

//   // Sample job listings data
//   const jobs = [
//     {
//       id: 1,
//       title: "Senior Frontend Developer",
//       company: "Tech Solutions Inc.",
//       location: "Bhopal, MP",
//       type: "Full-time",
//       salary: "120k - 150k",
//       department: "Engineering",
//       posted: "2 days ago",
//       description: "We're looking for an experienced frontend developer with expertise in React and modern web technologies."
//     },
//     {
//       id: 2,
//       title: "Product Manager",
//       company: "Innovation Labs",
//       location: "Delhi, CA",
//       type: "Full-time",
//       salary: "130k - 160k",
//       department: "Product",
//       posted: "1 week ago",
//       description: "Join our product team to lead the development of cutting-edge software solutions."
//     },
//     {
//       id: 3,
//       title: "UX Designer",
//       company: "Creative Studio",
//       location: "Remote",
//       type: "Contract",
//       salary: "80k - 100k",
//       department: "Design",
//       posted: "3 days ago",
//       description: "Looking for a talented UX designer to help create beautiful and intuitive user experiences."
//     },
//   ];

//   const filterOptions = {
//     location: ["Remote", "Bhopal, MP", "Delhi, CA", "mumbai, MH"],
//     type: ["Full-time", "Part-time", "Contract", "Internship"],
//     department: ["Engineering", "Design", "Product", "Marketing", "Sales"],
//     salary:["Below 20k", "20k-50k", "50k-100k", "Above 100k"],
//     state: ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi"],
//     city: ["Mumbai", "Bangalore", "Delhi", "Chennai"],
//     type: ["Full-time", "Part-time", "Internship", "Freelance"],
//     department: ["Engineering", "Marketing", "HR", "Design"],
//     salary: ["Below 3 LPA", "3-6 LPA", "6-10 LPA", "10+ LPA"],
//     education: ["Bachelor's", "Master's", "Ph.D.", "Diploma"],
//     experience: ["Fresher", "1-3 years", "3-5 years", "5+ years"],
//     industry: ["Technology", "Healthcare", "Finance", "Retail"],
//     occupation: ["Software Developer", "Data Scientist", "Marketing Manager"],
//     language: ["English", "Hindi", "Tamil", "Kannada"],
//     skills: ["React", "Node.js", "Python", "UI/UX", "SEO"],
//   };

//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesLocation = !filters.location || job.location === filters.location;
//     const matchesType = !filters.type || job.type === filters.type;
//     const matchesDepartment = !filters.department || job.department === filters.department;
//     const matchesSalary = !filters.salary || job.salary === filters.salary;

//     return matchesSearch && matchesLocation && matchesType && matchesDepartment && matchesSalary;
//   });

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   // const filteredJobs = jobs.filter((job) => {
//   //   return (
//   //     Object.keys(filters).every(
//   //       (key) => !filters[key] || job[key]?.toString() === filters[key]
//   //     )
//   //   );
//   // });

//   const FilterSection = ({ title, options, value, onChange, icon: Icon }) => (
//     <div className="mb-4">
//       <div className="flex items-center mb-2">
//         {Icon && <Icon className="w-4 h-4 mr-2 text-gray-600" />}
//         <h3 className="text-sm font-medium text-gray-700">{title}</h3>
//       </div>
//       <select
//         value={value}
//         onChange={onChange}
//         className="w-full p-2 border border-gray-300 rounded-md"
//       >
//         <option value="">All {title}s</option>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <motion.section 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="bg-cyan-800 text-white py-20"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <motion.h1 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//               className="text-4xl font-bold mb-4"
//             >
//               Find Your Dream Job
//             </motion.h1>
//             <motion.p 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//               className="text-xl text-gray-100 mb-8"
//             >
//               Discover opportunities that match your experience and career goals
//             </motion.p>

//             {/* Search Bar */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.6, duration: 0.5 }}
//               className="max-w-2xl mx-auto relative"
//             >
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search jobs by title or company..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Filters and Job Listings */}
//       <section className="py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             {/* Filters Sidebar */}
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="lg:col-span-1"
//             >
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="flex items-center mb-4">
//                   <Filter className="w-5 h-5 mr-2" />
//                   <h2 className="text-lg font-semibold">Filters</h2>
//                 </div>

//                 {/* Filter Sections */}
//                 {Object.entries(filterOptions).map(([key, options], index) => (
//                   <motion.div 
//                     key={key} 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1, duration: 0.5 }}
//                     className="mb-6"
//                   >
//                     <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">{key}</h3>
//                     <select
//                       value={filters[key]}
//                       onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">All {key}s</option>
//                       {options.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

// {/* Job Listings */}
//       <div className="lg:col-span-3">
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="space-y-6"
//         >
//           <AnimatePresence>
//             {filteredJobs.map(job => (
//               <motion.div
//                 key={job.id}
//                 variants={itemVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit={{ opacity: 0, y: 20 }}
//                 layout
//                 className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
//                     <div className="flex items-center text-gray-600">
//                       <Building2 className="w-4 h-4 mr-1" />
//                       <span>{job.company}</span>
//                     </div>
//                   </div>
//                   <motion.span 
//                     whileHover={{ scale: 1.05 }}
//                     className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
//                   >
//                     {job.type}
//                   </motion.span>
//                 </div>

//                 <p className="text-gray-600 mb-4">{job.description}</p>

//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   <div className="flex items-center text-gray-600">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     <span>{job.location}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <IndianRupee className="w-4 h-4 mr-1" />
//                     <span>{job.salary}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Clock className="w-4 h-4 mr-1" />
//                     <span>{job.posted}</span>
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <motion.button 
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
//                   >
//                     View Details
//                     <Briefcase className="ml-2 w-4 h-4" />
//                   </motion.button>
//                 </div>
//                 <div className="mt-4 flex justify-between items-center">
//                      <span className="text-sm text-gray-500">{job.posted}</span>
//                      <div className="flex gap-2">
//                         <button type="button" variant="outline">View Details</button>
//                         <button type="button"  className="bg-blue-600 hover:bg-blue-700">
//                           Apply Now
//                         </button>
//                      </div>            
//                            </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           {filteredJobs.length === 0 && (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-12"
//             >
//               <p className="text-gray-600">No jobs found matching your criteria.</p>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   </div>
// </section>
//     </div>
//   );
// };

// export default JobsPage;


// 'use client';
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Briefcase,
//   MapPin,
//   Clock,
//   DollarSign,
//   IndianRupee,
//   Search,
//   Filter,
//   Building2,
//   GraduationCap,
//   Code,
//   Building,
//   Users,
//   Star
// } from 'lucide-react';

// const JobsPage = () => {
//   const [filters, setFilters] = useState({
//     location: '',
//     state: '',
//     city: '',
//     type: '',
//     department: '',
//     salary: '',
//     skills: [],
//     education: '',
//     experience: '',
//     company: '',
//     occupation: '',
//     industry: ''
//   });

//   const [searchQuery, setSearchQuery] = useState('');

//   // Enhanced filter options
//   const filterOptions = {
//     state: [
//       "Andhra Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi",
//       "Uttar Pradesh", "Gujarat", "Telangana", "West Bengal", "Madhya Pradesh"
//     ],
//     city: [
//       "Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai",
//       "Pune", "Kolkata", "Ahmedabad", "Bhopal", "Indore"
//     ],
//     type: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
//     department: [
//       "Engineering", "Design", "Product", "Marketing", "Sales",
//       "HR", "Finance", "Operations", "Customer Support", "Research"
//     ],
//     salary: [
//       "Below 3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA",
//       "15-25 LPA", "25-50 LPA", "Above 50 LPA"
//     ],
//     skills: [
//       "JavaScript", "React", "Python", "Java", "Node.js",
//       "AWS", "Docker", "Kubernetes", "SQL", "MongoDB",
//       "TypeScript", "Angular", "Vue.js", "PHP", "Go",
//       "Machine Learning", "Data Science", "DevOps", "UI/UX"
//     ],
//     education: [
//       "High School", "Bachelor's", "Master's", "Ph.D.",
//       "B.Tech", "M.Tech", "BCA", "MCA", "MBA", "B.Sc", "M.Sc"
//     ],
//     experience: [
//       "Fresher", "1-3 years", "3-5 years", "5-7 years",
//       "7-10 years", "10+ years"
//     ],
//     industry: [
//       "Technology", "Healthcare", "Finance", "Education",
//       "E-commerce", "Manufacturing", "Consulting", "Media",
//       "Real Estate", "Automotive"
//     ],
//     occupation: [
//       "Software Developer", "Product Manager", "Data Scientist",
//       "UI/UX Designer", "DevOps Engineer", "System Architect",
//       "Project Manager", "Business Analyst", "Sales Manager",
//       "Marketing Manager"
//     ]
//   };

//   // Enhanced jobs data
//   const jobs = [
//     {
//       id: 1,
//       title: "Senior Frontend Developer",
//       company: "Tech Solutions Inc.",
//       location: "Mumbai",
//       state: "Maharashtra",
//       type: "Full-time",
//       salary: "15-25 LPA",
//       department: "Engineering",
//       posted: "2 days ago",
//       description: "We're looking for an experienced frontend developer with expertise in React and modern web technologies.",
//       skills: ["React", "TypeScript", "Node.js", "AWS"],
//       education: "B.Tech",
//       experience: "5-7 years",
//       industry: "Technology",
//       occupation: "Software Developer",
//       companySize: "1000-5000",
//       benefits: ["Health Insurance", "Stock Options", "Remote Work", "Professional Development"]
//     },
//     {
//       id: 2,
//       title: "Machine Learning Engineer",
//       company: "AI Innovations",
//       location: "Bangalore",
//       state: "Karnataka",
//       type: "Full-time",
//       salary: "25-50 LPA",
//       department: "Research",
//       posted: "1 week ago",
//       description: "Looking for an ML engineer to work on cutting-edge AI solutions.",
//       skills: ["Python", "Machine Learning", "TensorFlow", "PyTorch"],
//       education: "M.Tech",
//       experience: "3-5 years",
//       industry: "Technology",
//       occupation: "Data Scientist",
//       companySize: "500-1000",
//       benefits: ["Flexible Hours", "Health Coverage", "Learning Budget", "Gym Membership"]
//     },
//     // Add more job listings as needed
//   ];

//   // Filter jobs based on all criteria
//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch =
//       job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

//     const matchesLocation = !filters.state || job.state === filters.state;
//     const matchesCity = !filters.city || job.location === filters.city;
//     const matchesType = !filters.type || job.type === filters.type;
//     const matchesDepartment = !filters.department || job.department === filters.department;
//     const matchesSalary = !filters.salary || job.salary === filters.salary;
//     const matchesEducation = !filters.education || job.education === filters.education;
//     const matchesExperience = !filters.experience || job.experience === filters.experience;
//     const matchesIndustry = !filters.industry || job.industry === filters.industry;
//     const matchesOccupation = !filters.occupation || job.occupation === filters.occupation;

//     return (
//       matchesSearch &&
//       matchesLocation &&
//       matchesCity &&
//       matchesType &&
//       matchesDepartment &&
//       matchesSalary &&
//       matchesEducation &&
//       matchesExperience &&
//       matchesIndustry &&
//       matchesOccupation
//     );
//   });

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   const FilterSection = ({ title, options, value, onChange, icon: Icon }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="mb-6"
//     >
//       <div className="flex items-center mb-2">
//         {Icon && <Icon className="w-4 h-4 mr-2 text-gray-600" />}
//         <h3 className="text-sm font-medium text-gray-700 capitalize">{title}</h3>
//       </div>
//       <select
//         value={value}
//         onChange={onChange}
//         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//       >
//         <option value="">All {title}s</option>
//         {options.map(option => (
//           <option key={option} value={option}>{option}</option>
//         ))}
//       </select>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <motion.section
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="bg-gradient-to-r from-blue-800 to-cyan-800 text-white py-20"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <motion.h1
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//               className="text-4xl font-bold mb-4"
//             >
//               Find Your Dream Job in India
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//               className="text-xl text-gray-100 mb-8"
//             >
//               Discover opportunities across top companies and cities
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.6, duration: 0.5 }}
//               className="max-w-2xl mx-auto relative"
//             >
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search jobs, skills, or companies..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Filters and Job Listings */}
//       <section className="py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             {/* Enhanced Filters Sidebar */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="lg:col-span-1"
//             >
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center">
//                     <Filter className="w-5 h-5 mr-2" />
//                     <h2 className="text-lg font-semibold">Filters</h2>
//                   </div>
//                   <button
//                     onClick={() => setFilters({})}
//                     className="text-sm text-blue-600 hover:text-blue-800"
//                   >
//                     Clear All
//                   </button>
//                 </div>

//                 <FilterSection
//                   title="state"
//                   options={filterOptions.state}
//                   value={filters.state}
//                   onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
//                   icon={MapPin}
//                 />

//                 <FilterSection
//                   title="city"
//                   options={filterOptions.city}
//                   value={filters.city}
//                   onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
//                   icon={Building2}
//                 />

//                 <FilterSection
//                   title="experience"
//                   options={filterOptions.experience}
//                   value={filters.experience}
//                   onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
//                   icon={Briefcase}
//                 />

//                 <FilterSection
//                   title="education"
//                   options={filterOptions.education}
//                   value={filters.education}
//                   onChange={(e) => setFilters(prev => ({ ...prev, education: e.target.value }))}
//                   icon={GraduationCap}
//                 />

//                 <FilterSection
//                   title="salary"
//                   options={filterOptions.salary}
//                   value={filters.salary}
//                   onChange={(e) => setFilters(prev => ({ ...prev, salary: e.target.value }))}
//                   icon={IndianRupee}
//                 />

//                 <FilterSection
//                   title="industry"
//                   options={filterOptions.industry}
//                   value={filters.industry}
//                   onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
//                   icon={Building}
//                 />

//                 <FilterSection
//                   title="department"
//                   options={filterOptions.department}
//                   value={filters.department}
//                   onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
//                   icon={Users}
//                 />

//                 <FilterSection
//                   title="occupation"
//                   options={filterOptions.occupation}
//                   value={filters.occupation}
//                   onChange={(e) => setFilters(prev => ({ ...prev, occupation: e.target.value }))}
//                   icon={Briefcase}
//                 />
//               </div>
//             </motion.div>

//             {/* Job Listings */}
//             <div className="lg:col-span-3">
//               <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="space-y-6"
//               >
//                 <AnimatePresence>
//                   {filteredJobs.map(job => (
//                     <motion.div
//                       key={job.id}
//                       variants={itemVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit={{ opacity: 0, y: 20 }}
//                       layout
//                       className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
//                           <div className="flex items-center text-gray-600">
//                             <Building2 className="w-4 h-4 mr-1" />
//                             <span>{job.company}</span>
//                           </div>
//                         </div>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           className="p-2 text-gray-400 hover:text-yellow-500"
//                         >
//                           <Star className="w-5 h-5" />
//                         </motion.button>
//                       </div>

//                       <p className="text-gray-600 mb-4">{job.description}</p>

//                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
//                         <div className="flex items-center text-gray-600">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           <span>{job.location}, {job.state}</span>
//                         </div>
//                         <div className="flex items-center text-gray-600">
//                           <IndianRupee className="w-4 h-4 mr-1" />
//                           <span>{job.salary}</span>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }
// export default JobsPage;