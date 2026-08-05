import React from 'react';
import { 
  CheckCircle2, 
  PlayCircle, 
  Hourglass, 
  CircleDashed, 
  Lightbulb, 
  Timer, 
  Target, 
  AlertTriangle 
} from 'lucide-react';

export default function KPICards({ data }) {
  return (
    <div className="space-y-8 mb-10">
      
      {/* Primary KPIs - 5 Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg border-l-4 border-l-green-500 hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Completed</h3>
          </div>
          <p className="text-3xl font-bold text-white">{data.completed}</p>
        </div>
        
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg border-l-4 border-l-blue-500 hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <PlayCircle className="w-4 h-4 text-blue-500" />
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Current Working</h3>
          </div>
          <p className="text-3xl font-bold text-white">{data.currentWorking}</p>
        </div>
        
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg border-l-4 border-l-yellow-500 hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Hourglass className="w-4 h-4 text-yellow-500" />
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Pending</h3>
          </div>
          <p className="text-3xl font-bold text-white">{data.pending}</p>
        </div>
        
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg border-l-4 border-l-orange-500 hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <CircleDashed className="w-4 h-4 text-orange-500" />
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Not Started</h3>
          </div>
          <p className="text-3xl font-bold text-white">{data.notStarted}</p>
        </div>
        
        <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg border-l-4 border-l-purple-500 hover:bg-gray-750 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-purple-500" />
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Planning</h3>
          </div>
          <p className="text-3xl font-bold text-white">{data.planning}</p>
        </div>
      </div>

      {/* Advanced KPIs Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-4 border-b border-gray-700 pb-2">
          Performance Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg border-l-4 border-l-cyan-500 flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Avg Time per Task</h3>
              <p className="text-2xl font-bold text-white mt-1">{data.avgTime}</p>
            </div>
            <div className="bg-cyan-500/10 p-3 rounded-lg">
              <Timer className="w-8 h-8 text-cyan-500" />
            </div>
          </div>
          
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg border-l-4 border-l-teal-500 flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Success Rate</h3>
              <p className="text-2xl font-bold text-white mt-1">{data.successRate}</p>
            </div>
            <div className="bg-teal-500/10 p-3 rounded-lg">
              <Target className="w-8 h-8 text-teal-500" />
            </div>
          </div>
          
          <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg border-l-4 border-l-red-500 flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Overdue Tasks</h3>
              <p className="text-2xl font-bold text-white mt-1">{data.overdueTasks}</p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}