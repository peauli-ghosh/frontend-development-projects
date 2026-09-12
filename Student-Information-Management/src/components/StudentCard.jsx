function StudentCard({
  name,
  rollNumber,
  department,
  semester,
  cgpa,
  photo,
}) {
  return (
    <div className="student-card">
      <img
        src={photo}
        alt={name}
        className="student-photo"
      />

      <div className="student-info">
        <h2>{name}</h2>

        <p>
          <strong>Roll Number:</strong> {rollNumber}
        </p>

        <p>
          <strong>Department:</strong> {department}
        </p>

        <p>
          <strong>Semester:</strong> {semester}
        </p>

        <p>
          <strong>CGPA:</strong> {cgpa}
        </p>
      </div>
    </div>
  );
}

export default StudentCard;
