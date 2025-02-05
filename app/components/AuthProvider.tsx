'use client';

import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
  role?: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost/your-php-backend/'; // Update with your actual backend URL

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}?action=login`, 
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        // Determine role (you might want to add this logic in your PHP backend)
        const userData = {
          ...response.data.user,
          role: email === 'admin@example.com' ? 'admin' : 'user'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}?action=register`, 
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Hydrate user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};