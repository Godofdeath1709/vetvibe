'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import {
  AlertTriangle,
  Plus,
  CheckCircle2,
  Clock,
  Building,
  User,
  Check,
  ChevronRight,
  ShieldAlert,
  Send,
  Filter,
} from 'lucide-react';
import { Complaint, ComplaintStatus } from '@/types';

export default function ComplaintsSection() {
  const { complaints, addComplaint, currentProfile } = useCampus();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(complaints[0] || null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // New complaint form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Complaint['category']>('Hostel');
  const [priority, setPriority] = useState<Complaint['priority']>('Medium');
  const [description, setDescription] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newId = addComplaint({
      category,
      title,
      description,
      priority,
    });

    setTitle('');
    setDescription('');
    setIsSubmitModalOpen(false);
    setSuccessToast(`Complaint logged successfully with ID: ${newId}`);

    // Auto-select the newly created complaint so user sees the visual status tracker immediately!
    const newlyCreated = complaints.find((c) => c.id === newId) || {
      id: newId,
      studentName: currentProfile.name,
      rollNo: currentProfile.rollNo || '25107',
      category,
      title,
      description,
      priority,
      status: 'Submitted' as ComplaintStatus,
      createdAt: 'Just now',
      updatedAt: 'Just now',
      steps: [
        {
          title: 'Submitted by Student',
          timestamp: 'Just now',
          actor: currentProfile.name,
          note: 'Issue logged via Student Portal',
          status: 'completed',
        },
        {
          title: 'Department Assignment',
          timestamp: 'Pending desk assignment',
          status: 'current',
        },
        {
          title: 'Investigation / Technician Working',
          timestamp: 'Awaiting scheduling',
          status: 'upcoming',
        },
        {
          title: 'Resolution Verification',
          timestamp: 'Pending resolution',
          status: 'upcoming',
        },
        {
          title: 'Closed & Archived',
          timestamp: 'Pending feedback',
          status: 'upcoming',
        },
      ],
    };
    setSelectedComplaint(newlyCreated);

    setTimeout(() => {
      setSuccessToast(null);
    }, 6000);
  };

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'Submitted':
        return <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded">Submitted</span>;
      case 'Assigned':
        return <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded">Assigned</span>;
      case 'In Progress':
        return <span className="px-2 py-0.5 text-[11px] font-semibold bg-orange-50 text-orange-700 border border-orange-200 rounded">In Progress</span>;
      case 'Resolved':
        return <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">Resolved</span>;
      case 'Closed':
        return <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300 rounded">Closed</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (p: Complaint['priority']) => {
    switch (p) {
      case 'Urgent':
        return <span className="text-[10px] font-bold text-red-600 uppercase">Urgent</span>;
      case 'High':
        return <span className="text-[10px] font-bold text-amber-600 uppercase">High</span>;
      case 'Medium':
        return <span className="text-[10px] font-semibold text-slate-600 uppercase">Medium</span>;
      case 'Low':
        return <span className="text-[10px] font-normal text-slate-400 uppercase">Low</span>;
    }
  };

  const filteredComplaints = filterCategory === 'All'
    ? complaints
    : complaints.filter((c) => c.category === filterCategory);

  // Sync selectedComplaint with context complaints list updates
  const activeComplaint = complaints.find((c) => c.id === selectedComplaint?.id) || complaints[0];

  return (
    <div className="space-y-4">
      {/* Top Banner & Action */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Complaints & Service Grievances
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              {complaints.length} Total Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Log hostel, IT infrastructure, electrical, or academic grievances with end-to-end SLA tracking.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-3.5 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Lodge New Complaint</span>
        </button>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{successToast}</span>
          </div>
          <span className="text-[11px] text-emerald-700">Track status below in real-time</span>
        </div>
      )}

      {/* Filter and Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Complaint Tickets List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white rounded border border-slate-200 overflow-hidden">
            <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Your Tickets
              </span>
              <div className="flex items-center space-x-1.5">
                <Filter className="w-3 h-3 text-slate-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="text-[11px] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700"
                >
                  <option value="All">All Categories</option>
                  <option value="Hostel">Hostel</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-slate-100 max-h-[520px] overflow-y-auto">
              {filteredComplaints.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No complaints found in this category.
                </div>
              ) : (
                filteredComplaints.map((item) => {
                  const isSelected = activeComplaint?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedComplaint(item)}
                      className={`w-full text-left p-3 transition flex flex-col space-y-1.5 border-l-3 ${
                        isSelected
                          ? 'bg-[#fdf2f7] border-l-[#99004d]'
                          : 'hover:bg-slate-50 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-slate-900">
                            {item.id}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                            {item.category}
                          </span>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>

                      <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                        {item.title}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{item.createdAt}</span>
                        </div>
                        <div>{getPriorityBadge(item.priority)}</div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Request Tracker & Ticket Details (7 cols) */}
        <div className="lg:col-span-7">
          {activeComplaint ? (
            <div className="bg-white rounded border border-slate-200 overflow-hidden space-y-4">
              {/* Header Box */}
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold font-mono text-[#99004d] bg-pink-100 px-2 py-0.5 rounded">
                      {activeComplaint.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      Category: {activeComplaint.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityBadge(activeComplaint.priority)}
                    {getStatusBadge(activeComplaint.status)}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2">
                  {activeComplaint.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                  {activeComplaint.description}
                </p>

                {/* Assignment Info */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-200 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 font-medium">Assigned Department: </span>
                    <span className="font-semibold text-slate-800">
                      {activeComplaint.assignedDepartment || 'Pending Assignment'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Assigned Staff: </span>
                    <span className="font-semibold text-slate-800">
                      {activeComplaint.assignedStaff || 'Unassigned'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CRITICAL FEATURE: Visual Status Tracker */}
              <div className="p-4 pt-1">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#99004d]" />
                    Lifecycle Status Tracker
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Last Updated: {activeComplaint.updatedAt}
                  </span>
                </div>

                {/* Progress Stepper */}
                <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {activeComplaint.steps.map((step, idx) => {
                    const isDone = step.status === 'completed';
                    const isCurrent = step.status === 'current';

                    return (
                      <div key={idx} className="relative flex items-start group">
                        {/* Circle marker */}
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition ${
                            isDone
                              ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                              : isCurrent
                              ? 'bg-[#99004d] text-white ring-4 ring-pink-50 animate-pulse'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isDone ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : (
                            <span className="text-[9px]">{idx + 1}</span>
                          )}
                        </div>

                        {/* Step Details */}
                        <div className="flex-1 bg-slate-50/80 p-2.5 rounded border border-slate-200">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span
                              className={`text-xs font-semibold ${
                                isDone
                                  ? 'text-slate-900'
                                  : isCurrent
                                  ? 'text-[#99004d] font-bold'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step.title}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {step.timestamp}
                            </span>
                          </div>

                          {(step.actor || step.note) && (
                            <div className="mt-1 text-[11px] text-slate-600 flex flex-col gap-0.5">
                              {step.actor && (
                                <span className="font-medium text-slate-700">
                                  Action by: {step.actor}
                                </span>
                              )}
                              {step.note && (
                                <span className="text-slate-500 italic bg-white px-2 py-0.5 rounded border border-slate-200">
                                  &ldquo;{step.note}&rdquo;
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {activeComplaint.resolutionNotes && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded text-xs">
                    <span className="font-bold text-emerald-900">Resolution Summary: </span>
                    <span className="text-emerald-800">{activeComplaint.resolutionNotes}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded border border-slate-200 p-8 text-center text-xs text-slate-500">
              Select a complaint ticket to inspect its live status track.
            </div>
          )}
        </div>
      </div>

      {/* Lodging New Complaint Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in duration-100">
            <div className="p-4 bg-[#99004d] text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Lodge New Campus Complaint</h3>
                <p className="text-[11px] text-pink-100">
                  Ticket will be assigned to relevant university department within 2 hours.
                </p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-pink-200 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Department Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 focus:outline-hidden focus:border-[#99004d]"
                  >
                    <option value="Hostel">Hostel & Accommodation</option>
                    <option value="IT Support">IT & Network Services</option>
                    <option value="Infrastructure">Infrastructure & Civil Works</option>
                    <option value="Academic">Academic Affairs</option>
                    <option value="Transport">Campus Bus / Transport</option>
                    <option value="Finance">Finance & Fee Accounts</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 focus:outline-hidden focus:border-[#99004d]"
                  >
                    <option value="Low">Low (General Query)</option>
                    <option value="Medium">Medium (Routine Maintenance)</option>
                    <option value="High">High (Impacting Studies/Living)</option>
                    <option value="Urgent">Urgent (Immediate Hazard)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Issue Summary / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Hostel Wi-Fi not working on 3rd floor"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 focus:outline-hidden focus:border-[#99004d]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Detailed Description & Specific Location
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide exact room number, block, symptoms, and since when the issue started..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 focus:outline-hidden focus:border-[#99004d]"
                />
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600">
                <strong>Student Roster Info:</strong> {currentProfile.name} (Roll: {currentProfile.rollNo || '25107'}) | Hostel: {currentProfile.hostel}
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
