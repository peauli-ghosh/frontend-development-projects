import { ArrowRight } from 'lucide-react';
export default function SectionTitle({ eyebrow, title, action = 'View all', onAction }) {
  return <div className="section-title"><div><span>{eyebrow}</span><h2>{title}</h2></div>{onAction && <button onClick={onAction}>{action} <ArrowRight size={16}/></button>}</div>;
}
