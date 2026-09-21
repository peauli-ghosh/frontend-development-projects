import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function CompletedTasks() {
  const { tasks } = useTasks(); const completed = tasks.filter((task) => task.status === 'Closed');
  return <main className="task-page"><div className="page-head"><div><div className="mini-label"><CheckCircle2 size={13} /> TASK MANAGER / COMPLETED</div><h1>COMPLETED<span>.</span></h1><p>Closed tasks from your authenticated workspace.</p></div></div><div className="task-list">{completed.length ? completed.map((task) => <article className="task-row" key={task.id}><CheckCircle2 className="complete-icon" size={19} /><div className="task-main"><Link to={`/tasks/${task.id}`}>{task.title}</Link><p>{task.description || 'No description.'}</p></div></article>) : <div className="empty-state">NO COMPLETED TASKS YET.</div>}</div></main>;
}
