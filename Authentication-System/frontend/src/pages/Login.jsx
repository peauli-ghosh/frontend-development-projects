import { useState } from 'react';
import { ArrowRight, KeyRound, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthVisual from '../components/AuthVisual';
import PasswordField from '../components/PasswordField';
import { useAuth } from '../context/AuthContext';

export default function Login({ onToast }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', remember: true });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  async function submit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    try { await login(form); onToast({ title: 'ACCESS GRANTED', message: 'JWT session verified. Protected dashboard unlocked.', type: 'success' }); navigate('/dashboard', { replace: true }); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <main className="auth-page"><AuthVisual mode="login" /><section className="auth-panel-wrap"><div className="auth-panel">
    <div className="panel-heading"><div className="mini-label"><KeyRound size={13} /> AUTH / LOGIN</div><h1>WELCOME BACK<span>.</span></h1><p>Authenticate with your registered credentials to continue.</p></div>
    {error && <div className="form-alert">{error}</div>}
    <form onSubmit={submit} className="auth-form">
      <label className="field"><span className="field-label"><UserRound size={14} /> USERNAME / EMAIL</span><input value={form.username} onChange={update('username')} autoComplete="username" placeholder="your_username or email@example.com" required />{error?.toLowerCase().includes('username') && <span className="field-error">Username is required.</span>}</label>
      <PasswordField value={form.password} onChange={update('password')} />
      <div className="form-row"><label className="check"><input type="checkbox" checked={form.remember} onChange={update('remember')} /><span>REMEMBER USER</span></label><span className="muted">SESSION CONTROLLED</span></div>
      <button className="primary-button" disabled={busy}>{busy ? <><span className="button-spinner" /> AUTHENTICATING…</> : <>AUTHENTICATE <ArrowRight size={17} /></>}</button>
    </form>
    <div className="switch-auth">NEW USER? <Link to="/signup">CREATE ACCOUNT <ArrowRight size={14} /></Link></div>
  </div></section></main>;
}
