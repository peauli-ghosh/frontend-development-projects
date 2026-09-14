import { Building2, ChevronRight, FolderKanban, UsersRound } from "lucide-react";

function DepartmentSection({ departments, onDepartmentClick }) {
  return (
    <section className="departments-section" id="departments">
      <div className="section-heading department-heading">
        <div>
          <span className="section-kicker">ORGANIZATION</span>
          <h2>Departments</h2>
          <p>Explore each department, its workforce, projects and attendance performance.</p>
        </div>
        <div className="department-count"><Building2 size={17} /><span>{departments.length} Departments</span></div>
      </div>

      <div className="department-grid">
        {departments.map((department) => {
          const projects = Array.isArray(department.projects) ? department.projects : [];
          const attendance = Math.min(100, Math.max(0, Number(department.averageAttendance || 0)));
          return (
            <button className="department-card" type="button" key={department.id} onClick={() => onDepartmentClick(department)}>
              <div className="department-card-top">
                <div className="department-icon" aria-hidden="true"><Building2 size={21} /></div>
                <span className="department-id">{department.id}</span>
              </div>

              <div className="department-card-content">
                <h3>{department.name}</h3>
                <p>{department.description || "Department information and workforce overview."}</p>
              </div>

              <div className="department-metrics">
                <div className="department-metric">
                  <UsersRound size={15} aria-hidden="true" />
                  <strong>{department.employeeCount}</strong>
                  <span>{department.employeeCount === 1 ? "Employee" : "Employees"}</span>
                </div>
                <div className="department-metric">
                  <FolderKanban size={15} aria-hidden="true" />
                  <strong>{projects.length}</strong>
                  <span>{projects.length === 1 ? "Project" : "Projects"}</span>
                </div>
              </div>

              <div className="department-card-footer">
                <div className="department-attendance">
                  <span>Attendance</span>
                  <strong>{attendance}%</strong>
                </div>
                <div className="department-progress"><span style={{ width: `${attendance}%` }} /></div>
              </div>

              <div className="department-status-row">
                <span className="department-status active"><span />{department.activeCount} Active</span>
                <span className="department-status leave"><span />{department.leaveCount} On Leave</span>
                {department.inactiveCount > 0 && <span className="department-status inactive"><span />{department.inactiveCount} Inactive</span>}
                <ChevronRight className="department-arrow" size={18} aria-hidden="true" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default DepartmentSection;
