import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, Check, CheckSquare, Copy, Edit3, Save, Trash2, X } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, toggleTask, deleteTask, duplicateTask } = useTasks();
  const task = tasks.find(t => t.id === taskId);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task || {});
  useEffect(() => setDraft(task || {}), [taskId, task]);
  const completedSubtasks = useMemo(() => (task?.subtasks || []).filter(s => s.done).length, [task]);
  if (!task) return <div className="page"><div className="not-found-inline"><h1>TASK NOT FOUND</h1><p>The dynamic route points to a task that no longer exists.</p><Link to="/tasks" className="neo-button primary">Back to tasks</Link></div></div>;
  const update = (key, value) => setDraft(prev => ({ ...prev, [key]: value }));
  const save = () => { updateTask(task.id, { title: draft.title, description: draft.description, priority: draft.priority, category: draft.category, due: draft.due, notes: draft.notes }); setEditing(false); };
  const toggleSubtask = id => updateTask(task.id, { subtasks: task.subtasks.map(s => s.id === id ? { ...s, done: !s.done } : s) });
  const remove = () => { deleteTask(task.id); navigate('/tasks'); };
  return <div className="page detail-page">
    <div className="detail-top"><Link to="/tasks" className="back-link"><ArrowLeft size={17} /> All tasks</Link><div className="detail-actions">{editing ? <><button className="neo-button secondary" onClick={() => { setDraft(task); setEditing(false); }}><X size={16} /> Cancel</button><button className="neo-button primary" onClick={save}><Save size={16} /> Save changes</button></> : <><button className="neo-button secondary" onClick={() => setEditing(true)}><Edit3 size={16} /> Edit</button><button className="neo-button secondary" onClick={() => duplicateTask(task.id)}><Copy size={16} /> Duplicate</button><button className="neo-button danger-button" onClick={remove}><Trash2 size={16} /> Delete</button></>}</div></div>
    <div className="detail-layout">
      <article className="neo-card detail-main">
        <div className="detail-kicker"><span className={`priority-tag priority-${task.priority.toLowerCase()}`}>{task.priority} priority</span><span className="category-tag">{task.category}</span></div>
        {editing ? <input className="detail-title-input" value={draft.title} onChange={e => update('title', e.target.value)} /> : <h1>{task.title}</h1>}
        {editing ? <textarea className="detail-description-input" value={draft.description} onChange={e => update('description', e.target.value)} rows="5" /> : <p className="detail-description">{task.description || 'No description added.'}</p>}
        <div className="detail-meta-grid"><div><span>STATUS</span><strong>{task.status === 'completed' ? 'Completed' : 'Active'}</strong></div><div><span>DUE</span><strong>{new Date(`${task.due}T12:00:00`).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}</strong></div><div><span>SUBTASKS</span><strong>{completedSubtasks}/{task.subtasks.length}</strong></div><div><span>UPDATED</span><strong>{new Date(task.updatedAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short' })}</strong></div></div>
        <div className="detail-section"><div className="section-header"><div><div className="eyebrow">CHECKLIST</div><h2>Subtasks</h2></div><span className="checklist-count">{completedSubtasks}/{task.subtasks.length}</span></div>{task.subtasks.length ? task.subtasks.map(s => <button className={`detail-subtask ${s.done ? 'done' : ''}`} key={s.id} onClick={() => toggleSubtask(s.id)}><span className={`task-check ${s.done ? 'checked' : ''}`}>{s.done && <Check size={15} />}</span><span>{s.title}</span></button>) : <p className="muted">No subtasks. Break the task down when it feels too large.</p>}</div>
        <div className="detail-section"><div className="eyebrow">NOTES</div>{editing ? <textarea className="detail-description-input" value={draft.notes || ''} onChange={e => update('notes', e.target.value)} rows="4" placeholder="Add notes..." /> : <p className="notes-block">{task.notes || 'No notes added.'}</p>}</div>
      </article>
      <aside className="detail-side">
        <div className="neo-card status-card"><div className="eyebrow">TASK STATE</div><button className={`complete-toggle ${task.status === 'completed' ? 'is-complete' : ''}`} onClick={() => toggleTask(task.id)}><span>{task.status === 'completed' ? <Check size={21} /> : <CheckSquare size={21} />}</span>{task.status === 'completed' ? 'Completed' : 'Mark complete'}</button><p>{task.status === 'completed' ? 'This task is safely in your completed archive.' : 'Finish it when the work is actually done.'}</p></div>
        <div className="neo-card side-info"><div className="eyebrow">SCHEDULE</div><div className="schedule-line"><CalendarDays size={18} /><div><strong>{new Date(`${task.due}T12:00:00`).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' })}</strong><span>Due date</span></div></div></div>
        <div className="neo-card route-card"><div className="eyebrow">ROUTING</div><code>/tasks/{task.id}</code><p>Dynamic URL parameter is resolving this detail page.</p></div>
      </aside>
    </div>
  </div>;
}
