'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import { FileText, Plus, CheckCircle2, Clock, XCircle, Send, Upload } from 'lucide-react';
import { LeaveRequest, LeaveStatus } from '@/types';

export default function LeaveSection() {
  const { leaves, addLeave, currentProfile } = useCampus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState('05 Oct 2026');
  const [toDate, setToDate] = useState('06 Oct 2026');
  const [days, setDays] = useState(2);
  const [reason, setReason] = useState('');
  const [docName, setDocName] = useState('parent_permission_letter.pdf');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    addLeave({
      fromDate,
      toDate,
      days: Number(days),
      reason,
      documentName: docName,
    });

    setReason('');
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: LeaveStatus) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
            Approved
          </span>
        );
      case 'Pending':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-300">
            Pending Approval
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-300">
            Rejected
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Student Leave & On-Duty (OD) Applications
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Class Advisor Approval
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit formal leave applications for medical reasons, family events, or technical competition OD.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Apply For Leave</span>
        </button>
      </div>

      {/* Leave Applications Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Leave History & Current Applications
          </h3>
          <span className="text-[11px] text-slate-500">{leaves.length} Applications</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>App ID</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Days</th>
                <th>Reason / Justification</th>
                <th>Document Attached</th>
                <th>Status</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l.id}>
                  <td className="font-mono font-bold text-[#99004d]">{l.id}</td>
                  <td className="text-slate-800 font-medium">{l.fromDate}</td>
                  <td className="text-slate-800 font-medium">{l.toDate}</td>
                  <td className="font-mono font-bold text-slate-700">{l.days}</td>
                  <td className="text-slate-600 max-w-xs truncate">{l.reason}</td>
                  <td>
                    {l.documentName ? (
                      <span className="text-[11px] text-blue-600 underline cursor-pointer">
                        {l.documentName}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">None</span>
                    )}
                  </td>
                  <td>{getStatusBadge(l.status)}</td>
                  <td className="text-slate-500">{l.appliedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in duration-100">
            <div className="p-4 bg-[#99004d] text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Apply Student Leave</h3>
                <p className="text-[11px] text-pink-100">Advisor & HOD Sanction</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-pink-200 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">From Date</label>
                  <input
                    type="text"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">To Date</label>
                  <input
                    type="text"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded p-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Total Days</label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason for Absence</label>
                <textarea
                  rows={3}
                  placeholder="Detail the valid reason for leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Upload Supporting Doc / Medical Slip (Simulation)
                </label>
                <div className="p-2 border border-dashed border-slate-300 rounded flex items-center justify-between text-slate-600 bg-slate-50">
                  <div className="flex items-center space-x-1.5">
                    <Upload className="w-3.5 h-3.5 text-slate-400" />
                    <span>{docName}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">Attached</span>
                </div>
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
    </div>
  );
}
