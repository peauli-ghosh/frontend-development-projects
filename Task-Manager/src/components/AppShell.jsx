import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CheckSquare, ClipboardList, LayoutDashboard, Menu, Plus, Search, Sun, Moon, X, Archive, LogOut, Zap } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tasks', label: 'Tasks', icon: ClipboardList },
  { to: '/add-task', label: 'Add Task', icon: Plus },
  { to: '/completed', label: 'Completed', icon: Archive }
];

export function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const { theme, setTheme, logout, stats } = useTasks();
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/tasks?search=${encodeURIComponent(quickSearch)}`);
    setMobileOpen(false);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="mobile-menu-button neo-button icon-button" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu">
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <NavLink to="/dashboard" className="brand" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark"><CheckSquare size={22} strokeWidth={3} /></span>
          <span>TASK//LAB</span>
        </NavLink>
        <form className="global-search" onSubmit={submitSearch}>
          <Search size={18} />
          <input value={quickSearch} onChange={e => setQuickSearch(e.target.value)} placeholder="Search tasks, categories, labels..." aria-label="Search tasks" />
          <kbd>⌘ K</kbd>
        </form>
        <div className="topbar-actions">
          <button className="neo-button icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <button className="avatar" title="Demo User">DU</button>
        </div>
      </header>

      <div className="layout">
        <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
          <div className="sidebar-head">
            <div>
              <div className="eyebrow">WORKSPACE</div>
              <strong>MY TASKS</strong>
            </div>
            <span className="counter">{stats.active}</span>
          </div>
          <nav className="nav-list">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Icon size={19} strokeWidth={2.5} /><span>{label}</span>
                {label === 'Completed' && <span className="nav-count">{stats.completed}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-divider" />
          <div className="sidebar-section-title">VIEWS</div>
          <NavLink to="/tasks?filter=high" onClick={() => setMobileOpen(false)} className="mini-view"><span className="dot dot-pink" /> High priority <span>{stats.high}</span></NavLink>
          <NavLink to="/tasks?filter=overdue" onClick={() => setMobileOpen(false)} className="mini-view"><span className="dot dot-yellow" /> Overdue <span>{stats.overdue}</span></NavLink>
          <NavLink to="/tasks?filter=today" onClick={() => setMobileOpen(false)} className="mini-view"><span className="dot dot-cyan" /> Today <span>→</span></NavLink>
          <div className="sidebar-spacer" />
          <div className="sidebar-tip">
            <Zap size={19} />
            <div><strong>Focus mode</strong><span>One task at a time.</span></div>
          </div>
          <button className="logout-button" onClick={logout}><LogOut size={17} /> Sign out</button>
        </aside>
        {mobileOpen && <button className="sidebar-overlay" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
