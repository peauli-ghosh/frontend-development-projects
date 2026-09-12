function StudentCard({
  name,
  rollNumber,
  department,
  section,
  semester,
  cgpa,
  photo,
  onClick,
}) {
  return (
    <article
      className="student-card"
      onClick={onClick}
      tabIndex="0"
      role="button"
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          onClick();
        }
      }}
    >
      <div className="student-card-top">
        <img
          src={photo}
          alt={name}
          className="student-photo"
        />

        <div className="student-heading">
          <h3>{name}</h3>

          <p>
            {department} · Section {section}
          </p>
        </div>

        <span className="card-arrow">↗</span>
      </div>

      <div className="student-details">
        <div className="detail-item">
          <span>Roll Number</span>
          <strong>{rollNumber}</strong>
        </div>

        <div className="detail-item">
          <span>Semester</span>
          <strong>{semester}</strong>
        </div>

        <div className="detail-item cgpa-item">
          <span>CGPA</span>
          <strong>{cgpa}</strong>
        </div>
      </div>

      <div className="click-hint">
        Click to view complete profile
      </div>
    </article>
  );
}

export default StudentCard;