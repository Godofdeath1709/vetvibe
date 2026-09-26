'use client';

import React, { useState, useEffect } from 'react';
import { useCampus } from '@/context/CampusContext';
import {
  Search,
  X,
  GraduationCap,
  CreditCard,
  DoorOpen,
  AlertTriangle,
  FileCheck,
  Calendar,
  Clock,
  Download,
  Award,
  MessageSquare,
  Shield,
  FileText,
  User,
  ArrowRight,
} from 'lucide-react';

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, setActiveTab } = useCampus();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const searchableItems = [
    { id: 'attendance', title: 'Class Attendance & Subject Eligibility', category: 'Academics', icon: Clock, keywords: ['attendance', 'percentage', 'classes', 'bunk', 'crypto', 'dbms'] },
    { id: 'marks', title: 'Semester Marks, Internals & Grade Sheet', category: 'Academics', icon: GraduationCap, keywords: ['marks', 'grades', 'results', 'cgpa', 'sgpa', 'internal', 'assignment', 'end sem'] },
    { id: 'payments', title: 'Fee Payments, Due Balance & Receipts', category: 'Finance', icon: CreditCard, keywords: ['fee', 'payment', 'tuition', 'hostel fee', 'receipt', 'due', 'pay now'] },
    { id: 'gatepass', title: 'Gate Pass Outing & Day Permissions', category: 'Campus Security', icon: DoorOpen, keywords: ['gate pass', 'outing', 'permission', 'curfew', 'leave pass', 'medical'] },
    { id: 'complaints', title: 'Complaints, Greviances & Work Order Tracking', category: 'Services', icon: AlertTriangle, keywords: ['complaint', 'grievance', 'wifi', 'hostel', 'water', 'repair', 'ticket', 'track'] },
    { id: 'services', title: 'Centralized Campus Service Catalog', category: 'Services', icon: Shield, keywords: ['services', 'it support', 'hostel', 'maintenance', 'transport', 'library', 'infra'] },
    { id: 'certificates', title: 'Certificate Requests & Bonafide Issuance', category: 'Academics', icon: FileCheck, keywords: ['certificate', 'bonafide', 'no dues', 'course completion', 'character'] },
    { id: 'timetable', title: 'Weekly Lecture & Lab Timetable', category: 'Academics', icon: Calendar, keywords: ['timetable', 'schedule', 'classes', 'lecture', 'labs', 'periods', 'room'] },
    { id: 'downloads', title: 'Official Documents & Download Center', category: 'Records', icon: Download, keywords: ['download', 'documents', 'id card', 'syllabus', 'receipt', 'bonafide'] },
    { id: 'leave', title: 'Student Leave Application & Od Request', category: 'Academics', icon: FileText, keywords: ['leave', 'absence', 'sick leave', 'duty leave', 'medical'] },
    { id: 'notices', title: 'Campus Announcements & CoE Circulars', category: 'Administration', icon: FileText, keywords: ['notice', 'circular', 'announcement', 'exam', 'holidays', 'urgent'] },
    { id: 'events', title: 'Campus Events & Sports Registration', category: 'Campus Life', icon: Calendar, keywords: ['events', 'hackathon', 'football', 'symposium', 'cultural', 'registration'] },
    { id: 'incidents', title: 'Campus Incident & Safety Reporting', category: 'Security', icon: AlertTriangle, keywords: ['incident', 'security', 'safety', 'electrical', 'hazard', 'report'] },
    { id: 'feedback', title: 'Course & Faculty Feedback Survey (TLP)', category: 'Feedback', icon: MessageSquare, keywords: ['feedback', 'tlp', 'course evaluation', 'faculty rating', 'survey'] },
    { id: 'awards', title: 'Student Honors, Hackathons & Awards', category: 'Achievements', icon: Award, keywords: ['awards', 'achievements', 'hackathon', 'sports', 'ctf', 'honor roll'] },
    { id: 'refund', title: 'Fee Refund & Caution Deposit Settlement', category: 'Finance', icon: CreditCard, keywords: ['refund', 'deposit', 'caution', 'adjustment'] },
    { id: 'profile', title: 'Student Profile & Emergency Contacts', category: 'Personal', icon: User, keywords: ['profile', 'contact', 'roll number', 'hostel room', 'blood group', 'emergency'] },
  ];

  const filtered = query.trim() === ''
    ? searchableItems.slice(0, 8)
    : searchableItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-slate-200 flex items-center space-x-2 bg-slate-50">
          <Search className="w-5 h-5 text-[#99004d]" />
          <input
            type="text"
            placeholder="Type a service: attendance, fees, gate pass, complaints..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching campus service found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSearchOpen(false);
                  }}
                  className="w-full p-2.5 rounded text-left hover:bg-[#fdf2f7] hover:border-[#fbcfe8] border border-transparent transition flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded bg-slate-100 group-hover:bg-white text-slate-700 group-hover:text-[#99004d] transition border border-slate-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-[#99004d]">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#99004d] transition" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Navigate with mouse or Esc to close</span>
          <span className="font-medium text-slate-600">CampusOne Instant Index</span>
        </div>
      </div>
    </div>
  );
}
