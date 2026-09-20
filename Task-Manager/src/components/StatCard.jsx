import { ArrowUpRight, CheckCircle2, Clock3, ListChecks, TriangleAlert } from 'lucide-react';

const icons = { total: ListChecks, active: Clock3, completed: CheckCircle2, overdue: TriangleAlert };
export default function StatCard({ type, label, value, accent, detail }) {
  const Icon = icons[type] || ListChecks;
  return <div className={`stat-card accent-${accent}`}><div className="stat-top"><span className="stat-icon"><Icon size={20} /></span><ArrowUpRight size={17} /></div><div className="stat-value">{value}</div><div className="stat-label">{label}</div><div className="stat-detail">{detail}</div></div>;
}
