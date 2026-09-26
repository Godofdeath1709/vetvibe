'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import {
  GraduationCap,
  Building,
  Wifi,
  Bus,
  BookOpen,
  Landmark,
  CreditCard,
  Wrench,
  ArrowRight,
  Plus,
  Send,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';
import { Complaint } from '@/types';

interface ServiceCategory {
  id: Complaint['category'];
  title: string;
  description: string;
  icon: any;
  subservices: string[];
}

export default function ServicesSection() {
  const { addComplaint, setActiveTab } = useCampus();
  const [selectedCategory, setSelectedCategory] = useState<Complaint['category']>('IT Support');
  const [selectedSubservice, setSelectedSubservice] = useState('Wi-Fi MAC Address Whitelisting');
  const [description, setDescription] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const categories: ServiceCategory[] = [
    {
      id: 'Academic',
      title: 'Academic Services',
      description: 'Course registration, grade revaluation, elective changes, credit transfers.',
      icon: GraduationCap,
      subservices: ['Elective Change Request', 'Grade Re-evaluation Claim', 'Credit Transfer Audit', 'Bonafide Endorsement'],
    },
    {
      id: 'Hostel',
      title: 'Hostel & Housing',
      description: 'Room maintenance, plumbing, mess rebate, furniture, laundry services.',
      icon: Building,
      subservices: ['Room Plumbing / Water Issue', 'Mess Rebate Calculation', 'Room Furniture Repair', 'Laundry Token Support'],
    },
    {
      id: 'IT Support',
      title: 'IT & Digital Services',
      description: 'Campus Wi-Fi, LMS / Amrita portal login, email reset, lab software.',
      icon: Wifi,
      subservices: ['Wi-Fi MAC Address Whitelisting', 'Student Email Password Reset', 'LMS Course Enrolment Error', 'Lab Software License Request'],
    },
    {
      id: 'Transport',
      title: 'Transport Services',
      description: 'Daily bus routes, semester bus pass, route reallocation, lost & found.',
      icon: Bus,
      subservices: ['Semester Bus Pass Renewal', 'Bus Route Change Request', 'Lost Item on Campus Shuttle', 'Bus Timing Schedule Query'],
    },
    {
      id: 'Library',
      title: 'Library Services',
      description: 'Book renewal, digital repository access, IEEE Xplore access, overdue clearance.',
      icon: BookOpen,
      subservices: ['Digital Library IEEE Access', 'Book Return Fine Adjustment', 'Special Research Book Reservation', 'Plagiarism Report Request'],
    },
    {
      id: 'Infrastructure',
      title: 'Infrastructure & Facilities',
      description: 'Classroom projectors, electrical fittings, seminar hall booking, air conditioning.',
      icon: Wrench,
      subservices: ['Classroom Projector Repair', 'Electrical Fixture Buzzing', 'AC Filter Servicing', 'Lab Workstation Power Socket'],
    },
    {
      id: 'Finance',
      title: 'Finance & Accounts',
      description: 'Fee payment clarification, caution deposit, scholarships, duplicate receipts.',
      icon: CreditCard,
      subservices: ['Fee Payment Discrepancy', 'Caution Deposit Refund', 'Scholarship Endorsement', 'Duplicate Fee Receipt Copy'],
    },
    {
      id: 'Academic',
      title: 'Administrative Desk',
      description: 'Identity cards, name corrections, migration certificates, bonafide verification.',
      icon: Landmark,
      subservices: ['Duplicate ID Card Application', 'Official Name Correction', 'Migration Certificate Application', 'Degree Verification'],
    },
  ];

  const activeCat = categories.find((c) => c.id === selectedCategory) || categories[2];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newId = addComplaint({
      category: selectedCategory,
      title: `${selectedSubservice} - Service Request`,
      description: description.trim(),
      priority: 'Medium',
    });

    setDescription('');
    setSuccessToast(`Request logged under ${selectedCategory} with Tracking ID: ${newId}`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Centralized Campus Service Catalog
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              8 Campus Departments
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            One unified window for all university departmental requests, maintenance, and administrative clearances.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('complaints')}
          className="px-3 py-1.5 bg-slate-100 hover:bg-[#fdf2f7] hover:border-[#fbcfe8] text-slate-700 hover:text-[#99004d] border border-slate-300 rounded text-xs font-semibold flex items-center space-x-1.5 transition"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Track Active Service Orders →</span>
        </button>
      </div>

      {successToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{successToast}</span>
          </div>
          <button
            onClick={() => setActiveTab('complaints')}
            className="text-[11px] font-bold text-emerald-900 underline"
          >
            Inspect Status Stepper
          </button>
        </div>
      )}

      {/* 8 Department Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id && activeCat.title === cat.title;

          return (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedSubservice(cat.subservices[0]);
              }}
              className={`p-3 text-left rounded border transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#fdf2f7] border-[#99004d] ring-1 ring-[#99004d]'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center mb-2 ${
                    isSelected ? 'bg-[#99004d] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">{cat.title}</div>
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                  {cat.description}
                </div>
              </div>

              <div className="mt-2 text-[10px] text-[#99004d] font-semibold flex items-center gap-1">
                <span>Select Desk</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Service Request Creation Form */}
      <div className="bg-white rounded border border-slate-200 p-4">
        <div className="border-b pb-3 mb-3 border-slate-200">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Lodge Service Order: {activeCat.title}
          </h3>
          <p className="text-[11px] text-slate-500">
            Select standard service head or describe custom administrative requirement.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Select Specific Service Request Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeCat.subservices.map((sub, i) => (
                <label
                  key={i}
                  className={`p-2 rounded border cursor-pointer flex items-center space-x-2 text-xs transition ${
                    selectedSubservice === sub
                      ? 'border-[#99004d] bg-[#fdf2f7] text-[#99004d] font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="subservice"
                    checked={selectedSubservice === sub}
                    onChange={() => setSelectedSubservice(sub)}
                    className="accent-[#99004d]"
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Request Details & Specifications
            </label>
            <textarea
              rows={3}
              placeholder="State pertinent details such as device MAC, room number, course code, or urgency..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 focus:outline-hidden focus:border-[#99004d]"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[11px] text-slate-500">
              Department SLA Response: Under 4 Hours during working days.
            </span>
            <button
              type="submit"
              className="px-4 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit & Generate Request ID</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
