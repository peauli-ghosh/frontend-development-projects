import { useState } from 'react';
import { ArrowLeft, CalendarDays, CheckSquare, Plus, Save, Tag, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const initial = { title: '', description: '', priority: 'Medium', category: 'Development', due: '', labels: '', notes: '', subtasks: [] };
export default function AddTask() {
  const [form, setForm] = useState(initial);
  const [subtask, setSubtask] = useState('');
  const { addTask } = useTasks();
  const navigate = useNavigate();
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const addSubtask = () => { if (!subtask.trim()) return; setForm(prev => ({ ...prev, subtasks: [...prev.subtasks, { id: `${Date.now()}-${Math.random()}`, title: subtask.trim(), done: false }] })); setSubtask(''); };
  const removeSubtask = id => setForm(prev => ({ ...prev, subtasks: prev.subtasks.filter(s => s.id !== id) }));
  const submit = e => { e.preventDefault(); if (!form.title.trim()) return; const id = addTask({ ...form, labels: form.labels.split(',').map(x => x.trim()).filter(Boolean), title: form.title.trim() }); navigate(`/tasks/${id}`); };
  return <div className="page form-page">
    <div className="page-heading"><div><div className="eyebrow">WORKSPACE / NEW</div><h1>CREATE TASK</h1><p>Capture the work before it escapes your head.</p></div><Link to="/tasks" className="neo-button secondary"><ArrowLeft size={17} /> Back to tasks</Link></div>
    <form className="task-form-layout" onSubmit={submit}>
      <section className="neo-card form-main"><div className="form-section-title"><CheckSquare size={21} /><h2>Task details</h2></div>
        <label>Task title <span>*</span><input required value={form.title} onChange={e => update('title', e.target.value)} placeholder="What needs to get done?" /></label>
        <label>Description<textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Add context, links, acceptance criteria, or the next action..." rows="6" /></label>
        <label>Notes<textarea value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Private notes for future-you..." rows="4" /></label>
        <div className="subtask-builder"><div className="inline-heading"><strong>Subtasks</strong><span>{form.subtasks.length}</span></div><div className="inline-input"><input value={subtask} onChange={e => setSubtask(e.target.value)} onKeyDown={e => { if(e.key === 'Enter'){e.preventDefault();addSubtask();}}} placeholder="Add a checklist item" /><button type="button" className="neo-button secondary" onClick={addSubtask}><Plus size={16} /> Add</button></div>{form.subtasks.map(s => <div className="draft-subtask" key={s.id}><span><CheckSquare size={15} />{s.title}</span><button type="button" onClick={() => removeSubtask(s.id)}><Trash2 size={15} /></button></div>)}</div>
      </section>
      <aside className="neo-card form-side"><div className="form-section-title"><Tag size={21} /><h2>Properties</h2></div>
        <label>Priority<select value={form.priority} onChange={e => update('priority', e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
        <label>Category<select value={form.category} onChange={e => update('category', e.target.value)}><option>Development</option><option>Study</option><option>Portfolio</option><option>Career</option><option>Personal</option><option>Planning</option></select></label>
        <label>Due date <span>*</span><div className="date-input"><CalendarDays size={17} /><input type="date" required value={form.due} onChange={e => update('due', e.target.value)} /></div></label>
        <label>Labels <small>comma separated</small><input value={form.labels} onChange={e => update('labels', e.target.value)} placeholder="React, College" /></label>
        <div className="preview-box"><div className="eyebrow">QUICK PREVIEW</div><strong>{form.title || 'Untitled task'}</strong><span className={`priority-tag priority-${form.priority.toLowerCase()}`}>{form.priority}</span><p>{form.description || 'Your description will appear here.'}</p></div>
        <button type="submit" className="neo-button primary large full"><Save size={18} /> Create task</button>
      </aside>
    </form>
  </div>;
}
