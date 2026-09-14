import { Search, UserRound, X } from "lucide-react";

function EmployeeListModal({ mode, employees, onClose, onEmployeeClick }) {
  const titles = {
    all: "All Employees",
    active: "Active Employees",
    leave: "Employees on Leave"
  };

  const descriptions = {
    all: "Complete employee directory",
    active: "Employees currently marked as active",
    leave: "Employees currently on leave"
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="list-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="employee-list-title">
        <div className="modal-header">
          <div className="modal-header-copy">
            <span className="modal-eyebrow">EMPLOYEE DIRECTORY</span>
            <h2 id="employee-list-title">{titles[mode] || "Employees"}</h2>
            <p className="modal-description">{descriptions[mode] || "Employee list"}</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close employee list"><X size={20} /></button>
        </div>

        <div className="list-modal-body">
          <div className="list-modal-summary">
            <div>
              <strong>{employees.length}</strong>
              <span>{employees.length === 1 ? "employee" : "employees"}</span>
            </div>
          </div>

          <div className="employee-list">
            {employees.length > 0 ? employees.map((employee) => (
              <button className="employee-list-item" type="button" key={employee.id} onClick={() => onEmployeeClick(employee)}>
                <div className="list-avatar" aria-hidden="true">
                  {employee.image ? <img src={employee.image} alt="" /> : <UserRound size={20} />}
                </div>
                <div className="list-identity">
                  <strong>{employee.name}</strong>
                  <span>{employee.employeeId} · {employee.role || "Employee"}</span>
                </div>
                <div className="list-meta">
                  <span className={`status-badge ${(employee.status || "Unknown").toLowerCase().replace(/\s+/g, "-")}`}>
                    <span className="status-dot" />
                    {employee.status || "Unknown"}
                  </span>
                  <small>{employee.department}</small>
                </div>
              </button>
            )) : (
              <div className="empty-state">
                <div className="empty-icon"><Search size={24} /></div>
                <strong>No employees found</strong>
                <span>There are no employees in this category.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeListModal;
