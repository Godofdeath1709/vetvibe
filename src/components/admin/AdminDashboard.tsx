'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCampus } from '@/context/CampusContext';
import { useAuth } from '@/context/AuthContext';
import {
  Shield,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building,
  CreditCard,
  FileCheck,
  Bell,
  Download,
  Filter,
  ArrowRight,
  Edit,
  X,
  UserCheck,
  Send,
  Layers,
  Calendar,
  DollarSign,
  BookOpen,
} from 'lucide-react';
import { Complaint, ComplaintStatus, CertificateStatus } from '@/types';

export default function AdminDashboard() {
  const { user } = useAuth();
  const {
    complaints,
    updateComplaintStatus,
    certificates,
    updateCertificateStatus,
    feeSummary,
    notices,
    events,
  } = useCampus();

  const pathname = usePathname();
  const router = useRouter();

  const [activeModule, setActiveModule] = useState<
    | 'dashboard'
    | 'students'
    | 'faculty'
    | 'departments'
    | 'services'
    | 'complaints'
    | 'certificates'
    | 'payments'
    | 'events'
    | 'announcements'
    | 'reports'
  >('complaints');

  useEffect(() => {
    if (!pathname) return;
    if (pathname.includes('/students')) setActiveModule('students');
    else if (pathname.includes('/faculty')) setActiveModule('faculty');
    else if (pathname.includes('/departments')) setActiveModule('departments');
    else if (pathname.includes('/certificates')) setActiveModule('certificates');
    else if (pathname.includes('/payments') || pathname.includes('/finance')) setActiveModule('payments');
    else if (pathname.includes('/events')) setActiveModule('events');
    else if (pathname.includes('/announcements')) setActiveModule('announcements');
    else if (pathname.includes('/reports')) setActiveModule('reports');
    else if (pathname.includes('/complaints') || pathname.includes('/requests') || pathname.includes('/services')) setActiveModule('complaints');
    else if (pathname === '/admin/dashboard' || pathname === '/admin' || pathname === '/admin/') {
      setActiveModule('complaints');
    }
  }, [pathname]);

  const switchModule = (mod: typeof activeModule) => {
    setActiveModule(mod);
    const targetRoute = mod === 'complaints' || mod === 'dashboard' ? 'dashboard' : mod;
    router.push(`/admin/${targetRoute}`);
  };

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Edit ticket state for the DEMO FLOW
  const [targetStatus, setTargetStatus] = useState<ComplaintStatus>('In Progress');
  const [targetDepartment, setTargetDepartment] = useState('IT Support Services');
  const [targetStaff, setTargetStaff] = useState('K. Senthil (Senior Network Engineer)');
  const [resolutionNote, setResolutionNote] = useState('Inspected access point AP-3E; rebooted controller and validated 100Mbps uplink.');
  const [actionSuccessToast, setActionSuccessToast] = useState<string | null>(null);

  const openTicketManager = (comp: Complaint) => {
    setSelectedComplaint(comp);
    setTargetStatus(comp.status === 'Submitted' ? 'In Progress' : comp.status);
    setTargetDepartment(comp.assignedDepartment || 'IT Support Services');
    setTargetStaff(comp.assignedStaff || 'K. Senthil (Senior Network Engineer)');
    setResolutionNote(comp.resolutionNotes || 'Technician dispatched to site location.');
  };

  const handleApplyUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    updateComplaintStatus(
      selectedComplaint.id,
      targetStatus,
      targetDepartment,
      targetStaff,
      resolutionNote
    );

    setActionSuccessToast(
      `Ticket ${selectedComplaint.id} status updated to "${targetStatus}" (Assigned: ${targetDepartment}). Student notification dispatched!`
    );
    setSelectedComplaint(null);
    setTimeout(() => setActionSuccessToast(null), 6000);
  };

  // Exact KPI metrics as requested in the specification:
  // Total Students: 12,482
  // Faculty: 734
  // Pending Requests: 128
  // Open Complaints: 37
  const totalStudents = 12482;
  const totalFaculty = 734;
  const pendingRequestsCount = 128;
  const openComplaintsCount = 37;

  return (
    <div className="space-y-4">
      {/* Admin Executive Header matching Prompt:
          CampusOne
          Administration Portal
          Admin: Administrator
          ADMIN001
      */}
      <div className="bg-white p-4 rounded-md border border-[#D9DEE7] shadow-2xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="min-w-0">
            <div className="text-base font-bold text-[#182033] tracking-tight flex items-center gap-2">
              <span>CampusOne Administration Portal</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#EEF4FA] text-[#17233C] border border-[#D9DEE7] rounded">
                Executive Desk
              </span>
            </div>
            <div className="text-xs text-[#667085] font-medium mt-1 flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#B0004B]">
                Admin: {user?.name || 'Administrator'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-mono bg-[#F7F5F2] text-[#17233C] px-1.5 py-0.5 rounded border border-[#D9DEE7]">
                {user?.identifier || 'ADMIN001'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[#182033] font-semibold">Central Administrative Console</span>
            </div>
          </div>

          <div className="text-left md:text-right text-[11px] text-[#667085] shrink-0">
            <div className="font-medium text-[#182033]">Saturday, 26 September 2026</div>
            <div className="text-[10px] text-[#667085] mt-0.5">Academic Session: Odd Sem 2026-27</div>
          </div>
        </div>

        {/* 4 Summary Stat Cards matching Prompt Specifications:
            Total Students: 12,482
            Faculty: 734
            Pending Requests: 128
            Open Complaints: 37
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#D9DEE7]">
          <button
            onClick={() => switchModule('students')}
            className="p-3 bg-white hover:bg-[#FDF2F7]/50 hover:border-[#B0004B]/60 border border-[#D9DEE7] rounded-md text-left transition group shadow-2xs cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[#667085] uppercase block">
              Total Students
            </span>
            <span className="text-2xl font-bold font-mono text-[#182033] mt-1 block">
              {totalStudents.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-[#667085] mt-0.5 block">Undergraduate & Postgrad</span>
          </button>

          <button
            onClick={() => switchModule('faculty')}
            className="p-3 bg-white hover:bg-[#FDF2F7]/50 hover:border-[#B0004B]/60 border border-[#D9DEE7] rounded-md text-left transition group shadow-2xs cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[#667085] uppercase block">
              Faculty
            </span>
            <span className="text-2xl font-bold font-mono text-[#182033] mt-1 block">
              {totalFaculty}
            </span>
            <span className="text-[10px] text-[#667085] mt-0.5 block">14 Departments</span>
          </button>

          <button
            onClick={() => switchModule('complaints')}
            className="p-3 bg-white hover:bg-[#FDF2F7]/50 hover:border-[#B0004B]/60 border border-[#D9DEE7] rounded-md text-left transition group shadow-2xs cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[#C98518] uppercase block">
              Pending Requests
            </span>
            <span className="text-2xl font-bold font-mono text-[#C98518] mt-1 block">
              {pendingRequestsCount}
            </span>
            <span className="text-[10px] text-[#667085] font-medium mt-0.5 block">
              Awaiting Desk Assignment
            </span>
          </button>

          <button
            onClick={() => switchModule('complaints')}
            className="p-3 bg-white hover:bg-[#FDF2F7]/50 hover:border-[#B0004B]/60 border border-[#D9DEE7] rounded-md text-left transition group shadow-2xs cursor-pointer"
          >
            <span className="text-[10px] font-semibold text-[#C94B4B] uppercase block">
              Open Complaints
            </span>
            <span className="text-2xl font-bold font-mono text-[#C94B4B] mt-1 block">
              {openComplaintsCount}
            </span>
            <span className="text-[10px] text-[#667085] font-medium mt-0.5 block">
              Active SLA Tickets
            </span>
          </button>
        </div>
      </div>

      {/* Demo Action Toast Banner */}
      {actionSuccessToast && (
        <div className="p-3 bg-[#EEF4FA] border border-[#D9DEE7] rounded-md text-xs text-[#17233C] flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0" />
            <span className="font-semibold">{actionSuccessToast}</span>
          </div>
          <span className="text-[11px] text-[#2E7D5B] font-medium">
            Student portal now displays updated status
          </span>
        </div>
      )}

      {/* Main Admin Modules Selector Bar:
          Students, Faculty, Departments, Service Requests, Complaints, Certificates, Payments, Events, Announcements, Reports
      */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-md border border-[#D9DEE7] text-xs shadow-2xs">
        <button
          onClick={() => switchModule('complaints')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'complaints' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Complaints & Requests ({complaints.length})
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
          onClick={() => switchModule('faculty')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'faculty' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Faculty
        </button>
        <button
          onClick={() => switchModule('departments')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'departments' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Departments
        </button>
        <button
          onClick={() => switchModule('certificates')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'certificates' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Certificates ({certificates.length})
        </button>
        <button
          onClick={() => switchModule('payments')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'payments' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => switchModule('events')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'events' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Events
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
          onClick={() => switchModule('reports')}
          className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
            activeModule === 'reports' ? 'bg-[#B0004B] text-white shadow-2xs' : 'text-[#182033] hover:bg-[#F3F5F7]'
          }`}
        >
          Reports
        </button>
      </div>

      {/* MODULE 1: COMPLAINTS & REQUEST MANAGEMENT TABLE (Primary Demo Feature) */}
      {(activeModule === 'complaints' || activeModule === 'services') && (
        <div className="bg-white rounded border border-slate-200 overflow-hidden space-y-4">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#99004d]" />
                University Service Orders & Complaint Dispatch Console
              </h3>
              <p className="text-[11px] text-slate-500">
                Click <strong>&ldquo;Manage / Dispatch&rdquo;</strong> to assign department, change status (Pending → Assigned → In Progress → Resolved → Closed), and test real-time synchronization.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded">
              {complaints.length} Managed Tickets
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left portal-table text-xs">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Student Info</th>
                  <th>Department / Category</th>
                  <th>Summary / Problem</th>
                  <th>Priority</th>
                  <th>Assigned Desk & Staff</th>
                  <th>Current Status</th>
                  <th className="text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="font-mono font-bold text-[#99004d] text-xs">{item.id}</td>
                    <td>
                      <div className="font-bold text-slate-900">{item.studentName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Roll: {item.rollNo}</div>
                    </td>
                    <td>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="max-w-xs">
                      <div className="font-semibold text-slate-800 line-clamp-1">{item.title}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{item.description}</div>
                    </td>
                    <td>
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          item.priority === 'Urgent'
                            ? 'text-red-600'
                            : item.priority === 'High'
                            ? 'text-amber-600'
                            : 'text-slate-600'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="text-[11px]">
                      <div className="font-medium text-slate-800">
                        {item.assignedDepartment || 'Unassigned'}
                      </div>
                      <div className="text-slate-400">{item.assignedStaff || 'Pending tech'}</div>
                    </td>
                    <td>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === 'Resolved' || item.status === 'Closed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            : item.status === 'In Progress'
                            ? 'bg-orange-50 text-orange-700 border border-orange-300 animate-pulse'
                            : item.status === 'Assigned'
                            ? 'bg-amber-50 text-amber-700 border border-amber-300'
                            : 'bg-blue-50 text-blue-700 border border-blue-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => openTicketManager(item)}
                        className="px-3 py-1 bg-[#99004d] hover:bg-[#800040] text-white rounded text-[11px] font-semibold transition inline-flex items-center space-x-1 shadow-2xs"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Manage / Dispatch</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 2: STUDENTS */}
      {activeModule === 'students' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              University Enrolled Student Master Directory
            </h3>
            <span className="text-[11px] text-slate-500">12,482 Active Enrolments</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left portal-table text-xs">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Program & Year</th>
                  <th>Hostel Residence</th>
                  <th>Attendance</th>
                  <th>Fees Status</th>
                  <th>Academic Standing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono font-bold text-[#99004d]">25107</td>
                  <td className="font-bold text-slate-900">Ashwanth R</td>
                  <td>B.Tech Cyber Security (2nd Year)</td>
                  <td>Agastya Bhavan, Room 304</td>
                  <td className="font-bold text-emerald-700">87.2%</td>
                  <td>{feeSummary.outstanding === 0 ? 'Clear (Paid)' : '₹25,000 Pending'}</td>
                  <td><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">Good Standing (SGPA 9.25)</span></td>
                </tr>
                <tr>
                  <td className="font-mono font-bold text-slate-800">25108</td>
                  <td className="font-bold text-slate-900">Ananya Sharma</td>
                  <td>B.Tech Cyber Security (2nd Year)</td>
                  <td>Gargi Bhavan, Room 210</td>
                  <td className="font-bold text-emerald-700">93.5%</td>
                  <td>Clear (Paid)</td>
                  <td><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[10px]">Dean&apos;s Honor List</span></td>
                </tr>
                <tr>
                  <td className="font-mono font-bold text-slate-800">25114</td>
                  <td className="font-bold text-slate-900">Manoj Kumar</td>
                  <td>B.Tech Cyber Security (2nd Year)</td>
                  <td>Agastya Bhavan, Room 108</td>
                  <td className="font-bold text-slate-700">81.0%</td>
                  <td>Clear (Paid)</td>
                  <td><span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded text-[10px]">Sports Quota</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 3: FACULTY */}
      {activeModule === 'faculty' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              University Faculty & Staff Roster
            </h3>
            <span className="text-[11px] text-slate-500">734 Academic Staff</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left portal-table text-xs">
              <thead>
                <tr>
                  <th>Faculty ID</th>
                  <th>Faculty Name</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Assigned Courses</th>
                  <th>Cabin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono font-bold text-[#99004d]">FAC001</td>
                  <td className="font-bold text-slate-900">Dr. Priya Menon</td>
                  <td>Associate Professor & Class Advisor</td>
                  <td>Computer Science</td>
                  <td>Cryptography, Network Security</td>
                  <td>AB-2 204</td>
                </tr>
                <tr>
                  <td className="font-mono font-bold text-slate-800">FAC002</td>
                  <td className="font-bold text-slate-900">Prof. K. Narayanan</td>
                  <td>Professor & HOD</td>
                  <td>Computer Science</td>
                  <td>Operating Systems & Kernels</td>
                  <td>AB-3 101</td>
                </tr>
                <tr>
                  <td className="font-mono font-bold text-slate-800">FAC003</td>
                  <td className="font-bold text-slate-900">Dr. S. Meenakshi</td>
                  <td>Associate Professor</td>
                  <td>Computer Science</td>
                  <td>Database Management Systems</td>
                  <td>AB-3 205</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 4: DEPARTMENTS */}
      {activeModule === 'departments' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              University Academic & Administrative Departments
            </h3>
            <span className="text-[11px] text-slate-500">14 Core Departments</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { name: 'Computer Science & Engineering', head: 'Prof. K. Narayanan', faculty: 64, students: 980 },
              { name: 'Cyber Security Systems', head: 'Dr. Radhika M', faculty: 32, students: 480 },
              { name: 'Artificial Intelligence & Data', head: 'Dr. T. Venkatraman', faculty: 48, students: 720 },
              { name: 'Hostel & Housing Administration', head: 'Chief Warden Office', staff: 55, capacity: '4,200 beds' },
              { name: 'IT Support & Campus Network', head: 'Network Operation Center', staff: 28, uptime: '99.8%' },
              { name: 'Finance & Accounts Division', head: 'V. Ramanathan (Accounts Officer)', staff: 22, collections: '₹84.2 Cr' },
            ].map((d, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
                <div className="font-bold text-slate-900">{d.name}</div>
                <div className="text-[11px] text-slate-500">Head: {d.head}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 5: CERTIFICATES */}
      {activeModule === 'certificates' && (
        <div className="bg-white rounded border border-slate-200 overflow-hidden space-y-4">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Official Certificates Clearance & Digital Signatures
            </h3>
            <span className="text-[11px] text-slate-500">{certificates.length} Total Applications</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left portal-table text-xs">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Student Info</th>
                  <th>Certificate Type</th>
                  <th>Stated Purpose</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th className="text-right">Clearance Action</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((c) => (
                  <tr key={c.id}>
                    <td className="font-mono font-bold text-[#99004d]">{c.id}</td>
                    <td className="font-bold text-slate-800">Ashwanth R (25107)</td>
                    <td className="font-semibold text-slate-800">{c.type}</td>
                    <td className="text-slate-600 max-w-xs truncate">{c.purpose}</td>
                    <td className="text-slate-500">{c.appliedDate}</td>
                    <td>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border">
                        {c.status}
                      </span>
                    </td>
                    <td className="text-right">
                      {c.status !== 'Available' ? (
                        <button
                          onClick={() => updateCertificateStatus(c.id, 'Available')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold"
                        >
                          Approve & Generate PDF
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-semibold text-[11px]">
                          Issued & Available
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 6: PAYMENTS */}
      {activeModule === 'payments' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Campus Fee Accounts & Gateway Transactions
            </h3>
            <span className="text-[11px] text-slate-500">Odd Semester Collection: 94.2%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Assessed</span>
              <span className="text-lg font-bold font-mono text-slate-900">₹84,20,00,000</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs">
              <span className="text-emerald-700 block text-[10px] uppercase font-semibold">Total Realized</span>
              <span className="text-lg font-bold font-mono text-emerald-800">₹79,31,64,000</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs">
              <span className="text-amber-700 block text-[10px] uppercase font-semibold">Outstanding Dues</span>
              <span className="text-lg font-bold font-mono text-amber-800">₹4,88,36,000</span>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 7: EVENTS */}
      {activeModule === 'events' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Campus Event Sanctions & Registrations
            </h3>
            <span className="text-[11px] text-slate-500">{events.length} Approved Events</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {events.map((e) => (
              <div key={e.id} className="py-2.5 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900">{e.title}</span>
                  <div className="text-[11px] text-slate-500">{e.date} • {e.venue} • Capacity: {e.capacity}</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold rounded">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 8: ANNOUNCEMENTS */}
      {activeModule === 'announcements' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Institutional Circulars & CoE Bulletins
            </h3>
            <span className="text-[11px] text-slate-500">{notices.length} Active Circulars</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {notices.map((n) => (
              <div key={n.id} className="py-2.5 flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{n.title}</span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded font-mono">{n.id}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Publisher: {n.publisher} • {n.date}</div>
                </div>
                <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-semibold border border-purple-200">
                  {n.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 9: REPORTS */}
      {activeModule === 'reports' && (
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="border-b pb-2 border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Accreditation & Institutional Reports (NAAC / AICTE / NIRF)
            </h3>
            <p className="text-[11px] text-slate-500">
              Download audited compliance metrics sheets and service order turnaround summaries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
              <div className="font-bold text-slate-800">SLA Resolution Turnaround Report</div>
              <p className="text-[11px] text-slate-500">Average resolution turnaround time across IT, Hostel, and Civil departments.</p>
              <button
                onClick={() => alert('SLA Report exported as CSV.')}
                className="w-full py-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-semibold flex items-center justify-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Export SLA Report</span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
              <div className="font-bold text-slate-800">Semester Attendance Audit</div>
              <p className="text-[11px] text-slate-500">Official condonation and shortage list across all 4 years of engineering.</p>
              <button
                onClick={() => alert('Attendance Audit exported.')}
                className="w-full py-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-semibold flex items-center justify-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Export Attendance Audit</span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
              <div className="font-bold text-slate-800">Fee Accounts Reconciliation</div>
              <p className="text-[11px] text-slate-500">Detailed breakdown of collection vs outstanding balances per semester head.</p>
              <button
                onClick={() => alert('Fee Reconciliation exported.')}
                className="w-full py-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-semibold flex items-center justify-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Export Fee Ledger</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL / DRAWER: Manage Ticket (Key Demo Tool) */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in duration-100">
            {/* Modal Header */}
            <div className="p-4 bg-[#99004d] text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">
                  Service Ticket Dispatch: {selectedComplaint.id}
                </h3>
                <p className="text-[11px] text-pink-100">
                  Update department routing, assigned personnel, and workflow stage.
                </p>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-pink-200 hover:text-white font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleApplyUpdate} className="p-4 space-y-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Student Name:</span>
                  <span className="font-bold text-slate-900">
                    {selectedComplaint.studentName} (Roll: {selectedComplaint.rollNo})
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Issue Title:</span>
                  <span className="font-semibold text-slate-800">{selectedComplaint.title}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 italic">
                  &ldquo;{selectedComplaint.description}&rdquo;
                </div>
              </div>

              {/* Status Change Dropdown */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Change Lifecycle Status
                </label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value as ComplaintStatus)}
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 bg-white font-semibold"
                >
                  <option value="Pending">Pending Review</option>
                  <option value="Assigned">Assigned to Department</option>
                  <option value="In Progress">In Progress (Technician Working)</option>
                  <option value="Resolved">Resolved (Work Completed)</option>
                  <option value="Closed">Closed & Archived</option>
                </select>
              </div>

              {/* Department Routing */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Designated Department Desk
                </label>
                <select
                  value={targetDepartment}
                  onChange={(e) => setTargetDepartment(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 bg-white"
                >
                  <option value="IT Support Services">IT Support & Campus Network</option>
                  <option value="Hostel Maintenance Office">Hostel Maintenance & Plumbing</option>
                  <option value="Estate & Civil Works">Estate & Civil Infrastructure</option>
                  <option value="Finance & Accounts">Finance & Accounts Section</option>
                  <option value="Academic Section">Academic & Examination Section</option>
                  <option value="Transport Cell">Campus Transport Cell</option>
                </select>
              </div>

              {/* Staff Assignment */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Assigned Staff / Field Technician
                </label>
                <input
                  type="text"
                  value={targetStaff}
                  onChange={(e) => setTargetStaff(e.target.value)}
                  placeholder="e.g. K. Senthil (Senior Network Engineer)"
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800"
                />
              </div>

              {/* Action Note */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Action Note / Resolution Description
                </label>
                <textarea
                  rows={2}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Enter remarks visible to the student..."
                  className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-[11px] text-slate-400">
                  Triggers immediate student notification
                </span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setSelectedComplaint(null)}
                    className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply & Synchronize</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
