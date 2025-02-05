'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Github, ArrowRight } from 'lucide-react';
// import { useSession, signIn, signOut } from "next-auth/react"


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Add your authentication logic here
  //   console.log('Form submitted:', formData);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const action = isLogin ? 'login' : 'register';
  //     const response = await fetch(`http://localhost:3000/auth/auth_api.php?action=${action}`, {
  //     // const response = await fetch(`http://demploymentcorner.com/auth_api.php?action=${action}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //             'Accept': 'application/json'
  //       },
  //       credentials: 'include', 
  //       body: JSON.stringify(formData)
  //     });
  
  //     const data = await response.json();
      
  //     if (data.success) {
  //       if (isLogin) {
  //         // Store user data in localStorage or state management system
  //         localStorage.setItem('user', JSON.stringify(data.user));
  //         localStorage.setItem('token', data.token); 
  //         // Redirect to dashboard or home page
  //         window.location.href = '/admin';
  //       } else {
  //         // Show success message and switch to login
  //         alert('Registration successful! Please login.');
  //         setIsLogin(true);
  //       }
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('An error occurred. Please try again.');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation rules
    const validations = {
      email: {
        regex: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        message: 'Invalid email. Must be a valid Gmail address'
      },
      password: {
        regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message: 'Password must:\n- Be at least 8 characters\n- Contain letter, number, special character'
      },
      name: {
        minLength: 3,
        maxLength: 20,
        message: 'Name must be 3-20 characters long'
      }
    };
  
    // Email validation
    if (!validations.email.regex.test(formData.email)) {
      alert(validations.email.message);
      return;
    }
  
    // Password validation
    if (!validations.password.regex.test(formData.password)) {
      alert(validations.password.message);
      return;
    }
  
    // Name validation (only during registration)
    if (!isLogin) {
      const nameLength = formData.name.trim().length;
      if (nameLength < validations.name.minLength || nameLength > validations.name.maxLength) {
        alert(validations.name.message);
        return;
      }
    }
  
    try {
      const action = isLogin ? 'login' : 'register';
      const apiUrl = 'http://localhost/my-app/auth_api.php';
    
      const response = await fetch(`${apiUrl}?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      
      if (data.success) {
        if (isLogin) {
          localStorage.setItem('user', JSON.stringify(data.user));
          document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=3600`;
          window.location.href = '/profile';
        } else {
          alert('Registration successful! Please login.');
          setIsLogin(true);
        }
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', name: '' });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };
   // const { data: session } = useSession()
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // )
  return (
    <>
    <div className="h-20 bg-teal-800 w-full"></div>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="w-full max-w-md"
      >
        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-6 text-center bg-gradient-to-r from-[#0891B2] to-[#06B6D4]">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-blue-100"
            >
              {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="p-8"
          >
            {/* Social Login */}
            {/* <motion.div variants={itemVariants} className="mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white rounded-lg p-3 hover:bg-gray-800 transition-colors duration-300"
              >
                <Github size={20} />
                Continue with Github
              </button>
            </motion.div>  
            <motion.div variants={itemVariants} className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </motion.div> */}

            {/* Name Field - Only show on signup */}
            {!isLogin && (
              <motion.div variants={itemVariants} className="mb-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Email Field */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#0891B2] via-[#0EA5E9] to-[#38BDF8] text-white rounded-lg p-3 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity duration-300">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>

            {/* Toggle Auth Mode */}
            <motion.p variants={itemVariants} className="mt-6 text-center text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleAuth}
                className="text-blue-600 hover:underline font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default AuthPage;