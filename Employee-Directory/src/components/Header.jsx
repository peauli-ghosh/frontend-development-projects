import { Building2, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

function Header({ theme, onToggleTheme, onNavigate }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const ids = [
      "dashboard",
      "employees",
      "departments",
      "administration"
    ];

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.3, 0.5]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function navigate(id) {
    setActiveSection(id);
    onNavigate(id);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="brand"
          type="button"
          onClick={() => navigate("dashboard")}
        >
          <span className="brand-mark">
            <Building2 size={19} />
          </span>

          <span className="brand-name">
            Employee Directory
          </span>
        </button>

        <nav className="main-nav" aria-label="Main navigation">
          <button
            className={
              activeSection === "dashboard"
                ? "active"
                : ""
            }
            type="button"
            onClick={() => navigate("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={
              activeSection === "employees"
                ? "active"
                : ""
            }
            type="button"
            onClick={() => navigate("employees")}
          >
            Employees
          </button>

          <button
            className={
              activeSection === "departments"
                ? "active"
                : ""
            }
            type="button"
            onClick={() => navigate("departments")}
          >
            Departments
          </button>

          <button
            className={
              activeSection === "administration"
                ? "active"
                : ""
            }
            type="button"
            onClick={() => navigate("administration")}
          >
            Administration
          </button>
        </nav>

        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={
            theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;

