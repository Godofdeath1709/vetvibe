'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import { Star, MessageSquare, Send, CheckCircle2, HelpCircle } from 'lucide-react';

export default function FeedbackSection() {
  const { currentProfile, attendance } = useCampus();
  const [activeTab, setActiveTab] = useState<'course' | 'tlp' | 'exit'>('course');

  // Course feedback state
  const [selectedCourse, setSelectedCourse] = useState('21CS201 - Cryptography & Network Security');
  const [ratingClarity, setRatingClarity] = useState(5);
  const [ratingSyllabus, setRatingSyllabus] = useState(4);
  const [ratingLab, setRatingLab] = useState(5);
  const [courseComments, setCourseComments] = useState('');
  const [courseToast, setCourseToast] = useState(false);

  // TLP feedback state
  const [tlpPace, setTlpPace] = useState('Optimal');
  const [tlpMaterial, setTlpMaterial] = useState('Extremely Comprehensive');
  const [tlpQueryResolution, setTlpQueryResolution] = useState(5);
  const [tlpComments, setTlpComments] = useState('');
  const [tlpToast, setTlpToast] = useState(false);

  // Exit survey state
  const [exitPlacement, setExitPlacement] = useState('High Quality');
  const [exitHostel, setExitHostel] = useState('Satisfactory');
  const [exitLibrary, setExitLibrary] = useState('Excellent');
  const [exitRemarks, setExitRemarks] = useState('');
  const [exitToast, setExitToast] = useState(false);

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCourseToast(true);
    setCourseComments('');
    setTimeout(() => setCourseToast(false), 5000);
  };

  const handleTlpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTlpToast(true);
    setTlpComments('');
    setTimeout(() => setTlpToast(false), 5000);
  };

  const handleExitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExitToast(true);
    setExitRemarks('');
    setTimeout(() => setExitToast(false), 5000);
  };

  const renderStars = (rating: number, setRating: (r: number) => void) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => setRating(star)}
          className={`p-1 transition ${star <= rating ? 'text-amber-400' : 'text-slate-300'}`}
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
      ))}
      <span className="text-xs font-bold text-slate-700 ml-1">{rating} / 5</span>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-white p-4 rounded border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Academic Feedback & Quality Assurance Surveys
            </h2>
            <span className="text-xs bg-pink-50 text-[#99004d] font-semibold px-2 py-0.5 rounded border border-pink-200">
              IQAC / NAAC A++ Evaluation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Anonymous student feedback directly submitted to Dean of Academics for continuous improvement.
          </p>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex bg-slate-100 p-1 rounded border border-slate-200">
          <button
            onClick={() => setActiveTab('course')}
            className={`px-3 py-1 text-xs font-semibold rounded transition ${
              activeTab === 'course' ? 'bg-[#99004d] text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            Course & Faculty
          </button>
          <button
            onClick={() => setActiveTab('tlp')}
            className={`px-3 py-1 text-xs font-semibold rounded transition ${
              activeTab === 'tlp' ? 'bg-[#99004d] text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            TLP Feedback
          </button>
          <button
            onClick={() => setActiveTab('exit')}
            className={`px-3 py-1 text-xs font-semibold rounded transition ${
              activeTab === 'exit' ? 'bg-[#99004d] text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            Exit Survey
          </button>
        </div>
      </div>

      {/* Course & Faculty Feedback Form */}
      {activeTab === 'course' && (
        <div className="bg-white rounded border border-slate-200 p-4">
          <div className="border-b pb-3 mb-3 border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Course & Instructor Evaluation
            </h3>
            <p className="text-[11px] text-slate-500">
              All ratings are completely confidential and aggregated at department level.
            </p>
          </div>

          {courseToast && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Thank you! Your course feedback has been submitted to the Academic Council.</span>
            </div>
          )}

          <form onSubmit={handleCourseSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Select Enrolled Course & Instructor
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
              >
                {attendance.map((a) => (
                  <option key={a.subjectCode} value={`${a.subjectCode} - ${a.subjectName}`}>
                    {a.subjectCode} - {a.subjectName} ({a.faculty})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-slate-50 rounded border border-slate-200">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  1. Clarity & Conceptual Depth
                </label>
                {renderStars(ratingClarity, setRatingClarity)}
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  2. Syllabus Coverage & Timeliness
                </label>
                {renderStars(ratingSyllabus, setRatingSyllabus)}
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  3. Practical Lab & Hands-on Guidance
                </label>
                {renderStars(ratingLab, setRatingLab)}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Constructive Remarks & Recommendations
              </label>
              <textarea
                rows={3}
                placeholder="Mention any specific teaching methodologies, lecture notes quality, or recommended improvements..."
                value={courseComments}
                onChange={(e) => setCourseComments(e.target.value)}
                required
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Anonymous Feedback</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TLP Feedback Form */}
      {activeTab === 'tlp' && (
        <div className="bg-white rounded border border-slate-200 p-4">
          <div className="border-b pb-3 mb-3 border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Teaching-Learning Process (TLP) Mid-Semester Evaluation
            </h3>
            <p className="text-[11px] text-slate-500">
              Holistic assessment of classroom pacing, digital LMS study materials, and interactive pedagogy.
            </p>
          </div>

          {tlpToast && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">TLP survey response recorded successfully.</span>
            </div>
          )}

          <form onSubmit={handleTlpSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Classroom Teaching Pace & Rigor
                </label>
                <select
                  value={tlpPace}
                  onChange={(e) => setTlpPace(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
                >
                  <option value="Optimal">Optimal & Easy to Follow</option>
                  <option value="Fast">Fast Paced (Needs Revision Hours)</option>
                  <option value="Slow">Slow Paced</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Availability of Course Repository / LMS Materials
                </label>
                <select
                  value={tlpMaterial}
                  onChange={(e) => setTlpMaterial(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
                >
                  <option value="Extremely Comprehensive">Extremely Comprehensive & Timely</option>
                  <option value="Moderate">Moderate (Slides only)</option>
                  <option value="Inadequate">Needs More Problem Worksheets</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Faculty Approachability & Doubt Resolution
              </label>
              {renderStars(tlpQueryResolution, setTlpQueryResolution)}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                General Observations on Semester Learning
              </label>
              <textarea
                rows={3}
                placeholder="Share feedback on lab infrastructure, tutorial problem sets, or guest lectures..."
                value={tlpComments}
                onChange={(e) => setTlpComments(e.target.value)}
                required
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit TLP Survey</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Exit Survey Form */}
      {activeTab === 'exit' && (
        <div className="bg-white rounded border border-slate-200 p-4">
          <div className="border-b pb-3 mb-3 border-slate-200">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Institutional Exit Survey & Campus Ecosystem Evaluation
            </h3>
            <p className="text-[11px] text-slate-500">
              Evaluates overall campus facilities, library, sports, and training placement support.
            </p>
          </div>

          {exitToast && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Exit survey recorded in institutional quality metrics.</span>
            </div>
          )}

          <form onSubmit={handleExitSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Placement & Career Support
                </label>
                <select
                  value={exitPlacement}
                  onChange={(e) => setExitPlacement(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
                >
                  <option value="High Quality">High Quality & Industry Relevant</option>
                  <option value="Satisfactory">Satisfactory</option>
                  <option value="Needs Focus">Needs More Core Company Drives</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Hostel & Mess Catering
                </label>
                <select
                  value={exitHostel}
                  onChange={(e) => setExitHostel(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
                >
                  <option value="Excellent">Excellent Hygiene & Variety</option>
                  <option value="Satisfactory">Satisfactory</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Central Library & Research
                </label>
                <select
                  value={exitLibrary}
                  onChange={(e) => setExitLibrary(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-slate-800 bg-white"
                >
                  <option value="Excellent">Excellent Database Access</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Final Institutional Recommendations
              </label>
              <textarea
                rows={3}
                placeholder="Overall suggestions for university academic and extracurricular enhancement..."
                value={exitRemarks}
                onChange={(e) => setExitRemarks(e.target.value)}
                required
                className="w-full border border-slate-300 rounded p-2 text-slate-800"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#99004d] hover:bg-[#800040] text-white rounded font-semibold flex items-center space-x-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Exit Survey</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
