import { ArrowRight, CalendarDays, Flame, Plus, Target, Timer, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import TaskRow from '../components/TaskRow';

export default function Dashboard() {
  const { tasks, stats } = useTasks();
  const active = tasks.filter(t => t.status !== 'completed').sort((a,b) => a.due.localeCompare(b.due)).slice(0, 5);
  const categories = [...new Set(tasks.map(t => t.category))].map(name => ({ name, count: tasks.filter(t => t.category === name).length }));
  const today = new Date(); today.setHours(0,0,0,0);
  const dueToday = tasks.filter(t => t.status !== 'completed' && t.due === today.toISOString().slice(0,10));
  return <div className="page dashboard-page">
    <div className="page-heading hero-heading">
      <div><div className="eyebrow">SUNDAY / 20 SEPTEMBER 2026</div><h1>COMMAND CENTER<span className="heading-dot">.</span></h1><p>Plan the work. Protect the focus. Ship the result.</p></div>
      <Link className="neo-button primary" to="/add-task"><Plus size={19} /> Add task</Link>
    </div>

    <section className="stats-grid">
      <StatCard type="total" label="Total tasks" value={stats.total} detail="Across your workspace" accent="cyan" />
      <StatCard type="active" label="Active" value={stats.active} detail={`${stats.high} high priority`} accent="yellow" />
      <StatCard type="completed" label="Completed" value={stats.completed} detail="Keep the streak alive" accent="green" />
      <StatCard type="overdue" label="Overdue" value={stats.overdue} detail={stats.overdue ? 'Needs attention' : 'You are clear'} accent="pink" />
    </section>

    <div className="dashboard-grid">
      <section className="neo-card progress-card">
        <div className="section-header"><div><div className="eyebrow">WEEKLY TARGET</div><h2>Momentum</h2></div><span className="big-icon"><Flame size={23} /></span></div>
        <div className="momentum-number">{stats.progress}<small>%</small></div>
        <ProgressBar value={stats.progress} label="Workspace completion" />
        <div className="milestone-row"><span><Trophy size={15} /> {stats.completed} shipped</span><span><Target size={15} /> {stats.total - stats.completed} remaining</span></div>
      </section>

      <section className="neo-card today-card">
        <div className="section-header"><div><div className="eyebrow">TODAY</div><h2>Focus list</h2></div><CalendarDays size={23} /></div>
        {dueToday.length ? dueToday.map(task => <TaskRow key={task.id} task={task} compact />) : <div className="tiny-empty">No tasks due today. <Link to="/add-task">Add one →</Link></div>}
      </section>
    </div>

    <div className="content-grid-two">
      <section className="neo-card task-preview">
        <div className="section-header"><div><div className="eyebrow">NEXT UP</div><h2>Active tasks</h2></div><Link className="text-link" to="/tasks">View all <ArrowRight size={16} /></Link></div>
        <div className="task-list">{active.length ? active.map(task => <TaskRow key={task.id} task={task} />) : <div className="tiny-empty">Everything is complete. Nice work.</div>}</div>
      </section>
      <section className="neo-card category-card">
        <div className="section-header"><div><div className="eyebrow">WORKLOAD</div><h2>Categories</h2></div><Timer size={23} /></div>
        <div className="category-list">{categories.map((cat, index) => <div className="category-line" key={cat.name}><span className={`category-swatch swatch-${index % 4}`} /><strong>{cat.name}</strong><span className="category-line-count">{cat.count}</span></div>)}</div>
        <Link className="neo-button secondary full" to="/tasks">Manage tasks <ArrowRight size={16} /></Link>
      </section>
    </div>
  </div>;
}
