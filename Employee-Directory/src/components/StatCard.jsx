function StatCard({ icon, label, value, detail, onClick }) {
  return (
    <button
      className="stat-card clickable-stat-card"
      type="button"
      onClick={onClick}
    >
      <div className="stat-card-top">
        <div className="stat-icon">{icon}</div>
        <span className="stat-label">{label}</span>
      </div>

      <strong className="stat-value">{value}</strong>

      <span className="stat-detail">{detail}</span>
    </button>
  );
}

export default StatCard;
