import React, { useState } from 'react';
import { 
  X, ExternalLink, Calendar, Users, AlertCircle, 
  MessageSquare, TrendingUp
} from 'lucide-react';
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa6';

export default function TaskTable({ tasks, isAdmin }) {
  const [selectedTask, setSelectedTask] = useState(null);

  // Status ekata hariyana color eka dena function eka
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Current Working': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Not Started': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Planning': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  // Platform ekata hariyana icon eka pennana function eka (react-icons use karala)
  const renderPlatformIcon = (platform) => {
    switch(platform.toLowerCase()) {
      case 'facebook': return <FaFacebook key={platform} className="w-4 h-4 text-blue-500" title="Facebook" />;
      case 'youtube': return <FaYoutube key={platform} className="w-4 h-4 text-red-500" title="YouTube" />;
      case 'instagram': return <FaInstagram key={platform} className="w-4 h-4 text-pink-500" title="Instagram" />;
      case 'tiktok': return <FaTiktok key={platform} className="w-4 h-4 text-white" title="TikTok" />;
      default: return <span key={platform} className="text-xs text-gray-400">{platform}</span>;
    }
  };

  return (
    <>
      {/* Table Section */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-700 bg-gray-800/50 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Social Media & Workflow Log</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700/50 text-gray-300 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">No</th>
                <th className="px-6 py-4 font-medium min-w-[200px]">Video / Task Title</th>
                <th className="px-6 py-4 font-medium">Platforms</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">#{task.no}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-200">{task.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {task.platforms.map(renderPlatformIcon)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <button 
                      onClick={() => setSelectedTask(task)}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                      View
                    </button>
                    {/* Admin nemei nam (Editor nam) edit karanna button pennanna puluwan */}
                    {!isAdmin && (
                      <button className="ml-3 text-yellow-500 hover:text-yellow-400 font-medium text-xs">Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Drawer (Side Panel) */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Dark Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedTask(null)}
          ></div>
          
          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-gray-900 border-l border-gray-700 h-full overflow-y-auto shadow-2xl flex flex-col animate-slide-in">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
              <div>
                <span className="text-gray-400 text-sm">Task #{selectedTask.no}</span>
                <h2 className="text-lg font-bold text-white mt-1 leading-tight">{selectedTask.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedTask(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* Status & Platforms */}
              <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div>
                  <p className="text-gray-400 text-xs uppercase mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs uppercase mb-2">Platforms</p>
                  <div className="flex gap-2 justify-end">
                    {selectedTask.platforms.map(renderPlatformIcon)}
                  </div>
                </div>
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs uppercase">Record Day</span>
                  </div>
                  <p className="text-white font-medium text-sm">{selectedTask.recordDay || 'N/A'}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs uppercase">Finalize Date</span>
                  </div>
                  <p className="text-white font-medium text-sm">{selectedTask.finalizeDate || 'N/A'}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 col-span-2">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs uppercase">Uploaded Date</span>
                  </div>
                  <p className="text-white font-medium text-sm">{selectedTask.uploadedDate || 'Not uploaded yet'}</p>
                </div>
              </div>

              {/* Marketing Details */}
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs uppercase">Audience Target</span>
                  </div>
                  <p className="text-white text-sm">{selectedTask.audience}</p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                  <span className="text-gray-400 text-sm">Boost Status</span>
                  {selectedTask.isBoosted ? (
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs font-bold border border-red-500/30">BOOSTED 🔥</span>
                  ) : (
                    <span className="text-gray-500 text-xs font-medium">Organic</span>
                  )}
                </div>
              </div>

              {/* Performance & Links */}
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs uppercase">Reach / Views</span>
                  </div>
                  <p className="text-white font-bold text-lg">{selectedTask.reach || '0'}</p>
                </div>
                
                {selectedTask.url && (
                  <div className="border-t border-gray-700 pt-3">
                    <a href={selectedTask.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                      <ExternalLink className="w-4 h-4" />
                      View Live Post
                    </a>
                  </div>
                )}
              </div>

              {/* Problems & Feedback */}
              {(selectedTask.problem || selectedTask.feedback) && (
                <div className="space-y-4">
                  {selectedTask.problem && (
                    <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30">
                      <div className="flex items-center gap-2 text-red-400 mb-2">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs uppercase font-bold">Problem / Issue</span>
                      </div>
                      <p className="text-red-200 text-sm">{selectedTask.problem}</p>
                    </div>
                  )}
                  
                  {selectedTask.feedback && (
                    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs uppercase">Feedback / Notes</span>
                      </div>
                      <p className="text-gray-300 text-sm">{selectedTask.feedback}</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}