import { useState } from "react";
import {
  Building2,
  Menu,
  Moon,
  Sun,
  X
} from "lucide-react";

function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Employee Directory home">
          <span className="brand-icon">
            <Building2 size={19} strokeWidth={2.2} />
          </span>
          <span>Employee Directory</span>
        </a>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <a href="#dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </a>

          <a
            href="#employees"
            className="active"
            onClick={() => setMenuOpen(false)}
          >
            Employees
          </a>

          <a href="#departments" onClick={() => setMenuOpen(false)}>
            Departments
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="theme-button"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
