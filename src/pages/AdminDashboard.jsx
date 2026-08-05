import React from 'react';
import KPICards from '../components/KPICards';
import TaskTable from '../components/TaskTable';

export default function AdminDashboard() {
  // Social Media Workflow ekata hariyana KPI data
  const kpiData = {
    completed: 124,
    currentWorking: 5,
    pending: 12,
    notStarted: 8,
    planning: 3,
    avgTime: '2.5 Days',
    successRate: '94%',
    overdueTasks: 2
  };

  // Aluth Table Structure ekata hariyana Social Media Dummy Data
  const dummySocialTasks = [
    { 
      id: 1, 
      no: 'VID-085',
      title: 'August English Speaking Challenge Promo', 
      platforms: ['Facebook', 'TikTok', 'Instagram'],
      status: 'Completed',
      recordDay: '2026-08-01',
      audience: 'Students 18-24, Sri Lanka',
      isBoosted: true,
      problem: null,
      finalizeDate: '2026-08-03',
      uploadedDate: '2026-08-04',
      url: 'https://fb.com/watch/ehiexample1',
      reach: '45.2K Views',
      feedback: 'Good engagement on TikTok. Keep using trending audio.'
    },
    { 
      id: 2, 
      no: 'VID-086',
      title: 'Grammar Tips: Active vs Passive Voice', 
      platforms: ['YouTube', 'Facebook'],
      status: 'Current Working',
      recordDay: '2026-08-04',
      audience: 'Professionals & O/L Students',
      isBoosted: false,
      problem: 'Waiting for the teacher to re-record the audio for the second part.',
      finalizeDate: '2026-08-06',
      uploadedDate: null,
      url: null,
      reach: null,
      feedback: 'Make sure to add big text overlays for YouTube Shorts.'
    },
    { 
      id: 3, 
      no: 'VID-087',
      title: 'Student Success Story Interview', 
      platforms: ['Facebook', 'Instagram'],
      status: 'Pending',
      recordDay: '2026-08-07',
      audience: 'Parents & Working Professionals',
      isBoosted: true,
      problem: null,
      finalizeDate: '2026-08-10',
      uploadedDate: null,
      url: null,
      reach: null,
      feedback: null
    },
    { 
      id: 4, 
      no: 'IMG-042',
      title: 'New Intake August 2026 Poster', 
      platforms: ['Facebook', 'Instagram'],
      status: 'Completed',
      recordDay: 'N/A (Design Only)',
      audience: 'General, All Districts',
      isBoosted: true,
      problem: null,
      finalizeDate: '2026-08-02',
      uploadedDate: '2026-08-03',
      url: 'https://instagram.com/p/ehiexample',
      reach: '12K Reach',
      feedback: 'Client requested to change the background to a lighter blue next time.'
    },
  ];

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 font-sans">
      
      {/* Header Section */}
      <header className="mb-8 border-b border-gray-700 pb-5 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-white">
            EHI Workflow <span className="text-red-500">Overview</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Keshan's Social Media & Task Production Tracker (Admin View)</p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-sm text-gray-400">Current Date</p>
          <p className="text-lg font-semibold text-gray-200">{today}</p>
        </div>
      </header>

      {/* KPIs */}
      <KPICards data={kpiData} />

      {/* Task Table (isAdmin={true} nisa Edit buttons penne na) */}
      <div className="mb-10">
        <TaskTable tasks={dummySocialTasks} isAdmin={true} />
      </div>

    </div>
  );
}