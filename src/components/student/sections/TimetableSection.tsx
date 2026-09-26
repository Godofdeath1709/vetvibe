'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import { Calendar, Clock, MapPin, User, BookOpen } from 'lucide-react';
import { TimetableEntry } from '@/types';

export default function TimetableSection() {
  const { timetable } = useCampus();
  const [selectedDay, setSelectedDay] = useState<TimetableEntry['day']>('Monday');

  const days: TimetableEntry['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const daySchedule = timetable.filter((t) => t.day === selectedDay);

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Class & Laboratory Weekly Timetable
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Odd Semester 2026-27
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            B.Tech Cyber Security • Year 2 (Semester 4) • Academic Block 3
          </p>
        </div>

        {/* Day selector tabs */}
        <div className="flex bg-slate-100 p-1 rounded border border-slate-200">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1 text-xs font-semibold rounded transition ${
                selectedDay === day
                  ? 'bg-[#99004d] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#99004d]" />
            {selectedDay} Schedule
          </h3>
          <span className="text-[11px] text-slate-500">5 Scheduled Periods</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Period</th>
                <th>Time Slot</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Faculty</th>
                <th>Room / Laboratory</th>
              </tr>
            </thead>
            <tbody>
              {daySchedule.map((entry) => (
                <tr key={entry.id}>
                  <td className="font-bold text-[#99004d] font-mono">Period {entry.period}</td>
                  <td className="font-mono text-slate-600 font-medium">{entry.time}</td>
                  <td className="font-mono font-bold text-slate-900">{entry.code}</td>
                  <td className="font-semibold text-slate-800">{entry.subject}</td>
                  <td className="text-slate-600">{entry.faculty}</td>
                  <td>
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[11px] font-medium text-slate-700 inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#99004d]" />
                      {entry.room}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Lunch / Interval Note */}
      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-500 flex justify-between">
        <span>Morning Break: 10:55 - 11:15 AM</span>
        <span>Lunch Recess: 12:10 - 01:15 PM</span>
        <span>Evening Tea: 03:15 - 03:30 PM</span>
      </div>
    </div>
  );
}
