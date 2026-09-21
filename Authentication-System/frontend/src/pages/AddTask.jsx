import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function AddTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', description:'', priority:'Medium', category:'Academic', dueDate:'2026-08-28' });
  const update = (key) => (e) => setForm((v) => ({ ...v, [key]: e.target.value }));
  function submit(e) { e.preventDefault(); addTask(form); navigate('/tasks'); }
  return <main className="task-page narrow-page"><Link className="back-link" to="/tasks"><ArrowLeft size={14} /> BACK TO TASKS</Link><div className="page-head"><div><div className="mini-label">TASK MANAGER / CREATE</div><h1>ADD TASK<span>.</span></h1></div></div><form className="task-form" onSubmit={submit}><label>Task Header<input value={form.title} onChange={update('title')} required /></label><label>Task Description<textarea value={form.description} onChange={update('description')} rows="5" /></label><div className="form-two"><label>Priority<select value={form.priority} onChange={update('priority')}><option>High</option><option>Medium</option><option>Low</option></select></label><label>Category<select value={form.category} onChange={update('category')}><option>Academic</option><option>Personal</option></select></label></div><label>Due Date<input type="date" value={form.dueDate} onChange={update('dueDate')} /></label><button className="primary-button"><Save size={15} /> SAVE TASK</button></form></main>;
}
