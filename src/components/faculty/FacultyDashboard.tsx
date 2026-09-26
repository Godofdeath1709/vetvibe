'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCampus } from '@/context/CampusContext';
import { useAuth } from '@/context/AuthContext';
import {
  Briefcase,
  Users,
  Clock,
  GraduationCap,
  Calendar,
  CheckCircle2,
  XCircle,
  Bell,
  MessageSquare,
  Plus,
  Send,
  Save,
  Check,
  Search,
  BookOpen,
  AlertTriangle,
  MapPin,
  Star,
  Layers,
} from 'lucide-react';
import { LeaveStatus, GatePassStatus } from '@/types';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const {
    attendance,
    updateAttendance,
    marks,
    updateMarks,
    leaves,
    updateLeaveStatus,
    gatePasses,
    updateGatePassStatus,
    notices,
    addNotice,
    complaints,
    timetable,
  } = useCampus();

  const pathname = usePathname();
  const router = useRouter();

  const [activeModule, setActiveModule] = useState<
    | 'dashboard'
    | 'classes'
    | 'attendance'
    | 'students'
    | 'marks'
    | 'leave'
    | 'feedback'
    | 'announcements'
    | 'requests'
    | 'timetable'
  >('dashboard');

  useEffect(() => {
    if (!pathname) return;
    if (pathname.includes('/classes')) setActiveModule('classes');
    else if (pathname.includes('/attendance')) setActiveModule('attendance');
    else if (pathname.includes('/students')) setActiveModule('students');
    else if (pathname.includes('/marks')) setActiveModule('marks');
    else if (pathname.includes('/leave')) setActiveModule('leave');
    else if (pathname.includes('/feedback')) setActiveModule('feedback');
    else if (pathname.includes('/announcements')) setActiveModule('announcements');
    else if (pathname.includes('/requests')) setActiveModule('requests');
    else if (pathname.includes('/timetable')) setActiveModule('timetable');
    else if (pathname === '/faculty/dashboard' || pathname === '/faculty' || pathname === '/faculty/') {
      setActiveModule('dashboard');
    }
  }, [pathname]);

  const switchModule = (mod: typeof activeModule) => {
    setActiveModule(mod);
    if (mod === 'dashboard') {
      router.push('/faculty/dashboard');
    } else {
      router.push(`/faculty/${mod}`);
    }
  };

  // Attendance marking state (simulated roster)
  const [roster, setRoster] = useState([
    { rollNo: '25107', name: 'Ashwanth R', attended: 41, total: 47, presentToday: true },
    { rollNo: '25108', name: 'Ananya Sharma', attended: 44, total: 47, presentToday: true },
    { rollNo: '25109', name: 'Gautam Menon', attended: 35, total: 47, presentToday: false },
    { rollNo: '25110', name: 'Harish V', attended: 43, total: 47, presentToday: true },
    { rollNo: '25114', name: 'Manoj Kumar', attended: 39, total: 47, presentToday: true },
    { rollNo: '25118', name: 'Sneha P', attended: 46, total: 47, presentToday: true },
  ]);
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Marks entry state
  const [editingMarks, setEditingMarks] = useState({
    rollNo: '25107',
    name: 'Ashwanth R',
    internal: 42,
    assignment: 19,
    lab: 28,
    endSem: 41,
  });
  const [marksSaved, setMarksSaved] = useState(false);

  // Post announcement state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Academic' | 'Exam' | 'Administration'>('Academic');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePosted, setNoticePosted] = useState(false);

  const handleToggleAttendance = (rollNo: string) => {
    setRoster((prev) =>
      prev.map((r) => (r.rollNo === rollNo ? { ...r, presentToday: !r.presentToday } : r))
    );
  };

  const handleSaveAttendance = () => {
    const ashwanth = roster.find((r) => r.rollNo === '25107');
    if (ashwanth) {
      const newAttended = ashwanth.presentToday ? ashwanth.attended + 1 : ashwanth.attended;
      const newTotal = ashwanth.total + 1;
      updateAttendance('21CS201', newAttended, newTotal);
    }
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 4000);
  };

  const handleSaveMarks = () => {
    updateMarks('21CS201', {
      internal: Number(editingMarks.internal),
      assignment: Number(editingMarks.assignment),
      lab: Number(editingMarks.lab),
      endSem: Number(editingMarks.endSem),
    });
    setMarksSaved(true);
    setTimeout(() => setMarksSaved(false), 4000);
  };

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;

    addNotice({
      title: noticeTitle.trim(),
      category: noticeCategory,
      publisher: `${user?.name || 'Dr. Priya Menon'} (Class Advisor)`,
      content: noticeContent.trim(),
      isUrgent: false,
    });

    setNoticeTitle('');
    setNoticeContent('');
    setNoticePosted(true);
    setTimeout(() => setNoticePosted(false), 4000);
  };

  const pendingLeaves = leaves.filter((l) => l.status === 'Pending');
  const pendingGatePasses = gatePasses.filter((g) => g.status === 'Pending');
  const pendingRequestsCount = complaints.filter((c) => c.status !== 'Closed').length;

  const todayClasses = [
    {
      time: '09:00 AM',
      subject: 'Cryptography',
      code: '21CS201',
      program: 'B.Tech Cyber Security',
      room: 'Room AB-204',
      batch: '2nd Year (Sem 4)',
      status: 'Scheduled',
    },
    {
      time: '11:00 AM',
      subject: 'Network Security',
      code: '21CS208',
      program: 'B.Tech Cyber Security',
      room: 'Room C-102',
      batch: '3rd Year (Sem 6)',
      status: 'Upcoming',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Faculty Profile Banner matching Prompt:
          CampusOne Faculty Portal
          Faculty: Dr. Priya Menon
          Faculty ID: FAC001
          Department: Computer Science
      */}
      <div className="bg-white p-4 rounded-md border border-[#D9DEE7] shadow-2xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="min-w-0">
            <div className="text-base font-bold text-[#182033] tracking-tight flex items-center gap-2">
              <span>CampusOne Faculty Portal</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#EEF4FA] text-[#17233C] border border-[#D9DEE7] rounded">
                Academic Operations
              </span>
            </div>
            <div className="text-xs text-[#667085] font-medium mt-1 flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#B0004B]">
                Faculty: {user?.name || 'Dr. Priya Menon'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-mono bg-[#F7F5F2] text-[#17233C] px-1.5 py-0.5 rounded border border-[#D9DEE7]">
                Faculty ID: {user?.identifier || 'FAC001'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[#182033] font-semibold">
                Department: {user?.department || 'Computer Science'}
              </span>
            </div>
          </div>

          <div className="text-left md:text-right text-[11px] text-[#667085] shrink-0">
            <div className="font-medium text-[#182033]">Saturday, 26 September 2026</div>
            <div className="text-[10px] text-[#667085] mt-0.5">Academic Session: Odd Sem 2026-27</div>
          </div>
        </div>

        {/* Faculty Dashboard 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#D9DEE7]">
          <button
            onClick={() => switchModule('classes')}
            className="p-3 bg-white hover:bg-[#FDF2F7]/50 hover:border-[#B0004B]/60 border border-[#D9DEE7] rounded-md text-left transition group shadow-2xs cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[#667085] uppercase block">
              Today&apos;s Classes
            </span>
            <span className="text-xl font-bold font-mono text-[#182033] mt-1 block">
              {todayClasses.length} Scheduled
            </span>
            <span className="text-[10px] text-[#B0004B] font-medium mt-0.5 block">
              Next: 09:00 AM (AB-204)
            </span>
          </button>

          <button
            onClick={() => switchModule('leave')}
            className="p-3 bg-white hover:bg-[#FDF2F7]/50 hover:border-[#B0004B]/60 border border-[#D9DEE7] rounded-md text-left transition group shadow-2xs cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[#667085] uppercase block">
              Pending Leave Requests
            </span>
            <span className="text-xl font-bold font-mono text-[#182033] mt-1 block">
              {pendingLeaves.length}
            </span>
            <span className="text-[10px] text-[#C98518] font-medium mt-0.5 block">
              Needs Advisor Sanction
            </span>
          </button>

          <button
            onClick={() => switchModule('requests')}
            className="p-3 bg-white hover:bg-[#FDF2F7]/50 hover:border-[#B0004B]/60 border border-[#D9DEE7] rounded-md text-left transition group shadow-2xs cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[#667085] uppercase block">
              Pending Service Requests
            </span>
            <span className="text-xl font-bold font-mono text-[#182033] mt-1 block">
              {pendingRequestsCount}
            </span>
            <span className="text-[10px] text-[#667085] font-medium mt-0.5 block">
              Lab & Campus Tickets
            </span>
          </button>

          <button
            onClick={() => switchModule('announcements')}
            className="p-3 bg-white hover:bg-[#FDF2F7]/50 hover:border-[#B0004B]/60 border border-[#D9DEE7] rounded-md text-left transition group shadow-2xs cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[#667085] uppercase block">
              Announcements
            </span>
            <span className="text-xl font-bold font-mono text-[#182033] mt-1 block">
              {notices.length}
            </span>
            <span className="text-[10px] text-[#667085] font-medium mt-0.5 block">
              Broadcast Department Notices
            </span>
          </button>
        </div>
      </div>

      {/* Module Selector Bar:
          My Classes, Attendance, Students, Marks, Leave Requests, Course Feedback, Announcements, Service Requests, Complaints, Timetable
      */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-md border border-[#D9DEE7] text-xs shadow-2xs">
        <button
          onClick={() => switchModule('dashboard')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'dashboard' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => switchModule('classes')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'classes' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          My Classes
        </button>
        <button
          onClick={() => switchModule('attendance')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'attendance' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Attendance
        </button>
        <button
          onClick={() => switchModule('students')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'students' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Students
        </button>
        <button
          onClick={() => switchModule('marks')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'marks' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Marks
        </button>
        <button
          onClick={() => switchModule('leave')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'leave' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Leave Requests ({pendingLeaves.length})
        </button>
        <button
          onClick={() => switchModule('feedback')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'feedback' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Course Feedback
        </button>
        <button
          onClick={() => switchModule('announcements')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'announcements' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Announcements
        </button>
        <button
          onClick={() => switchModule('requests')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'requests' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Service Requests & Complaints
        </button>
        <button
          onClick={() => switchModule('timetable')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'timetable' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Timetable
        </button>
      </div>

      {/* OVERVIEW / DASHBOARD (Shows TODAY'S CLASSES prominently as requested) */}
      {(activeModule === 'dashboard' || activeModule === 'classes') && (
        <div className="space-y-4">
          {/* TODAY'S CLASSES BOX (Required by user prompt) */}
          <div className="bg-white rounded-md border border-[#D9DEE7] overflow-hidden shadow-2xs">
            <div className="p-3 bg-[#F7F5F2] border-b border-[#D9DEE7] flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#B0004B]" />
                <h3 className="text-xs font-bold text-[#17233C] uppercase tracking-wide">
                  TODAY&apos;S CLASSES
                </h3>
              </div>
              <span className="text-[11px] text-[#667085] font-medium">Saturday Schedule</span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {todayClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between space-y-2 hover:border-[#99004d] transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold font-mono text-[#99004d] bg-pink-100 px-2 py-0.5 rounded">
                        {cls.time}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1.5">{cls.subject}</h4>
                      <p className="text-xs text-slate-600 font-medium">{cls.program} • {cls.batch}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold rounded">
                      {cls.status}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-mono font-bold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-[#99004d]" />
                      {cls.room}
                    </span>
                    <button
                      onClick={() => switchModule('attendance')}
                      className="px-2.5 py-1 bg-[#99004d] hover:bg-[#800040] text-white rounded text-[11px] font-semibold cursor-pointer"
                    >
                      Mark Attendance
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Course Modules Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono font-bold text-[#99004d] bg-pink-50 px-2 py-0.5 rounded">
                    21CS201
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    Cryptography & Network Security
                  </h3>
                  <p className="text-xs text-slate-500">B.Tech Cyber Security • 2nd Year (Sem 4)</p>
                </div>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  47 Students
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">Hours Logged</span>
                  <span className="font-bold text-slate-800">47 Conducted</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Avg Attendance</span>
                  <span className="font-bold text-emerald-700">88.2%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Assigned Venue</span>
                  <span className="font-bold text-slate-800">AB-204</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => switchModule('attendance')}
                  className="flex-1 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold text-center cursor-pointer"
                >
                  Mark Attendance
                </button>
                <button
                  onClick={() => switchModule('marks')}
                  className="flex-1 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold text-center cursor-pointer"
                >
                  Manage Marks
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono font-bold text-[#99004d] bg-pink-50 px-2 py-0.5 rounded">
                    21CS208
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    Network Security & Penetration Testing
                  </h3>
                  <p className="text-xs text-slate-500">B.Tech Cyber Security • 3rd Year (Sem 6)</p>
                </div>
                <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  42 Students
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">Hours Logged</span>
                  <span className="font-bold text-slate-800">38 Conducted</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Avg Attendance</span>
                  <span className="font-bold text-emerald-700">91.0%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Assigned Venue</span>
                  <span className="font-bold text-slate-800">Room C-102</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => switchModule('attendance')}
                  className="flex-1 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold text-center cursor-pointer"
                >
                  Mark Attendance
                </button>
                <button
                  onClick={() => switchModule('marks')}
                  className="flex-1 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold text-center cursor-pointer"
                >
                  Grade Submissions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: Attendance */}
      {activeModule === 'attendance' && (
        <div className="bg-white rounded border border-slate-200 overflow-hidden space-y-4 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-3 border-slate-200">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Daily Attendance Register: 21CS201 Cryptography
              </h3>
              <p className="text-[11px] text-slate-500">Period 1 (09:00 - 09:55 AM) • Saturday 26 Sep 2026 • Room AB-204</p>
            </div>

            <button
              onClick={handleSaveAttendance}
              className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Submit & Lock Attendance</span>
            </button>
          </div>

          {attendanceSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Attendance locked and updated in Central Student Roster!</span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left portal-table text-xs">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Cumulative Attended</th>
                  <th>Current Percentage</th>
                  <th className="text-center">Today&apos;s Status (Click to Toggle)</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((student) => {
                  const pct = Math.round((student.attended / student.total) * 100);
                  return (
                    <tr key={student.rollNo}>
                      <td className="font-mono font-bold text-slate-900">{student.rollNo}</td>
                      <td className="font-semibold text-slate-800">{student.name}</td>
                      <td className="font-mono text-slate-600">
                        {student.attended} / {student.total}
                      </td>
                      <td className="font-mono font-bold text-slate-800">{pct}%</td>
                      <td className="text-center">
                        <button
                          onClick={() => handleToggleAttendance(student.rollNo)}
                          className={`px-3 py-1 rounded text-xs font-bold transition ${
                            student.presentToday
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 border border-red-300 hover:bg-red-200'
                          }`}
                        >
                          {student.presentToday ? 'PRESENT (P)' : 'ABSENT (A)'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 3: Students */}
      {activeModule === 'students' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Class Roster & Academic Advising (B.Tech Cyber Security - Year 2)
            </h3>
            <span className="text-[11px] text-slate-500">47 Enrolled Students</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left portal-table text-xs">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Program</th>
                  <th>Attendance</th>
                  <th>Internal Mark (50)</th>
                  <th>Advisor Status</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((st) => (
                  <tr key={st.rollNo}>
                    <td className="font-mono font-bold text-[#99004d]">{st.rollNo}</td>
                    <td className="font-bold text-slate-800">{st.name}</td>
                    <td>B.Tech Cyber Security</td>
                    <td className="font-bold text-emerald-700">{Math.round((st.attended / st.total) * 100)}%</td>
                    <td className="font-mono font-bold">{st.rollNo === '25107' ? '42' : '40'}/50</td>
                    <td><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">Good Standing</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 4: Marks */}
      {activeModule === 'marks' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-4">
          <div className="border-b pb-3 border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Continuous Assessment Marks Entry: 21CS201 Cryptography
            </h3>
            <p className="text-[11px] text-slate-500">
              Enter Periodical Test, Assignment, and Lab continuous scores for student evaluation.
            </p>
          </div>

          {marksSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Marks updated for Ashwanth R. Synchronized with student grade sheet.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Internal Exam (Max 50)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={editingMarks.internal}
                onChange={(e) => setEditingMarks({ ...editingMarks, internal: Number(e.target.value) })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assignment (Max 20)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={editingMarks.assignment}
                onChange={(e) => setEditingMarks({ ...editingMarks, assignment: Number(e.target.value) })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lab Prac (Max 30)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={editingMarks.lab}
                onChange={(e) => setEditingMarks({ ...editingMarks, lab: Number(e.target.value) })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">End Sem (Max 50 scaled)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={editingMarks.endSem}
                onChange={(e) => setEditingMarks({ ...editingMarks, endSem: Number(e.target.value) })}
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded flex justify-between items-center text-xs">
            <div>
              <strong>Calculated Total:</strong>{' '}
              <span className="font-mono font-bold text-slate-900 text-sm">
                {editingMarks.internal + editingMarks.assignment + editingMarks.lab + editingMarks.endSem}
              </span>{' '}
              / 150 points
            </div>
            <button
              onClick={handleSaveMarks}
              className="px-4 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Publish Marks</span>
            </button>
          </div>
        </div>
      )}

      {/* MODULE 5: Leave Requests */}
      {activeModule === 'leave' && (
        <div className="space-y-4">
          <div className="bg-white rounded border border-slate-200 overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Student Leave Sanctions Queue ({pendingLeaves.length} Pending)
              </h3>
            </div>

            {pendingLeaves.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No student leave requests pending advisor review.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {pendingLeaves.map((l) => (
                  <div key={l.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[#99004d] text-xs">{l.id}</span>
                        <span className="font-bold text-slate-900 text-xs">{l.studentName} ({l.rollNo})</span>
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded font-medium">
                          {l.days} Day(s): {l.fromDate} to {l.toDate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">Reason: {l.reason}</p>
                    </div>

                    <div className="flex space-x-2 shrink-0">
                      <button
                        onClick={() => updateLeaveStatus(l.id, 'Approved')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Leave</span>
                      </button>
                      <button
                        onClick={() => updateLeaveStatus(l.id, 'Rejected')}
                        className="px-3 py-1.5 border border-red-300 text-red-700 hover:bg-red-50 rounded text-xs font-semibold"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 6: Course Feedback */}
      {activeModule === 'feedback' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Aggregated Course Feedback (21CS201 Cryptography)
            </h3>
            <span className="text-[11px] text-slate-500">Class Evaluation: 4.8 / 5.0</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Concept Clarity</span>
              <span className="text-xl font-bold font-mono text-[#99004d]">4.9 / 5.0</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Syllabus Coverage</span>
              <span className="text-xl font-bold font-mono text-[#99004d]">4.7 / 5.0</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Lab & Practical Guidance</span>
              <span className="text-xl font-bold font-mono text-[#99004d]">4.8 / 5.0</span>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 7: Announcements */}
      {activeModule === 'announcements' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3 text-xs">
          <div className="border-b pb-3 border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Publish Class / Department Announcement
            </h3>
            <p className="text-[11px] text-slate-500">
              Notices will appear on student dashboards and trigger portal notifications.
            </p>
          </div>

          {noticePosted && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Announcement broadcasted successfully to all enrolled students!</span>
            </div>
          )}

          <form onSubmit={handlePostNotice} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Category</label>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value as any)}
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
                >
                  <option value="Academic">Academic / Lecture Rescheduling</option>
                  <option value="Exam">Exam / Assignment Submission</option>
                  <option value="Administration">General Department Circular</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Headline / Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Cryptography Lab Quiz rescheduled"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Announcement Body</label>
              <textarea
                rows={3}
                placeholder="Type circular contents..."
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                required
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast Notice</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODULE 8: Service Requests & Complaints */}
      {activeModule === 'requests' && (
        <div className="bg-white rounded border border-slate-200 overflow-hidden space-y-3 p-4">
          <div className="border-b pb-2 border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Campus Service Requests & Lab Maintenance Tickets
            </h3>
            <span className="text-[11px] text-slate-500">{complaints.length} Total Tickets Recorded</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left portal-table text-xs">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Student Info</th>
                  <th>Category</th>
                  <th>Issue Summary</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td className="font-mono font-bold text-[#99004d]">{c.id}</td>
                    <td className="font-semibold text-slate-800">{c.studentName} ({c.rollNo})</td>
                    <td>{c.category}</td>
                    <td className="max-w-xs truncate">{c.title}</td>
                    <td className="font-bold text-slate-700">{c.priority}</td>
                    <td>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded text-[10px] border">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 9: Timetable */}
      {activeModule === 'timetable' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Faculty Weekly Schedule & Lecture Allocation
            </h3>
            <p className="text-[11px] text-slate-500">Department of Computer Science • Dr. Priya Menon</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left portal-table text-xs">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Period</th>
                  <th>Time Slot</th>
                  <th>Subject</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold text-slate-800">Monday</td>
                  <td className="font-mono text-[#99004d]">Period 1</td>
                  <td className="font-mono">09:00 - 09:55 AM</td>
                  <td className="font-semibold">Cryptography & Network Security</td>
                  <td>Room AB-204</td>
                </tr>
                <tr>
                  <td className="font-bold text-slate-800">Tuesday</td>
                  <td className="font-mono text-[#99004d]">Period 3</td>
                  <td className="font-mono">11:15 - 12:10 PM</td>
                  <td className="font-semibold">Cryptography & Network Security</td>
                  <td>Room AB-204</td>
                </tr>
                <tr>
                  <td className="font-bold text-slate-800">Thursday</td>
                  <td className="font-mono text-[#99004d]">Period 2</td>
                  <td className="font-mono">10:00 - 10:55 AM</td>
                  <td className="font-semibold">Cryptography & Network Security</td>
                  <td>Room AB-204</td>
                </tr>
                <tr>
                  <td className="font-bold text-slate-800">Friday</td>
                  <td className="font-mono text-[#99004d]">Period 4</td>
                  <td className="font-mono">01:15 - 03:00 PM</td>
                  <td className="font-semibold">Cyber Lab Practicals</td>
                  <td>Cyber Lab 2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
