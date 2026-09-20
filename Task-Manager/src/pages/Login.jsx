import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckSquare, LockKeyhole, Sparkles } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function Login() {
  const [name, setName] = useState('Demo User');
  const { login } = useTasks();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';
  const submit = e => { e.preventDefault(); login(name.trim() || 'Demo User'); navigate(from, { replace: true }); };
  return <div className="login-page">
    <div className="login-art art-one">CREATE</div><div className="login-art art-two">FOCUS</div>
    <div className="login-card neo-card">
      <div className="login-logo"><span className="brand-mark"><CheckSquare size={26} /></span><strong>TASK//LAB</strong></div>
      <div className="eyebrow">ASSIGNMENT 6 / ROUTING DEMO</div>
      <h1>GET THINGS<br/><span>DONE.</span></h1>
      <p className="login-copy">A local-first task workspace with routing, filters, dynamic task pages and a brutally clear interface.</p>
      <form onSubmit={submit} className="login-form">
        <label>Your display name<input value={name} onChange={e => setName(e.target.value)} placeholder="Demo User" autoFocus /></label>
        <button className="neo-button primary large" type="submit"><LockKeyhole size={18} /> Enter workspace <ArrowRight size={18} /></button>
      </form>
      <div className="login-note"><Sparkles size={16} /> No account required — demo authentication is stored locally.</div>
    </div>
  </div>;
}
