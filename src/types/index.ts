export type UserRole = 'student' | 'faculty' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  identifier: string;
  department?: string;
  program?: string;
  email?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  // Student specifics
  rollNo?: string;
  program?: string;
  year?: string;
  semester?: string;
  hostel?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  // Faculty specifics
  facultyId?: string;
  designation?: string;
  cabin?: string;
  // Admin specifics
  adminId?: string;
  officeTitle?: string;
}

export type ComplaintStatus = 'Submitted' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';

export interface RequestTimelineStep {
  title: string;
  timestamp: string;
  actor?: string;
  note?: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface Complaint {
  id: string;
  studentName: string;
  rollNo: string;
  category: 'Hostel' | 'IT Support' | 'Infrastructure' | 'Academic' | 'Transport' | 'Library' | 'Finance';
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: ComplaintStatus;
  assignedDepartment?: string;
  assignedStaff?: string;
  createdAt: string;
  updatedAt: string;
  steps: RequestTimelineStep[];
  resolutionNotes?: string;
}

export type GatePassStatus = 'Pending' | 'Approved' | 'Rejected';

export interface GatePass {
  id: string;
  studentName: string;
  rollNo: string;
  date: string;
  outTime: string;
  expectedReturn: string;
  destination: string;
  reason: string;
  status: GatePassStatus;
  appliedOn: string;
  approvedBy?: string;
}

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  studentName: string;
  rollNo: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  documentName?: string;
}

export interface AttendanceRecord {
  subjectCode: string;
  subjectName: string;
  faculty: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  isEligible: boolean;
}

export interface MarksRecord {
  subjectCode: string;
  subjectName: string;
  internal: number;
  internalMax: number;
  assignment: number;
  assignmentMax: number;
  lab: number;
  labMax: number;
  endSem: number;
  endSemMax: number;
  total: number;
  grade: string;
  credits: number;
}

export interface FeeSummary {
  total: number;
  paid: number;
  outstanding: number;
  nextDueDate: string;
  status: 'Paid' | 'Partial' | 'Pending';
}

export interface FeeBreakdown {
  id: string;
  title: string;
  category: string;
  total: number;
  paid: number;
  outstanding: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Pending';
}

export interface PaymentTransaction {
  transactionId: string;
  date: string;
  amount: number;
  paymentMode: string;
  receiptNo: string;
  description: string;
  status: 'Success' | 'Pending';
}

export interface TimetableEntry {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number;
  time: string;
  subject: string;
  code: string;
  faculty: string;
  room: string;
}

export type CertificateStatus = 'Submitted' | 'Verification' | 'Approved' | 'Generated' | 'Available';

export interface CertificateRequest {
  id: string;
  type: string;
  purpose: string;
  appliedDate: string;
  status: CertificateStatus;
  documentUrl?: string;
  completedDate?: string;
}

export interface CampusNotice {
  id: string;
  title: string;
  category: 'Academic' | 'Exam' | 'Administration' | 'Hostel' | 'Events' | 'Urgent';
  date: string;
  publisher: string;
  content: string;
  isUrgent?: boolean;
  attachment?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'complaint' | 'gatepass' | 'academic' | 'fee' | 'announcement';
  linkTab?: string;
  // Aliases for full compatibility
  message?: string;
  timestamp?: string;
  isRead?: boolean;
  category?: 'complaint' | 'gatepass' | 'academic' | 'fee' | 'announcement';
}

export interface CampusIncident {
  id: string;
  type: string;
  location: string;
  description: string;
  reportedAt: string;
  status: 'Reported' | 'Under Investigation' | 'Action Taken' | 'Resolved';
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  registered: boolean;
  capacity: string;
  organizer: string;
}

export interface RefundRequest {
  id: string;
  category: string;
  amount: number;
  appliedDate: string;
  status: 'Processing' | 'Approved' | 'Credited';
  note: string;
}

export interface AwardItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Sports' | 'Academic' | 'Technical' | 'Cultural';
  event: string;
  date: string;
  issuer: string;
  position: string;
}
