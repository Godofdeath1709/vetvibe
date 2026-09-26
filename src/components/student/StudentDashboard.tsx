'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import {
  User,
  CreditCard,
  KeyRound,
  Wrench,
  AlertTriangle,
  Download,
  FileText,
  ShieldAlert,
  Clock,
  Calendar,
  Award,
  GraduationCap,
  RotateCcw,
  MessageSquare,
  ClipboardList,
  CheckSquare,
  FileCheck,
  Ticket,
  Bell,
  BookOpen,
  Building,
  Bus,
  Phone,
  ChevronRight,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

// Sub-sections
import ProfileSection from './sections/ProfileSection';
import AttendanceSection from './sections/AttendanceSection';
import MarksSection from './sections/MarksSection';
import ComplaintsSection from './sections/ComplaintsSection';
import PaymentsSection from './sections/PaymentsSection';
import GatePassSection from './sections/GatePassSection';
import ServicesSection from './sections/ServicesSection';
import TimetableSection from './sections/TimetableSection';
import CertificatesSection from './sections/CertificatesSection';
import DownloadsSection from './sections/DownloadsSection';
import LeaveSection from './sections/LeaveSection';
import EventsSection from './sections/EventsSection';
import NoticesSection from './sections/NoticesSection';
import AwardsSection from './sections/AwardsSection';
import IncidentsSection from './sections/IncidentsSection';
import RefundSection from './sections/RefundSection';
import FeedbackSection from './sections/FeedbackSection';
import HostelTransportSection from './sections/HostelTransportSection';

