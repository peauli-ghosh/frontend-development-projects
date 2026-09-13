import { CalendarCheck, Phone, UserRound } from "lucide-react";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function EmployeeCard({ employee, onClick }) {
  const statusClass = (employee.status || "Unknown")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <article
      className="employee-card clickable"
      onClick={onClick}
      role="button"
      tabIndex="0"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClick();
        }
      }}
    >
      <div className="employee-card-top">
        <div className="employee-profile">
          <div className="avatar" aria-hidden="true">
            {employee.image ? (
              <img
                src={employee.image}
                alt=""
              />
            ) : (
              getInitials(employee.name)
            )}
          </div>

          <div className="employee-heading">
            <h3>{employee.name}</h3>
            <p>{employee.role}</p>
          </div>
        </div>

        <span className={`status-badge ${statusClass}`}>
          <span className="status-dot" />
          {employee.status}
        </span>
      </div>

      <div className="employee-department">
        {employee.department}
      </div>

      <div className="employee-info">
        <div className="info-row">
          <UserRound size={16} />
          <span>{employee.employeeId}</span>
        </div>

        <div className="info-row">
          <Phone size={16} />
          <span>{employee.phone || "No phone provided"}</span>
        </div>
      </div>

      <div className="attendance-section">
        <div className="attendance-heading">
          <span>
            <CalendarCheck size={15} />
            Attendance
          </span>

          <strong>{employee.attendance}%</strong>
        </div>

        <div className="attendance-track">
          <div
            className="attendance-fill"
            style={{
              width: `${employee.attendance}%`
            }}
          />
        </div>
      </div>

      <div className="card-click-hint">
        Click to view full profile
      </div>
    </article>
  );
}

export default EmployeeCard;
