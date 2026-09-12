function Header({
  darkMode,
  setDarkMode,
}) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">
          STUDENT MANAGEMENT
        </p>

        <h1>Student Information Portal</h1>
      </div>

      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀ Light" : "☾ Dark"}
      </button>
    </header>
  );
}

export default Header;