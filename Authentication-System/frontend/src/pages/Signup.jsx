import { useState } from 'react';
import { ArrowRight, UserPlus, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthVisual from '../components/AuthVisual';
import PasswordField from '../components/PasswordField';
import PasswordStrength from '../components/PasswordStrength';
import { useAuth } from '../context/AuthContext';

export default function Signup({ onToast }) {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', remember: true });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  async function submit(event) {
    event.preventDefault(); setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setBusy(true);
    try {
      const data = await signup({ username: form.username, password: form.password, remember: form.remember });
      if (data.devOtp) onToast({ title: 'LOCAL OTP // DEVELOPMENT', message: `Generated ${data.devOtp} — visual feedback only; OTP is not required for authentication.`, type: 'otp' });
      else onToast({ title: 'ACCOUNT CREATED', message: 'Your account is ready. JWT session verified.', type: 'success' });
      navigate('/dashboard', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <main className="auth-page"><AuthVisual mode="signup" /><section className="auth-panel-wrap"><div className="auth-panel signup-panel">
    <div className="panel-heading"><div className="mini-label"><UserPlus size={13} /> AUTH / REGISTER</div><h1>CREATE ACCOUNT<span>.</span></h1><p>Your password is hashed on the server. Your session is signed with a real JWT.</p></div>
    {error && <div className="form-alert">{error}</div>}
    <form onSubmit={submit} className="auth-form">
      <label className="field"><span className="field-label"><UserRound size={14} /> USERNAME / EMAIL</span><input value={form.username} onChange={update('username')} autoComplete="username" placeholder="your_username or email@example.com" required /></label>
      <PasswordField label="PASSWORD" value={form.password} onChange={update('password')} autoComplete="new-password" />
      <PasswordStrength password={form.password} />
      <PasswordField label="CONFIRM PASSWORD" value={form.confirmPassword} onChange={update('confirmPassword')} autoComplete="new-password" />
      <label className="check"><input type="checkbox" checked={form.remember} onChange={update('remember')} /><span>REMEMBER USER</span></label>
      <button className="primary-button" disabled={busy}>{busy ? <><span className="button-spinner" /> CREATING…</> : <>CREATE IDENTITY <ArrowRight size={17} /></>}</button>
    </form>
    <div className="switch-auth">ALREADY REGISTERED? <Link to="/login">RETURN TO LOGIN <ArrowRight size={14} /></Link></div>
  </div></section></main>;
}
