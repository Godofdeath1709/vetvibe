'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import { User, Phone, Mail, MapPin, Shield, Edit2, CheckCircle2, Heart } from 'lucide-react';

export default function ProfileSection() {
  const { currentProfile, updateProfile } = useCampus();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(currentProfile.phone);
  const [email, setEmail] = useState(currentProfile.email);
  const [hostel, setHostel] = useState(currentProfile.hostel || 'Agastya Bhavan, Room 304');
  const [bloodGroup, setBloodGroup] = useState(currentProfile.bloodGroup || 'O+ Positive');
  const [emergencyContact, setEmergencyContact] = useState(
    currentProfile.emergencyContact || '+91 94432 67890 (Father - Mr. R. Ramesh)'
  );
  const [toast, setToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      phone,
      email,
      hostel,
      bloodGroup,
      emergencyContact,
    });
    setIsEditing(false);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Student Master Record & Personal Profile
            </h2>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-300">
              Active Enrolment
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Official University Identity details & Emergency Contacts.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-3.5 py-2 bg-slate-100 hover:bg-[#fdf2f7] hover:border-[#fbcfe8] text-slate-700 hover:text-[#99004d] border border-slate-300 rounded text-xs font-semibold flex items-center space-x-1.5 transition"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Editing' : 'Edit Contact Details'}</span>
        </button>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">Profile contact information updated in master student directory.</span>
        </div>
      )}

      {/* Main Profile Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left ID Badge Card */}
        <div className="bg-white p-5 rounded border border-slate-200 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-20 h-20 rounded bg-[#99004d] text-white flex items-center justify-center font-bold text-3xl shadow-sm border-2 border-white ring-4 ring-pink-100">
            {currentProfile.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">{currentProfile.name}</h3>
            <span className="text-xs font-mono font-bold text-[#99004d] bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
              Roll No: {currentProfile.rollNo || '25107'}
            </span>
            <div className="text-xs text-slate-500 mt-1">{currentProfile.program}</div>
            <div className="text-[11px] text-slate-400 font-medium">
              {currentProfile.year} • {currentProfile.semester}
            </div>
          </div>

          <div className="w-full pt-3 border-t border-slate-100 text-left text-xs space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Department:</span>
              <span className="font-medium text-slate-800">{currentProfile.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Regulation:</span>
              <span className="font-medium text-slate-800">2021 Choice Based</span>
            </div>
          </div>
        </div>

        {/* Right 2 cols: Details & Form */}
        <div className="md:col-span-2 bg-white rounded border border-slate-200 overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Institutional & Emergency Roster Information
            </h3>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="p-4 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded p-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Hostel & Room Assignment
                </label>
                <input
                  type="text"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded p-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded p-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Emergency Contact (Parent / Guardian)
                  </label>
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded p-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 font-medium text-[11px]">Primary Email</div>
                <div className="font-semibold text-slate-900 mt-0.5">{currentProfile.email}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 font-medium text-[11px]">Mobile Phone</div>
                <div className="font-semibold text-slate-900 mt-0.5">{currentProfile.phone}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 font-medium text-[11px]">Hostel & Room Assignment</div>
                <div className="font-semibold text-slate-900 mt-0.5">{currentProfile.hostel}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-400 font-medium text-[11px]">Blood Group</div>
                <div className="font-semibold text-red-700 mt-0.5">{currentProfile.bloodGroup}</div>
              </div>

              <div className="sm:col-span-2 p-3 bg-pink-50/50 rounded border border-pink-200">
                <div className="text-slate-500 font-medium text-[11px]">
                  Emergency Contact Details
                </div>
                <div className="font-bold text-slate-900 mt-0.5">
                  {currentProfile.emergencyContact}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
