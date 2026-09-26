'use client';

import React from 'react';
import { useCampus } from '@/context/CampusContext';
import { Award, Trophy, Medal, Star, CheckCircle2 } from 'lucide-react';

export default function AwardsSection() {
  const { awards, currentProfile } = useCampus();

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Student Honors, Hackathons & Co-Curricular Awards
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              Verified Honors
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional achievements endorsed by Dean of Student Affairs.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>{awards.length} Recorded Accomplishments</span>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {awards.map((a) => (
          <div
            key={a.id}
            className="bg-white p-4 rounded border border-slate-200 hover:border-slate-300 transition flex items-start space-x-3.5"
          >
            <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-600 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
                  {a.category}
                </span>
                <span className="text-[11px] text-slate-400">{a.date}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{a.title}</h3>
              <div className="text-slate-600 font-medium">{a.event}</div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {a.position}
                </span>
                <span className="text-slate-500">Issuer: {a.issuer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
