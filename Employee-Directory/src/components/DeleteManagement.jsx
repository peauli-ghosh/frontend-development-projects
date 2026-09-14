import {
  AlertTriangle,
  Building2,
  Search,
  Trash2,
  UserRound
} from "lucide-react";
import { useMemo, useState } from "react";

function DeleteManagement({
  employees,
  departments,
  onDeleteEmployee,
  onDeleteDepartment
}) {
  const [employeeId, setEmployeeId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const matchedEmployee = useMemo(() => {
    const query = employeeId.trim().toLowerCase();

    if (!query) return null;

    return (
      employees.find(
        (employee) =>
          employee.employeeId?.toLowerCase() === query
      ) || null
    );
  }, [employees, employeeId]);

  const matchedDepartment = useMemo(() => {
    const query = departmentId.trim().toLowerCase();

    if (!query) return null;

    return (
      departments.find(
        (department) =>
          department.id?.toLowerCase() === query
      ) || null
    );
  }, [departments, departmentId]);

  function handleEmployeeDelete() {
    if (!matchedEmployee) return;

    onDeleteEmployee(matchedEmployee);
    setEmployeeId("");
  }

  function handleDepartmentDelete() {
    if (!matchedDepartment) return;

    onDeleteDepartment(matchedDepartment);
    setDepartmentId("");
  }

  return (
    <section className="delete-section" id="delete">
      <div className="section-heading">
        <div>
          <h2>Delete Management</h2>

          <p>
            Remove an individual employee or all employee
            records belonging to a department.
          </p>
        </div>
      </div>

      <div className="delete-warning">
        <AlertTriangle size={19} />

        <div>
          <strong>Permanent action</strong>

          <span>
            Deleted employee records cannot be recovered
            from the directory.
          </span>
        </div>
      </div>

      <div className="delete-management-grid">
        <div className="delete-management-card">
          <div className="delete-card-heading">
            <div className="delete-card-icon">
              <UserRound size={19} />
            </div>

            <div>
              <h3>Delete Employee</h3>

              <p>
                Find an employee using their Employee ID.
              </p>
            </div>
          </div>

          <label
            className="delete-input-label"
            htmlFor="delete-employee-id"
          >
            Employee ID
          </label>

          <div className="delete-input-row">
            <div className="delete-input-wrapper">
              <Search size={17} />

              <input
                id="delete-employee-id"
                type="text"
                value={employeeId}
                onChange={(event) =>
                  setEmployeeId(event.target.value)
                }
                placeholder="e.g. EMP001"
                autoComplete="off"
              />
            </div>

            <button
              className="danger-button"
              type="button"
              disabled={!matchedEmployee}
              onClick={handleEmployeeDelete}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>

          {employeeId && (
            <div
              className={`delete-match ${
                matchedEmployee ? "found" : "not-found"
              }`}
            >
              {matchedEmployee ? (
                <>
                  <div className="delete-match-avatar">
                    {matchedEmployee.image ? (
                      <img
                        src={matchedEmployee.image}
                        alt=""
                      />
                    ) : (
                      <UserRound size={17} />
                    )}
                  </div>

                  <div>
                    <strong>{matchedEmployee.name}</strong>

                    <span>
                      {matchedEmployee.department} ·{" "}
                      {matchedEmployee.role || "Employee"}
                    </span>
                  </div>
                </>
              ) : (
                <span>
                  No employee found with this Employee ID.
                </span>
              )}
            </div>
          )}
        </div>

        <div className="delete-management-card">
          <div className="delete-card-heading">
            <div className="delete-card-icon">
              <Building2 size={19} />
            </div>

            <div>
              <h3>Delete Department</h3>

              <p>
                Find a department using its Department ID.
              </p>
            </div>
          </div>

          <label
            className="delete-input-label"
            htmlFor="delete-department-id"
          >
            Department ID
          </label>

          <div className="delete-input-row">
            <div className="delete-input-wrapper">
              <Search size={17} />

              <input
                id="delete-department-id"
                type="text"
                value={departmentId}
                onChange={(event) =>
                  setDepartmentId(event.target.value)
                }
                placeholder="e.g. DEPT001"
                autoComplete="off"
              />
            </div>

            <button
              className="danger-button"
              type="button"
              disabled={!matchedDepartment}
              onClick={handleDepartmentDelete}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>

          {departmentId && (
            <div
              className={`delete-match ${
                matchedDepartment ? "found" : "not-found"
              }`}
            >
              {matchedDepartment ? (
                <>
                  <div className="delete-match-avatar department">
                    <Building2 size={17} />
                  </div>

                  <div>
                    <strong>{matchedDepartment.name}</strong>

                    <span>
                      {matchedDepartment.id} ·{" "}
                      {matchedDepartment.employeeCount} employee
                      {matchedDepartment.employeeCount === 1
                        ? ""
                        : "s"}
                    </span>
                  </div>
                </>
              ) : (
                <span>
                  No department found with this Department ID.
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DeleteManagement;
