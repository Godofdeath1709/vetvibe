'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCampus } from '@/context/CampusContext';
import { useAuth } from '@/context/AuthContext';
import {
  Bell,
  Search,
  HelpCircle,
  LogOut,
  ChevronDown,
  Menu,
} from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const {
    role,
    activeTab,
    setActiveTab,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setIsSearchOpen,
    setIsAssistantOpen,
    setIsSidebarOpen,
  } = useCampus();

  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close popups on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setShowProfileMenu(false);
    logout();
  };

  // Safe labels matching reference
  const displayName = user?.name || (role === 'faculty' ? 'Dr. Priya Menon' : role === 'admin' ? 'Administrator' : 'Ashwanth R');
  const displayId = role === 'faculty' 
    ? (user?.identifier || 'FAC001')
    : role === 'student' 
    ? (user?.identifier || '25107')
    : (user?.identifier || 'ADMIN001');
  const displayDept = role === 'faculty' 
    ? (user?.department || 'Dept. of Computer Science') 
    : role === 'student' 
    ? (user?.department || 'Dept. of Cyber Security') 
    : 'Central Administration';
  const displaySection = role === 'student' ? 'CS-B' : 'Room AB-204';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#D9DEE7] shadow-2xs">
      {/* 1. VERY TOP INSTITUTIONAL BAR (Dark Navy matching Reference) */}
      <div className="bg-[#17233C] text-slate-300 px-4 py-1.5 text-xs border-b border-slate-900">
        <div className="w-full flex justify-between items-center gap-3">
          {/* Left Intranet & Network Telemetry */}
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <span className="flex items-center gap-1.5 font-bold text-white tracking-wide text-[11px] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span>
              CAMPUS ONE INTRANET
            </span>

            <span className="px-1.5 py-0.2 rounded-[2px] bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 text-[9px] font-bold uppercase shrink-0">
              ONLINE
            </span>

            <span className="text-slate-600 hidden md:inline">|</span>

            <span className="text-slate-300 text-[11px] hidden md:inline shrink-0">
              Academic Session: <strong className="text-white font-medium">Odd Semester 2026-2027</strong>
            </span>

            <span className="text-slate-600 hidden xl:inline">|</span>

            <span className="text-slate-400 text-[11px] hidden xl:inline truncate">
              Campus Network: <span className="font-mono text-slate-300">172.16.48.112</span> (VLAN - STUDENT - UG)
            </span>
          </div>

          {/* Right Logged-in Capsule & Sign Out */}
          <div className="flex items-center space-x-2.5 text-[11px] shrink-0">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#99004d] text-white text-[10px] font-bold uppercase tracking-wider shrink-0">
              {role.toUpperCase()}
            </span>

            <span className="text-slate-300 hidden sm:inline">
              Logged in as: <strong className="text-white font-semibold">{displayName}</strong> (Roll: {displayId}) | {displayDept}
            </span>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <button
              onClick={handleLogoutClick}
              className="text-pink-300 hover:text-white font-medium flex items-center gap-1 transition cursor-pointer"
              title="Sign out of CampusOne"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (White below dark utility bar matching Reference) */}
      <div className="w-full px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16 gap-3">
          {/* Left: C1 Logo Block & Portal Branding */}
          <div className="flex items-center space-x-3 min-w-0">
            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="md:hidden p-1.5 text-[#182033] hover:bg-[#F3F5F7] rounded-[3px] border border-[#D9DEE7] transition shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-[3px] bg-[#99004d] text-white flex items-center justify-center font-bold text-lg tracking-tight shadow-2xs border border-[#800040] shrink-0">
                C1
              </div>
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-bold text-[#182033] leading-none flex items-center gap-1.5">
                  <span>CampusOne</span>
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 bg-[#FDF2F7] text-[#99004d] border border-[#F7C6DC] rounded-[2px] shrink-0">
                    {role.toUpperCase()}
                  </span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-tight truncate mt-1">
                  Unified University Administrative & Academic ERP
                </div>
              </div>
            </div>
          </div>

          {/* Center: Search Portal Field (Matching Reference Placeholder & ⌘K) */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#EEF4FA] border border-[#D9DEE7] rounded-[3px] text-xs text-slate-500 transition text-left cursor-pointer"
            >
              <div className="flex items-center space-x-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Search portal (e.g. MOD-09, Hall Ticket, Fee challan, Dr. Priya)...</span>
              </div>
              <kbd className="text-[10px] bg-white border border-[#D9DEE7] px-1.5 py-0.5 rounded-[2px] text-slate-500 font-mono shrink-0 ml-2">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Help, Notifications, Student Profile (Matching Reference Screenshot) */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Help Icon */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="p-1.5 text-slate-500 hover:text-[#99004d] hover:bg-[#FDF2F7] rounded-[3px] transition cursor-pointer"
              title="Campus Quick Help & FAQs"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Notifications with Circular Badge '2' */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="p-1.5 text-slate-600 hover:text-[#99004d] hover:bg-[#F3F5F7] rounded-[3px] border border-[#D9DEE7] transition relative cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4 text-[#182033]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 shadow-2xs">
                  {unreadNotificationCount > 0 ? unreadNotificationCount : 2}
                </span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-[3px] border border-[#D9DEE7] shadow-xl z-50 overflow-hidden divide-y divide-[#D9DEE7]">
                  <div className="p-3 bg-[#F7F5F2] flex justify-between items-center">
                    <div className="font-semibold text-xs text-[#17233C] flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#99004d]" />
                      Campus Notifications
                    </div>
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-[#99004d] hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-[#F3F5F7]">
                    {notifications.slice(0, 6).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.linkTab) setActiveTab(n.linkTab);
                          setShowNotifications(false);
                        }}
                        className={`p-3 text-xs cursor-pointer transition hover:bg-[#F3F5F7] ${
                          !n.isRead ? 'bg-[#FDF2F7]/60 font-medium' : 'text-[#667085]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-[#182033] flex items-center gap-1">
                            {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-[#99004d]" />}
                            {n.title}
                          </span>
                          <span className="text-[10px] text-[#667085] shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="mt-1 text-[#667085] line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Student Profile Capsule (Ashwanth R / 25107 • CS-B matching Reference) */}
            <div className="relative shrink-0" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 bg-white hover:bg-[#F8FAFC] border border-[#D9DEE7] hover:border-[#99004d]/60 rounded-[3px] text-left transition cursor-pointer"
              >
                {/* Maroon Square Avatar with Letter 'A' */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[3px] bg-[#99004d] text-white flex items-center justify-center font-bold text-xs uppercase shrink-0 shadow-2xs">
                  {displayName.charAt(0)}
                </div>

                {/* Two lines: Name and ID • Section */}
                <div className="hidden sm:block leading-tight text-left min-w-[90px]">
                  <div className="text-xs font-bold text-[#182033] truncate">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {displayId} • {displaySection}
                  </div>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-[3px] border border-[#D9DEE7] shadow-xl z-50 overflow-hidden divide-y divide-[#D9DEE7]">
                  <div className="p-3 bg-[#F7F5F2]">
                    <div className="font-bold text-xs text-[#182033]">{displayName}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">{displayId}</div>
                    <div className="text-[11px] text-slate-600 mt-1">{displayDept}</div>
                    <span className="inline-block mt-1 text-[9px] uppercase font-bold px-1.5 py-0.2 bg-white text-[#99004d] border border-[#F7C6DC] rounded-[2px]">
                      {role} Portal User
                    </span>
                  </div>
                  <div className="p-1.5 bg-[#F8FAFC]">
                    <button
                      onClick={handleLogoutClick}
                      className="w-full px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-white rounded-[2px] flex items-center justify-center gap-1.5 transition border border-transparent hover:border-red-200 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out of Portal</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
