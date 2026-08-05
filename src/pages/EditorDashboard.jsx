import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import KPICards from '../components/KPICards';
import TaskTable from '../components/TaskTable';

// OYAGE GOOGLE APPS SCRIPT URL EKA
const API_URL = 'https://script.google.com/macros/s/AKfycbyANd24NfwkXU3zWvd959p3UNguMTYPGabNm_J-wAObzpd2LmHjPowre2YIttvQTnqeww/exec';

export default function EditorDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form ekata onawena State eka
  const [formData, setFormData] = useState({
    title: '',
    taskNo: '',
    status: 'Planning',
    recordDay: '',
    finalizeDate: '',
    uploadedDate: '',
    platforms: [],
    audience: '',
    isBoosted: false,
    url: '',
    reach: '',
    problem: '',
    feedback: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'select-multiple') {
      const options = [...e.target.options];
      const values = options.filter(option => option.selected).map(option => option.value);
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  // EDIT BUTTON EKA CLICK KALAMA
  const handleEdit = (task) => {
    setFormData({
      title: task.title || '',
      taskNo: task.no || '',
      status: task.status || 'Planning',
      recordDay: task.recordDay || '',
      finalizeDate: task.finalizeDate || '',
      uploadedDate: task.uploadedDate || '',
      platforms: task.platforms || [],
      audience: task.audience || '',
      isBoosted: task.isBoosted || false,
      url: task.url || '',
      reach: task.reach || '',
      problem: task.problem || '',
      feedback: task.feedback || ''
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // DELETE BUTTON EKA CLICK KALAMA
  const handleDelete = async (taskId) => {
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

  // DATA SAVE/UPDATE KIRIMA
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.taskNo || formData.taskNo.trim() === '') {
      alert("Task No is required! Please enter a valid Task No (e.g., VID-088)");
      return;
    }

    setIsSaving(true);

    const payload = {
      TaskID: formData.taskNo,
      Title: formData.title,
      RecordDay: formData.recordDay,
      FinalizeDate: formData.finalizeDate,
      UploadedDate: formData.uploadedDate,
      Platforms: formData.platforms.join(', '),
      Audience: formData.audience,
      IsBoosted: formData.isBoosted ? 'TRUE' : 'FALSE',
      Status: formData.status,
      URL: formData.url,
      Reach: formData.reach,
      Problem: formData.problem,
      Feedback: formData.feedback
    };

    try {
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: isEditing ? 'update' : 'add', data: payload })
      });
      
      setIsModalOpen(false);
      setIsEditing(false);
      setFormData({
        title: '', taskNo: '', status: 'Planning', recordDay: '', finalizeDate: '', 
        uploadedDate: '', platforms: [], audience: '', isBoosted: false, 
        url: '', reach: '', problem: '', feedback: ''
      });
      
      setTimeout(() => { fetchTasks(); }, 1500);
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Error saving task!");
    }
    setIsSaving(false);
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
              <p className="text-gray-400 text-xs md:text-sm">Social Media & Task Production Tracker (Editor View)</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={fetchTasks}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : '🔄 Refresh'}
            </button>
            <button 
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  title: '', taskNo: '', status: 'Planning', recordDay: '', finalizeDate: '', 
                  uploadedDate: '', platforms: [], audience: '', isBoosted: false, 
                  url: '', reach: '', problem: '', feedback: ''
                });
                setIsModalOpen(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-red-900/20 font-semibold transition-all duration-200 flex items-center gap-2 text-sm"
            >
              <Plus className="w-5 h-5" /> Add New Task
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <KPICards data={kpiData} />

        {/* Task Table */}
        <div className="mb-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-gray-800 rounded-xl border border-gray-700">
              <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
              <span className="ml-3 text-gray-400 font-medium">Syncing with Google Sheets...</span>
            </div>
          ) : (
            <TaskTable tasks={tasks} isAdmin={false} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>

        {/* Add / Edit Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-3xl my-8">
              
              <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-800 rounded-t-xl z-10">
                <h3 className="text-xl font-bold text-white">{isEditing ? 'Edit Task' : 'Log New Task / Video'}</h3>
                <button 
                  onClick={() => { setIsModalOpen(false); setIsEditing(false); }} 
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  
                  {/* Section 1: Basic Info */}
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title (Video/Design Name)</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500" placeholder="e.g., IELTS Registration Promo" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Task No</label>
                        <input 
                          type="text" 
                          name="taskNo" 
                          value={formData.taskNo} 
                          onChange={handleInputChange} 
                          required 
                          disabled={isEditing} 
                          className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                          placeholder="e.g., VID-088" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Progress / Status</label>
                        <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500">
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
                        <input type="date" name="recordDay" value={formData.recordDay} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Finalize Date</label>
                        <input type="date" name="finalizeDate" value={formData.finalizeDate} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Uploaded Date</label>
                        <input type="date" name="uploadedDate" value={formData.uploadedDate} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 focus:outline-none focus:border-red-500" />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Marketing & Reach */}
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Marketing Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Platforms (Select multiple)</label>
                        <select multiple name="platforms" value={formData.platforms} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 h-24">
                          <option value="Facebook">Facebook</option>
                          <option value="Instagram">Instagram</option>
                          <option value="TikTok">TikTok</option>
                          <option value="YouTube">YouTube</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Target Audience</label>
                          <input type="text" name="audience" value={formData.audience} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="e.g., O/L Students" />
                        </div>
                        <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg border border-gray-700">
                          <input type="checkbox" id="boost" name="isBoosted" checked={formData.isBoosted} onChange={handleInputChange} className="w-5 h-5 accent-red-500 rounded" />
                          <label htmlFor="boost" className="text-sm font-medium text-white cursor-pointer">Boost this post? (Ads)</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Results & Notes */}
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Results & Notes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Post URL</label>
                        <input type="url" name="url" value={formData.url} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="https://" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Reach / Views</label>
                        <input type="text" name="reach" value={formData.reach} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="e.g., 10K Views" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1 text-red-400">Problem / Issue (If any)</label>
                        <textarea name="problem" value={formData.problem} onChange={handleInputChange} rows="2" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="What went wrong?"></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Feedback / Notes</label>
                        <textarea name="feedback" value={formData.feedback} onChange={handleInputChange} rows="2" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500" placeholder="Admin notes or insights..."></textarea>
                      </div>
                    </div>
                  </div>
                  
                  {/* Modal Footer Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-700 sticky bottom-0 bg-gray-800 rounded-b-xl py-4">
                    <button 
                      type="button" 
                      onClick={() => { setIsModalOpen(false); setIsEditing(false); }}
                      className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSaving} 
                      className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-8 py-2.5 rounded-lg font-semibold transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2"
                    >
                      {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEditing ? 'Update Task' : 'Save Task')}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs md:text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© 2026 EHI Media. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Designed & Developed with  by 
          <span className="text-gray-300 font-semibold">Keshan Panditharathna</span> 
          <span className="text-gray-600">|</span> 
          <span className="text-red-400 font-medium">KreativeLabs</span>
        </p>
      </footer>

    </div>
  );
}