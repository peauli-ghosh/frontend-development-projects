import {
  Eye,
  Sunrise,
  Sunset,
  Cloud,
  Thermometer
} from "lucide-react";

function displayTemp(value, unit) {
  const converted =
    unit === "F"
      ? Math.round(value * 9 / 5 + 32)
      : Math.round(value);

  return String(converted) + "°" + unit;
}

export default function CurrentWeather({
  weather,
  unit = "C"
}) {
  const { current } = weather;

  return (
    <section
      className="hero-card"
      style={{
        "--weather-image":
          'url("' + current.backgroundImage + '")'
      }}
    >
      <div className="hero-photo" />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-topline">
          <span className="eyebrow">
            CURRENT CONDITIONS
          </span>

          <span className="live-pill">
            <span />
            LIVE
          </span>
        </div>

        <div className="hero-main">
          <div className="hero-weather-copy">
            <div className="temperature">
              {displayTemp(
                current.temperature,
                unit
              )}
            </div>

            <h1>{current.condition}</h1>

            <p className="condition-copy">
              {current.description}
            </p>

            <div className="hi-low">
              <span>
                H {displayTemp(current.high, unit)}
              </span>

              <span>
                L {displayTemp(current.low, unit)}
              </span>

              <span>
                Feels {displayTemp(current.feelsLike, unit)}
              </span>
            </div>
          </div>

          <div className="hero-at-glance">
            <div className="glance-heading">
              <span>AT A GLANCE</span>
              <strong>{current.condition}</strong>
            </div>

            <div className="glance-grid">
              <div className="glance-item">
                <Thermometer size={18} />
                <div>
                  <span>Feels like</span>
                  <strong>
                    {displayTemp(current.feelsLike, unit)}
                  </strong>
                </div>
              </div>

              <div className="glance-item">
                <Eye size={18} />
                <div>
                  <span>Visibility</span>
                  <strong>
                    {current.visibility} km
                  </strong>
                </div>
              </div>

              <div className="glance-item">
                <Cloud size={18} />
                <div>
                  <span>Cloud cover</span>
                  <strong>
                    {current.cloudiness}%
                  </strong>
                </div>
              </div>

              <div className="glance-item">
                <Sunrise size={18} />
                <div>
                  <span>Sunrise</span>
                  <strong>
                    {weather.sunrise}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sun-row">
          <div className="sun-item">
            <Sunset size={18} />
            <div>
              <span>Sunset</span>
              <strong>{weather.sunset}</strong>
            </div>
          </div>

          <div className="sun-item">
            <Eye size={18} />
            <div>
              <span>Humidity</span>
              <strong>{current.humidity}%</strong>
            </div>
          </div>

          <div className="sun-item">
            <Thermometer size={18} />
            <div>
              <span>Wind</span>
              <strong>{current.windSpeed} km/h</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



