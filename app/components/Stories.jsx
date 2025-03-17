'use client';

import { useState, useEffect } from 'react';
import { BarChart, Presentation, Users, FileSpreadsheet } from 'lucide-react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch('/api/stories');
        const result = await response.json();
        
        if (result.success) {
          setStories(result.data);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, []);

  // Function to render the appropriate icon based on iconType
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'BarChart':
        return <BarChart className="w-6 h-6" />;
      case 'Presentation':
        return <Presentation className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-6 h-6" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading stories...</div>;
  }

  return (
    <>
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
              <motion.div key={story._id}
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
                      className="object-cover h-72 rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority={story._id === 1}
                    />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute bottom-0 right-0 transform translate-y-1/2 mr-4 bg-orange-400 rounded-full p-3 shadow-lg"
                  >
                    {renderIcon(story.iconType)}
                  </motion.div>
                </div>
              
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
    </>
  );
}