import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  UserRound,
  UsersRound,
  X
} from "lucide-react";

function statusClass(status) {
  return (status || "Unknown").toLowerCase().replace(/\s+/g, "-");
}

function DepartmentModal({ department, onClose, onEmployeeClick }) {
  if (!department) return null;

  const projects = Array.isArray(department.projects) ? department.projects : [];
  const members = Array.isArray(department.members) ? department.members : [];
  const attendance = Math.min(100, Math.max(0, Number(department.averageAttendance || 0)));

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="department-modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="department-details-title"
      >
        <div className="modal-header">
          <div className="modal-header-copy">
            <span className="modal-eyebrow">DEPARTMENT DETAILS</span>
            <h2 id="department-details-title">{department.name}</h2>
            <p className="modal-description">
              {department.description || "Department workforce and operational overview."}
            </p>
          </div>

          <button className="icon-button" type="button" onClick={onClose} aria-label="Close department details">
            <X size={20} />
          </button>
        </div>

        <div className="department-modal-body">
          <div className="department-modal-hero">
            <div className="department-modal-icon" aria-hidden="true">
              <BriefcaseBusiness size={24} />
            </div>

            <div className="department-modal-identity">
              <span>Department ID</span>
              <strong>{department.id}</strong>
            </div>

            <div className="department-modal-identity">
              <span>Established</span>
              <strong>{department.year || "Not provided"}</strong>
            </div>

            <div className="department-modal-identity">
              <span>Department Head</span>
              <strong>{department.head || "Not assigned"}</strong>
            </div>
          </div>

          <div className="department-stat-grid" aria-label="Department statistics">
            <div className="department-stat-card">
              <UsersRound size={18} aria-hidden="true" />
              <span>Total Employees</span>
              <strong>{department.employeeCount}</strong>
            </div>

            <div className="department-stat-card">
              <BarChart3 size={18} aria-hidden="true" />
              <span>Avg. Attendance</span>
              <strong>{attendance}%</strong>
            </div>

            <div className="department-stat-card">
              <CalendarDays size={18} aria-hidden="true" />
              <span>Active Employees</span>
              <strong>{department.activeCount}</strong>
            </div>

            <div className="department-stat-card">
              <BriefcaseBusiness size={18} aria-hidden="true" />
              <span>Projects</span>
              <strong>{projects.length}</strong>
            </div>
          </div>

          <section className="department-detail-section">
            <div className="profile-section-heading">
              <UsersRound size={17} aria-hidden="true" />
              <h3>Department Employees</h3>
              <span className="section-heading-count">{members.length}</span>
            </div>

            {members.length > 0 ? (
              <div className="department-member-list">
                {members.map((employee) => (
                  <button
                    className="department-member"
                    type="button"
                    key={employee.id}
                    onClick={() => onEmployeeClick(employee)}
                  >
                    <div className="department-member-avatar" aria-hidden="true">
                      {employee.image ? (
                        <img src={employee.image} alt="" />
                      ) : (
                        <UserRound size={18} />
                      )}
                    </div>

                    <div className="department-member-info">
                      <strong>{employee.name}</strong>
                      <span>
                        {employee.employeeId} · {employee.role || "Employee"}
                      </span>
                    </div>

                    <div className="department-member-attendance">
                      <strong>{Number(employee.attendance || 0)}%</strong>
                      <span>Attendance</span>
                    </div>

                    <span className={`status-badge ${statusClass(employee.status)}`}>
                      <span className="status-dot" />
                      {employee.status || "Unknown"}
                    </span>

                    <ChevronRight size={17} aria-hidden="true" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon"><UsersRound size={24} /></div>
                <strong>No employees assigned</strong>
                <span>This department currently has no employee records.</span>
              </div>
            )}
          </section>

          <section className="department-detail-section">
            <div className="profile-section-heading">
              <BriefcaseBusiness size={17} aria-hidden="true" />
              <h3>Department Projects</h3>
              <span className="section-heading-count">{projects.length}</span>
            </div>

            {projects.length > 0 ? (
              <div className="department-project-grid">
                {projects.map((project, index) => (
                  <div className="department-project" key={`${project}-${index}`}>
                    <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{project}</strong>
                      <span>Department project</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="not-provided">No projects have been assigned to this department.</p>
            )}
          </section>

          <section className="department-detail-section">
            <div className="profile-section-heading">
              <BarChart3 size={17} aria-hidden="true" />
              <h3>Attendance Overview</h3>
            </div>

            <div className="department-attendance-overview">
              <div className="department-attendance-value">
                <strong>{attendance}%</strong>
                <span>Average attendance</span>
              </div>

              <div className="department-attendance-bar" aria-label={`Average attendance ${attendance}%`}>
                <span style={{ width: `${attendance}%` }} />
              </div>

              <div className="department-status-summary">
                <span className="department-status active"><span />{department.activeCount} Active</span>
                <span className="department-status leave"><span />{department.leaveCount} On Leave</span>
                {department.inactiveCount > 0 && (
                  <span className="department-status inactive"><span />{department.inactiveCount} Inactive</span>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <span className="analytics-note">Select an employee above to open their complete profile.</span>
          <button className="secondary-button" type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DepartmentModal;
