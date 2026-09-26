'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Footer from '@/components/common/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8] justify-between">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-[#99004d] text-white flex items-center justify-center font-bold text-base shadow-xs">
              C1
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">CampusOne</span>
          </Link>
          <Link
            href="/login"
            className="text-xs font-semibold text-[#99004d] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Login</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded border border-slate-300 p-8 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded bg-pink-50 border border-pink-200 text-[#99004d] mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>

          <div>
            <div className="font-mono text-2xl font-bold text-[#99004d]">404</div>
            <h1 className="text-base font-bold text-slate-900 mt-1">Page Not Found</h1>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              The requested campus module or record does not exist or may have been moved.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold shadow-xs transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Campus Portal</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
