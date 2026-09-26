'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace('/login');
      } else if (!allowedRoles.includes(user.role)) {
        // Redirect unauthorized role to their respective dashboard
        if (user.role === 'student') router.replace('/student/dashboard');
        else if (user.role === 'faculty') router.replace('/faculty/dashboard');
        else if (user.role === 'admin') router.replace('/admin/dashboard');
        else router.replace('/login');
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded bg-[#99004d] text-white flex items-center justify-center font-bold text-2xl shadow-sm border border-[#800040] animate-pulse">
          C1
        </div>
        <div className="mt-3 text-xs font-semibold text-slate-700 tracking-wide">
          Verifying Campus Authentication...
        </div>
        <div className="text-[11px] text-slate-400 mt-1">CampusOne Security Checkpoint</div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
