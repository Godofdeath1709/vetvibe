'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  UserRole,
  UserProfile,
  Complaint,
  ComplaintStatus,
  GatePass,
  GatePassStatus,
  LeaveRequest,
  LeaveStatus,
  AttendanceRecord,
  MarksRecord,
  FeeBreakdown,
  FeeSummary,
  PaymentTransaction,
  TimetableEntry,
  CertificateRequest,
  CertificateStatus,
  CampusNotice,
  NotificationItem,
  CampusIncident,
  CampusEvent,
  RefundRequest,
  AwardItem,
  RequestTimelineStep,
} from '@/types';
import {
  initialProfiles,
  initialComplaints,
  initialGatePasses,
  initialAttendance,
  initialMarks,
  initialFeeSummary,
  initialFeeBreakdowns,
  initialTransactions,
  initialTimetable,
  initialCertificates,
  initialNotices,
  initialNotifications,
  initialEvents,
  initialLeaves,
  initialAwards,
  initialIncidents,
  initialRefunds,
} from '@/lib/mockData';

interface CampusContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentProfile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Complaints & Requests
  complaints: Complaint[];
  addComplaint: (data: { category: Complaint['category']; title: string; description: string; priority: Complaint['priority'] }) => string;
  updateComplaintStatus: (id: string, status: ComplaintStatus, department?: string, staff?: string, note?: string) => void;
  
  // Gate Passes
  gatePasses: GatePass[];
  addGatePass: (data: { date: string; outTime: string; expectedReturn: string; destination: string; reason: string }) => string;
  updateGatePassStatus: (id: string, status: GatePassStatus, approverName?: string) => void;
  
  // Leaves
  leaves: LeaveRequest[];
  addLeave: (data: { fromDate: string; toDate: string; days: number; reason: string; documentName?: string }) => void;
  updateLeaveStatus: (id: string, status: LeaveStatus) => void;
  
  // Certificates
  certificates: CertificateRequest[];
  addCertificateRequest: (type: string, purpose: string) => void;
  updateCertificateStatus: (id: string, status: CertificateStatus) => void;
  
  // Fees & Payments
  feeSummary: FeeSummary;
  feeBreakdowns: FeeBreakdown[];
  transactions: PaymentTransaction[];
  payFees: (amount: number, categoryId?: string) => boolean;
  
  // Attendance & Marks
  attendance: AttendanceRecord[];
  updateAttendance: (code: string, attended: number, total: number) => void;
  marks: MarksRecord[];
  updateMarks: (code: string, updated: Partial<MarksRecord>) => void;
  
  // Timetable
  timetable: TimetableEntry[];
  
  // Notices & Announcements
  notices: CampusNotice[];
  addNotice: (data: Omit<CampusNotice, 'id' | 'date'>) => void;
  
  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Events
  events: CampusEvent[];
  toggleEventRegistration: (id: string) => void;
  
  // Incidents
  incidents: CampusIncident[];
  addIncident: (type: string, location: string, description: string) => void;
  
  // Awards & Refunds
  awards: AwardItem[];
  refunds: RefundRequest[];
  addRefundRequest: (category: string, amount: number, note: string) => void;

  // Search & Help Dialog states
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;

  // Sidebar state
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Helper for direct navigation
  navigateToService: (serviceKey: string) => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export function CampusProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [role, setRoleState] = useState<UserRole>(user?.role || 'student');
  const [profiles, setProfiles] = useState(initialProfiles);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  useEffect(() => {
    if (user?.role) {
      setRoleState(user.role);
    }
  }, [user]);
  
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [gatePasses, setGatePasses] = useState<GatePass[]>(initialGatePasses);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(initialLeaves);
  const [certificates, setCertificates] = useState<CertificateRequest[]>(initialCertificates);
  const [feeSummary, setFeeSummary] = useState<FeeSummary>(initialFeeSummary);
  const [feeBreakdowns, setFeeBreakdowns] = useState<FeeBreakdown[]>(initialFeeBreakdowns);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(initialTransactions);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [marks, setMarks] = useState<MarksRecord[]>(initialMarks);
  const [timetable] = useState<TimetableEntry[]>(initialTimetable);
  const [notices, setNotices] = useState<CampusNotice[]>(initialNotices);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
  const [incidents, setIncidents] = useState<CampusIncident[]>(initialIncidents);
  const [awards] = useState<AwardItem[]>(initialAwards);
  const [refunds, setRefunds] = useState<RefundRequest[]>(initialRefunds);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Load saved state on mount (Client-side only)
  useEffect(() => {
    try {
      const savedComplaints = localStorage.getItem('campusone_complaints');
      if (savedComplaints) setComplaints(JSON.parse(savedComplaints));

      const savedGatepasses = localStorage.getItem('campusone_gatepasses');
      if (savedGatepasses) setGatePasses(JSON.parse(savedGatepasses));

      const savedNotifications = localStorage.getItem('campusone_notifications');
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        if (Array.isArray(parsed)) {
          setNotifications(
            parsed.map((item: any) => ({
              ...item,
              description: item.description || item.message || '',
              message: item.description || item.message || '',
              date: item.date || item.timestamp || 'Recent',
              timestamp: item.date || item.timestamp || 'Recent',
              read: Boolean(item.read ?? item.isRead ?? false),
              isRead: Boolean(item.read ?? item.isRead ?? false),
              type: item.type || item.category || 'announcement',
              category: item.type || item.category || 'announcement',
            }))
          );
        }
      }

      const savedFeeSummary = localStorage.getItem('campusone_fee_summary');
      if (savedFeeSummary) setFeeSummary(JSON.parse(savedFeeSummary));
    } catch {
      // Ignore fallback
    }
  }, []);

  // Save to localStorage when critical entities change
  useEffect(() => {
    try {
      localStorage.setItem('campusone_complaints', JSON.stringify(complaints));
    } catch {}
  }, [complaints]);

  useEffect(() => {
    try {
      localStorage.setItem('campusone_gatepasses', JSON.stringify(gatePasses));
    } catch {}
  }, [gatePasses]);

  useEffect(() => {
    try {
      localStorage.setItem('campusone_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('campusone_fee_summary', JSON.stringify(feeSummary));
    } catch {}
  }, [feeSummary]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem('campusone_role', newRole);
    } catch {}
    // Reset to role's home view
    setActiveTab('dashboard');
  };

  const currentProfile = profiles[role] || initialProfiles.student;

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfiles((prev) => ({
      ...prev,
      [role]: { ...prev[role], ...updated },
    }));
  };

  const addNotification = (
    title: string,
    description: string,
    type: NotificationItem['type'] = 'announcement',
    linkTab?: string
  ) => {
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const newNotice: NotificationItem = {
      id: `ntf-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title,
      description,
      message: description,
      date: dateStr,
      timestamp: dateStr,
      read: false,
      isRead: false,
      type,
      category: type,
      linkTab,
    };
    setNotifications((prev) => [newNotice, ...prev]);
  };

  // Complaint Management (Core Demo Flow)
  const addComplaint = (data: {
    category: Complaint['category'];
    title: string;
    description: string;
    priority: Complaint['priority'];
  }) => {
    const newId = `CMP-${1025 + Math.floor(Math.random() * 800)}`;
    const now = new Date();
    const timeString = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    const newSteps: RequestTimelineStep[] = [
      {
        title: 'Submitted by Student',
        timestamp: timeString,
        actor: currentProfile.name,
        note: 'Issue reported via CampusOne Services',
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
    ];

    const newComplaint: Complaint = {
      id: newId,
      studentName: profiles.student.name,
      rollNo: profiles.student.rollNo || '25107',
      category: data.category,
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: 'Submitted',
      createdAt: timeString,
      updatedAt: timeString,
      steps: newSteps,
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    addNotification(
      'Complaint Logged',
      `Your complaint ${newId} (${data.title}) has been submitted successfully.`,
      'complaint',
      'complaints'
    );
    return newId;
  };

  const updateComplaintStatus = (
    id: string,
    newStatus: ComplaintStatus,
    department?: string,
    staff?: string,
    note?: string
  ) => {
    const now = new Date();
    const timeString = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        // Rebuild steps reflecting the new status
        const updatedSteps: RequestTimelineStep[] = c.steps.map((st) => ({ ...st }));

        if (newStatus === 'Assigned') {
          if (updatedSteps[1]) {
            updatedSteps[1] = {
              title: `Assigned to ${department || 'Designated Department'}`,
              timestamp: timeString,
              actor: 'Central Admin Helpdesk',
              note: staff ? `Officer in charge: ${staff}` : 'Queued for maintenance technician',
              status: 'completed',
            };
          }
          if (updatedSteps[2]) updatedSteps[2].status = 'current';
        } else if (newStatus === 'In Progress') {
          if (updatedSteps[1]) {
            updatedSteps[1] = {
              ...updatedSteps[1],
              title: `Assigned to ${department || c.assignedDepartment || 'Department Services'}`,
              status: 'completed',
            };
          }
          if (updatedSteps[2]) {
            updatedSteps[2] = {
              title: 'Technician Assigned & Working',
              timestamp: timeString,
              actor: staff || c.assignedStaff || 'Senior Field Engineer',
              note: note || 'Diagnostics in progress at site location.',
              status: 'current',
            };
          }
        } else if (newStatus === 'Resolved') {
          if (updatedSteps[1]) updatedSteps[1].status = 'completed';
          if (updatedSteps[2]) updatedSteps[2].status = 'completed';
          if (updatedSteps[3]) {
            updatedSteps[3] = {
              title: 'Work Completed & Resolved',
              timestamp: timeString,
              actor: staff || 'Field Engineer',
              note: note || 'Problem remediated. Ready for student verification.',
              status: 'completed',
            };
          }
          if (updatedSteps[4]) updatedSteps[4].status = 'current';
        } else if (newStatus === 'Closed') {
          updatedSteps.forEach((s) => (s.status = 'completed'));
          if (updatedSteps[4]) {
            updatedSteps[4] = {
              title: 'Ticket Closed & Verified',
              timestamp: timeString,
              actor: 'Administrative System',
              note: 'Service SLA met successfully.',
              status: 'completed',
            };
          }
        }

        return {
          ...c,
          status: newStatus,
          assignedDepartment: department || c.assignedDepartment,
          assignedStaff: staff || c.assignedStaff,
          updatedAt: timeString,
          resolutionNotes: note || c.resolutionNotes,
          steps: updatedSteps,
        };
      })
    );

    addNotification(
      'Complaint Update',
      `Your complaint ${id} status has been updated to "${newStatus}"${department ? ` (${department})` : ''}.`,
      'complaint',
      'complaints'
    );
  };

  // Gate Pass
  const addGatePass = (data: { date: string; outTime: string; expectedReturn: string; destination: string; reason: string }) => {
    const id = `GP-${891 + gatePasses.length}`;
    const newPass: GatePass = {
      id,
      studentName: profiles.student.name,
      rollNo: profiles.student.rollNo || '25107',
      date: data.date,
      outTime: data.outTime,
      expectedReturn: data.expectedReturn,
      destination: data.destination,
      reason: data.reason,
      status: 'Pending',
      appliedOn: 'Today, Just now',
    };
    setGatePasses((prev) => [newPass, ...prev]);
    addNotification('Gate Pass Applied', `Gate pass request ${id} for ${data.destination} submitted.`, 'gatepass', 'gatepass');
    return id;
  };

  const updateGatePassStatus = (id: string, status: GatePassStatus, approverName = 'Hostel Authority') => {
    setGatePasses((prev) =>
      prev.map((gp) => (gp.id === id ? { ...gp, status, approvedBy: `${approverName}` } : gp))
    );
    addNotification(
      'Gate Pass Status',
      `Your gate pass ${id} has been ${status.toUpperCase()} by ${approverName}.`,
      'gatepass',
      'gatepass'
    );
  };

  // Leave Requests
  const addLeave = (data: { fromDate: string; toDate: string; days: number; reason: string; documentName?: string }) => {
    const id = `LV-${402 + leaves.length}`;
    const newLeave: LeaveRequest = {
      id,
      studentName: profiles.student.name,
      rollNo: profiles.student.rollNo || '25107',
      fromDate: data.fromDate,
      toDate: data.toDate,
      days: data.days,
      reason: data.reason,
      status: 'Pending',
      appliedOn: 'Today',
      documentName: data.documentName,
    };
    setLeaves((prev) => [newLeave, ...prev]);
    addNotification('Leave Application Submitted', `Leave request for ${data.days} day(s) sent to class advisor.`, 'academic', 'leave');
  };

  const updateLeaveStatus = (id: string, status: LeaveStatus) => {
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    addNotification('Leave Application Update', `Leave request ${id} was marked as ${status}.`, 'academic', 'leave');
  };

  // Certificates
  const addCertificateRequest = (type: string, purpose: string) => {
    const id = `CERT-2026-${110 + certificates.length}`;
    const newCert: CertificateRequest = {
      id,
      type,
      purpose,
      appliedDate: 'Today',
      status: 'Submitted',
    };
    setCertificates((prev) => [newCert, ...prev]);
    addNotification('Certificate Request', `Your application for ${type} (${id}) has been submitted.`, 'academic', 'certificates');
  };

  const updateCertificateStatus = (id: string, status: CertificateStatus) => {
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              completedDate: status === 'Available' ? 'Today' : c.completedDate,
              documentUrl: status === 'Available' ? '#' : c.documentUrl,
            }
          : c
      )
    );
    addNotification('Certificate Update', `Certificate ${id} is now ${status.toUpperCase()}.`, 'academic', 'certificates');
  };

  // Fees Payment Simulation
  const payFees = (amount: number, categoryId?: string) => {
    const newOutstanding = Math.max(0, feeSummary.outstanding - amount);
    const newPaid = feeSummary.paid + amount;

    setFeeSummary({
      ...feeSummary,
      paid: newPaid,
      outstanding: newOutstanding,
      status: newOutstanding === 0 ? 'Paid' : 'Partial',
    });

    if (categoryId) {
      setFeeBreakdowns((prev) =>
        prev.map((fb) =>
          fb.id === categoryId
            ? { ...fb, paid: fb.paid + amount, outstanding: Math.max(0, fb.outstanding - amount), status: fb.outstanding - amount <= 0 ? 'Paid' : 'Partial' }
            : fb
        )
      );
    } else {
      // Clear pending items
      setFeeBreakdowns((prev) =>
        prev.map((fb) =>
          fb.status === 'Pending' ? { ...fb, paid: fb.total, outstanding: 0, status: 'Paid' } : fb
        )
      );
    }

    const newTxn: PaymentTransaction = {
      transactionId: `TXN_UPI_${Date.now().toString().slice(-9)}`,
      date: 'Today, Just now',
      amount,
      paymentMode: 'CampusOne Instant UPI / NetBanking',
      receiptNo: `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      description: 'Hostel & Mess Charges Balance Payment',
      status: 'Success',
    };

    setTransactions((prev) => [newTxn, ...prev]);
    addNotification(
      'Payment Successful',
      `Payment of ₹${amount.toLocaleString('en-IN')} received. Receipt #${newTxn.receiptNo} generated.`,
      'fee',
      'payments'
    );
    return true;
  };

  // Faculty actions
  const updateAttendance = (code: string, attended: number, total: number) => {
    setAttendance((prev) =>
      prev.map((a) =>
        a.subjectCode === code
          ? {
              ...a,
              attendedClasses: attended,
              totalClasses: total,
              percentage: Number(((attended / total) * 100).toFixed(1)),
              isEligible: (attended / total) >= 0.75,
            }
          : a
      )
    );
  };

  const updateMarks = (code: string, updated: Partial<MarksRecord>) => {
    setMarks((prev) =>
      prev.map((m) => {
        if (m.subjectCode !== code) return m;
        const merged = { ...m, ...updated };
        const total = (merged.internal || 0) + (merged.assignment || 0) + (merged.lab || 0) + (merged.endSem || 0);
        let grade = 'B';
        if (total >= 90) grade = 'O';
        else if (total >= 85) grade = 'A+';
        else if (total >= 75) grade = 'A';
        else if (total >= 65) grade = 'B+';
        else if (total >= 50) grade = 'B';
        else grade = 'RA';
        return { ...merged, total, grade };
      })
    );
  };

  // Notices
  const addNotice = (data: Omit<CampusNotice, 'id' | 'date'>) => {
    const newNotice: CampusNotice = {
      id: `NOT-2026-${Math.floor(50 + Math.random() * 40)}`,
      date: 'Today',
      ...data,
    };
    setNotices((prev) => [newNotice, ...prev]);
    addNotification('New Announcement', `${data.title} published by ${data.publisher}`, 'announcement', 'notices');
  };

  // Notifications read/unread
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true, isRead: true }))
    );
  };

  // Events
  const toggleEventRegistration = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const newState = !e.registered;
          addNotification(
            newState ? 'Event Registration Confirmed' : 'Event Registration Cancelled',
            newState
              ? `You have successfully registered for "${e.title}". Check in at ${e.venue}.`
              : `Your registration for "${e.title}" was cancelled.`,
            'academic',
            'events'
          );
          return { ...e, registered: newState };
        }
        return e;
      })
    );
  };

  // Incidents
  const addIncident = (type: string, location: string, description: string) => {
    const id = `INC-2026-${Math.floor(10 + Math.random() * 80)}`;
    const newInc: CampusIncident = {
      id,
      type,
      location,
      description,
      reportedAt: 'Today, Just now',
      status: 'Reported',
    };
    setIncidents((prev) => [newInc, ...prev]);
    addNotification('Incident Report Logged', `Report ${id} (${type}) logged with Campus Security & Maintenance.`, 'complaint', 'incidents');
  };

  // Refunds
  const addRefundRequest = (category: string, amount: number, note: string) => {
    const id = `REF-2026-${Math.floor(110 + refunds.length)}`;
    const newRef: RefundRequest = {
      id,
      category,
      amount,
      appliedDate: 'Today',
      status: 'Processing',
      note,
    };
    setRefunds((prev) => [newRef, ...prev]);
    addNotification('Refund Request Sent', `Refund claim of ₹${amount} logged for ${category}.`, 'fee', 'refund');
  };

  const navigateToService = (serviceKey: string) => {
    setActiveTab(serviceKey);
  };

  const unreadNotificationCount = notifications.filter((n) => !(n.read ?? n.isRead)).length;

  return (
    <CampusContext.Provider
      value={{
        role,
        setRole,
        currentProfile,
        updateProfile,
        activeTab,
        setActiveTab,
        complaints,
        addComplaint,
        updateComplaintStatus,
        gatePasses,
        addGatePass,
        updateGatePassStatus,
        leaves,
        addLeave,
        updateLeaveStatus,
        certificates,
        addCertificateRequest,
        updateCertificateStatus,
        feeSummary,
        feeBreakdowns,
        transactions,
        payFees,
        attendance,
        updateAttendance,
        marks,
        updateMarks,
        timetable,
        notices,
        addNotice,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        events,
        toggleEventRegistration,
        incidents,
        addIncident,
        awards,
        refunds,
        addRefundRequest,
        isSearchOpen,
        setIsSearchOpen,
        isAssistantOpen,
        setIsAssistantOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        navigateToService,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
}

export function useCampus() {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
}
