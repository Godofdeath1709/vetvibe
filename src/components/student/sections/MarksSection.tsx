'use client';

import React from 'react';
import { useCampus } from '@/context/CampusContext';
import { GraduationCap, Award, Download, CheckCircle2 } from 'lucide-react';

export default function MarksSection() {
  const { marks, currentProfile } = useCampus();

  const totalCredits = marks.reduce((acc, curr) => acc + curr.credits, 0);

  // Grade point mapping
  const gradePoints: Record<string, number> = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'RA': 0,
  };

  const totalWeightedPoints = marks.reduce((acc, curr) => {
    const pts = gradePoints[curr.grade] || 8;
    return acc + pts * curr.credits;
  }, 0);

  const currentSGPA = Number((totalWeightedPoints / totalCredits).toFixed(2));

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Semester Academic Performance & Grades
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-pink-50 text-[#99004d] border border-pink-200">
              Semester 4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Student: {currentProfile.name} | Roll No: {currentProfile.rollNo || '25107'} | {currentProfile.program}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block uppercase font-medium">
              Calculated SGPA
            </span>
            <span className="text-2xl font-bold font-mono text-[#99004d]">
              {currentSGPA}
              <span className="text-xs font-normal text-slate-400"> / 10.0</span>
            </span>
          </div>
          <button
            onClick={() => alert('Official Grade Sheet PDF generated.')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-[#fdf2f7] hover:border-[#fbcfe8] text-slate-700 hover:text-[#99004d] border border-slate-300 rounded text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Grade Sheet</span>
          </button>
        </div>
      </div>

      {/* Marks ERP Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Continuous Assessment & End-Semester Marks
          </h3>
          <span className="text-[11px] text-slate-500">Total Credits Registered: {totalCredits}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left portal-table text-xs">
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject Name</th>
                <th>Credits</th>
                <th>Internal (50)</th>
                <th>Assignment (20)</th>
                <th>Lab / Prac (30)</th>
                <th>End Sem (50)</th>
                <th>Total (100)</th>
                <th className="text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((m) => (
                <tr key={m.subjectCode}>
                  <td className="font-mono font-bold text-slate-900">{m.subjectCode}</td>
                  <td className="font-semibold text-slate-800">{m.subjectName}</td>
                  <td className="font-mono text-slate-600">{m.credits}</td>
                  <td className="font-mono text-slate-700">
                    <span className="font-semibold">{m.internal}</span>
                    <span className="text-slate-400 text-[10px]">/{m.internalMax}</span>
                  </td>
                  <td className="font-mono text-slate-700">
                    <span className="font-semibold">{m.assignment}</span>
                    <span className="text-slate-400 text-[10px]">/{m.assignmentMax}</span>
                  </td>
                  <td className="font-mono text-slate-700">
                    {m.labMax > 0 ? (
                      <>
                        <span className="font-semibold">{m.lab}</span>
                        <span className="text-slate-400 text-[10px]">/{m.labMax}</span>
                      </>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="font-mono text-slate-700">
                    <span className="font-semibold">{m.endSem}</span>
                    <span className="text-slate-400 text-[10px]">/{m.endSemMax}</span>
                  </td>
                  <td className="font-mono font-bold text-slate-900 text-sm">{m.total}</td>
                  <td className="text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded font-bold font-mono text-xs ${
                        m.grade === 'O' || m.grade === 'A+'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : m.grade === 'A'
                          ? 'bg-blue-50 text-blue-700 border border-blue-300'
                          : 'bg-amber-50 text-amber-700 border border-amber-300'
                      }`}
                    >
                      {m.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Scale Reference */}
      <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-600">
        <div className="font-semibold text-slate-800 mb-1">Grading Scale (10 Point System):</div>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[11px]">
          <div>
            <span className="font-bold text-emerald-800 font-mono">O:</span> 90-100 (10 pts)
          </div>
          <div>
            <span className="font-bold text-emerald-700 font-mono">A+:</span> 85-89 (9 pts)
          </div>
          <div>
            <span className="font-bold text-blue-700 font-mono">A:</span> 75-84 (8 pts)
          </div>
          <div>
            <span className="font-bold text-amber-700 font-mono">B+:</span> 65-74 (7 pts)
          </div>
          <div>
            <span className="font-bold text-amber-800 font-mono">B:</span> 50-64 (6 pts)
          </div>
          <div>
            <span className="font-bold text-red-600 font-mono">RA:</span> Re-appear (&lt;50)
          </div>
        </div>
      </div>
    </div>
  );
}
