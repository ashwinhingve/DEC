'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    // role: 'user'
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set initial loading state
    setIsLoading(true);
    setError('');

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

    try {
      // Input validation
      if (!validations.email.regex.test(formData.email)) {
        throw new Error(validations.email.message);
      }

      if (!validations.password.regex.test(formData.password)) {
        throw new Error(validations.password.message);
      }

      if (!isLogin && (
        formData.name.trim().length < validations.name.minLength ||
        formData.name.trim().length > validations.name.maxLength
      )) {
        throw new Error(validations.name.message);
      }

      // Prepare request data
      const reqData = {
        email: formData.email,
        password: formData.password,
        ...((!isLogin && formData.name) && { name: formData.name })
      };

      // Make API request
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(endpoint, reqData);

      if (response.data.success) {
        if (isLogin) {
          setAuth({
            user: response.data.user,
            token: response.data.token
          });

          toast.success('Login successful!');
          router.push(response.data.user.role === 'admin' ? '/admin' : '/profile');
        } else {
          // Show registration success
          toast.success('Registration successful! Please login.');
          setIsLogin(true);

          // Reset form
          setFormData({
            email: '',
            password: '',
            name: ''
          });
        }
      }
    } catch (error) {
      // Handle different types of errors
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';

      if (error.response?.status === 401) {
        setError('Invalid credentials');
      } else if (error.response?.status === 409) {
        setError('Email already exists');
      } else {
        setError(errorMessage);
      }

      // Show error toast
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
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
    setFormData({ email: '', password: '', name: '', role: 'user' });
    setRole('user');
  };

  // Animation variants remain the same
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
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
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

            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="p-8"
            >
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

              {/* <motion.div variants={itemVariants} className="mb-6">
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </motion.div> */}

              <motion.div variants={itemVariants}>
                {/* <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#0891B2] via-[#0EA5E9] to-[#38BDF8] text-white rounded-lg p-3 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={20} />
                    </>
                  )}
                </button> */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#0891B2] via-[#0EA5E9] to-[#38BDF8] text-white rounded-lg p-3 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </motion.div>

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