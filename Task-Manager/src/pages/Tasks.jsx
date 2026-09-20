import { useMemo, useState } from 'react';
import { Filter, LayoutGrid, List, Plus, Search, SlidersHorizontal, SortAsc, X } from 'lucide-react';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskRow from '../components/TaskRow';
import EmptyState from '../components/EmptyState';

export default function Tasks() {
  const { tasks } = useTasks();
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [view, setView] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const search = params.get('search') || '';
  const filter = params.get('filter') || 'all';
  const priority = params.get('priority') || 'all';
  const category = params.get('category') || 'all';
  const sort = params.get('sort') || 'due';

  const categories = [...new Set(tasks.map(t => t.category))].sort();
  const filtered = useMemo(() => {
    let list = [...tasks];
    if (search) list = list.filter(t => `${t.title} ${t.description} ${t.category} ${(t.labels || []).join(' ')}`.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'active') list = list.filter(t => t.status !== 'completed');
    if (filter === 'completed') list = list.filter(t => t.status === 'completed');
    if (filter === 'high') list = list.filter(t => t.priority === 'High' && t.status !== 'completed');
    if (filter === 'overdue') list = list.filter(t => t.status !== 'completed' && t.due && new Date(`${t.due}T23:59:59`) < new Date());
    if (filter === 'today') list = list.filter(t => t.status !== 'completed' && t.due === new Date().toISOString().slice(0,10));
    if (priority !== 'all') list = list.filter(t => t.priority === priority);
    if (category !== 'all') list = list.filter(t => t.category === category);
    list.sort((a,b) => sort === 'priority' ? ({High:0,Medium:1,Low:2}[a.priority] - {High:0,Medium:1,Low:2}[b.priority]) : sort === 'newest' ? new Date(b.createdAt)-new Date(a.createdAt) : (a.due || '9999').localeCompare(b.due || '9999'));
    return list;
  }, [tasks, search, filter, priority, category, sort]);

  if (location.pathname !== '/tasks') return <Outlet />;

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key); else next.set(key, value);
    setParams(next);
  };
  const clear = () => setParams({});

  return <div className="page tasks-page">
    <div className="page-heading"><div><div className="eyebrow">WORKSPACE / TASKS</div><h1>ALL TASKS</h1><p>{filtered.length} results in the current view.</p></div><Link className="neo-button primary" to="/add-task"><Plus size={19} /> New task</Link></div>
    <div className="task-toolbar neo-card">
      <div className="toolbar-search"><Search size={18} /><input value={search} onChange={e => setParam('search', e.target.value)} placeholder="Search your tasks..." /></div>
      <div className="toolbar-actions"><button className={`neo-button ${showFilters ? 'primary' : 'secondary'}`} onClick={() => setShowFilters(v => !v)}><Filter size={16} /> Filters {priority !== 'all' || category !== 'all' ? '•' : ''}</button><button className="neo-button secondary" onClick={() => setParam('sort', sort === 'due' ? 'priority' : sort === 'priority' ? 'newest' : 'due')}><SortAsc size={16} /> Sort</button><div className="view-switch"><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><List size={17} /></button><button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><LayoutGrid size={17} /></button></div></div>
    </div>
    {showFilters && <div className="filter-panel neo-card"><div><label>Status<select value={filter} onChange={e => setParam('filter', e.target.value)}><option value="all">All</option><option value="active">Active</option><option value="completed">Completed</option><option value="high">High priority</option><option value="overdue">Overdue</option><option value="today">Due today</option></select></label></div><div><label>Priority<select value={priority} onChange={e => setParam('priority', e.target.value)}><option value="all">All priorities</option><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select></label></div><div><label>Category<select value={category} onChange={e => setParam('category', e.target.value)}><option value="all">All categories</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></label></div><button className="clear-filter" onClick={clear}><X size={15} /> Clear</button></div>}
    <div className="route-hint"><SlidersHorizontal size={15} /> Dynamic routes are enabled — open any task to view <strong>/tasks/:taskId</strong>.</div>
    <div className={view === 'grid' ? 'task-grid' : 'task-list'}>{filtered.length ? filtered.map(task => <TaskRow key={task.id} task={task} compact={view === 'grid'} />) : <EmptyState title="No matching tasks" text="Try another filter or create a new task." />}</div>
  </div>;
}
