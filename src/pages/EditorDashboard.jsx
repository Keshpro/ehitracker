import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import KPICards from '../components/KPICards';
import TaskTable from '../components/TaskTable';

export default function EditorDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 font-sans relative">
      
      {/* Header Section */}
      <header className="mb-8 border-b border-gray-700 pb-5 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-white">
            My <span className="text-red-500">Workspace</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Manage social media tasks and update workflow</p>
        </div>
        <div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-red-900/20 font-semibold transition-all duration-200 flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <Plus className="w-5 h-5" /> Add New Task
          </button>
        </div>
      </header>

      <KPICards data={kpiData} />

      {/* Task Table (isAdmin={false} nisa Edit buttons penawa) */}
      <div className="mb-10">
        <TaskTable tasks={dummySocialTasks} isAdmin={false} />
      </div>

      {/* Add New Task Modal - Aluth Structure eka anuwa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-3xl my-8">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-800 rounded-t-xl z-10">
              <h3 className="text-xl font-bold text-white">Log New Task / Video</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Body (Scrollable) */}
            <div className="p-6">
              <form className="space-y-6">
                
                {/* Section 1: Basic Info */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Title (Video/Design Name)</label>
                      <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="e.g., IELTS Registration Promo" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Task No (Auto-gen / Manual)</label>
                      <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500" placeholder="VID-088" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Progress / Status</label>
                      <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500">
                        <option>Planning</option>
                        <option>Not Started</option>
                        <option>Pending</option>
                        <option>Current Working</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Production Dates */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Production Dates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Record Day</label>
                      <input type="date" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 focus:outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Finalize Date</label>
                      <input type="date" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 focus:outline-none focus:border-red-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Uploaded Date</label>
                      <input type="date" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 focus:outline-none focus:border-red-500" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Marketing & Reach */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Marketing Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Platforms (Select multiple)</label>
                      <select multiple className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 h-24">
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>TikTok</option>
                        <option>YouTube</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Target Audience</label>
                        <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="e.g., O/L Students" />
                      </div>
                      <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg border border-gray-700">
                        <input type="checkbox" id="boost" className="w-5 h-5 accent-red-500 rounded" />
                        <label htmlFor="boost" className="text-sm font-medium text-white cursor-pointer">Boost this post? (Ads)</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Post-Production & Notes */}
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Results & Notes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Post URL</label>
                      <input type="url" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="https://" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Reach / Views</label>
                      <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="e.g., 10K Views" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1 text-red-400">Problem / Issue (If any)</label>
                      <textarea rows="2" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="What went wrong?"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Feedback / Notes</label>
                      <textarea rows="2" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="Admin notes or insights..."></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Modal Footer Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-700 sticky bottom-0 bg-gray-800 rounded-b-xl py-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-lg font-semibold transition-colors shadow-lg shadow-red-900/20"
                  >
                    Save Task
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}