'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import { FileText, AlertCircle, Calendar, Filter, Search, Tag } from 'lucide-react';
import { CampusNotice } from '@/types';

export default function NoticesSection() {
  const { notices } = useCampus();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Urgent', 'Academic', 'Exam', 'Administration', 'Hostel', 'Events'];

  const filtered = notices.filter((n) => {
    const matchesCat =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Urgent'
        ? n.isUrgent
        : n.category === activeCategory;

    const matchesSearch =
      search.trim() === ''
        ? true
        : n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Official University Circulars & Notices
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Bulletin Board
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional announcements from Controller of Examinations, Deanery, and Administration.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search circulars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs border border-slate-300 rounded px-2.5 py-1.5 bg-slate-50 focus:outline-hidden focus:border-[#99004d]"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              activeCategory === cat
                ? 'bg-[#99004d] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white p-8 rounded border border-slate-200 text-center text-xs text-slate-500">
            No notices match the selected criteria.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded border p-4 transition ${
                item.isUrgent
                  ? 'border-l-4 border-l-red-600 border-slate-200 shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-slate-800">{item.id}</span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.2 rounded border ${
                      item.isUrgent
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.isUrgent ? 'URGENT CIRCULAR' : item.category}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.content}</p>

              <div className="mt-3 pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Issued by: <strong>{item.publisher}</strong></span>
                <span className="text-[#99004d] font-semibold cursor-pointer hover:underline">
                  Download Official Circular PDF →
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
