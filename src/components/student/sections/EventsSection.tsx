'use client';

import React from 'react';
import { useCampus } from '@/context/CampusContext';
import { Calendar, MapPin, Users, CheckCircle2, Ticket } from 'lucide-react';

export default function EventsSection() {
  const { events, toggleEventRegistration } = useCampus();

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Upcoming University Events & Competitions
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Campus Life 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Register for inter-college tournaments, 36-hour hackathons, and technical symposiums.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
          Registered Events: <span className="font-bold text-[#99004d]">{events.filter(e => e.registered).length}</span> / {events.length}
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded border border-slate-200 p-4 flex flex-col justify-between hover:border-slate-300 transition space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {evt.category}
                </span>
                <span className="text-xs font-mono font-bold text-[#99004d]">
                  {evt.id}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-2">
                {evt.title}
              </h3>

              <div className="space-y-1 text-xs text-slate-600 mt-2">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#99004d]" />
                  <span className="font-semibold text-slate-800">{evt.date}</span>
                  <span className="text-slate-400">•</span>
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{evt.venue}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Organized by {evt.organizer} (Capacity: {evt.capacity})</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {evt.registered ? (
                <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Registered & Confirmed</span>
                </div>
              ) : (
                <span className="text-xs text-slate-400">Open for online registration</span>
              )}

              <button
                onClick={() => toggleEventRegistration(evt.id)}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold flex items-center space-x-1.5 transition ${
                  evt.registered
                    ? 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-[#99004d] hover:bg-[#800040] text-white shadow-xs'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>{evt.registered ? 'Cancel Registration' : 'Register Now'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
