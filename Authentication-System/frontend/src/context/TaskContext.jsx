import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext(null);

function keyFor(username) { return `auth_task_manager_${username}`; }

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const key = user ? keyFor(user.username) : null;
  const [tasks, setTasks] = useState(() => key ? JSON.parse(localStorage.getItem(key) || '[]') : []);
  useEffect(() => { setTasks(key ? JSON.parse(localStorage.getItem(key) || '[]') : []); }, [key]);

  function persist(next) { setTasks(next); if (key) localStorage.setItem(key, JSON.stringify(next)); }
  function addTask(task) { const item = { ...task, id: crypto.randomUUID(), raisedAt: new Date().toISOString(), status: 'Raised' }; persist([item, ...tasks]); return item; }
  function updateTask(id, patch) { persist(tasks.map((task) => task.id === id ? { ...task, ...patch } : task)); }
  function deleteTask(id) { persist(tasks.filter((task) => task.id !== id)); }
  function toggleComplete(id) { const task = tasks.find((item) => item.id === id); if (task) updateTask(id, { status: task.status === 'Closed' ? 'Pending' : 'Closed' }); }

  const value = useMemo(() => ({ tasks, addTask, updateTask, deleteTask, toggleComplete }), [tasks]);
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside TaskProvider.');
  return context;
}
