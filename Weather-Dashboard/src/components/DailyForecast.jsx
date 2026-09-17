function displayTemp(value, unit) {
  const converted =
    unit === "F"
      ? Math.round(value * 9 / 5 + 32)
      : Math.round(value);

  return String(converted) + "°" + unit;
}

export default function DailyForecast({
  items,
  unit = "C"
}) {
  return (
    <section className="glass-panel daily-forecast-panel">
      <div className="section-heading">
        <div>
          <span className="section-kicker">
            OUTLOOK
          </span>

          <h2>5-day forecast</h2>
        </div>
      </div>

      <div className="daily-grid">
        {items.map((item, index) => (
          <article
            className={
              "day-card " +
              (index === 0
                ? "day-card--active"
                : "")
            }
            key={item.day + "-" + index}
          >
            <span className="day-name">
              {item.day}
            </span>

            <img
              src={item.icon}
              alt={item.description}
            />

            <span className="forecast-condition">
              {item.condition || item.description}
            </span>

            <strong>
              {displayTemp(item.high, unit)}
            </strong>

            <small>
              Low {displayTemp(item.low, unit)}
            </small>

            {item.rainChance > 0 && (
              <em>
                {item.rainChance}% rain
              </em>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}



