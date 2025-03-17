"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import { Menu, X } from 'lucide-react';


const nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/job', label: 'Job' },
    { href: '/auth', label: 'Log in' },
    // { href: '/Admin', label: 'Admin' },
    // { href: '/profile', label: 'Profile' },
  ];
 
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? ' bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Employment Corner"
              width={50}
              height={50}
              className="rounded transition-transform duration-300 hover:scale-105"
            />
            <span className={`font-semibold text-lg ${
              scrolled ? 'text-gray-800' : 'text-white'
            } hidden sm:block`}>
              DIVY EMPLOYMENT CORNER
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.label}
                href={item.href}
                className={`${
                  scrolled ? 'text-gray-800' : 'text-white'
                } hover:text-blue-500 transition-colors duration-200 text-sm font-medium`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${
                scrolled ? 'text-gray-800' : 'text-white'
              } hover:bg-gray-100/20 transition-colors duration-200`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-800/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="bg-white/80 backdrop-blur-md shadow-lg text-center py-4 text-lg font-medium border-b border-gray-700 hover:text-blue-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default nav