export default function StudentDashboard() {
  const {
    currentProfile,
    attendance,
    complaints,
    feeSummary,
    events,
    notices,
    activeTab,
    setActiveTab,
  } = useCampus();

  // Exactly 24 Student Services Modules matching Reference Screenshot
  const serviceTiles = [
    // Row 1
    { id: 'profile', label: 'PROFILE', icon: User, code: '01' },
    { id: 'payments', label: 'PAYMENTS', icon: CreditCard, code: '02' },
    { id: 'gatepass', label: 'GATE PASS', icon: KeyRound, code: '03' },
    { id: 'services', label: 'SERVICES', icon: Wrench, code: '04' },
    { id: 'complaints', label: 'COMPLAINTS', icon: AlertTriangle, code: '05' },
    { id: 'downloads', label: 'DOWNLOADS', icon: Download, code: '06' },

    // Row 2
    { id: 'downloads', label: 'DOCUMENTS', icon: FileText, code: '07' },
    { id: 'incidents', label: 'INCIDENTS', icon: ShieldAlert, code: '08' },
    { id: 'attendance', label: 'ATTENDANCE', icon: Clock, code: '09' },
    { id: 'leave', label: 'LEAVE', icon: Calendar, code: '10' },
    { id: 'awards', label: 'AWARDS', icon: Award, code: '11' },
    { id: 'timetable', label: 'TIMETABLE', icon: Clock, code: '12' },

    // Row 3
    { id: 'marks', label: 'MARKS', icon: GraduationCap, code: '13' },
    { id: 'refund', label: 'REFUND', icon: RotateCcw, code: '14' },
    { id: 'feedback', label: 'COURSE FEEDBACK', icon: MessageSquare, code: '15' },
    { id: 'feedback', label: 'TLP FEEDBACK', icon: ClipboardList, code: '16' },
    { id: 'feedback', label: 'EXIT SURVEY', icon: CheckSquare, code: '17' },
    { id: 'certificates', label: 'CERTIFICATES', icon: FileCheck, code: '18' },

    // Row 4
    { id: 'events', label: 'EVENTS', icon: Ticket, code: '19' },
    { id: 'notices', label: 'NOTICES', icon: Bell, code: '20' },
    { id: 'marks', label: 'ACADEMICS', icon: BookOpen, code: '21' },
    { id: 'hostel_transport', label: 'HOSTEL', icon: Building, code: '22' },
    { id: 'hostel_transport', label: 'TRANSPORT', icon: Bus, code: '23' },
    { id: 'hostel_transport', label: 'HELP DESK', icon: Phone, code: '24' },
  ];

  // Render individual sub-sections when user navigates away from 'dashboard'
  const renderSectionContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'payments':
      case 'fees':
        return <PaymentsSection />;
      case 'gatepass':
        return <GatePassSection />;
      case 'services':
        return <ServicesSection />;
      case 'complaints':
      case 'requests':
        return <ComplaintsSection />;
      case 'attendance':
        return <AttendanceSection />;
      case 'marks':
      case 'academics':
        return <MarksSection />;
      case 'timetable':
        return <TimetableSection />;
      case 'certificates':
        return <CertificatesSection />;
      case 'downloads':
      case 'documents':
        return <DownloadsSection />;
      case 'leave':
        return <LeaveSection />;
      case 'events':
        return <EventsSection />;
      case 'notices':
        return <NoticesSection />;
      case 'awards':
        return <AwardsSection />;
      case 'incidents':
        return <IncidentsSection />;
      case 'refund':
        return <RefundSection />;
      case 'feedback':
        return <FeedbackSection />;
      case 'hostel_transport':
      case 'hostel':
      case 'transport':
      case 'helpdesk':
        return <HostelTransportSection />;
      default:
        return null;
    }
  };

  const isSubSectionActive = activeTab !== 'dashboard';

  // Schedule rows matching Reference Screenshot
  const todayClasses = [
    {
      time: '09:00 - 10:00',
      code: 'CS201',
      title: 'Cryptography & Network Security',
      venue: 'AB 204',
      faculty: 'Dr. Priya Menon',
      status: 'Active',
      statusType: 'active',
    },
    {
      time: '10:15 - 11:15',
      code: 'CS204',
      title: 'Computer Networks Protocols',
      venue: 'Lab 3',
      faculty: 'Prof. K. Sharma',
      status: 'Scheduled',
      statusType: 'scheduled',
    },
    {
      time: '11:30 - 12:30',
      code: 'MA202',
      title: 'Discrete Mathematical Structures',
      venue: 'AB-102',
      faculty: 'Dr. R. Iyer',
      status: 'Scheduled',
      statusType: 'scheduled',
    },
    {
      time: '02:00 - 04:00',
      code: 'CS208',
      title: 'Cyber Security Lab (Practical B2)',
      venue: 'CyberLab 1',
      faculty: 'Dr. Priya Menon / TA',
      status: 'Lab',
      statusType: 'lab',
    },
  ];

  // Announcements matching Reference Screenshot
  const announcementsList = [
    {
      id: 'ann-1',
      tags: [
        { label: 'URGENT', color: 'bg-red-50 text-red-700 border-red-200' },
        { label: 'EXAM', color: 'bg-pink-50 text-[#99004d] border-pink-200' },
      ],
      date: '25 Sep 2026',
      title: 'Mid-Semester Examinations Schedule & Seating Arrangements - October 2026',
      office: 'Office of the Controller of Examinations (CoE)',
    },
    {
      id: 'ann-2',
      tags: [{ label: 'HOSTEL', color: 'bg-blue-50 text-blue-700 border-blue-200' }],
      date: '24 Sep 2026',
      title: 'Hostel Maintenance Schedule for Water Dispensers & Filter Change',
      office: 'Chief Warden Office, Hostels & Residential Affairs',
    },
    {
      id: 'ann-3',
      tags: [{ label: 'ACADEMIC', color: 'bg-slate-100 text-slate-700 border-slate-200' }],
      date: '22 Sep 2026',
      title: 'Smart India Hackathon 2026 - Internal University Idea Screening',
      office: 'Dean (Academics & Research)',
    },
    {
      id: 'ann-4',
      tags: [{ label: 'LIBRARY', color: 'bg-slate-100 text-slate-700 border-slate-200' }],
      date: '20 Sep 2026',
      title: 'Digital Library Access Credentials Update for IEEE Xplore & ACM',
      office: 'University Central Library Directorate',
    },
  ];

  return (
    <div className="space-y-3.5">
      {/* Breadcrumb if inside an active sub-section */}
      {isSubSectionActive && (
        <div className="flex items-center space-x-2 text-xs text-slate-600 bg-white p-2.5 rounded-[3px] border border-[#D9DEE7] shadow-2xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-[#99004d] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Academic Dashboard</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-[#182033] uppercase tracking-wide">
            {activeTab}
          </span>
        </div>
      )}

      {/* Render sub-section if active, otherwise render the main dashboard view */}
      {isSubSectionActive ? (
        renderSectionContent()
      ) : (
        <>
          {/* ============================================================== */}
          {/* 1. STUDENT INFORMATION HEADER (Matching Reference Screenshot)  */}
          {/* ============================================================== */}
          <div className="bg-white p-3.5 rounded-[3px] border border-[#D9DEE7] shadow-2xs">
            {/* Top row: Greeting & Date / Teaching Day */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold text-[#182033]">
                  Good Morning, <span className="text-[#99004d]">Ashwanth</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-[#FDF2F7] text-[#99004d] border border-[#F7C6DC] rounded-[2px]">
                  STUDENT
                </span>
              </div>

              <div className="text-left sm:text-right text-[11px] text-slate-600">
                <div className="font-bold text-slate-800">Saturday, 26 September 2026</div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                  Odd Sem 2026-27 | Teaching Day: 48/90
                </div>
              </div>
            </div>

            {/* Second row: Student details line & Roll No box */}
            <div className="text-xs text-slate-600 font-medium mt-2 flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900">Ashwanth Ravichandran</span>
              <span className="text-slate-300">•</span>
              <span>B.Tech Cyber Security (4 Year UG)</span>
              <span className="text-slate-300">•</span>
              <span>Year II / Semester III</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-[11px]">
                <span>Roll No:</span>
                <span className="font-mono bg-blue-50/60 text-[#17233C] px-1.5 py-0.2 rounded-[2px] border border-blue-200 font-semibold">
                  25107
                </span>
              </span>
            </div>

            {/* Third row: 6 Compact ERP Information Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 mt-3 pt-3 border-t border-slate-100">
              <div className="p-2 bg-white rounded-[3px] border border-[#D9DEE7]">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  PERMANENT REG NO
                </div>
                <div className="text-xs font-bold font-mono text-[#182033] mt-0.5 truncate">
                  CB.EN.U4CYB24042
                </div>
              </div>

              <div className="p-2 bg-white rounded-[3px] border border-[#D9DEE7]">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  FACULTY ADVISOR
                </div>
                <div className="text-xs font-bold text-[#182033] mt-0.5 truncate">
                  Dr. Priya Menon
                </div>
              </div>

              <div className="p-2 bg-white rounded-[3px] border border-[#D9DEE7]">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  CLASS SECTION / BATCH
                </div>
                <div className="text-xs font-bold text-[#182033] mt-0.5 truncate">
                  Section B (Batch 2024)
                </div>
              </div>

              <div className="p-2 bg-white rounded-[3px] border border-[#D9DEE7]">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  ENROLLED COURSES
                </div>
                <div className="text-xs font-bold text-[#182033] mt-0.5 truncate">
                  5 Theory + 2 Practical
                </div>
              </div>

              <div className="p-2 bg-white rounded-[3px] border border-[#D9DEE7]">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  HOSTEL / DAY SCHOLAR
                </div>
                <div className="text-xs font-bold text-[#182033] mt-0.5 truncate">
                  Ganga Hostel (Rm 304)
                </div>
              </div>

              <div className="p-2 bg-white rounded-[3px] border border-[#D9DEE7]">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                  ACADEMIC STANDING
                </div>
                <div className="text-xs font-bold text-[#137333] mt-0.5 flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block shrink-0"></span>
                  <span>Active / Regular</span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 2. SUMMARY PANELS (4 Cards matching Reference Screenshot)      */}
          {/* ============================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {/* Card 1: Attendance Status */}
            <div className="bg-white p-3 rounded-[3px] border border-[#D9DEE7] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-bold uppercase tracking-wider text-[10px]">
                    ATTENDANCE STATUS
                  </span>
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono text-slate-900">89.4%</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] rounded-[2px]">
                    ≥ 75% Safe
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">5 of 5 Courses Above Threshold</span>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className="font-bold text-[#99004d] hover:underline cursor-pointer"
                >
                  View Sheet
                </button>
              </div>
            </div>

            {/* Card 2: Pending Requests */}
            <div className="bg-white p-3 rounded-[3px] border border-[#D9DEE7] border-l-4 border-l-amber-500 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-bold uppercase tracking-wider text-[10px]">
                    PENDING REQUESTS
                  </span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono text-slate-900">2</span>
                  <span className="text-xs font-bold text-amber-600">Active In-Progress</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">1 Wi-Fi Ticket • 1 Gate Pass Req</span>
                <button
                  onClick={() => setActiveTab('complaints')}
                  className="font-bold text-[#99004d] hover:underline cursor-pointer"
                >
                  Track
                </button>
              </div>
            </div>

            {/* Card 3: Fee Status (Odd Sem) */}
            <div className="bg-white p-3 rounded-[3px] border border-[#D9DEE7] border-l-4 border-l-[#B0004B] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-bold uppercase tracking-wider text-[10px]">
                    FEE STATUS (ODD SEM)
                  </span>
                  <CreditCard className="w-3.5 h-3.5 text-[#B0004B]" />
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono text-[#B0004B]">₹25,000</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-red-100 text-red-700 border border-red-200 rounded-[2px]">
                    PENDING
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Due Date: 15 Oct 2026</span>
                <button
                  onClick={() => setActiveTab('payments')}
                  className="font-bold text-[#99004d] hover:underline cursor-pointer"
                >
                  Pay Challan
                </button>
              </div>
            </div>

            {/* Card 4: Next Academic Event */}
            <div className="bg-white p-3 rounded-[3px] border border-[#D9DEE7] border-l-4 border-l-blue-600 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-bold uppercase tracking-wider text-[10px]">
                    NEXT ACADEMIC EVENT
                  </span>
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="mt-1 leading-tight">
                  <div className="text-sm font-bold text-slate-900 truncate">Mid-Semester Exam</div>
                  <div className="text-xs font-bold text-blue-600 mt-0.5">12 October 2026 (Mon)</div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Hall Ticket: Available</span>
                <button
                  onClick={() => alert('Hall Ticket downloaded for Mid-Semester Exam October 2026.')}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3. STUDENT SERVICES DIRECTORY (24 Rectangular Grid Modules)    */}
          {/* ============================================================== */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-1.5 h-3.5 bg-[#99004d] rounded-[1px]"></span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#182033]">
                  STUDENT SERVICES DIRECTORY
                </h2>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-600 border border-slate-200 rounded-[2px] hidden sm:inline">
                  24 MODULES ACCESSIBLE
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Updated today at 09:30 AM</span>
            </div>

            {/* 6 Columns on Desktop matching Reference Screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5">
              {serviceTiles.map((tile, idx) => {
                const Icon = tile.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(tile.id)}
                    className="p-2.5 bg-white border border-[#D9DEE7] hover:border-[#99004d] hover:bg-[#FDF2F7]/50 rounded-[3px] text-left flex items-center justify-between group cursor-pointer transition shadow-2xs"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-[2px] bg-slate-50 border border-slate-200 group-hover:border-[#F7C6DC] group-hover:bg-white text-slate-700 group-hover:text-[#99004d] flex items-center justify-center transition shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-[#182033] group-hover:text-[#99004d] tracking-tight truncate">
                          {tile.label}
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                          MOD-{tile.code}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#99004d] transition shrink-0 ml-1" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* 4. TODAY'S CLASS SCHEDULE & LIVE ANNOUNCEMENTS (Two Columns)   */}
          {/* ============================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 pt-1">
            {/* Left Column: Today's Class Schedule (7 cols ~ 58%) */}
            <div className="lg:col-span-7 bg-white rounded-[3px] border border-[#D9DEE7] shadow-2xs flex flex-col justify-between overflow-hidden">
              <div>
                {/* Section Header */}
                <div className="p-3 bg-[#F8FAFC] border-b border-[#D9DEE7] flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-1.5 h-3.5 bg-[#99004d] rounded-[1px]"></span>
                    <h3 className="text-xs font-bold text-[#17233C] uppercase tracking-wide">
                      TODAY&apos;S CLASS SCHEDULE{' '}
                      <span className="text-[10px] text-slate-500 font-normal lowercase">
                        (Saturday, 26 Sep 2026)
                      </span>
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-slate-100 text-slate-600 border border-slate-200 rounded-[2px]">
                    ODD SEM REGULAR
                  </span>
                </div>

                {/* Table View matching Reference Screenshot */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-600 border-b border-[#D9DEE7]">
                        <th className="py-2 px-3">TIME</th>
                        <th className="py-2 px-2.5">CODE</th>
                        <th className="py-2 px-3">COURSE TITLE</th>
                        <th className="py-2 px-2.5">VENUE</th>
                        <th className="py-2 px-3">FACULTY</th>
                        <th className="py-2 px-2.5">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[11px]">
                      {todayClasses.map((cls, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                            {cls.time}
                          </td>
                          <td className="py-2.5 px-2.5 font-bold font-mono text-slate-900 whitespace-nowrap">
                            {cls.code}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-[#182033]">
                            {cls.title}
                          </td>
                          <td className="py-2.5 px-2.5 font-mono text-slate-600 whitespace-nowrap">
                            {cls.venue}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                            {cls.faculty}
                          </td>
                          <td className="py-2.5 px-2.5 whitespace-nowrap">
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-[2px] ${
                                cls.statusType === 'active'
                                  ? 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]'
                                  : cls.statusType === 'lab'
                                  ? 'bg-[#E8F0FE] text-[#1A73E8] border border-blue-200'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {cls.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table Footer */}
              <div className="p-2.5 bg-[#F8FAFC] border-t border-[#D9DEE7] flex justify-between items-center text-[10px] text-slate-500">
                <span>Faculty Advisor Consulting Hours: 04:00 PM - 05:00 PM</span>
                <button
                  onClick={() => setActiveTab('timetable')}
                  className="font-bold text-[#99004d] hover:underline cursor-pointer"
                >
                  Weekly Timetable Matrix →
                </button>
              </div>
            </div>

            {/* Right Column: Live Campus Announcements (5 cols ~ 42%) */}
            <div className="lg:col-span-5 bg-white rounded-[3px] border border-[#D9DEE7] shadow-2xs flex flex-col justify-between overflow-hidden">
              <div>
                {/* Header */}
                <div className="p-3 bg-[#F8FAFC] border-b border-[#D9DEE7] flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-1.5 h-3.5 bg-[#99004d] rounded-[1px]"></span>
                    <h3 className="text-xs font-bold text-[#17233C] uppercase tracking-wide">
                      LIVE CAMPUS ANNOUNCEMENTS
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('notices')}
                    className="text-[11px] font-bold text-[#99004d] hover:underline cursor-pointer"
                  >
                    Notice Board →
                  </button>
                </div>

                {/* Announcement Items matching Reference Screenshot */}
                <div className="divide-y divide-slate-100">
                  {announcementsList.map((ann) => (
                    <div
                      key={ann.id}
                      onClick={() => setActiveTab('notices')}
                      className="p-2.5 hover:bg-slate-50 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-1.5">
                          {ann.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`px-1.5 py-0.2 rounded-[2px] border text-[9px] font-bold ${tag.color}`}
                            >
                              {tag.label}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                          {ann.date}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-[#182033] hover:text-[#99004d] transition line-clamp-1 mt-1">
                        {ann.title}
                      </h4>

                      <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {ann.office}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Archive Link */}
              <div className="p-2.5 bg-[#F8FAFC] border-t border-[#D9DEE7] text-center">
                <button
                  onClick={() => setActiveTab('notices')}
                  className="text-[10px] font-bold text-[#99004d] hover:underline cursor-pointer"
                >
                  View All 42 University Circulars in Central Archive →
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
