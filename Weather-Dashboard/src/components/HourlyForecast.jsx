function displayTemp(value, unit) {
  const converted =
    unit === "F"
      ? Math.round(value * 9 / 5 + 32)
      : Math.round(value);

  return String(converted) + "°" + unit;
}

export default function HourlyForecast({
  items,
  unit = "C"
}) {
  return (
    <section className="glass-panel">
      <div className="section-heading">
        <div>
          <span className="section-kicker">
            NEXT HOURS
          </span>
          <h2>Hourly forecast</h2>
        </div>

        <span className="section-note">
          3-hour intervals
        </span>
      </div>

      <div className="hourly-grid">
        {items.map((item, index) => (
          <article
            className={
              "hour-card " +
              (index === 0
                ? "hour-card--active"
                : "")
            }
            key={item.time + "-" + index}
          >
            <span className="hour-time">
              {index === 0
                ? "Now"
                : item.time}
            </span>

            <img
              src={item.icon}
              alt={item.description}
            />

            <strong>
              {displayTemp(item.temp, unit)}
            </strong>

            <span className="forecast-condition">
              {item.condition || item.description}
            </span>

            {item.rainChance > 0 && (
              <small>
                {item.rainChance}% rain
              </small>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

