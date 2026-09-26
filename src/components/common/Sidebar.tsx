'use client';

import React from 'react';
import { useCampus } from '@/context/CampusContext';
import { useAuth } from '@/context/AuthContext';
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

export default function Sidebar() {
  const { role, activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen } = useCampus();

  const getNavItems = () => {
    if (role === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home, badge: 'HOME', badgeType: 'home' },
        { id: 'services', label: 'Services Directory', icon: Layers },
        { id: 'attendance', label: 'Class Attendance', icon: Clock, badge: '89%', badgeType: 'green' },
        { id: 'marks', label: 'Internal Marks & Grades', icon: FileText },
        { id: 'timetable', label: 'Class Timetable', icon: Calendar },
        { id: 'payments', label: 'Fees & Payments', icon: CreditCard, badge: 'DUE', badgeType: 'due' },
        { id: 'requests', label: 'Requests & Grievances', icon: AlertTriangle, badge: '2', badgeType: 'neutral' },
        { id: 'gatepass', label: 'Gate Pass & Leaves', icon: KeyRound },
        { id: 'notices', label: 'Notices & Circulars', icon: Bell, badge: '4', badgeType: 'neutral' },
      ];
    } else if (role === 'faculty') {
      return [
        { id: 'classes', label: 'Dashboard', icon: Home, badge: 'HOME', badgeType: 'home' },
        { id: 'classes', label: 'My Classes', icon: BookOpen },
        { id: 'attendance', label: 'Class Attendance', icon: Clock },
        { id: 'students', label: 'Student Directory', icon: Users },
        { id: 'marks', label: 'Internal Marks Entry', icon: FileText },
        { id: 'leave', label: 'Leave Sanction', icon: CheckCircle2, badge: '3', badgeType: 'due' },
        { id: 'announcements', label: 'Announcements', icon: FileText },
        { id: 'timetable', label: 'Teaching Schedule', icon: Calendar },
      ];
    } else {
      return [
        { id: 'complaints', label: 'Dashboard', icon: Home, badge: 'HOME', badgeType: 'home' },
        { id: 'students', label: 'Student Database', icon: Users },
        { id: 'faculty', label: 'Faculty Directory', icon: Briefcase },
        { id: 'departments', label: 'Departments', icon: Building },
        { id: 'certificates', label: 'Certificates Desk', icon: FileCheck },
        { id: 'payments', label: 'Finance & Accounts', icon: CreditCard },
        { id: 'events', label: 'Campus Events', icon: Ticket },
        { id: 'announcements', label: 'Circular Broadcast', icon: FileText },
        { id: 'reports', label: 'Reports & Audits', icon: BookOpen },
      ];
    }
  };

  const navItems = getNavItems();

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
          className="md:hidden p-1 text-slate-500 hover:text-slate-900 rounded-[2px]"
          aria-label="Close navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={`${item.id}-${idx}`}
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
            </button>
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
      {/* Desktop Persistent Sidebar (Width ~230px, Docked cleanly matching screenshot) */}
      <aside className="hidden md:flex flex-col w-[220px] lg:w-[230px] shrink-0 bg-white border-r border-[#D9DEE7] sticky top-0 h-[calc(100vh-2px)] z-20 shadow-2xs">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer with Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
