import React, { useState, useEffect } from 'react';
import { Loader2, Download } from 'lucide-react';
import KPICards from '../components/KPICards';
import TaskTable from '../components/TaskTable';

// OYAGE GOOGLE APPS SCRIPT URL EKA
const API_URL = 'https://script.google.com/macros/s/AKfycbyANd24NfwkXU3zWvd959p3UNguMTYPGabNm_J-wAObzpd2LmHjPowre2YIttvQTnqeww/exec';

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Data Fetch Karana Function eka
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      const formattedTasks = data.map(item => ({
        id: item.TaskID,
        no: item.TaskID,
        title: item.Title,
        platforms: item.Platforms ? item.Platforms.split(',').map(p => p.trim()) : [],
        status: item.Status,
        recordDay: item.RecordDay ? new Date(item.RecordDay).toISOString().split('T')[0] : '',
        finalizeDate: item.FinalizeDate ? new Date(item.FinalizeDate).toISOString().split('T')[0] : '',
        uploadedDate: item.UploadedDate ? new Date(item.UploadedDate).toISOString().split('T')[0] : '',
        audience: item.Audience,
        isBoosted: item.IsBoosted === 'TRUE' || item.IsBoosted === true,
        problem: item.Problem,
        feedback: item.Feedback,
        url: item.URL,
        reach: item.Reach
      }));
      
      setTasks(formattedTasks.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // DELETE TASK FUNCTION FOR ADMIN
  const handleDelete = async (taskId) => {
    if (!window.confirm(`Are you sure you want to delete task ${taskId}?`)) return;
    
    setIsLoading(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', taskId: taskId })
      });
      
      setTimeout(() => { fetchTasks(); }, 1500); 
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task!");
      setIsLoading(false);
    }
  };

  // CSV Report Export Function
  const exportToCSV = () => {
    if (tasks.length === 0) return alert("No tasks to export!");
    
    const headers = ["TaskID", "Title", "Status", "Platforms", "RecordDay", "FinalizeDate", "UploadedDate", "Audience", "IsBoosted", "Reach", "Problem", "Feedback", "URL"];
    const csvRows = [headers.join(',')];

    tasks.forEach(t => {
      const row = [
        t.no,
        `"${(t.title || '').replace(/"/g, '""')}"`,
        t.status,
        `"${t.platforms.join(', ')}"`,
        t.recordDay,
        t.finalizeDate,
        t.uploadedDate,
        `"${(t.audience || '').replace(/"/g, '""')}"`,
        t.isBoosted ? 'TRUE' : 'FALSE',
        `"${(t.reach || '').replace(/"/g, '""')}"`,
        `"${(t.problem || '').replace(/"/g, '""')}"`,
        `"${(t.feedback || '').replace(/"/g, '""')}"`,
        `"${t.url || ''}"`
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `EHI_Workflow_Report_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  // Dynamic KPI Data
  const kpiData = {
    completed: tasks.filter(t => t.status === 'Completed').length,
    currentWorking: tasks.filter(t => t.status === 'Current Working').length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    notStarted: tasks.filter(t => t.status === 'Not Started').length,
    planning: tasks.filter(t => t.status === 'Planning').length,
    avgTime: 'Analytics Syncing...',
    successRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100) + '%' : '0%',
    overdueTasks: tasks.filter(t => t.problem !== '').length
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 font-sans flex flex-col justify-between">
      
      <div>
        {/* Header Section */}
        <header className="mb-8 border-b border-gray-700 pb-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          
          {/* Logo & Professional Title Area */}
          <div className="flex items-center gap-4">
            <img 
              src="/hero.png"
              alt="EHI Logo" 
              className="h-10 md:h-12 w-auto object-contain" 
            />
            <div className="border-l border-gray-700 pl-4">
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white">
                EHI Workflow <span className="text-red-500">Overview</span>
              </h1>
              <p className="text-gray-400 text-xs md:text-sm">Social Media & Task Production Tracker (Admin View)</p>
            </div>
          </div>

          {/* Action / Refresh Buttons Area */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400">System Status</p>
              <p className="text-sm font-semibold text-green-400 flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Sync
              </p>
            </div>
            <button 
              onClick={exportToCSV}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
              title="Export Report"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button 
              onClick={fetchTasks}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              🔄 Refresh
            </button>
          </div>

        </header>

        {/* KPI Cards */}
        <KPICards data={kpiData} />

        {/* Task Table (Admin mode: full access, can delete items) */}
        <div className="mb-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-gray-800 rounded-xl border border-gray-700">
              <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
              <span className="ml-3 text-gray-400 font-medium">Syncing database records...</span>
            </div>
          ) : (
            <TaskTable tasks={tasks} isAdmin={true} onDelete={handleDelete} />
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs md:text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© 2026 EHI Media. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Designed & Developed with by 
          <span className="text-gray-300 font-semibold">Keshan Panditharathna</span> 
          <span className="text-gray-600">|</span> 
          <span className="text-red-400 font-medium">KreativeLabs</span>
        </p>
      </footer>

    </div>
  );
}