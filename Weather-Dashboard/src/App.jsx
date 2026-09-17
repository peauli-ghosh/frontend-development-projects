import {
  MapPinned,
  LocateFixed,
  X,
  Clock3
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import WeatherStats from "./components/WeatherStats";
import AirQuality from "./components/AirQuality";
import WeatherSummary from "./components/WeatherSummary";
import RecentlySearched from "./components/RecentlySearched";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import WeatherMap from "./components/WeatherMap";

import {
  getWeatherBundle,
  getWeatherBundleByCoordinates
} from "./services/weatherApi";

const DEFAULT_CITY = "Kolkata";

const RECENT_KEY =
  "weatherwise_recent_cities_v2";

function readRecentCities() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(RECENT_KEY) || "[]"
    );

    return Array.isArray(saved)
      ? saved.slice(0, 6)
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [city, setCity] =
    useState(DEFAULT_CITY);

  const [query, setQuery] =
    useState("");

  const [weather, setWeather] =
    useState(null);

  const [recentCities, setRecentCities] =
    useState(readRecentCities);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [lastUpdated, setLastUpdated] =
    useState(null);

  const [theme, setTheme] =
    useState(
      () =>
        localStorage.getItem(
          "weatherwise-theme"
        ) || "dark"
    );

  const [mapOpen, setMapOpen] =
    useState(false);

  const [unit, setUnit] =
    useState(
      () =>
        localStorage.getItem(
          "weatherwise-temperature-unit"
        ) || "C"
    );

  /*
   * Current local time of the searched city.
   */
  const [localClock, setLocalClock] =
    useState("--:--");

  /*
   * OpenWeather timezone is returned as
   * seconds from UTC.
   */
  const cityTimezone =
    weather?.timezone ??
    weather?.current?.timezone ??
    0;

  useEffect(() => {
    localStorage.setItem(
      "weatherwise-temperature-unit",
      unit
    );
  }, [unit]);

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      "weatherwise-theme",
      theme
    );
  }, [theme]);

  /*
   * Update the displayed clock every 30 seconds.
   *
   * We shift the current UTC timestamp using
   * the searched city's OpenWeather timezone
   * offset, then format it as a 12-hour clock.
   */
  useEffect(() => {
    if (!weather) {
      setLocalClock("--:--");
      return;
    }

    const updateLocalClock = () => {
      const offsetSeconds =
        Number(cityTimezone) || 0;

      const cityTime = new Date(
        Date.now() +
          offsetSeconds * 1000
      );

      const formatted =
        new Intl.DateTimeFormat(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
          }
        ).format(cityTime);

      setLocalClock(formatted);
    };

    updateLocalClock();

    const interval = setInterval(
      updateLocalClock,
      30000
    );

    return () => {
      clearInterval(interval);
    };
  }, [weather, cityTimezone]);

  const saveRecentCity = useCallback(
    (location) => {
      if (!location) return;

      setRecentCities((previous) => {
        const next = [
          location,
          ...previous.filter(
            (item) =>
              item.toLowerCase() !==
              location.toLowerCase()
          )
        ].slice(0, 6);

        localStorage.setItem(
          RECENT_KEY,
          JSON.stringify(next)
        );

        return next;
      });
    },
    []
  );

  const applyWeather = useCallback(
    (result) => {
      setWeather(result);
      setCity(result.location);
      setQuery("");
      setLastUpdated(new Date());
      saveRecentCity(result.location);
    },
    [saveRecentCity]
  );

  const loadWeather = useCallback(
    async (requestedLocation) => {
      const clean =
        typeof requestedLocation ===
        "string"
          ? requestedLocation.trim()
          : requestedLocation;

      if (!clean) {
        setError(
          "Please enter a city or location."
        );
        return;
      }

      setLoading(true);
      setError("");

      try {
        const result =
          await getWeatherBundle(clean);

        applyWeather(result);
      } catch (err) {
        setError(
          err.message ||
            "Unable to load weather data."
        );
      } finally {
        setLoading(false);
      }
    },
    [applyWeather]
  );

  const loadMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError(
        "Location access is not supported by this browser."
      );
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const result =
            await getWeatherBundleByCoordinates(
              position.coords.latitude,
              position.coords.longitude
            );

          applyWeather(result);
        } catch (err) {
          setError(
            err.message ||
              "Unable to load weather for your location."
          );
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);

        if (err.code === 1) {
          setError(
            "Location access was denied. Please allow location access in your browser."
          );
        } else if (err.code === 2) {
          setError(
            "Your location could not be determined."
          );
        } else {
          setError(
            "Location request timed out. Please try again."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  }, [applyWeather]);

  /*
   * Initial weather load.
   */
  useEffect(() => {
    loadWeather(DEFAULT_CITY);
  }, [loadWeather]);

  const handleSearch = (event) => {
    event.preventDefault();
    loadWeather(query);
  };

  const backgroundClass = useMemo(() => {
    if (!weather) {
      return "weather-app weather-app--neutral";
    }

    return "weather-app";
  }, [weather]);

  return (
    <main
      className={backgroundClass}
      style={{
        "--weather-background":
          weather?.current?.backgroundImage
            ? `url("${weather.current.backgroundImage}")`
            : "none"
      }}
    >
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />

      <Header
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onRefresh={() => loadWeather(city)}
        loading={loading}
        theme={theme}
        onToggleTheme={() =>
          setTheme((value) =>
            value === "dark"
              ? "light"
              : "dark"
          )
        }
        onSelectSuggestion={loadWeather}
      />

      <div className="dashboard-shell">

        {/* ==================================================
            LEFT BRAND / CONTROL RAIL
            ================================================== */}

        <aside className="brand-rail">
          <div className="brand-mark">
            W
          </div>

          <div className="rail-label">
            WEATHERWISE
          </div>

          <div className="rail-line" />

          <div className="rail-nav">

            {/* Temperature unit */}
            <div className="rail-unit-switch">
              <button
                type="button"
                className={`rail-unit-button ${
                  unit === "C"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setUnit("C")
                }
                title="Celsius"
                aria-label="Use Celsius"
              >
                C
              </button>

              <button
                type="button"
                className={`rail-unit-button ${
                  unit === "F"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setUnit("F")
                }
                title="Fahrenheit"
                aria-label="Use Fahrenheit"
              >
                F
              </button>
            </div>

            {/* Weather map */}
            <button
              type="button"
              className="rail-button"
              onClick={() =>
                weather &&
                setMapOpen(true)
              }
              disabled={!weather}
              aria-label="Weather map"
              title="Weather map"
            >
              <MapPinned
                size={20}
              />
            </button>
          </div>

          {/* My location */}
          <div className="rail-location">
            <button
              type="button"
              className="rail-button"
              onClick={loadMyLocation}
              disabled={loading}
              aria-label="Use my location"
              title="Use my location"
            >
              <LocateFixed
                size={20}
              />
            </button>

            <span>
              My location
            </span>
          </div>

          {/* Live status */}
          <div className="rail-status">
            <span className="status-dot" />

            <span>
              Live data
            </span>
          </div>
        </aside>


        {/* ==================================================
            MAIN DASHBOARD
            ================================================== */}

        <section className="dashboard-content">

          {/* ------------------------------------------------
              LOCATION + LOCAL TIME
              ------------------------------------------------ */}

          <div className="top-meta">

            <div className="top-meta-location">

              <div className="location-line">

                <LocateFixed size={20} />

                <strong>
                  {weather?.displayLocation || city}
                </strong>

                {weather?.countryName && (
                  <span className="country-name">
                    {weather.countryName}
                  </span>
                )}

                {weather && (
                  <span className="weather-local-clock">

                    <Clock3
                      size={17}
                      strokeWidth={1.8}
                    />

                    <span>
                      Local time
                    </span>

                    <strong>
                      {localClock}
                    </strong>

                  </span>
                )}

              </div>

            </div>

            <div className="top-meta-date">
              <span>LOCAL DATE</span>

              <strong>
                {weather?.localDate ||
                  "Loading local date..."}
              </strong>
            </div>

          </div>


          {/* ==================================================
              ERROR / LOADING / WEATHER
              ================================================== */}

          {error && !weather ? (
            <ErrorState
              message={error}
              onRetry={() =>
                loadWeather(city)
              }
            />
          ) : loading && !weather ? (
            <LoadingState />
          ) : weather ? (
            <>

              {/* ==================================================
                  TWO-COLUMN WEATHER AREA
                  ================================================== */}

              <div className="main-grid">

                {/* ================================================
                    PRIMARY COLUMN
                    ================================================ */}

                <div className="primary-column">

                  <CurrentWeather
                    weather={weather}
                    unit={unit}
                  />

                  <HourlyForecast
                    items={weather.hourly}
                    unit={unit}
                  />

                  <DailyForecast
                    items={weather.daily}
                    unit={unit}
                  />

                </div>


                {/* ================================================
                    SECONDARY COLUMN
                    ================================================ */}

                <aside className="secondary-column">

                  {/* Weather statistics + AQI */}
                  <div className="secondary-top-stack">

                    <WeatherStats
                      weather={weather}
                      unit={unit}
                    />

                    <AirQuality
                      aqi={weather.aqi}
                    />

                  </div>


                  {/* Weather explanation */}
                  <WeatherSummary
                    weather={weather}
                    unit={unit}
                  />


                  {/* Recently searched */}
                  <RecentlySearched
                    cities={recentCities}
                    activeCity={city}
                    onSelect={loadWeather}
                    onClear={() => {
                      localStorage.removeItem(
                        RECENT_KEY
                      );

                      setRecentCities([]);
                    }}
                  />

                </aside>

              </div>


              {/* Last data refresh */}
              {lastUpdated && (
                <p className="updated-note">
                  Updated{" "}
                  {lastUpdated.toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit"
                    }
                  )}
                </p>
              )}

            </>
          ) : null}

        </section>
      </div>


      {/* ==================================================
          ERROR TOAST
          ================================================== */}

      {error && weather && (
        <div
          className="toast-error"
          role="alert"
        >
          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}


      {/* ==================================================
          WEATHER MAP
          ================================================== */}

      {mapOpen && weather && (
        <WeatherMap
          weather={weather}
          onClose={() =>
            setMapOpen(false)
          }
        />
      )}

    </main>
  );
}







