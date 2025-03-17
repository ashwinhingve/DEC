'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


export default function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await fetch('/api/team-members');
        const result = await response.json();
        
        if (result.success) {
          setTeamMembers(result.data);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading team members...</div>;
  }

  return (
    <>
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
              <motion.div key={member._id} whileHover={{ y: -10 }} className="p-6">
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
    </>
  );
}