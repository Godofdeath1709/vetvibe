'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import {
  CreditCard,
  Download,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Receipt,
  X,
} from 'lucide-react';
import { PaymentTransaction } from '@/types';

export default function PaymentsSection() {
  const { feeSummary, feeBreakdowns, transactions, payFees, currentProfile } = useCampus();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState(false);

  const handleSimulatePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      payFees(feeSummary.outstanding);
      setPaymentProcessing(false);
      setIsPaymentModalOpen(false);
      setPaymentSuccessToast(true);
      setTimeout(() => setPaymentSuccessToast(false), 6000);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner with Fees KPI */}
      <div className="bg-white p-4 rounded border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Fees & Financial Accounts
              </h2>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                  feeSummary.outstanding === 0
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-amber-50 text-amber-700 border-amber-300'
                }`}
              >
                {feeSummary.outstanding === 0 ? 'All Dues Cleared' : 'Payment Due Pending'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Odd Semester 2026-27 | Student ID: {currentProfile.rollNo || '25107'} ({currentProfile.program})
            </p>
          </div>

          {feeSummary.outstanding > 0 ? (
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="px-4 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-2 transition shadow-xs"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Outstanding Dues (₹{feeSummary.outstanding.toLocaleString('en-IN')})</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Balance Outstanding</span>
            </div>
          )}
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-[11px] font-medium text-slate-500 block">Total Assessed Fees</span>
            <span className="text-lg font-bold text-slate-900 font-mono">
              ₹{feeSummary.total.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="bg-emerald-50/60 p-3 rounded border border-emerald-200">
            <span className="text-[11px] font-medium text-emerald-700 block">Total Amount Paid</span>
            <span className="text-lg font-bold text-emerald-800 font-mono">
              ₹{feeSummary.paid.toLocaleString('en-IN')}
            </span>
          </div>

          <div
            className={`p-3 rounded border ${
              feeSummary.outstanding > 0
                ? 'bg-amber-50/80 border-amber-300'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span
              className={`text-[11px] font-medium block ${
                feeSummary.outstanding > 0 ? 'text-amber-800' : 'text-slate-500'
              }`}
            >
              Outstanding Balance
            </span>
            <span
              className={`text-lg font-bold font-mono ${
                feeSummary.outstanding > 0 ? 'text-amber-900' : 'text-slate-800'
              }`}
            >
              ₹{feeSummary.outstanding.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-[11px] font-medium text-slate-500 block">Next Due Date</span>
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-1">
              <Calendar className="w-3.5 h-3.5 text-[#99004d]" />
              {feeSummary.nextDueDate}
            </span>
          </div>
        </div>
      </div>

      {paymentSuccessToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">
              Payment of ₹25,000 processed successfully! Instant receipt added to history.
            </span>
          </div>
          <span className="text-[11px] text-emerald-700">Account status updated</span>
        </div>
      )}

      {/* Fee Heads Breakdown Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Semester 4 Fee Assessment Breakdown
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Academic Year 2026-27</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Head / Description</th>
                <th>Category</th>
                <th>Assessed (₹)</th>
                <th>Paid (₹)</th>
                <th>Outstanding (₹)</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {feeBreakdowns.map((fb) => (
                <tr key={fb.id}>
                  <td className="font-semibold text-slate-800">{fb.title}</td>
                  <td>
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-600">
                      {fb.category}
                    </span>
                  </td>
                  <td className="font-mono font-medium">₹{fb.total.toLocaleString('en-IN')}</td>
                  <td className="font-mono text-emerald-700 font-medium">
                    ₹{fb.paid.toLocaleString('en-IN')}
                  </td>
                  <td
                    className={`font-mono font-semibold ${
                      fb.outstanding > 0 ? 'text-amber-700' : 'text-slate-400'
                    }`}
                  >
                    ₹{fb.outstanding.toLocaleString('en-IN')}
                  </td>
                  <td className="text-slate-500">{fb.dueDate}</td>
                  <td>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        fb.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {fb.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment & Receipts History */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt className="w-4 h-4 text-[#99004d]" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Official Payment Receipts & Bank Transactions
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            {transactions.length} Verified Receipts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Date & Time</th>
                <th>Transaction Reference</th>
                <th>Description</th>
                <th>Payment Mode</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.transactionId}>
                  <td className="font-mono font-bold text-[#99004d]">{tx.receiptNo}</td>
                  <td className="text-slate-600">{tx.date}</td>
                  <td className="font-mono text-slate-500 text-[11px]">{tx.transactionId}</td>
                  <td className="font-medium text-slate-800">{tx.description}</td>
                  <td className="text-slate-600">{tx.paymentMode}</td>
                  <td className="font-mono font-bold text-slate-900">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                      {tx.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => setSelectedReceipt(tx)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#fdf2f7] hover:border-[#fbcfe8] text-slate-700 hover:text-[#99004d] border border-slate-300 rounded text-[11px] font-semibold inline-flex items-center space-x-1 transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Now Modal Simulation */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in duration-100">
            <div className="p-4 bg-[#99004d] text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">CampusOne Online Fee Payment</h3>
                <p className="text-[11px] text-pink-100">Secure Payment Gateway Integration</p>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-pink-200 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Student Name:</span>
                  <span className="font-bold text-slate-900">{currentProfile.name}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 mt-1">
                  <span>Roll Number:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {currentProfile.rollNo || '25107'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600 mt-1">
                  <span>Head:</span>
                  <span className="font-medium text-slate-800">Hostel & Mess Term 1 Dues</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-800 text-sm">Total Payable:</span>
                  <span className="font-bold text-[#99004d] text-base font-mono">
                    ₹{feeSummary.outstanding.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Payment Method (Simulation)
                </label>
                <div className="space-y-1.5">
                  <label className="p-2 border border-[#99004d] bg-[#fdf2f7] rounded flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="paymethod" defaultChecked className="accent-[#99004d]" />
                    <span className="font-semibold text-slate-800">
                      Instant UPI / QR / NetBanking (Recommended)
                    </span>
                  </label>
                  <label className="p-2 border border-slate-200 rounded flex items-center space-x-2 cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="paymethod" className="accent-[#99004d]" />
                    <span className="text-slate-700">Debit / Credit Card (RuPay, Visa, Mastercard)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-slate-100 p-2 rounded">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-bit Bank Grade Encrypted Transaction. No extra processing fees.</span>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={paymentProcessing}
                  onClick={handleSimulatePayment}
                  className="px-4 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1.5"
                >
                  {paymentProcessing ? (
                    <span>Processing Gateway...</span>
                  ) : (
                    <>
                      <span>Pay ₹{feeSummary.outstanding.toLocaleString('en-IN')} Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View / Download Official Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in duration-100">
            <div className="p-3 bg-slate-800 text-white flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-pink-300" />
                E-Receipt Preview: {selectedReceipt.receiptNo}
              </span>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-sans">
              <div className="text-center border-b pb-3 border-slate-200">
                <div className="text-sm font-bold text-[#99004d] tracking-wide">
                  CAMPUS ONE UNIVERSITY
                </div>
                <div className="text-[11px] text-slate-500">
                  Accounts & Finance Division | Official E-Receipt
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-400">Receipt No: </span>
                  <span className="font-mono font-bold">{selectedReceipt.receiptNo}</span>
                </div>
                <div>
                  <span className="text-slate-400">Date: </span>
                  <span className="font-medium">{selectedReceipt.date}</span>
                </div>
                <div>
                  <span className="text-slate-400">Student Name: </span>
                  <span className="font-bold">{currentProfile.name}</span>
                </div>
                <div>
                  <span className="text-slate-400">Roll No: </span>
                  <span className="font-mono font-bold">{currentProfile.rollNo || '25107'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400">Transaction ID: </span>
                  <span className="font-mono font-medium">{selectedReceipt.transactionId}</span>
                </div>
              </div>

              <table className="w-full border text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b">
                    <th className="p-2">Item Description</th>
                    <th className="p-2 text-right">Amount Paid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 font-medium">{selectedReceipt.description}</td>
                    <td className="p-2 text-right font-mono font-bold">
                      ₹{selectedReceipt.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center text-emerald-800 font-semibold text-[11px]">
                Payment Status: VERIFIED & CLEARED
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Receipt ${selectedReceipt.receiptNo} saved as PDF.`);
                    setSelectedReceipt(null);
                  }}
                  className="px-3 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
