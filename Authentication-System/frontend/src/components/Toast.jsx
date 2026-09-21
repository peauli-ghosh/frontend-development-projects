import { CheckCircle2, Code2, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;
  return <div className="toast" role="status">
    {toast.type === 'otp' ? <Code2 size={18} /> : <CheckCircle2 size={18} />}
    <div><strong>{toast.title}</strong><span>{toast.message}</span></div>
    <button onClick={onClose} aria-label="Dismiss notification"><X size={15} /></button>
  </div>;
}
