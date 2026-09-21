import { LogOut, ShieldCheck, Terminal, UserRound } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function AppShell({ children, theme, setTheme }) {
  const { user, logout } = useAuth();
  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><span className="brand-mark"><ShieldCheck size={17} /></span><span>AUTHENTICATION SYSTEM</span></div>
      <div className="topbar-right"><span className="status-dot" /> <span className="status-text">SECURE NODE</span><ThemeToggle theme={theme} setTheme={setTheme} />{user && <button className="logout-button" onClick={logout}><LogOut size={15} /> LOGOUT</button>}</div>
    </header>
    {children}
  </div>;
}
