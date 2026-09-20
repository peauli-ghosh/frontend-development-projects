import { ClipboardCheck, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function EmptyState({ title = 'Nothing here yet', text = 'Create a task to get started.' }) {
  return <div className="empty-state"><div className="empty-icon"><ClipboardCheck size={34} /></div><h3>{title}</h3><p>{text}</p><Link to="/add-task" className="neo-button primary"><Plus size={18} /> Create task</Link></div>;
}
