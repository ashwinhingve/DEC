"use client"
import React from 'react'
import { Phone, Mail, PhoneCall } from "lucide-react";
import { useState, useEffect } from 'react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
const foot = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <div>
      <section id="5">
        <footer className="bg-cyan-900  text-white py-10">
          <div className="footer-content container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us Section */}
            <div className="footer-section m-4 md:ml-5 lg:ml-10">
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className='my-2'>
              At our company, we&apos;re committed to staying ahead of the curve. We work tirelessly to create innovative solutions that not only meet but exceed the expectations of our customers around the world.
              </p>
              <p className='my-2'>
              GSTIN NO. - 23AALCD3181B2Z1.  
              </p>
              <p className='my-2'>
              CIN No. - U78200MP2025PTC074118 
              </p>
            </div>

            {/* Contact Us Section */}
            <div className="footer-section m-4">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className='flex'>
              <Mail size={24} className="text-green-500" />
                <a
                  href="mailto:admin@demploymentcorner.com"
                  className="hover:underline pl-1"
                >
                  admin@demploymentcorner.com
                </a>
                
              </p>
              <p className='flex'>
              <Mail size={24} className="text-green-500" />
                <a
                  href="mailto:vacancy@demploymentcorner.com"
                  className="hover:underline pl-1"
                >
                  vacancy@demploymentcorner.com
                </a>
                
              </p>
              <p className='flex'>
              <PhoneCall size={24} className="text-red-500" />
                <a
                  href="tel:+(91) 7722965066"
                  className="hover:underline pl-1"
                >
                  +(91) 7722965066
                </a>
                
              </p>
              <p className='flex'>
              <Phone size={24} className="text-blue-500" />
                <a
                  href="tel:(0) 7317967745"
                  className="hover:underline pl-1"
                >
                  (0) 7317967745
                </a>
                
              </p>
              <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-6xl mx-auto px-4  ">
                  <h2 className="text-lg font-semibold mb-4">
                    Follow Us On Social Media
                  </h2>
                  <div className="flex   space-x-6 mb-4">
                    <a
                      href="https://www.facebook.com/share/1Ha1ARPn59/?mibextid=qi2Omg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-500 text-2xl transition duration-300"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="https://x.com/d_employme74107"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 text-2xl transition duration-300"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="https://www.instagram.com/divy_employment_corner_pvt_ltd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-pink-500 text-2xl transition duration-300"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/employment-corner-628287255?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BcUDBoTMyQD%2BgE67%2FIN%2Fjtw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-700 text-2xl transition duration-300"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://chat.whatsapp.com/ITgDKvC3nxj26DUdnLoUZz"
                      // href="https://wa.me/yourphonenumber"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-500 text-2xl transition duration-300"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </footer>
            </div>

            {/* Visit Us Section */}
            <div className="footer-section m-4">
              <h3 className="text-lg font-semibold mb-4">Visit Us</h3>
              <div className="map-container w-full h-40 overflow-hidden rounded-md">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.850324171921!2d75.84765747515561!3d22.733803979377267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd1cc5a4a043%3A0xb2f50858a3f56c1b!2sShri%20Krishna%20DIVINE!5e0!3m2!1sen!2sin!4v1738318437792!5m2!1sen!2sin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="justify-center text-center flex space-between">
            <div className="text-center mt-8 ml-3">
              <p>&copy; {year} Your Company Name. All rights reserved.</p>
            </div>
            <div className="text-center mt-8 ml-3">
              Powered by -
              <a
                href="http://www.spacesautomation.com"
                className="text-blue-400"
              >
                Space Automation
              </a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}

export default foot
