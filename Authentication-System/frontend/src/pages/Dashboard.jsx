import { useEffect, useState } from 'react';
import { Activity, CheckCircle2, Clock3, Code2, Copy, Fingerprint, KeyRound, LogOut, Shield, Terminal, ListChecks } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard({ onToast }) {
  const { user, jwt, logout } = useAuth();
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => { api.dashboard().then(setData).catch(() => {}); }, []);
  const token = data?.jwt ?? jwt;
  const payload = token?.payload ?? {};

  async function copyDiagnostics() {
    await navigator.clipboard.writeText(JSON.stringify(token, null, 2));
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  }

  return <main className="dashboard-page">
    <section className="dashboard-hero"><div><div className="mini-label"><Activity size={13} /> SECURE DASHBOARD / ASSIGNMENT 7</div><h1>WELCOME, <span>{user?.username}</span>.</h1><p>Your route is protected by a server-verified JWT session. Assignment 6 resources can now sit behind this guard.</p></div><div className="access-badge"><CheckCircle2 size={18} /><div><strong>ACCESS GRANTED</strong><span>JWT VERIFIED</span></div></div></section>
    <section className="metric-grid">
      <Metric icon={<Shield />} label="AUTH STATUS" value="VERIFIED" detail="Signature + session" />
      <Metric icon={<Fingerprint />} label="IDENTITY" value={user?.username?.toUpperCase()} detail="Server-resolved user" />
      <Metric icon={<Clock3 />} label="SESSION" value="ACTIVE" detail={token?.expiresAt ? `Expires ${new Date(token.expiresAt).toLocaleTimeString()}` : 'Protected cookie'} />
      <Metric icon={<KeyRound />} label="ALGORITHM" value="HS256" detail="Cryptographically signed" />
    </section>
    <section className="dashboard-grid">
      <div className="hud-card"><div className="card-title"><span><Terminal size={15} /> SYSTEM STATUS</span><i>LIVE</i></div><div className="status-list"><StatusRow name="Credentials" value="HASHED" /><StatusRow name="JWT signature" value="VALID" /><StatusRow name="Issuer / audience" value="VALID" /><StatusRow name="Protected route" value="LOCKED → OPEN" /><StatusRow name="Session record" value="ACTIVE" /></div></div>
      <div className="hud-card"><div className="card-title"><span><Code2 size={15} /> JWT DIAGNOSTICS</span><button className="small-action" onClick={copyDiagnostics}><Copy size={13} /> {copied ? 'COPIED' : 'COPY'}</button></div><div className="jwt-box"><div className="jwt-row"><span>TYPE</span><strong>{token?.tokenType ?? 'JWT'}</strong></div><div className="jwt-row"><span>ALGORITHM</span><strong>{token?.algorithm ?? 'HS256'}</strong></div><div className="jwt-row"><span>VERIFICATION</span><strong className="verified">{token?.verified ? '✓ VERIFIED' : '—'}</strong></div><div className="jwt-payload"><span>VERIFIED PAYLOAD</span><pre>{JSON.stringify(payload, null, 2)}</pre></div></div></div>
    </section>
    <section className="assignment-card"><div><div className="mini-label"><Terminal size={13} /> ASSIGNMENT 6 INTEGRATION POINT</div><h2>Task Manager Protected Zone</h2><p>The authentication guard is ready to protect Dashboard, Tasks, Add Task, Task Details and Completed Tasks routes from Assignment 6.</p></div><div className="route-actions"><Link className="primary-link" to="/tasks"><ListChecks size={15} /> OPEN TASKS</Link><Link className="route-chip" to="/completed">COMPLETED <span>→</span></Link></div></section>
    <button className="dashboard-logout" onClick={async () => { await logout(); onToast({ title: 'SESSION TERMINATED', message: 'JWT session revoked and auth cookie cleared.', type: 'success' }); }}><LogOut size={15} /> TERMINATE SESSION</button>
  </main>;
}

function Metric({ icon, label, value, detail }) { return <article className="metric-card"><div className="metric-icon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>; }
function StatusRow({ name, value }) { return <div className="status-row"><span>{name}</span><strong><i />{value}</strong></div>; }
