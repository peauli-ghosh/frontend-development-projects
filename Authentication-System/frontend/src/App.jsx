import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails';
import CompletedTasks from './pages/CompletedTasks';
import { TaskProvider } from './context/TaskContext';
import './styles/app.css';

function AppContent() {
  const [theme, setTheme] = useState(() => localStorage.getItem('auth-theme-v2') || 'dark');
  const [toast, setToast] = useState(null);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('auth-theme-v2', theme); }, [theme]);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 6500); return () => clearTimeout(id); }, [toast]);
  return <AppShell theme={theme} setTheme={setTheme}>
    <Toast toast={toast} onClose={() => setToast(null)} />
    <TaskProvider>
    <Routes>
      <Route path="/login" element={<Login onToast={setToast} />} />
      <Route path="/signup" element={<Signup onToast={setToast} />} />
      <Route element={<ProtectedRoute />}><Route path="/dashboard" element={<Dashboard onToast={setToast} />} /><Route path="/tasks" element={<Tasks />} /><Route path="/tasks/new" element={<AddTask />} /><Route path="/tasks/:id" element={<TaskDetails />} /><Route path="/completed" element={<CompletedTasks />} /></Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </TaskProvider>
  </AppShell>;
}

export default function App() { return <BrowserRouter><AuthProvider><AppContent /></AuthProvider></BrowserRouter>; }


