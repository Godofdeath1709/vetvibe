'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import {
  FileCheck,
  Plus,
  Clock,
  CheckCircle2,
  Download,
  AlertCircle,
  FileText,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { CertificateRequest, CertificateStatus } from '@/types';

export default function CertificatesSection() {
  const { certificates, addCertificateRequest, currentProfile } = useCampus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certType, setCertType] = useState('Bonafide Certificate');
  const [purpose, setPurpose] = useState('');
  const [previewCert, setPreviewCert] = useState<CertificateRequest | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) return;

    addCertificateRequest(certType, purpose.trim());
    setPurpose('');
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: CertificateStatus) => {
    switch (status) {
      case 'Available':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">Available to Download</span>;
      case 'Generated':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-300">Generated</span>;
      case 'Approved':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-300">Dean Approved</span>;
      case 'Verification':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-300">Under Verification</span>;
      case 'Submitted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">Submitted</span>;
    }
  };

  const workflowSteps: CertificateStatus[] = ['Submitted', 'Verification', 'Approved', 'Generated', 'Available'];

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Official Certificates & Documents Issuance
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Registrar Office
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Request digital digitally signed certificates verified with QR authentication.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Request New Certificate</span>
        </button>
      </div>

      {/* Workflow Explainer */}
      <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs">
        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#99004d]" />
          5-Stage Institutional Issuance Workflow
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-600 overflow-x-auto py-1">
          {workflowSteps.map((st, i) => (
            <div key={st} className="flex items-center space-x-1 shrink-0">
              <span className="w-4 h-4 rounded-full bg-[#99004d] text-white text-[9px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="font-semibold">{st}</span>
              {i < workflowSteps.length - 1 && <span className="text-slate-300 mx-2">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Requests Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Your Certificate Applications
          </h3>
          <span className="text-[11px] text-slate-500">{certificates.length} Total Applications</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Certificate Type</th>
                <th>Stated Purpose</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Lifecycle Progress</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c) => {
                const currentStepIdx = workflowSteps.indexOf(c.status);
                return (
                  <tr key={c.id}>
                    <td className="font-mono font-bold text-[#99004d]">{c.id}</td>
                    <td className="font-bold text-slate-800">{c.type}</td>
                    <td className="text-slate-600 max-w-xs truncate">{c.purpose}</td>
                    <td className="text-slate-500">{c.appliedDate}</td>
                    <td>{getStatusBadge(c.status)}</td>
                    <td className="w-40">
                      <div className="flex items-center space-x-1">
                        {workflowSteps.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 flex-1 rounded ${
                              idx <= currentStepIdx ? 'bg-[#99004d]' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="text-right">
                      {c.status === 'Available' ? (
                        <button
                          onClick={() => setPreviewCert(c)}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-[11px] font-semibold inline-flex items-center space-x-1 transition"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download PDF</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Processing</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to Request Certificate */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in duration-100">
            <div className="p-4 bg-[#99004d] text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Request Academic Certificate</h3>
                <p className="text-[11px] text-pink-100">Academic Section & Registrar Office</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-pink-200 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Certificate Category
                </label>
                <select
                  value={certType}
                  onChange={(e) => setCertType(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
                >
                  <option value="Bonafide Certificate">Bonafide Certificate</option>
                  <option value="Course Completion Verification">Course Completion Verification</option>
                  <option value="No Dues Institutional Certificate">No Dues Institutional Certificate</option>
                  <option value="Character & Conduct Certificate">Character & Conduct Certificate</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Detailed Purpose / Addressed To
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. State Bank of India for Education Loan Renewal / Passport Application / Internship Visa..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 focus:outline-hidden focus:border-[#99004d]"
                />
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600">
                Official certificates are stamped with a verification QR code and registrar signature. Turnaround: 24 to 48 hours.
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-lg overflow-hidden p-6 space-y-4 text-xs font-serif">
            <div className="text-center border-b-2 border-[#99004d] pb-4">
              <div className="text-base font-bold text-[#99004d] uppercase tracking-wider font-sans">
                CAMPUS ONE UNIVERSITY
              </div>
              <div className="text-xs text-slate-600 uppercase font-sans tracking-wide">
                Office of the Registrar • Dean of Academic Affairs
              </div>
              <div className="text-sm font-bold text-slate-900 uppercase underline mt-2 font-sans">
                {previewCert.type}
              </div>
            </div>

            <div className="space-y-3 leading-relaxed text-slate-800 text-xs">
              <p>
                This is to officially certify that <strong>{currentProfile.name}</strong>, Roll
                Number <strong>{currentProfile.rollNo || '25107'}</strong>, is a bonafide student
                of this University pursuing <strong>{currentProfile.program}</strong> in the{' '}
                {currentProfile.department}.
              </p>
              <p>
                He/She is currently studying in <strong>{currentProfile.semester} ({currentProfile.year})</strong> during the
                Academic Year 2026–2027.
              </p>
              <p>
                This certificate is issued on student request for the stated purpose of{' '}
                <em>&ldquo;{previewCert.purpose}&rdquo;</em>.
              </p>
            </div>

            <div className="pt-6 flex justify-between items-end border-t border-slate-200 font-sans text-[11px]">
              <div>
                <div className="font-bold text-slate-800">Date of Issue: {previewCert.completedDate || '12 Sep 2026'}</div>
                <div className="text-slate-400">Ref: {previewCert.id}</div>
              </div>
              <div className="text-right">
                <div className="w-24 border-b border-slate-400 mb-1"></div>
                <div className="font-bold text-slate-900">Dr. K. Sankaran</div>
                <div className="text-slate-500">Registrar, CampusOne</div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 font-sans">
              <button
                onClick={() => setPreviewCert(null)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Certificate ${previewCert.id} downloaded successfully.`);
                  setPreviewCert(null);
                }}
                className="px-3 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
