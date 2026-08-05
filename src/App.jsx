import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import EditorDashboard from './pages/EditorDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Dashboard - Main URL eka (Read-only) */}
        <Route path="/" element={<AdminDashboard />} />
        
        {/* Editor Dashboard - /editor kiyala giyama (Full Access) */}
        <Route path="/editor" element={<EditorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}