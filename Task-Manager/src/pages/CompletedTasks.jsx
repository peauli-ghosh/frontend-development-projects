import { Archive, CheckCircle2, Trash2 } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskRow from '../components/TaskRow';
import EmptyState from '../components/EmptyState';

export default function CompletedTasks() {
  const { tasks, clearCompleted } = useTasks();
  const completed = tasks.filter(t => t.status === 'completed');
  return <div className="page"><div className="page-heading"><div><div className="eyebrow">ARCHIVE / DONE</div><h1>COMPLETED</h1><p>A record of work that made it across the finish line.</p></div>{completed.length > 0 && <button className="neo-button danger-button" onClick={clearCompleted}><Trash2 size={17} /> Clear archive</button>}</div>
    <section className="neo-card archive-banner"><span className="archive-icon"><Archive size={25} /></span><div><strong>{completed.length} completed {completed.length === 1 ? 'task' : 'tasks'}</strong><p>Completed tasks remain editable — just uncheck one to bring it back.</p></div><CheckCircle2 size={31} /></section>
    <div className="task-list">{completed.length ? completed.map(task => <TaskRow key={task.id} task={task} />) : <EmptyState title="Your archive is empty" text="Complete a task and it will appear here." />}</div>
  </div>;
}
