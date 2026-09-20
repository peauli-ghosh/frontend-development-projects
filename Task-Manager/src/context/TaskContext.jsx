import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const TaskContext = createContext(null);
const STORAGE_KEY = 'neo_task_manager_tasks_v1';
const AUTH_KEY = 'neo_task_manager_auth_v1';
const THEME_KEY = 'neo_task_manager_theme_v1';

const seedTasks = [
  {
    id: 't-1001',
    title: 'Finish React assignment',
    description: 'Complete routing, nested routes, dynamic task details, and responsive UI.',
    priority: 'High',
    category: 'Development',
    due: '2026-09-21',
    status: 'in-progress',
    labels: ['React', 'College'],
    subtasks: [
      { id: 's1', title: 'Build route structure', done: true },
      { id: 's2', title: 'Create task detail page', done: false },
      { id: 's3', title: 'Test responsive layout', done: false }
    ],
    notes: 'Use the assignment rubric as the final checklist.',
    createdAt: '2026-09-18T09:30:00.000Z',
    updatedAt: '2026-09-20T10:15:00.000Z'
  },
  {
    id: 't-1002',
    title: 'Review portfolio projects',
    description: 'Check the seven frontend projects before the next GitHub push.',
    priority: 'Medium',
    category: 'Portfolio',
    due: '2026-09-23',
    status: 'todo',
    labels: ['GitHub', 'Portfolio'],
    subtasks: [],
    notes: '',
    createdAt: '2026-09-17T11:00:00.000Z',
    updatedAt: '2026-09-19T11:00:00.000Z'
  },
  {
    id: 't-1003',
    title: 'Prepare ESA revision list',
    description: 'Create a compact revision checklist for the five examination subjects.',
    priority: 'Medium',
    category: 'Study',
    due: '2026-09-25',
    status: 'todo',
    labels: ['ESA', 'Study'],
    subtasks: [],
    notes: 'Keep each subject on a separate section.',
    createdAt: '2026-09-15T08:00:00.000Z',
    updatedAt: '2026-09-18T08:00:00.000Z'
  },
  {
    id: 't-1004',
    title: 'Deploy weather dashboard',
    description: 'Run a production build and verify the deployment on desktop and mobile.',
    priority: 'Low',
    category: 'Development',
    due: '2026-09-19',
    status: 'completed',
    labels: ['Vercel'],
    subtasks: [
      { id: 's4', title: 'Build project', done: true },
      { id: 's5', title: 'Deploy', done: true }
    ],
    notes: 'Deployment verified.',
    createdAt: '2026-09-12T10:00:00.000Z',
    updatedAt: '2026-09-19T17:00:00.000Z'
  },
  {
    id: 't-1005',
    title: 'Update CV project links',
    description: 'Add the latest deployed projects and GitHub repositories to the resume.',
    priority: 'High',
    category: 'Career',
    due: '2026-09-27',
    status: 'completed',
    labels: ['CV'],
    subtasks: [],
    notes: '',
    createdAt: '2026-09-10T12:00:00.000Z',
    updatedAt: '2026-09-18T16:00:00.000Z'
  }
];

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedTasks;
  } catch {
    return seedTasks;
  }
}

function makeId(prefix = 't') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(loadTasks);
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(AUTH_KEY) === 'true');
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light');

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem(AUTH_KEY, String(isAuthenticated)), [isAuthenticated]);
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'completed').length;
    const active = tasks.filter(t => t.status !== 'completed').length;
    const overdue = tasks.filter(t => t.status !== 'completed' && t.due && new Date(`${t.due}T23:59:59`) < new Date()).length;
    const high = tasks.filter(t => t.status !== 'completed' && t.priority === 'High').length;
    return { total: tasks.length, completed, active, overdue, high, progress: tasks.length ? Math.round((completed / tasks.length) * 100) : 0 };
  }, [tasks]);

  const addTask = (data) => {
    const now = new Date().toISOString();
    const task = { id: makeId(), status: 'todo', labels: [], subtasks: [], notes: '', ...data, createdAt: now, updatedAt: now };
    setTasks(prev => [task, ...prev]);
    return task.id;
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task));
  };

  const deleteTask = (id) => setTasks(prev => prev.filter(task => task.id !== id));

  const toggleTask = (id) => setTasks(prev => prev.map(task => task.id === id ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed', updatedAt: new Date().toISOString() } : task));

  const duplicateTask = (id) => {
    const original = tasks.find(t => t.id === id);
    if (!original) return null;
    const now = new Date().toISOString();
    const copy = { ...original, id: makeId(), title: `${original.title} (Copy)`, status: 'todo', createdAt: now, updatedAt: now, subtasks: original.subtasks.map(s => ({ ...s, id: makeId('s') })) };
    setTasks(prev => [copy, ...prev]);
    return copy.id;
  };

  const clearCompleted = () => setTasks(prev => prev.filter(task => task.status !== 'completed'));

  const login = (name = 'Demo User') => {
    localStorage.setItem('neo_task_manager_user_v1', name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <TaskContext.Provider value={{ tasks, stats, addTask, updateTask, deleteTask, toggleTask, duplicateTask, clearCompleted, isAuthenticated, login, logout, theme, setTheme }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used inside TaskProvider');
  return ctx;
}
