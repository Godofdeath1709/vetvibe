'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import Footer from '@/components/common/Footer';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8]">
      {/* Top Header */}
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
            <span className="text-xs text-slate-600 font-medium">Terms and Conditions</span>
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

      {/* Main Terms Document */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded border border-slate-300 shadow-2xs p-6 sm:p-10 space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* Header Block */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-2 text-[#99004d] font-bold text-xs uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" />
              <span>Campus Information System</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Terms and Conditions of Use
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: September 2026 • Version 1.0 (Institutional Prototype)
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By signing in to and accessing CampusOne (the &ldquo;Platform&rdquo;), students, faculty members,
              and administrative staff agree to comply with these Terms and Conditions and the university&apos;s
              acceptable use policies.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">2. Account Responsibility and Credentials</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their institutional credentials (Register Number,
              Faculty ID, Admin ID, and passwords). Any action initiated through an authenticated session is attributed to
              the registered account holder.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Do not share account credentials with other students or external parties.</li>
              <li>Notify the University IT Helpdesk immediately if unauthorized access is suspected.</li>
              <li>Always sign out of shared computer terminals located in campus libraries and laboratories.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">3. Acceptable Use of Campus Services</h2>
            <p>
              The platform must be used solely for legitimate academic, residential, and administrative functions.
              Prohibited conduct includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Submitting fraudulent service requests, false grievances, or unauthorized outpass applications.</li>
              <li>Attempting to bypass role-based route permissions or access administrative control panels.</li>
              <li>Using automated scraping tools or scripts against the campus portal.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">4. User-Submitted Information and Requests</h2>
            <p>
              Information submitted via service tickets, certificate requests, incident reports, and feedback forms
              must be truthful and accurate. Academic integrity standards and student conduct regulations apply to all
              electronic submissions.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">5. Service Requests and Response Times</h2>
            <p>
              Service ticket response times and resolution SLAs are target estimates provided for operational coordination.
              Emergency safety incidents should also be reported directly to the Campus Security Control Room.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">6. Platform Availability and Maintenance</h2>
            <p>
              While reasonable efforts are made to ensure continuous access, the platform may experience scheduled
              maintenance windows or temporary interruptions. Scheduled downtimes are notified via campus circulars.
            </p>
          </section>

          {/* Section 7 - Placeholders */}
          <section className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded">
            <h2 className="text-sm font-bold text-slate-900">
              7. Legal &amp; Institutional Placeholders
            </h2>
            <p className="text-[11px] text-slate-600">
              Official university administration must supply the following details prior to full production binding:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-slate-500 font-semibold">Governing Body: </span>
                <span className="font-mono text-slate-800">[Insert Academic Council / University Name]</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Statutory Authority: </span>
                <span className="font-mono text-slate-800">[Insert UGC / AICTE / State Act Ref]</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Dispute Resolution Forum: </span>
                <span className="font-mono text-slate-800">[Insert City / Jurisdiction Court]</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Registrar Office Contact: </span>
                <span className="font-mono text-slate-800">[Insert Official Registrar Phone/Email]</span>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">8. Changes to Terms</h2>
            <p>
              The university administration reserves the right to modify these terms as platform capabilities and
              statutory requirements evolve. Continued use of the platform following updates constitutes agreement.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900">9. Contact Information</h2>
            <p>
              Questions regarding these terms should be directed to the Office of the Registrar at{' '}
              <span className="font-semibold text-slate-900">registrar@campusone.edu.in</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
