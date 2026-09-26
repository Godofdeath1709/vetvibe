'use client';

import React from 'react';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import GlobalSearchModal from '@/components/common/GlobalSearchModal';
import CampusAssistant from '@/components/common/CampusAssistant';

interface PortalShellProps {
  children: React.ReactNode;
}

export default function PortalShell({ children }: PortalShellProps) {
  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col text-[#182033]">
      {/* 1. Very Top Navy Bar & 2. Main White Header */}
      <Header />

      {/* Row: Left Persistent Sidebar + Right Main Content */}
      <div className="flex-1 flex w-full">
        {/* 3. Left Academic Navigation Sidebar */}
        <Sidebar />

        {/* 4. Main Content Column with Natural Page Scrolling */}
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 w-full max-w-[1420px] mx-auto p-3 sm:p-4 lg:p-5">
            {children}
          </main>

          {/* 5. Institutional Footer */}
          <Footer />
        </div>
      </div>

      <GlobalSearchModal />
      <CampusAssistant />
    </div>
  );
}
