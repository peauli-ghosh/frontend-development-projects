import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function Tasks() {
  const { tasks, deleteTask, toggleComplete } = useTasks();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const visible = useMemo(() => tasks.filter((task) => {
    const matchesQuery = `${task.title} ${task.description} ${task.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || task.priority === filter || task.status === filter || task.category === filter;
    return matchesQuery && matchesFilter;
  }), [tasks, query, filter]);
  return <main className="task-page">
    <div className="page-head"><div><div className="mini-label"><Circle size={13} /> ASSIGNMENT 6 / TASKS</div><h1>MISSION QUEUE<span>.</span></h1><p>Authenticated task management behind the real JWT guard.</p></div><Link className="primary-link" to="/tasks/new"><Plus size={15} /> ADD TASK</Link></div>
    <div className="task-toolbar"><label className="search-box"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks…" /></label><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>High</option><option>Medium</option><option>Low</option><option>Academic</option><option>Personal</option><option>Raised</option><option>Pending</option><option>Closed</option></select></div>
    <div className="task-list">{visible.length ? visible.map((task) => <article className="task-row" key={task.id}><button className="complete-toggle" onClick={() => toggleComplete(task.id)} aria-label="Toggle task status">{task.status === 'Closed' ? <CheckCircle2 size={19} /> : <Circle size={19} />}</button><div className="task-main"><Link to={`/tasks/${task.id}`}>{task.title}</Link><p>{task.description || 'No description.'}</p><div className="task-tags"><span>{task.priority}</span><span>{task.category}</span><span>{task.status}</span></div></div><button className="delete-task" onClick={() => deleteTask(task.id)} aria-label="Delete task"><Trash2 size={15} /></button></article>) : <div className="empty-state">NO TASKS MATCH THE CURRENT FILTER.</div>}</div>
  </main>;
}
