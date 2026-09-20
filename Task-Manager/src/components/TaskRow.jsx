import { CalendarDays, Check, ChevronRight, Copy, MoreHorizontal, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskRow({ task, compact = false }) {
  const { toggleTask, deleteTask, duplicateTask } = useTasks();
  const [menu, setMenu] = useState(false);
  const done = task.status === 'completed';
  const date = task.due ? new Date(`${task.due}T12:00:00`) : null;
  const dateLabel = date ? date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'No due date';

  return (
    <div className={`task-row ${done ? 'done' : ''} ${compact ? 'compact' : ''}`}>
      <button className={`task-check ${done ? 'checked' : ''}`} onClick={() => toggleTask(task.id)} aria-label={done ? 'Mark task active' : 'Mark task complete'}>
        {done && <Check size={16} strokeWidth={4} />}
      </button>
      <Link to={`/tasks/${task.id}`} className="task-main">
        <div className="task-title-line"><strong>{task.title}</strong>{task.subtasks?.length > 0 && <span className="subtask-count">{task.subtasks.filter(s => s.done).length}/{task.subtasks.length}</span>}</div>
        {!compact && <p>{task.description || 'No description added.'}</p>}
        <div className="task-meta">
          <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
          <span className="category-tag">{task.category}</span>
          <span className="date-meta"><CalendarDays size={13} /> {dateLabel}</span>
          {task.labels?.slice(0, 2).map(label => <span key={label} className="label-tag">#{label}</span>)}
        </div>
      </Link>
      <div className="task-actions">
        <button className="row-menu-button" onClick={() => setMenu(v => !v)} aria-label="Task actions"><MoreHorizontal size={19} /></button>
        {menu && <div className="row-menu">
          <Link to={`/tasks/${task.id}`} onClick={() => setMenu(false)}><ChevronRight size={15} /> Open</Link>
          <button onClick={() => { duplicateTask(task.id); setMenu(false); }}><Copy size={15} /> Duplicate</button>
          <button className="danger" onClick={() => { deleteTask(task.id); setMenu(false); }}><Trash2 size={15} /> Delete</button>
        </div>}
      </div>
    </div>
  );
}
