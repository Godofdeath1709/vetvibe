'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RootIndexPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace('/login');
      } else {
        router.replace(`/${user.role}/dashboard`);
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center p-4">
      <div className="w-12 h-12 rounded bg-[#99004d] text-white flex items-center justify-center font-bold text-2xl shadow-sm border border-[#800040] animate-pulse">
        C1
      </div>
      <div className="mt-3 text-xs font-semibold text-slate-700 tracking-wide">
        Connecting to CampusOne Gateway...
      </div>
    </div>
  );
}
