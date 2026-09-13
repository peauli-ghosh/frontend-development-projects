import {

  MapPin,
  Phone,
  BriefcaseBusiness,
  CalendarDays,
  UserRound,
  Pencil,
  Trash2,
  X
} from "lucide-react";

function EmployeeProfile({
  employee,
  onClose,
  onEdit,
  onDelete
}) {
  if (!employee) return null;

  const projects = Array.isArray(employee.projects)
    ? employee.projects
    : typeof employee.projects === "string"
      ? employee.projects.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="employee-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">EMPLOYEE PROFILE</span>
            <h2>Employee Details</h2>
          </div>

          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close employee profile"
          >
            <X size={20} />
          </button>
        </div>

        <div className="profile-hero">
          <div className="profile-avatar">
            {employee.image ? (
              <img
                src={employee.image}
                alt={employee.name}
              />
            ) : (
              employee.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            )}
          </div>

          <div className="profile-identity">
            <h3>{employee.name}</h3>
            <p>{employee.role || "Employee"}</p>

            <div className="profile-meta">
              <span className={`status-badge ${employee.status?.toLowerCase().replace(/\s+/g, "-")}`}>
                <span className="status-dot" />
                {employee.status || "Unknown"}
              </span>

              <span className="profile-id">
                {employee.employeeId}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <section className="profile-section">
            <div className="profile-section-heading">
              <UserRound size={17} />
              <h3>Personal Information</h3>
            </div>

            <div className="profile-grid">
              <div className="detail-item">
                <span>Full Name</span>
                <strong>{employee.name}</strong>
              </div>

              <div className="detail-item">
                <span>Gender</span>
                <strong>{employee.gender || "Not provided"}</strong>
              </div>

              <div className="detail-item">
                <span>Employee ID</span>
                <strong>{employee.employeeId}</strong>
              </div>

              <div className="detail-item">
                <span>Joining Year</span>
                <strong>{employee.joiningYear || employee.year || "Not provided"}</strong>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-heading">
              <BriefcaseBusiness size={17} />
              <h3>Work Information</h3>
            </div>

            <div className="profile-grid">
              <div className="detail-item">
                <span>Department</span>
                <strong>{employee.department}</strong>
              </div>

              <div className="detail-item">
                <span>Department ID</span>
                <strong>{employee.departmentId || "Not provided"}</strong>
              </div>

              <div className="detail-item">
                <span>Role</span>
                <strong>{employee.role}</strong>
              </div>

              <div className="detail-item">
                <span>Attendance</span>
                <strong>{employee.attendance}%</strong>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-heading">
              <Phone size={17} />
              <h3>Contact Information</h3>
            </div>

            <div className="profile-grid">
              <div className="detail-item">
                <span>Phone</span>
                <strong>{employee.phone || "Not provided"}</strong>
              </div>

              <div className="detail-item">
                <span>Email</span>
                <strong>{employee.email || "Not provided"}</strong>
              </div>

              <div className="detail-item full-width">
                <span>Local Address</span>
                <strong>
                  {employee.localAddress || "Not provided"}
                </strong>
              </div>

              <div className="detail-item full-width">
                <span>Permanent Address</span>
                <strong>
                  {employee.permanentAddress || "Not provided"}
                </strong>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-heading">
              <CalendarDays size={17} />
              <h3>Projects</h3>
            </div>

            {projects.length > 0 ? (
              <div className="project-list">
                {projects.map((project, index) => (
                  <span className="project-chip" key={`${project}-${index}`}>
                    {project}
                  </span>
                ))}
              </div>
            ) : (
              <p className="not-provided">
                No projects have been assigned yet.
              </p>
            )}
          </section>

          <section className="profile-section">
            <div className="profile-section-heading">
              <MapPin size={17} />
              <h3>Additional Information</h3>
            </div>

            <div className="profile-grid">
              <div className="detail-item">
                <span>Status</span>
                <strong>{employee.status || "Not provided"}</strong>
              </div>

              <div className="detail-item">
                <span>Attendance</span>
                <strong>{employee.attendance}%</strong>
              </div>
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <button
            className="danger-button"
            type="button"
            onClick={onDelete}
          >
            <Trash2 size={16} />
            Delete Employee
          </button>

          <div className="modal-footer-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={onClose}
            >
              Close
            </button>

            <button
              className="primary-button"
              type="button"
              onClick={onEdit}
            >
              <Pencil size={16} />
              Edit Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;


