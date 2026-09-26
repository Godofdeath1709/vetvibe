'use client';

import React from 'react';
import { useCampus } from '@/context/CampusContext';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileCheck,
  Calendar,
} from 'lucide-react';

export default function AttendanceSection() {
  const { attendance, currentProfile } = useCampus();

  const totalClasses = attendance.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const totalAttended = attendance.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const totalMissed = totalClasses - totalAttended;
  const overallPercentage = Number(((totalAttended / totalClasses) * 100).toFixed(1));

  return (
    <div className="space-y-4">
      {/* Top Banner & KPI metrics */}
      <div className="bg-white p-4 rounded border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Class Attendance & Examination Eligibility
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300">
                Eligible for End-Sem
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Odd Semester 2026-27 | Regulation 2021 | Minimum Threshold: 75.0%
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Overall Attendance</span>
            <span className="text-2xl font-bold font-mono text-[#99004d]">
              {overallPercentage}%
            </span>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-[11px] text-slate-500 block">Total Conducted</span>
            <span className="text-base font-bold text-slate-800 font-mono">
              {totalClasses} Hours
            </span>
          </div>
          <div className="bg-emerald-50/70 p-2.5 rounded border border-emerald-200">
            <span className="text-[11px] text-emerald-700 block">Classes Attended</span>
            <span className="text-base font-bold text-emerald-800 font-mono">
              {totalAttended} Hours
            </span>
          </div>
          <div className="bg-amber-50/70 p-2.5 rounded border border-amber-200">
            <span className="text-[11px] text-amber-700 block">Classes Missed</span>
            <span className="text-base font-bold text-amber-800 font-mono">
              {totalMissed} Hours
            </span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
            <span className="text-[11px] text-slate-500 block">75% Safe Margin</span>
            <span className="text-base font-bold text-emerald-700 font-mono">
              +{Math.floor(totalAttended - totalClasses * 0.75)} Hours Safe
            </span>
          </div>
        </div>
      </div>

      {/* Subject-wise Attendance Table (Practical ERP table with clean progress indicator) */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Subject-wise Attendance Roster
          </h3>
          <span className="text-[11px] text-slate-500">Last Synced: Today 08:30 AM</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Course Faculty</th>
                <th>Conducted</th>
                <th>Attended</th>
                <th>Missed</th>
                <th className="w-48">Percentage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((rec) => {
                const missed = rec.totalClasses - rec.attendedClasses;
                const isBelow75 = rec.percentage < 75;
                const isWarning = rec.percentage >= 75 && rec.percentage < 80;

                return (
                  <tr key={rec.subjectCode}>
                    <td className="font-mono font-bold text-slate-900">{rec.subjectCode}</td>
                    <td className="font-semibold text-slate-800">{rec.subjectName}</td>
                    <td className="text-slate-600">{rec.faculty}</td>
                    <td className="font-mono text-slate-700">{rec.totalClasses}</td>
                    <td className="font-mono font-bold text-emerald-700">{rec.attendedClasses}</td>
                    <td className="font-mono text-slate-500">{missed}</td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-100 rounded h-2 overflow-hidden border border-slate-200">
                          <div
                            className={`h-full transition-all ${
                              isBelow75
                                ? 'bg-red-500'
                                : isWarning
                                ? 'bg-amber-500'
                                : 'bg-[#99004d]'
                            }`}
                            style={{ width: `${Math.min(100, rec.percentage)}%` }}
                          />
                        </div>
                        <span
                          className={`font-mono font-bold text-xs shrink-0 ${
                            isBelow75
                              ? 'text-red-600'
                              : isWarning
                              ? 'text-amber-600'
                              : 'text-slate-800'
                          }`}
                        >
                          {rec.percentage}%
                        </span>
                      </div>
                    </td>
                    <td>
                      {isBelow75 ? (
                        <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded text-[10px] font-bold">
                          Shortage (&lt;75%)
                        </span>
                      ) : isWarning ? (
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-bold">
                          Borderline
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                          Eligible
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Policy Notice */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 flex items-start space-x-2">
        <HelpCircle className="w-4 h-4 text-[#99004d] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">Attendance Norms (Academic Handbook): </span>
          Students maintaining ≥ 85% attendance are eligible for direct examination hall-ticket clearance.
          Condonation is granted by the Dean only between 65% - 74% with valid medical endorsement.
        </div>
      </div>
    </div>
  );
}
