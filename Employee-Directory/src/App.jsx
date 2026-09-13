import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BriefcaseBusiness,
  CalendarDays,
  UsersRound
} from "lucide-react";

import Header from "./components/Header";
import StatCard from "./components/StatCard";
import EmployeeToolbar from "./components/EmployeeToolbar";
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeProfile from "./components/EmployeeProfile";
import EmployeeForm from "./components/EmployeeForm";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "./services/employeeApi";

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All");

  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("employee-directory-theme") ||
      "dark"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getEmployees()
      .then((data) => {
        if (!cancelled) {
          setEmployees(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.message || "Unable to load employees."
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(
      "employee-directory-theme",
      theme
    );
  }, [theme]);

  const departments = useMemo(() => {
    return [
      ...new Set(
        employees
          .map((employee) => employee.department)
          .filter(Boolean)
      )
    ].sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch =
        !query ||
        employee.name?.toLowerCase().includes(query) ||
        employee.employeeId?.toLowerCase().includes(query) ||
        employee.department?.toLowerCase().includes(query) ||
        employee.role?.toLowerCase().includes(query);

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, department]);

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const employeesOnLeave = employees.filter(
    (employee) => employee.status === "On Leave"
  ).length;

  const averageAttendance = employees.length
    ? Math.round(
        employees.reduce(
          (total, employee) =>
            total + Number(employee.attendance || 0),
          0
        ) / employees.length
      )
    : 0;

  function toggleTheme() {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  }

  function openEmployee(employee) {
    setSelectedEmployee(employee);
  }

  function openAddForm() {
    setSelectedEmployee(null);
    setEditingEmployee(null);
    setFormOpen(true);
  }

  function openEditForm() {
    setEditingEmployee(selectedEmployee);
    setSelectedEmployee(null);
    setFormOpen(true);
  }

  async function handleSaveEmployee(employeeData) {
    try {
      setSaving(true);
      setError("");

      if (editingEmployee) {
        const updated = await updateEmployee(
          editingEmployee.id,
          {
            ...employeeData,
            id: editingEmployee.id
          }
        );

        setEmployees((current) =>
          current.map((employee) =>
            employee.id === editingEmployee.id
              ? updated
              : employee
          )
        );
      } else {
        const created = await addEmployee({
          ...employeeData,
          id: crypto.randomUUID()
        });

        setEmployees((current) => [
          ...current,
          created
        ]);
      }

      setFormOpen(false);
      setEditingEmployee(null);
    } catch (err) {
      setError(
        err.message || "Unable to save employee."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteEmployee() {
    if (!selectedEmployee) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedEmployee.name} (${selectedEmployee.employeeId})?`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      await deleteEmployee(selectedEmployee.id);

      setEmployees((current) =>
        current.filter(
          (employee) =>
            employee.id !== selectedEmployee.id
        )
      );

      setSelectedEmployee(null);
    } catch (err) {
      setError(
        err.message || "Unable to delete employee."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="app-shell" id="top">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content" id="dashboard">
        <section className="page-heading">
          <div>
            <span className="eyebrow">
              WORKFORCE MANAGEMENT
            </span>

            <h1>Employee Directory</h1>

            <p>
              Manage your farm workforce,
              employee information,
              attendance and departments
              in one place.
            </p>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={openAddForm}
          >
            + Add Employee
          </button>
        </section>

        <section
          className="stats-grid"
          aria-label="Employee statistics"
        >
          <StatCard
            icon={<UsersRound size={19} />}
            label="Total Employees"
            value={employees.length}
            detail="All registered employees"
          />

          <StatCard
            icon={<Activity size={19} />}
            label="Active"
            value={activeEmployees}
            detail="Currently active"
          />

          <StatCard
            icon={<CalendarDays size={19} />}
            label="On Leave"
            value={employeesOnLeave}
            detail="Currently on leave"
          />

          <StatCard
            icon={<BriefcaseBusiness size={19} />}
            label="Avg. Attendance"
            value={`${averageAttendance}%`}
            detail="Across all employees"
          />
        </section>

        <section
          className="employees-section"
          id="employees"
        >
          <div className="section-heading">
            <div>
              <h2>Employees</h2>

              <p>
                {filteredEmployees.length} of{" "}
                {employees.length} employees shown
              </p>
            </div>
          </div>

          <EmployeeToolbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            department={department}
            onDepartmentChange={setDepartment}
            departments={departments}
          />

          {loading && (
            <div className="loading-state">
              <div className="loading-spinner" />

              <span>
                Loading employees...
              </span>
            </div>
          )}

          {!loading && error && (
            <div className="error-state">
              <strong>
                Couldn't load employees.
              </strong>

              <span>{error}</span>

              <small>
                Make sure JSON Server is running
                on port 3001.
              </small>
            </div>
          )}

          {!loading && !error && (
            <EmployeeGrid
              employees={filteredEmployees}
              onEmployeeClick={openEmployee}
            />
          )}
        </section>

        <section
          className="department-anchor"
          id="departments"
        >
          <span>Departments</span>

          <strong>
            {departments.length}
          </strong>
        </section>
      </main>

      {selectedEmployee && (
        <EmployeeProfile
          employee={selectedEmployee}
          onClose={() =>
            setSelectedEmployee(null)
          }
          onEdit={openEditForm}
          onDelete={
            deleting
              ? () => {}
              : handleDeleteEmployee
          }
        />
      )}

      {formOpen && (
        <EmployeeForm
          employee={editingEmployee}
          departments={departments}
          onSave={handleSaveEmployee}
          onClose={() => {
            setFormOpen(false);
            setEditingEmployee(null);
          }}
          saving={saving}
        />
      )}
    </div>
  );
}

export default App;