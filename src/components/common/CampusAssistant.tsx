'use client';

import React, { useState } from 'react';
import { useCampus } from '@/context/CampusContext';
import {
  HelpCircle,
  X,
  MessageSquare,
  ArrowRight,
  Send,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
  actionTab?: string;
  actionText?: string;
}

const campusFAQs: FAQ[] = [
  {
    q: 'Where can I check my subject-wise attendance?',
    a: 'You can check your live subject attendance, classes attended, classes missed, and 75% eligibility status under the Class Attendance section.',
    actionTab: 'attendance',
    actionText: 'Open Class Attendance',
  },
  {
    q: 'How do I apply for a Bonafide or Certificate?',
    a: 'Navigate to the Certificates section, click "Request Certificate", select Bonafide / Course Completion, state your purpose, and track approval status in real-time.',
    actionTab: 'certificates',
    actionText: 'Request Certificate',
  },
  {
    q: 'Where can I pay outstanding fees and download receipts?',
    a: 'Go to Payments / Fees. You will find your semester fee breakdown, outstanding balance (₹25,000), simulated Pay Now button, and instant PDF receipts.',
    actionTab: 'payments',
    actionText: 'View Fee Portal',
  },
  {
    q: 'How do I submit a hostel or maintenance complaint?',
    a: 'Click on Complaints, choose your category (Hostel, IT, Infrastructure), enter a title and description, and submit. An ID (e.g. CMP-1025) will be generated with a live 5-step progress tracker.',
    actionTab: 'complaints',
    actionText: 'Submit Complaint',
  },
  {
    q: 'How do I request an evening Gate Pass?',
    a: 'Visit the Gate Pass section, enter your destination, out time, and expected return time. Requests are routed to your hostel warden or faculty advisor for quick approval.',
    actionTab: 'gatepass',
    actionText: 'Apply Gate Pass',
  },
  {
    q: 'What is the mandatory attendance threshold?',
    a: 'University regulations mandate a minimum of 75% attendance in each course to be eligible for End-Semester examinations.',
    actionTab: 'attendance',
    actionText: 'Check Attendance Status',
  },
];

export default function CampusAssistant() {
  const { isAssistantOpen, setIsAssistantOpen, setActiveTab } = useCampus();
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; actionTab?: string; actionText?: string }>>([
    {
      sender: 'bot',
      text: 'Hello Ashwanth! I am your CampusOne Helpdesk Assistant. Ask a question or select a frequent topic below.',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isAssistantOpen) return null;

  const handleSelectFAQ = (faq: FAQ) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: faq.q },
      { sender: 'bot', text: faq.a, actionTab: faq.actionTab, actionText: faq.actionText },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');

    // Predefined keyword matching
    const lower = userText.toLowerCase();
    let reply = "I can guide you across CampusOne. For immediate access, please choose a service from the dashboard grid or explore the common topics below.";
    let actionTab: string | undefined;
    let actionText: string | undefined;

    if (lower.includes('attendance') || lower.includes('bunk') || lower.includes('classes')) {
      reply = "Your current overall attendance is 88.4%. You can view detailed breakdowns per course in the Class Attendance section.";
      actionTab = 'attendance';
      actionText = 'Go to Attendance';
    } else if (lower.includes('fee') || lower.includes('payment') || lower.includes('receipt') || lower.includes('money')) {
      reply = "You have ₹25,000 outstanding for Hostel Accommodation due on 15 Oct 2026. You can pay online and download receipts.";
      actionTab = 'payments';
      actionText = 'Go to Payments';
    } else if (lower.includes('complaint') || lower.includes('wifi') || lower.includes('water') || lower.includes('repair')) {
      reply = "You can log maintenance and IT complaints with real-time status tracking in the Complaints section.";
      actionTab = 'complaints';
      actionText = 'Open Complaints';
    } else if (lower.includes('gate pass') || lower.includes('outing') || lower.includes('pass')) {
      reply = "Apply for day outings or medical gate passes under the Gate Pass module.";
      actionTab = 'gatepass';
      actionText = 'Go to Gate Pass';
    } else if (lower.includes('certificate') || lower.includes('bonafide')) {
      reply = "Official Bonafide, No Dues, and Course Completion certificates can be requested from the Certificates module.";
      actionTab = 'certificates';
      actionText = 'Go to Certificates';
    } else if (lower.includes('mark') || lower.includes('grade') || lower.includes('result')) {
      reply = "Your internal marks, lab components, and end-sem grades are updated in the Marks section.";
      actionTab = 'marks';
      actionText = 'Go to Marks';
    }

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'bot', text: reply, actionTab, actionText },
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-84 sm:w-96 bg-white rounded border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[540px]">
      {/* Header */}
      <div className="p-3 bg-[#99004d] text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-pink-200" />
          <span className="font-semibold text-xs tracking-wide">CampusOne Help Assistant</span>
        </div>
        <button
          onClick={() => setIsAssistantOpen(false)}
          className="p-1 hover:bg-[#800040] rounded text-pink-100 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-2.5 rounded max-w-[85%] ${
                m.sender === 'user'
                  ? 'bg-[#99004d] text-white'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
              }`}
            >
              {m.text}
            </div>
            {m.actionTab && (
              <button
                onClick={() => {
                  if (m.actionTab) setActiveTab(m.actionTab);
                  setIsAssistantOpen(false);
                }}
                className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#99004d] hover:underline bg-pink-50 border border-pink-200 px-2 py-0.5 rounded"
              >
                <span>{m.actionText || 'Open Service'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}

        {/* Suggestion Chips */}
        <div className="pt-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">
            Quick Questions:
          </div>
          <div className="flex flex-col gap-1">
            {campusFAQs.slice(0, 4).map((faq, i) => (
              <button
                key={i}
                onClick={() => handleSelectFAQ(faq)}
                className="text-left text-[11px] p-1.5 bg-white hover:bg-[#fdf2f7] hover:border-[#fbcfe8] text-slate-700 hover:text-[#99004d] border border-slate-200 rounded transition"
              >
                • {faq.q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="p-2 border-t border-slate-200 bg-white flex items-center space-x-1.5">
        <input
          type="text"
          placeholder="Ask a campus question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-[#99004d]"
        />
        <button
          onClick={handleSend}
          className="p-1.5 bg-[#99004d] hover:bg-[#800040] text-white rounded transition"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
