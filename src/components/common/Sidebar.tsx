'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCampus } from '@/context/CampusContext';
import {
  Home,
  Layers,
  Clock,
  FileText,
  Calendar,
  CreditCard,
  AlertTriangle,
  KeyRound,
  Bell,
  BookOpen,
  Users,
  CheckCircle2,
  Briefcase,
  Building,
  FileCheck,
  Ticket,
  X,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: 'home' | 'green' | 'due' | 'neutral';
}

export default function Sidebar() {
  const { role, activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen } = useCampus();
  const pathname = usePathname();

  const getNavItems = (): NavItem[] => {
    if (role === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', href: '/student/dashboard', icon: Home, badge: 'HOME', badgeType: 'home' },
        { id: 'services', label: 'Services Directory', href: '/student/services', icon: Layers },
        { id: 'attendance', label: 'Class Attendance', href: '/student/attendance', icon: Clock, badge: '89%', badgeType: 'green' },
        { id: 'marks', label: 'Internal Marks & Grades', href: '/student/marks', icon: FileText },
        { id: 'timetable', label: 'Class Timetable', href: '/student/timetable', icon: Calendar },
        { id: 'payments', label: 'Fees & Payments', href: '/student/payments', icon: CreditCard, badge: 'DUE', badgeType: 'due' },
        { id: 'requests', label: 'Requests & Grievances', href: '/student/requests', icon: AlertTriangle, badge: '2', badgeType: 'neutral' },
        { id: 'gatepass', label: 'Gate Pass & Leaves', href: '/student/gatepass', icon: KeyRound },
        { id: 'notices', label: 'Notices & Circulars', href: '/student/notices', icon: Bell, badge: '4', badgeType: 'neutral' },
      ];
    } else if (role === 'faculty') {
      return [
        { id: 'dashboard', label: 'Dashboard', href: '/faculty/dashboard', icon: Home, badge: 'HOME', badgeType: 'home' },
        { id: 'classes', label: 'My Classes', href: '/faculty/classes', icon: BookOpen },
        { id: 'attendance', label: 'Class Attendance', href: '/faculty/attendance', icon: Clock },
        { id: 'students', label: 'Student Directory', href: '/faculty/students', icon: Users },
        { id: 'marks', label: 'Internal Marks Entry', href: '/faculty/marks', icon: FileText },
        { id: 'leave', label: 'Leave Sanction', href: '/faculty/leave', icon: CheckCircle2, badge: '3', badgeType: 'due' },
        { id: 'requests', label: 'Service Requests', href: '/faculty/requests', icon: AlertTriangle },
        { id: 'announcements', label: 'Announcements', href: '/faculty/announcements', icon: FileText },
        { id: 'timetable', label: 'Teaching Schedule', href: '/faculty/timetable', icon: Calendar },
        { id: 'feedback', label: 'Course Feedback', href: '/faculty/feedback', icon: Layers },
      ];
    } else {
      return [
        { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: Home, badge: 'HOME', badgeType: 'home' },
        { id: 'students', label: 'Student Database', href: '/admin/students', icon: Users },
        { id: 'faculty', label: 'Faculty Directory', href: '/admin/faculty', icon: Briefcase },
        { id: 'departments', label: 'Departments', href: '/admin/departments', icon: Building },
        { id: 'certificates', label: 'Certificates Desk', href: '/admin/certificates', icon: FileCheck },
        { id: 'payments', label: 'Finance & Accounts', href: '/admin/payments', icon: CreditCard },
        { id: 'events', label: 'Campus Events', href: '/admin/events', icon: Ticket },
        { id: 'announcements', label: 'Circular Broadcast', href: '/admin/announcements', icon: FileText },
        { id: 'reports', label: 'Reports & Audits', href: '/admin/reports', icon: BookOpen },
      ];
    }
  };

  const navItems = getNavItems();

  const isItemActive = (item: NavItem) => {
    if (!pathname) {
      return activeTab === item.id;
    }

    // 1. Dashboard: only active when on exact dashboard route or root role path
    if (item.id === 'dashboard') {
      return (
        pathname === item.href ||
        pathname === `/${role}` ||
        pathname === `/${role}/`
      );
    }

    // 2. Exact match
    if (pathname === item.href) return true;

    // 3. Nested routes (e.g. /admin/reports/audits matches /admin/reports)
    if (pathname.startsWith(`${item.href}/`)) return true;

    // 4. Role-specific route aliases
    if (item.id === 'requests' && (pathname === `/${role}/complaints` || pathname.startsWith(`/${role}/complaints/`))) {
      return true;
    }
    if (item.id === 'payments' && (pathname === `/${role}/fees` || pathname.startsWith(`/${role}/fees/`) || pathname === `/${role}/finance` || pathname.startsWith(`/${role}/finance/`))) {
      return true;
    }
    if (item.id === 'gatepass' && (pathname === `/${role}/leave` || pathname.startsWith(`/${role}/leave/`))) {
      return true;
    }
    if (item.id === 'marks' && (pathname === `/${role}/academics` || pathname.startsWith(`/${role}/academics/`))) {
      return true;
    }
    if (item.id === 'announcements' && (pathname === `/${role}/notices` || pathname.startsWith(`/${role}/notices/`))) {
      return true;
    }

    return false;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white select-none text-[#182033]">
      {/* Sidebar Header Title */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-between border-b border-[#D9DEE7]/70">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          ACADEMIC NAVIGATION
        </span>

        {/* Mobile close button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden p-1 text-slate-500 hover:text-slate-900 rounded-[2px] cursor-pointer"
          aria-label="Close navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = isItemActive(item);
          return (
            <Link
              key={`${item.id}-${idx}`}
              href={item.href}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full px-2.5 py-2 text-xs rounded-[3px] flex items-center space-x-2.5 transition text-left cursor-pointer ${
                isActive
                  ? 'bg-[#99004d] text-white font-bold shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-[#99004d] font-medium'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate flex-1">{item.label}</span>

              {/* Badges strictly matching Reference Screenshot */}
              {item.badge && (
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-[2px] shrink-0 ${
                    isActive && item.badgeType === 'home'
                      ? 'bg-white/20 text-white'
                      : item.badgeType === 'green'
                      ? 'bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]'
                      : item.badgeType === 'due'
                      ? 'bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3] text-[9px]'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom of Sidebar: CAMPUS IT HELPDESK matching Reference Screenshot */}
      <div className="p-3 border-t border-[#D9DEE7] bg-[#F8FAFC] shrink-0 text-left">
        <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
          CAMPUS IT HELPDESK
        </div>
        <div className="text-[11px] text-slate-600 mt-1">
          Ext: <strong className="text-slate-800">4022 / 4023</strong>
        </div>
        <div className="text-[11px] text-slate-600 truncate mt-0.5">
          helpdesk@campusone.edu
        </div>
        <div className="text-[11px] font-mono text-slate-800 font-bold mt-2 pt-1 border-t border-slate-200 flex justify-between items-center">
          <span className="text-[10px] font-sans text-slate-500 font-normal">Session Auto-logout:</span>
          <span>18:42</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden md:block w-56 lg:w-60 shrink-0 bg-white border-r border-[#D9DEE7] min-h-[calc(100vh-80px)]">
        <div className="sticky top-[80px] h-[calc(100vh-80px)] overflow-hidden">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
