'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import {
  GraduationCap,
  Briefcase,
  Shield,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  KeyRound,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [role, setRole] = useState<UserRole>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to role's dashboard
  useEffect(() => {
    if (user) {
      if (user.role === 'student') router.replace('/student/dashboard');
      else if (user.role === 'faculty') router.replace('/faculty/dashboard');
      else if (user.role === 'admin') router.replace('/admin/dashboard');
    }
  }, [user, router]);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setError(null);
    setIdentifier('');
    setPassword('');
  };

  const handleQuickFill = (targetRole: UserRole, id: string, pwd: string) => {
    setRole(targetRole);
    setIdentifier(id);
    setPassword(pwd);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password.trim()) {
      setError('Please enter your credentials to proceed.');
      return;
    }

    setIsSubmitting(true);

    const result = login(role, identifier, password);

    if (result.success) {
      if (role === 'student') router.push('/student/dashboard');
      else if (role === 'faculty') router.push('/faculty/dashboard');
      else if (role === 'admin') router.push('/admin/dashboard');
    } else {
      setIsSubmitting(false);
      setError(result.error || 'Invalid credentials. Please check your ID and password.');
    }
  };

  const getIdentifierLabel = () => {
    switch (role) {
      case 'student':
        return 'Register Number / Email';
      case 'faculty':
        return 'Faculty ID / Email';
      case 'admin':
        return 'Admin ID / Email';
    }
  };

  const getIdentifierPlaceholder = () => {
    switch (role) {
      case 'student':
        return 'e.g. 25107 or ashwanth.r@campusone.edu.in';
      case 'faculty':
        return 'e.g. FAC001 or priya.menon@campusone.edu.in';
      case 'admin':
        return 'e.g. ADMIN001 or admin@campusone.edu.in';
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] flex flex-col justify-between">
      {/* Top institutional sub-bar */}
      <div className="bg-[#17233C] text-slate-300 px-4 py-1.5 text-xs flex justify-between items-center border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#2E7D5B] inline-block"></span>
            <span className="font-semibold text-white tracking-wide text-[11px]">
              CAMPUS ONE CENTRAL AUTHENTICATION SERVICE (CAS)
            </span>
          </div>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Secure 256-Bit SSL Encrypted Portal
          </span>
        </div>
      </div>

      {/* Main Login Two-Column Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 bg-white rounded-md border border-[#D9DEE7] shadow-sm overflow-hidden">
          
          {/* LEFT COLUMN: Institutional Welcome Section (Solid Navy - No Gradient) */}
          <div className="md:col-span-5 bg-[#17233C] text-white p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D9DEE7]">
            <div>
              {/* Logo & Platform Name */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-11 h-11 rounded-md bg-[#B0004B] text-white flex items-center justify-center font-bold text-2xl shadow-xs border border-[#90003D]">
                  C1
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight leading-none text-white">
                    CampusOne
                  </h1>
                  <span className="text-[11px] text-slate-300 font-medium">
                    Unified Digital Campus Platform
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-sm font-medium text-slate-200 leading-snug mb-6">
                &ldquo;One centralized portal for academics, campus services, and administration.&rdquo;
              </p>

              {/* Supporting Points */}
              <div className="space-y-3 pt-4 border-t border-slate-700 text-xs">
                <div className="flex items-center space-x-2.5 text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-[#B0004B] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    ✓
                  </span>
                  <span className="font-medium">Academic Services & Attendance</span>
                </div>
                <div className="flex items-center space-x-2.5 text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-[#B0004B] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    ✓
                  </span>
                  <span className="font-medium">Campus Requests & Grievances</span>
                </div>
                <div className="flex items-center space-x-2.5 text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-[#B0004B] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    ✓
                  </span>
                  <span className="font-medium">Online Fees & Verified Documents</span>
                </div>
                <div className="flex items-center space-x-2.5 text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-[#B0004B] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    ✓
                  </span>
                  <span className="font-medium">Real-Time Administrative Notices</span>
                </div>
              </div>
            </div>

            {/* University Note */}
            <div className="mt-8 pt-4 border-t border-slate-700 text-[11px] text-slate-400">
              Accredited Institutional ERP System • Academic Session 2026-27
            </div>
          </div>

          {/* RIGHT COLUMN: Login Card (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Header */}
              <div className="mb-5">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Welcome back
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                  Sign in to CampusOne
                </h2>
              </div>

              {/* Role Segmented Selector */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-[#17233C] uppercase tracking-wide mb-1.5">
                  Select Portal Role
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-[#F3F5F7] rounded-md border border-[#D9DEE7]">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('student')}
                    className={`py-1.5 rounded-md text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${
                      role === 'student'
                        ? 'bg-[#B0004B] text-white shadow-2xs'
                        : 'text-[#182033] hover:text-[#B0004B] hover:bg-white/60'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange('faculty')}
                    className={`py-1.5 rounded-md text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${
                      role === 'faculty'
                        ? 'bg-[#B0004B] text-white shadow-2xs'
                        : 'text-[#182033] hover:text-[#B0004B] hover:bg-white/60'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Faculty</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange('admin')}
                    className={`py-1.5 rounded-md text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${
                      role === 'admin'
                        ? 'bg-[#B0004B] text-white shadow-2xs'
                        : 'text-[#182033] hover:text-[#B0004B] hover:bg-white/60'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              {/* Error Toast */}
              {error && (
                <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-md text-xs text-[#C94B4B] flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-[#C94B4B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Login Failed: </span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-[#182033] mb-1">
                    {getIdentifierLabel()}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#667085]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder={getIdentifierPlaceholder()}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      className="w-full border border-[#D9DEE7] rounded-md pl-9 pr-3 py-2 text-xs text-[#182033] bg-white focus:outline-hidden focus:border-[#B0004B] focus:ring-1 focus:ring-[#B0004B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#182033] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#667085]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full border border-[#D9DEE7] rounded-md pl-9 pr-3 py-2 text-xs text-[#182033] bg-white focus:outline-hidden focus:border-[#B0004B] focus:ring-1 focus:ring-[#B0004B]"
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-1.5 cursor-pointer text-[#667085]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[#D9DEE7] text-[#B0004B] focus:ring-[#B0004B]"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Please contact the University IT Help Desk to reset your institutional credentials.')}
                    className="text-[#B0004B] hover:underline font-semibold text-xs"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#B0004B] hover:bg-[#90003D] text-white rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-2xs mt-2 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Judging Demo Credentials Helper Box */}
            <div className="mt-5 pt-3 border-t border-[#D9DEE7]">
              <div className="p-2.5 bg-[#F7F5F2] border border-[#D9DEE7] rounded-md text-[11px] text-[#667085]">
                <div className="font-bold text-[#17233C] flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-[#B0004B]" />
                    Demo Credentials:
                  </span>
                  <span className="text-[10px] text-[#667085] font-normal">Click to quick-fill</span>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('student', '25107', 'student123')}
                    className="p-1 text-left bg-white border border-[#D9DEE7] hover:border-[#B0004B] hover:bg-[#FDF2F7] rounded transition"
                  >
                    <div className="font-bold text-[#182033] text-[10px]">Student</div>
                    <div className="text-[10px] text-[#667085] font-mono">25107</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill('faculty', 'FAC001', 'faculty123')}
                    className="p-1 text-left bg-white border border-[#D9DEE7] hover:border-[#B0004B] hover:bg-[#FDF2F7] rounded transition"
                  >
                    <div className="font-bold text-[#182033] text-[10px]">Faculty</div>
                    <div className="text-[10px] text-[#667085] font-mono">FAC001</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin', 'ADMIN001', 'admin123')}
                    className="p-1 text-left bg-white border border-[#D9DEE7] hover:border-[#B0004B] hover:bg-[#FDF2F7] rounded transition"
                  >
                    <div className="font-bold text-[#182033] text-[10px]">Admin</div>
                    <div className="text-[10px] text-[#667085] font-mono">ADMIN001</div>
                  </button>
                </div>
              </div>

              <div className="text-center text-[11px] text-[#667085] mt-3">
                Don&apos;t have access?{' '}
                <span className="text-[#B0004B] font-semibold">
                  Contact Campus Administration
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-[#D9DEE7] py-3 text-center text-xs text-[#667085]">
        © 2026 CampusOne • Unified Digital Campus Platform • All Rights Reserved
      </div>
    </div>
  );
}
