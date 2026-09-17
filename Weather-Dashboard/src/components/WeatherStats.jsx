import {
  Droplets,
  Gauge,
  Wind
} from "lucide-react";

export default function WeatherStats({
  weather
}) {
  const { current } = weather;

  return (
    <section className="side-card stats-card">
      <div className="side-card-heading">
        <div>
          <span>LIVE CONDITIONS</span>
          <h2>Weather details</h2>
        </div>

        <span className="condition-badge">
          {current.condition}
        </span>
      </div>

      <div className="condition-line">
        <span />
        <span />
        <span />
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <Droplets size={19} />
          <strong>
            {current.humidity}%
          </strong>
          <small>Humidity</small>
        </div>

        <div className="stat-item">
          <Wind size={19} />
          <strong>
            {current.windSpeed} km/h
          </strong>
          <small>Wind</small>
        </div>

        <div className="stat-item">
          <Gauge size={19} />
          <strong>
            {current.pressure} hPa
          </strong>
          <small>Pressure</small>
        </div>
      </div>
    </section>
  );
}
