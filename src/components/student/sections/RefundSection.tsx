'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import { CreditCard, Plus, Clock, CheckCircle2, Send } from 'lucide-react';
import { RefundRequest } from '@/types';

export default function RefundSection() {
  const { refunds, addRefundRequest } = useCampus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('Caution Deposit Adjustment');
  const [amount, setAmount] = useState(2500);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    addRefundRequest(category, Number(amount), note.trim());
    setNote('');
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: RefundRequest['status']) => {
    switch (status) {
      case 'Credited':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">Credited</span>;
      case 'Approved':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-300">Approved</span>;
      case 'Processing':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-300">In Verification</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Fee Refunds & Caution Deposit Settlement
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Finance Office
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Claim refunds for exam revaluations, mess rebate adjustments, and excess fee deposits.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Claim Refund</span>
        </button>
      </div>

      {/* Refunds Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Refund Application History
          </h3>
          <span className="text-[11px] text-slate-500">{refunds.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Refund ID</th>
                <th>Category</th>
                <th>Claim Amount</th>
                <th>Applied Date</th>
                <th>Reason / Finance Notes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((r) => (
                <tr key={r.id}>
                  <td className="font-mono font-bold text-[#99004d]">{r.id}</td>
                  <td className="font-semibold text-slate-800">{r.category}</td>
                  <td className="font-mono font-bold text-slate-900">₹{r.amount.toLocaleString('en-IN')}</td>
                  <td className="text-slate-500">{r.appliedDate}</td>
                  <td className="text-slate-600 max-w-sm truncate">{r.note}</td>
                  <td>{getStatusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in duration-100">
            <div className="p-4 bg-[#99004d] text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Claim Fee Refund</h3>
                <p className="text-[11px] text-pink-100">Finance & Fee Accounts Review</p>
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
                <label className="block font-semibold text-slate-700 mb-1">Refund Head</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
                >
                  <option value="Caution Deposit Adjustment">Hostel Caution Deposit Settlement</option>
                  <option value="Exam Revaluation Fee Refund">Exam Revaluation Revised Grade Refund</option>
                  <option value="Sports Mess Rebate">Sports Tournament Mess Rebate</option>
                  <option value="Excess Payment Adjustment">Excess Tuition Fee Settlement</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Claim Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Explanation & Transaction Ref</label>
                <textarea
                  rows={3}
                  placeholder="State transaction reference and basis for refund claim..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
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
                  <span>Submit Claim</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
