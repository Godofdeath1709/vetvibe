'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import { DoorOpen, Plus, Clock, CheckCircle2, XCircle, AlertCircle, Send, QrCode } from 'lucide-react';
import { GatePass, GatePassStatus } from '@/types';

export default function GatePassSection() {
  const { gatePasses, addGatePass, currentProfile } = useCampus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState('26 Sep 2026');
  const [outTime, setOutTime] = useState('05:30 PM');
  const [expectedReturn, setExpectedReturn] = useState('08:30 PM');
  const [destination, setDestination] = useState('');
  const [reason, setReason] = useState('');
  const [activeQR, setActiveQR] = useState<GatePass | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || !reason.trim()) return;

    addGatePass({
      date,
      outTime,
      expectedReturn,
      destination,
      reason,
    });

    setDestination('');
    setReason('');
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: GatePassStatus) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Approved
          </span>
        );
      case 'Pending':
        return (
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-300 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending Approval
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-700 border border-red-300 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Hostel Outing & Gate Pass Management
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Hostel: {currentProfile.hostel || 'Agastya Bhavan'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit outpass requests for town outings, emergency medical visits, and academic travel.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Apply For Gate Pass</span>
        </button>
      </div>

      {/* Gate Pass History Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Recent Gate Pass Applications
          </h3>
          <span className="text-[11px] text-slate-500">Security Checkpoint Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Pass ID</th>
                <th>Date of Outing</th>
                <th>Out Time</th>
                <th>Expected Return</th>
                <th>Destination</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Approver / Remarks</th>
                <th className="text-right">Pass QR</th>
              </tr>
            </thead>
            <tbody>
              {gatePasses.map((gp) => (
                <tr key={gp.id}>
                  <td className="font-mono font-bold text-[#99004d]">{gp.id}</td>
                  <td className="text-slate-700 font-medium">{gp.date}</td>
                  <td className="font-mono text-slate-600">{gp.outTime}</td>
                  <td className="font-mono text-slate-600">{gp.expectedReturn}</td>
                  <td className="font-semibold text-slate-800">{gp.destination}</td>
                  <td className="text-slate-600 max-w-xs truncate">{gp.reason}</td>
                  <td>{getStatusBadge(gp.status)}</td>
                  <td className="text-slate-500 text-[11px]">{gp.approvedBy || 'Pending Advisor Review'}</td>
                  <td className="text-right">
                    {gp.status === 'Approved' ? (
                      <button
                        onClick={() => setActiveQR(gp)}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded text-[11px] font-semibold inline-flex items-center gap-1"
                      >
                        <QrCode className="w-3 h-3" />
                        <span>Security QR</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px]">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Gate Pass Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in duration-100">
            <div className="p-4 bg-[#99004d] text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Apply Gate Pass / Outpass</h3>
                <p className="text-[11px] text-pink-100">Campus Security & Warden Approval</p>
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
                <label className="block font-semibold text-slate-700 mb-1">Outing Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Out Time</label>
                  <input
                    type="text"
                    value={outTime}
                    onChange={(e) => setOutTime(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expected Return</label>
                  <input
                    type="text"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded p-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Coimbatore Railway Station, Town Hospital..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Reason</label>
                <textarea
                  rows={3}
                  placeholder="Provide specific purpose of leaving campus..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600">
                Outpass will be logged at Main Security Gate upon scanning biometric / QR code. Curfew: 09:00 PM.
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
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gate Pass QR Display Modal */}
      {activeQR && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-sm overflow-hidden text-center p-6 space-y-4">
            <div className="text-center">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                OFFICIAL APPROVED GATE PASS
              </span>
              <div className="text-lg font-bold font-mono text-[#99004d] mt-1">{activeQR.id}</div>
              <p className="text-xs text-slate-500">{activeQR.destination}</p>
            </div>

            <div className="w-44 h-44 mx-auto bg-slate-50 border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-2">
              <QrCode className="w-32 h-32 text-slate-800" />
              <span className="text-[10px] text-slate-400 font-mono mt-1">Scan at North/South Gate</span>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <div>
                <strong>Student:</strong> {activeQR.studentName} ({activeQR.rollNo})
              </div>
              <div>
                <strong>Valid Out:</strong> {activeQR.outTime} | <strong>Return:</strong> {activeQR.expectedReturn}
              </div>
              <div className="text-[11px] text-emerald-800 font-medium">
                Approved by: {activeQR.approvedBy}
              </div>
            </div>

            <button
              onClick={() => setActiveQR(null)}
              className="w-full py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-semibold"
            >
              Close Gate Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
