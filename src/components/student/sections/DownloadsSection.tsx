'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import { Download, FileText, CheckCircle2, Eye, ShieldCheck, Calendar } from 'lucide-react';

interface DocumentItem {
  id: string;
  name: string;
  category: string;
  date: string;
  fileSize: string;
  docCode: string;
  description: string;
}

export default function DownloadsSection() {
  const { currentProfile } = useCampus();
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const documents: DocumentItem[] = [
    {
      id: 'doc-1',
      name: 'Bonafide Certificate',
      category: 'Registrar Issuance',
      date: '12 Sep 2026',
      fileSize: '342 KB',
      docCode: 'CERT-2026-081',
      description: 'Digitally signed official proof of enrollment for academic year 2026-27.',
    },
    {
      id: 'doc-2',
      name: 'Odd Semester Fee Receipt',
      category: 'Finance & Accounts',
      date: '12 Aug 2026',
      fileSize: '185 KB',
      docCode: 'REC-2026-90412',
      description: 'Verified tax payment acknowledgment for Tuition Fee (₹95,000).',
    },
    {
      id: 'doc-3',
      name: 'Digital Student Identity Card',
      category: 'Administration',
      date: '01 Jul 2026',
      fileSize: '512 KB',
      docCode: 'IDC-25107',
      description: 'Digital Smart ID with barcode for campus library, RFID gates, and buses.',
    },
    {
      id: 'doc-4',
      name: 'Semester 3 Grade Transcript / Result',
      category: 'Controller of Exams',
      date: '15 Jan 2026',
      fileSize: '420 KB',
      docCode: 'RES-SEM3-25107',
      description: 'Official university transcript detailing courses, credits, and SGPA 9.25.',
    },
    {
      id: 'doc-5',
      name: 'Institutional No Dues Certificate',
      category: 'Clearance Desk',
      date: '10 Aug 2026',
      fileSize: '210 KB',
      docCode: 'ND-2026-AUG',
      description: 'Departmental clearance covering Library, Labs, Sports, and Hostel.',
    },
    {
      id: 'doc-6',
      name: 'Official Attendance Report (Current Sem)',
      category: 'Academic Section',
      date: '26 Sep 2026',
      fileSize: '160 KB',
      docCode: 'ATT-2026-S4',
      description: 'Course-wise attended hours summary for mid-term exam clearance.',
    },
  ];

  const handleDownload = (doc: DocumentItem) => {
    setDownloadToast(`Downloaded: ${doc.name} (${doc.docCode}.pdf)`);
    setTimeout(() => setDownloadToast(null), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Official University Downloads & Digital Records
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Verified Documents
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Download institutional letters, fee receipts, identity cards, and exam transcripts.
          </p>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tamper-evident Digital Signatures</span>
        </div>
      </div>

      {downloadToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{downloadToast}</span>
          </div>
          <span className="text-[11px] text-emerald-700">Saved to Downloads folder</span>
        </div>
      )}

      {/* Documents Grid / Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Available Institutional Certificates & Reports
          </h3>
          <span className="text-[11px] text-slate-500">{documents.length} Records</span>
        </div>

        <div className="divide-y divide-slate-100">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-3.5 hover:bg-slate-50 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-[#fdf2f7] border border-[#fbcfe8] text-[#99004d] shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                      {doc.docCode}
                    </span>
                    <span className="text-[10px] bg-pink-50 text-[#99004d] px-1.5 py-0.2 rounded font-medium">
                      {doc.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{doc.description}</p>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-1">
                    <span>Issued: {doc.date}</span>
                    <span>•</span>
                    <span>File Size: {doc.fileSize}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">Ready</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(doc)}
                className="px-3.5 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition shrink-0 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
