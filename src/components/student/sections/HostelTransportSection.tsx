'use client';

import React from 'react';
import { useCampus } from '@/context/CampusContext';
import { Building, Bus, Utensils, Clock, Phone, MapPin, Shield, HelpCircle } from 'lucide-react';

export default function HostelTransportSection() {
  const { currentProfile, setActiveTab } = useCampus();

  const busRoutes = [
    { routeNo: 'Route 1', destination: 'Gandhipuram / Cross Cut Road', morning: '07:15 AM', evening: '05:00 PM', busNo: 'TN-38-N-4210' },
    { routeNo: 'Route 2', destination: 'RS Puram / Lawley Road', morning: '07:20 AM', evening: '05:00 PM', busNo: 'TN-38-N-4218' },
    { routeNo: 'Route 3', destination: 'Singanallur / Hopes College', morning: '07:05 AM', evening: '05:00 PM', busNo: 'TN-38-N-4225' },
    { routeNo: 'Route 4', destination: 'Thudiyalur / Saibaba Colony', morning: '07:10 AM', evening: '05:00 PM', busNo: 'TN-38-N-4230' },
  ];

  const messMenu = [
    { day: 'Today', breakfast: 'Idli, Medu Vada, Sambar & Coconut Chutney', lunch: 'South Indian Veg Meals / Curd Rice / Poriyal', snacks: 'Samosa / Tea / Coffee', dinner: 'Chapati, Paneer Butter Masala, Jeera Rice, Dal' },
    { day: 'Tomorrow', breakfast: 'Puri Masala, Fresh Cut Fruits, Tea/Coffee', lunch: 'Variety Rice / Sambar Rice / Potato Fry', snacks: 'Bajji / Biscuits / Tea', dinner: 'Dosa, Tomato Chutney, Rasam Rice, Banana' },
  ];

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Hostel Living & Campus Transport Operations
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Campus Amenities
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Hostel room allocation, daily mess menu, campus transit bus schedules, and helpdesk lines.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('gatepass')}
          className="px-3.5 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs"
        >
          <span>Apply Gate Pass →</span>
        </button>
      </div>

      {/* Hostel Info & Mess Menu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hostel Room Capsule */}
        <div className="bg-white rounded border border-slate-200 p-4 space-y-3">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
            <Building className="w-4 h-4 text-[#99004d]" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Hostel Residence
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block text-[11px]">Bhavan & Block</span>
              <span className="font-bold text-slate-900">Agastya Bhavan - East Wing</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Allocated Room</span>
              <span className="font-mono font-bold text-slate-900">Room 304 (Double Occupancy)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Resident Warden</span>
              <span className="font-semibold text-slate-800">Mr. S. Balasubramanian (+91 94421 88001)</span>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
              <span>Gate Curfew: 09:00 PM</span>
              <span className="text-emerald-700 font-semibold">Active Occupant</span>
            </div>
          </div>
        </div>

        {/* Mess Schedule (2 cols) */}
        <div className="md:col-span-2 bg-white rounded border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Utensils className="w-4 h-4 text-[#99004d]" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Central Mess Menu & Catering Schedule
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">Agastya Dining Hall</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {messMenu.map((m, idx) => (
              <div key={idx} className="p-3 space-y-1.5">
                <div className="font-bold text-[#99004d] text-xs uppercase tracking-wide">
                  {m.day}&apos;s Nutrition Menu
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-semibold">Breakfast (07:30 - 08:45 AM): </span>
                    {m.breakfast}
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Lunch (12:15 - 01:45 PM): </span>
                    {m.lunch}
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Tea & Snacks (04:45 - 05:45 PM): </span>
                    {m.snacks}
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold">Dinner (07:30 - 09:00 PM): </span>
                    {m.dinner}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Transport Bus Routes */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bus className="w-4 h-4 text-[#99004d]" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              University Day Scholar & Shuttle Bus Routes
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Daily Fleet Coordination</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Route</th>
                <th>Destination / Major Stops</th>
                <th>Morning Pickup</th>
                <th>Evening Departure</th>
                <th>Bus Registration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {busRoutes.map((b) => (
                <tr key={b.routeNo}>
                  <td className="font-bold font-mono text-[#99004d]">{b.routeNo}</td>
                  <td className="font-semibold text-slate-800">{b.destination}</td>
                  <td className="font-mono text-slate-700">{b.morning}</td>
                  <td className="font-mono text-slate-700">{b.evening}</td>
                  <td className="font-mono text-slate-500 text-[11px]">{b.busNo}</td>
                  <td>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                      On Time
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Help Desk Contact Card */}
      <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs text-slate-700">
        <div className="flex items-center space-x-2 mb-2 text-slate-900 font-bold uppercase tracking-wide">
          <Phone className="w-4 h-4 text-[#99004d]" />
          <span>24/7 Campus Control & Emergency Help Desk</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
          <div>
            <strong>Campus Health Center:</strong> +91 422 268 5100 (Internal Ext: 5100)
          </div>
          <div>
            <strong>Main Security Gate:</strong> +91 422 268 5050 (Internal Ext: 5050)
          </div>
          <div>
            <strong>Central IT Helpdesk:</strong> ithelpdesk@campusone.edu.in
          </div>
        </div>
      </div>
    </div>
  );
}
