import { useState } from "react";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="#home" className="logo" onClick={handleLinkClick}>
          <span className="logo-symbol">&lt;/&gt;</span>
          <span>Peauli</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#home" onClick={handleLinkClick}>
            Home
          </a>

          <a href="#about" onClick={handleLinkClick}>
            About
          </a>

          <a href="#education" onClick={handleLinkClick}>
            Education
          </a>

          <a href="#skills" onClick={handleLinkClick}>
            Skills
          </a>

          <a href="#projects" onClick={handleLinkClick}>
            Projects
          </a>

          <a href="#contact" onClick={handleLinkClick}>
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? "☀" : "☾"}
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;