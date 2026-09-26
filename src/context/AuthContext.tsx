'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole, AuthUser } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (role: UserRole, identifier: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Load authenticated session on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('campusone_auth_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role && parsed.identifier) {
          setUser(parsed);
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (role: UserRole, identifier: string, password: string) => {
    const id = identifier.trim();
    const pwd = password.trim();

    if (role === 'student') {
      const validId = id === '25107' || id.toLowerCase() === 'ashwanth.r@campusone.edu.in';
      if (validId && pwd === 'student123') {
        const authUser: AuthUser = {
          id: 'usr_std_25107',
          name: 'Ashwanth R',
          role: 'student',
          identifier: '25107',
          department: 'Department of Cyber Security',
          program: 'B.Tech Cyber Security',
          email: 'ashwanth.r@campusone.edu.in',
        };
        setUser(authUser);
        localStorage.setItem('campusone_auth_user', JSON.stringify(authUser));
        return { success: true };
      }
    } else if (role === 'faculty') {
      const validId = id.toUpperCase() === 'FAC001' || id.toLowerCase() === 'priya.menon@campusone.edu.in';
      if (validId && pwd === 'faculty123') {
        const authUser: AuthUser = {
          id: 'usr_fac_001',
          name: 'Dr. Priya Menon',
          role: 'faculty',
          identifier: 'FAC001',
          department: 'Computer Science',
          email: 'priya.menon@campusone.edu.in',
        };
        setUser(authUser);
        localStorage.setItem('campusone_auth_user', JSON.stringify(authUser));
        return { success: true };
      }
    } else if (role === 'admin') {
      const validId = id.toUpperCase() === 'ADMIN001' || id.toLowerCase() === 'admin@campusone.edu.in';
      if (validId && pwd === 'admin123') {
        const authUser: AuthUser = {
          id: 'usr_adm_001',
          name: 'Administrator',
          role: 'admin',
          identifier: 'ADMIN001',
          department: 'Central Administration Desk',
          email: 'admin@campusone.edu.in',
        };
        setUser(authUser);
        localStorage.setItem('campusone_auth_user', JSON.stringify(authUser));
        return { success: true };
      }
    }

    return {
      success: false,
      error: 'Invalid credentials. Please check your ID and password.',
    };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('campusone_auth_user');
      sessionStorage.clear();
    } catch {}
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
