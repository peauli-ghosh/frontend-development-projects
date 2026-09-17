import {
  CloudSun,
  Moon,
  RefreshCw,
  Search,
  Sun
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCitySuggestions } from "../services/weatherApi";

export default function Header({
  query,
  setQuery,
  onSearch,
  onRefresh,
  loading,
  theme,
  onToggleTheme,
  onSelectSuggestion
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [suggesting, setSuggesting] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const clean = query.trim();

    if (clean.length < 2) {
      setSuggestions([]);
      setSuggesting(false);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setSuggesting(true);

        const result =
          await getCitySuggestions(clean);

        if (!cancelled) {
          setSuggestions(result);
        }
      } catch {
        if (!cancelled) {
          setSuggestions([]);
        }
      } finally {
        if (!cancelled) {
          setSuggesting(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const choose = (item) => {
    setSuggestions([]);
    onSelectSuggestion(item);
  };

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="weather-logo">
          <CloudSun size={25} />
        </div>

        <div>
          <strong>WeatherWise</strong>
          <span>Real-time weather dashboard</span>
        </div>
      </div>

      <form
        className="search-form"
        onSubmit={onSearch}
        onFocus={() => setFocused(true)}
        onBlur={() =>
          setTimeout(() => setFocused(false), 150)
        }
      >
        <Search size={20} />

        <div className="search-wrap">
          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search city..."
            autoComplete="off"
            aria-label="Search city"
          />

          {focused && query.trim().length >= 2 && (
            <div className="search-suggestions">
              {suggesting ? (
                <div className="suggestion-loading">
                  Searching locations...
                </div>
              ) : suggestions.length ? (
                suggestions.map((item, index) => (
                  <button
                    type="button"
                    className="suggestion-item"
                    key={`${item.name}-${item.country}-${index}`}
                    onMouseDown={(event) =>
                      event.preventDefault()
                    }
                    onClick={() => choose(item)}
                  >
                    <span className="suggestion-pin">
                      <Search size={15} />
                    </span>

                    <span>
                      <strong>{item.name}</strong>

                      <small>
                        {[
                          item.state,
                          item.countryName
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </small>
                    </span>
                  </button>
                ))
              ) : (
                <div className="suggestion-loading">
                  No matching locations
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !query.trim()}
        >
          Search
        </button>
      </form>

      <div className="header-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <>
              <Sun size={18} />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon size={18} />
              <span>Dark</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="header-refresh"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh weather"
        >
          <RefreshCw
            size={19}
            className={
              loading ? "spin" : ""
            }
          />
        </button>
      </div>
    </header>
  );
}
