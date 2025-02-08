'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    // Check both localStorage and cookies on mount
    const token = localStorage.getItem('token') || Cookies.get('token');
    const userStr = localStorage.getItem('user') || Cookies.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuth({
          isAuthenticated: true,
          user,
          token,
        });
      } catch (error) {
        logout();
      }
    }
  }, []);

  const logout = () => {
    // Clear both localStorage and cookies
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Cookies.remove('token');
    Cookies.remove('user');
    
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    
    router.push('/auth');
  };

  const updateAuth = (data) => {
    // Update both localStorage and cookies
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    Cookies.set('token', data.token, { expires: 1 }); // Expires in 1 day
    Cookies.set('user', JSON.stringify(data.user), { expires: 1 });

    setAuth({
      isAuthenticated: true,
      user: data.user,
      token: data.token,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth: updateAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};