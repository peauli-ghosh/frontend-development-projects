import {
  Activity,
  Wind
} from "lucide-react";

function getLabel(index) {
  return [
    "",
    "Good",
    "Fair",
    "Moderate",
    "Poor",
    "Very Poor"
  ][index] || "Unavailable";
}

export default function AirQuality({
  aqi
}) {
  if (!aqi) {
    return (
      <section className="side-card aqi-card">
        <div className="side-card-heading">
          <div>
            <span>AIR QUALITY</span>
            <h2>Unavailable</h2>
          </div>

          <Activity size={20} />
        </div>

        <p className="aqi-unavailable">
          Air quality data could not be loaded
          for this location right now.
        </p>
      </section>
    );
  }

  const label = getLabel(aqi.index);

  return (
    <section className="side-card aqi-card">
      <div className="side-card-heading">
        <div>
          <span>AIR QUALITY</span>
          <h2>Air quality</h2>
        </div>

        <span
          className={
            "aqi-badge aqi-" +
            aqi.index
          }
        >
          {label}
        </span>
      </div>

      <div className="aqi-main">
        <div className="aqi-number">
          {aqi.index}
        </div>

        <div>
          <strong>
            Air Quality Index
          </strong>

          <span>
            {label} conditions
          </span>
        </div>
      </div>

      <div className="pollutants">
        <div>
          <span>PM2.5</span>
          <strong>
            {aqi.pm25.toFixed(1)}
          </strong>
        </div>

        <div>
          <span>PM10</span>
          <strong>
            {aqi.pm10.toFixed(1)}
          </strong>
        </div>

        <div>
          <span>NO₂</span>
          <strong>
            {aqi.no2.toFixed(1)}
          </strong>
        </div>
      </div>
    </section>
  );
}

