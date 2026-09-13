function StatCard({ icon, label, value, detail }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className="stat-icon">{icon}</span>
        <span className="stat-label">{label}</span>
      </div>

      <div className="stat-value">{value}</div>

      {detail && <div className="stat-detail">{detail}</div>}
    </article>
  );
}

export default StatCard;
