import {
  ArrowUpRight,
  Trash2
} from "lucide-react";

export default function RecentlySearched({
  cities,
  activeCity,
  onSelect,
  onClear
}) {
  const visibleCities =
    (cities || []).slice(0, 8);

  return (
    <section className="side-card recent-card">
      <div className="side-card-heading">
        <div>
          <span>HISTORY</span>
          <h2>Recently searched</h2>
        </div>

        {visibleCities.length > 0 && (
          <button
            type="button"
            className="clear-history"
            onClick={onClear}
          >
            <Trash2 size={14} />
            Clear
          </button>
        )}
      </div>

      {visibleCities.length ? (
        <div className="recent-list">
          {visibleCities.map((item) => (
            <button
              type="button"
              key={item}
              className={
                "recent-item " +
                (
                  item.toLowerCase() ===
                  (activeCity || "").toLowerCase()
                    ? "active"
                    : ""
                )
              }
              onClick={() => onSelect(item)}
            >
              <span>{item}</span>
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-history">
          Your last eight searches will appear here.
        </p>
      )}
    </section>
  );
}




