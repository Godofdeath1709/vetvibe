'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/common/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8]">
      {/* Top Institutional Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-[#99004d] text-white flex items-center justify-center font-bold text-base shadow-xs">
                C1
              </div>
              <span className="font-bold text-slate-900 text-sm tracking-tight">CampusOne</span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-600 font-medium">Privacy Policy</span>
          </div>

          <Link
            href="/login"
            className="text-xs font-semibold text-[#99004d] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portal</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded border border-slate-300 shadow-2xs p-6 sm:p-10 space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* Header Block */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-2 text-[#99004d] font-bold text-xs uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>CampusOne Data Governance</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: September 2026 • Last Reviewed: September 26, 2026
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">1. Scope of This Policy</h2>
            <p>
              This Privacy Policy explains how CampusOne (the &ldquo;Platform&rdquo;) handles student, faculty,
              and administrative information within this prototype deployment. The application functions as a
              centralized campus management interface for academic records, service requests, attendance, and fee status.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">2. Information Handled by the Platform</h2>
            <p>
              The platform processes the following categories of information to provide functional campus services:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>Academic Records:</strong> Course enrolments, subject attendance hours, internal marks, and exam grades.
              </li>
              <li>
                <strong>Service Requests and Grievances:</strong> Ticket titles, room locations, descriptions, and lifecycle tracking statuses.
              </li>
              <li>
                <strong>Campus Outpass and Leave Data:</strong> Destination, outing timestamps, stated reasons, and class advisor approvals.
              </li>
              <li>
                <strong>Fee Assessment and Receipts:</strong> Fee heads, assessed balances, transaction reference numbers, and simulated payment receipts.
              </li>
              <li>
                <strong>Authentication Identifiers:</strong> Register numbers, faculty identifiers, role designations, and session tokens.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">3. Session Storage and Local Data</h2>
            <p>
              In this prototype implementation, user authentication state, role permissions, and active tickets
              are stored in the browser&apos;s local storage and session storage. No third-party behavioral trackers,
              marketing analytics pixels, or commercial advertising cookies are deployed on this platform.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">4. Role-Based Access Controls</h2>
            <p>
              Access to information is strictly restricted based on authenticated roles:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Students may access only their individual profile, attendance, grades, and service tickets.</li>
              <li>Faculty members may view assigned class rosters, mark attendance, enter marks, and sanction leave.</li>
              <li>Administrators have oversight of university-wide ticket routing, certificate generation, and departmental operations.</li>
            </ul>
          </section>

          {/* Section 5 - Placeholders for Production Deployment */}
          <section className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded">
            <h2 className="text-sm font-bold text-slate-900">
              5. Production Deployment Notices (Institutional Placeholders)
            </h2>
            <p className="text-[11px] text-slate-600">
              Before full institutional rollout, the following legal disclosures must be finalized by the university legal counsel:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-slate-500 font-semibold">Institutional Legal Entity: </span>
                <span className="font-mono text-slate-800">[Insert University Legal Name Here]</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Data Protection Officer: </span>
                <span className="font-mono text-slate-800">[Insert DPO Name &amp; Contact Here]</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Registered Campus Address: </span>
                <span className="font-mono text-slate-800">[Insert Physical Campus Address Here]</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Applicable Jurisdiction: </span>
                <span className="font-mono text-slate-800">[Insert State / National Jurisdiction Here]</span>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">6. Contact Information</h2>
            <p>
              For inquiries regarding data records, access rights, or administrative ticket corrections:
            </p>
            <div className="p-3 bg-white border border-slate-200 rounded text-[11px] text-slate-600">
              <div><strong>Campus Help Desk:</strong> helpdesk@campusone.edu.in</div>
              <div><strong>Office of the Registrar:</strong> registrar@campusone.edu.in</div>
              <div><strong>Internal Control:</strong> +91 422 268 5000</div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
