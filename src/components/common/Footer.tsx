'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-[#D9DEE7] text-slate-600 text-xs py-2.5 px-4 sm:px-6">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-2 text-[11px]">
        {/* Left: Platform Branding */}
        <div className="flex items-center space-x-2 text-slate-700">
          <div className="w-4 h-4 rounded-[2px] bg-[#99004d] text-white flex items-center justify-center font-bold text-[9px]">
            C1
          </div>
          <span className="font-bold text-[#182033]">CampusOne</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">Unified Digital Campus Platform (v4.8.2-release)</span>
        </div>

        {/* Center: Maintenance & Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-slate-500">
          <span>Maintained by Centre for University Computing & Information Services (CUCIS)</span>
          <span className="text-slate-300">•</span>
          <Link href="/privacy" className="hover:text-[#99004d] hover:underline">
            Privacy Policy
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/terms" className="hover:text-[#99004d] hover:underline">
            Terms of Usage
          </Link>
        </div>

        {/* Right: Support & Copyright */}
        <div className="flex items-center space-x-2 text-slate-500">
          <span>Support: helpdesk@campusone.edu</span>
          <span className="text-slate-300">•</span>
          <span>© 2026 CampusOne. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
