'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import { AlertTriangle, Plus, Clock, CheckCircle2, Send, ShieldAlert, MapPin } from 'lucide-react';
import { CampusIncident } from '@/types';

export default function IncidentsSection() {
  const { incidents, addIncident } = useCampus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState('Electrical Maintenance');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) return;

    addIncident(type, location.trim(), description.trim());
    setLocation('');
    setDescription('');
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: CampusIncident['status']) => {
    switch (status) {
      case 'Resolved':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">Resolved</span>;
      case 'Action Taken':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-300">Action Taken</span>;
      case 'Under Investigation':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-300">Under Investigation</span>;
      case 'Reported':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">Reported</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Campus Safety & Maintenance Incident Reporting
            </h2>
            <span className="text-xs bg-red-50 text-red-700 font-semibold px-2 py-0.5 rounded border border-red-200">
              Campus Security Patrol
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Log physical hazards, broken lighting, water leaks, or security observations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Report New Incident</span>
        </button>
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Logged Safety & Maintenance Incidents
          </h3>
          <span className="text-[11px] text-slate-500">{incidents.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Type</th>
                <th>Location / Landmark</th>
                <th>Description</th>
                <th>Reported Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.id}>
                  <td className="font-mono font-bold text-[#99004d]">{inc.id}</td>
                  <td className="font-semibold text-slate-800">{inc.type}</td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-slate-700">
                      <MapPin className="w-3 h-3 text-[#99004d]" />
                      {inc.location}
                    </span>
                  </td>
                  <td className="text-slate-600 max-w-sm truncate">{inc.description}</td>
                  <td className="text-slate-500">{inc.reportedAt}</td>
                  <td>{getStatusBadge(inc.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in duration-100">
            <div className="p-4 bg-[#99004d] text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Report Campus Incident</h3>
                <p className="text-[11px] text-pink-100">Campus Security & Estate Management</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-pink-200 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Incident Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
                >
                  <option value="Electrical Maintenance">Electrical Maintenance / Hazard</option>
                  <option value="Campus Transport">Campus Transport / Bus Delay</option>
                  <option value="Water & Plumbing">Water Supply / Pipeline Leakage</option>
                  <option value="Security Observation">Security Patrol / Gate Observation</option>
                  <option value="Health Center Emergency">Health Center / Medical First Aid</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Specific Location</label>
                <input
                  type="text"
                  placeholder="e.g. Academic Block 3 - 2nd Floor Corridor, North Gate Bus Bay"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe observations, time noticed, and immediate risk..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Incident</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
