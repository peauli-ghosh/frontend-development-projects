import { CloudSun } from "lucide-react";

function formatTemperature(value, unit) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return "--";
  }

  const converted =
    unit === "F"
      ? Math.round((numeric * 9) / 5 + 32)
      : Math.round(numeric);

  return `${converted}°${unit}`;
}

export default function WeatherSummary({ weather, unit = "C" }) {
  if (!weather?.current) return null;

  const { current } = weather;

  const currentTemp = formatTemperature(current.temperature, unit);
  const feelsLike = formatTemperature(current.feelsLike, unit);

  const humidity = current.humidity ?? "--";
  const windSpeed = current.windSpeed ?? "--";
  const visibility = current.visibility ?? "--";

  const rainChance = Math.max(
    0,
    ...(weather.hourly || []).map(
      (item) => Number(item.rainChance) || 0
    )
  );

  const aqi = weather.aqi?.index;

  let aqiText = "not currently available";

  if (aqi === 1) aqiText = "currently good";
  if (aqi === 2) aqiText = "currently fair";
  if (aqi === 3) aqiText = "currently moderate";
  if (aqi === 4) aqiText = "currently poor";
  if (aqi === 5) aqiText = "currently very poor";

  return (
    <section className="side-card summary-card">
      <div className="side-card-heading">
        <div>
          <span className="eyebrow">OUTLOOK</span>
          <h2>What this means</h2>
        </div>

        <div className="summary-icon">
          <CloudSun size={22} strokeWidth={1.8} />
        </div>
      </div>

      <div className="summary-copy">

        <p>
          It is currently <strong>{currentTemp}</strong> with{" "}
          <strong>{current.condition.toLowerCase()}</strong>, and it feels
          like <strong>{feelsLike}</strong>.
        </p>

        <p>
          Humidity is <strong>{humidity}%</strong> with winds around{" "}
          <strong>{windSpeed} km/h</strong>. Visibility is approximately{" "}
          <strong>{visibility} km</strong>.
        </p>

        <p>
          Rain probability over the upcoming forecast periods
          reaches a peak of <strong>{rainChance}%</strong>.
        </p>

        <p>
          Air quality is <strong>{aqiText}</strong> based on the reported
          AQI level.
        </p>

      </div>
    </section>
  );
}




