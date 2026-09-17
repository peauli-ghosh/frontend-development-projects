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
import EmployeeListModal from "./components/EmployeeListModal";
import AttendanceModal from "./components/AttendanceModal";
import DepartmentSection from "./components/DepartmentSection";
import DepartmentModal from "./components/DepartmentModal";
import DeleteManagement from "./components/DeleteManagement";
import ConfirmDialog from "./components/ConfirmDialog";
import AdministrationSection from "./components/AdministrationSection";
import Footer from "./components/Footer";

import DepartmentForm from "./components/DepartmentForm";

import {
  getEmployees,
  getDepartments,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  addDepartment,
  deleteDepartment
} from "./services/employeeApi";

function normalizeImage(image) {
  if (!image || typeof image !== "string") {
    return "";
  }

  const markdownMatch = image.match(
    /^\[.*?\]\((.*?)\)$/
  );

  return markdownMatch
    ? markdownMatch[1]
    : image;
}

function App() {
  const [employees, setEmployees] = useState([]);
  const [departmentsData, setDepartmentsData] =
    useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All");

  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem(
        "employee-directory-theme"
      ) || "dark"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] =
    useState(null);

  const [departmentFormOpen, setDepartmentFormOpen] =
    useState(false);

  const [employeeListMode, setEmployeeListMode] =
    useState(null);

  const [attendanceOpen, setAttendanceOpen] =
    useState(false);

  const [selectedDepartment, setSelectedDepartment] =
    useState(null);

  const [saving, setSaving] = useState(false);

  const [confirmDelete, setConfirmDelete] =
    useState(null);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      getEmployees(),
      getDepartments()
    ])
      .then(
        async ([
          employeeData,
          departmentData
        ]) => {
          if (cancelled) {
            return;
          }

          const normalizedEmployees =
            employeeData.map((employee) => ({
              ...employee,
              image: normalizeImage(
                employee.image
              )
            }));

          setEmployees(normalizedEmployees);
          setDepartmentsData(departmentData);
          setError("");
        }
      )
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.message ||
              "Unable to load directory data."
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
    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      "employee-directory-theme",
      theme
    );
  }, [theme]);

  const departments = useMemo(
    () =>
      departmentsData
        .map((item) => item.name)
        .filter(Boolean)
        .sort(),
    [departmentsData]
  );

  const filteredEmployees = useMemo(() => {
    const query =
      searchTerm.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch =
        !query ||
        employee.name
          ?.toLowerCase()
          .includes(query) ||
        employee.employeeId
          ?.toLowerCase()
          .includes(query) ||
        employee.department
          ?.toLowerCase()
          .includes(query) ||
        employee.role
          ?.toLowerCase()
          .includes(query);

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return (
        matchesSearch &&
        matchesDepartment
      );
    });
  }, [
    employees,
    searchTerm,
    department
  ]);

  const activeEmployees = useMemo(
    () =>
      employees.filter(
        (employee) =>
          employee.status === "Active"
      ),
    [employees]
  );

  const employeesOnLeave = useMemo(
    () =>
      employees.filter(
        (employee) =>
          employee.status === "On Leave"
      ),
    [employees]
  );

  const averageAttendance = useMemo(() => {
    if (!employees.length) {
      return 0;
    }

    const total = employees.reduce(
      (sum, employee) =>
        sum +
        Number(employee.attendance || 0),
      0
    );

    return Math.round(
      total / employees.length
    );
  }, [employees]);

  const departmentDetails = useMemo(
    () =>
      departmentsData.map((item) => {
        const members = employees.filter(
          (employee) =>
            employee.departmentId === item.id ||
            employee.department === item.name
        );

        const average =
          members.length > 0
            ? Math.round(
                members.reduce(
                  (total, employee) =>
                    total +
                    Number(
                      employee.attendance || 0
                    ),
                  0
                ) / members.length
              )
            : 0;

        return {
          ...item,
          members,
          employeeCount: members.length,
          activeCount: members.filter(
            (employee) =>
              employee.status === "Active"
          ).length,
          leaveCount: members.filter(
            (employee) =>
              employee.status === "On Leave"
          ).length,
          inactiveCount: members.filter(
            (employee) =>
              employee.status === "Inactive"
          ).length,
          averageAttendance: average
        };
      }),
    [departmentsData, employees]
  );

  function toggleTheme() {
    setTheme((current) =>
      current === "dark"
        ? "light"
        : "dark"
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

  function openAddDepartmentForm() {
    setDepartmentFormOpen(true);
  }

  function openEditForm() {
    if (!selectedEmployee) {
      return;
    }

    setEditingEmployee(selectedEmployee);
    setSelectedEmployee(null);
    setFormOpen(true);
  }

  async function handleSaveEmployee(
    employeeData
  ) {
    try {
      setSaving(true);
      setError("");

      if (editingEmployee) {
        const updated =
          await updateEmployee(
            editingEmployee.id,
            {
              ...employeeData,
              id: editingEmployee.id
            }
          );

        const normalized = {
          ...updated,
          image: normalizeImage(
            updated.image
          )
        };

        setEmployees((current) =>
          current.map((employee) =>
            employee.id ===
            editingEmployee.id
              ? normalized
              : employee
          )
        );
      } else {
        const created =
          await addEmployee({
            ...employeeData,
            id: crypto.randomUUID()
          });

        const normalized = {
          ...created,
          image: normalizeImage(
            created.image
          )
        };

        setEmployees((current) => [
          ...current,
          normalized
        ]);
      }

      setFormOpen(false);
      setEditingEmployee(null);
    } catch (err) {
      setError(
        err.message ||
          "Unable to save employee."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveDepartment(
    departmentData
  ) {
    try {
      setSaving(true);
      setError("");

      const created =
        await addDepartment(
          departmentData
        );

      setDepartmentsData((current) => [
        ...current,
        created
      ]);

      setDepartmentFormOpen(false);
    } catch (err) {
      setError(
        err.message ||
          "Unable to add department."
      );
    } finally {
      setSaving(false);
    }
  }

  function requestEmployeeDelete(
    employee
  ) {
    setConfirmDelete({
      type: "employee",
      employee
    });
  }

  async function performEmployeeDelete() {
    const employee =
      confirmDelete?.employee;

    if (!employee) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteEmployee(
        employee.id
      );

      setEmployees((current) =>
        current.filter(
          (item) =>
            item.id !== employee.id
        )
      );

      setSelectedEmployee(null);
      setConfirmDelete(null);
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete employee."
      );
    } finally {
      setDeleting(false);
    }
  }

  function requestDepartmentDelete(
    departmentItem
  ) {
    setConfirmDelete({
      type: "department",
      department: departmentItem
    });
  }

  async function performDepartmentDelete() {
    const departmentItem =
      confirmDelete?.department;

    if (!departmentItem) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await Promise.all(
        departmentItem.members.map(
          (employee) =>
            deleteEmployee(
              employee.id
            )
        )
      );

      await deleteDepartment(
        departmentItem.id
      );

      setEmployees((current) =>
        current.filter(
          (employee) =>
            employee.departmentId !==
              departmentItem.id &&
            employee.department !==
              departmentItem.name
        )
      );

      setDepartmentsData((current) =>
        current.filter(
          (department) =>
            department.id !==
            departmentItem.id
        )
      );

      setSelectedDepartment(null);
      setConfirmDelete(null);
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete department."
      );
    } finally {
      setDeleting(false);
    }
  }

  function scrollToSection(id) {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  }

  return (
    <div
      className="app-shell"
      id="top"
    >
      <Header
        theme={theme}
        onToggleTheme={
          toggleTheme
        }
        onNavigate={
          scrollToSection
        }
      />

      <main className="main-content">
        <section className="page-heading" id="dashboard">
  <div className="dashboard-intro">
    <span className="eyebrow">WORKFORCE MANAGEMENT</span>

    <h1>Employee Directory</h1>

    <p>
      Manage employees, departments, attendance and workforce
      information from one responsive workspace.
    </p>
  </div>

  <div className="operations-overview">
    <div className="operations-overview-heading">
      <span className="overview-label">
        WORKFORCE PULSE
      </span>

      <h2>Current operations</h2>

      <p>
        A quick view of workforce availability and the
        department currently performing strongest on attendance.
      </p>
    </div>

    <div className="operations-metrics">
      <div className="operation-item">
        <strong>
          {employees.length
            ? Math.round(
                (activeEmployees.length / employees.length) * 100
              )
            : 0}
          %
        </strong>

        <span>Active workforce</span>
      </div>

      <div className="operation-item">
        <strong>{employeesOnLeave.length}</strong>

        <span>Employees on leave</span>
      </div>

      <div className="operation-item">
        <strong>
          {
            employees.filter(
              (employee) => employee.status === "Inactive"
            ).length
          }
        </strong>

        <span>Inactive records</span>
      </div>

      <div className="operation-item">
        <strong>
          {departmentDetails.length
            ? departmentDetails.reduce(
                (best, item) =>
                  item.averageAttendance >
                  best.averageAttendance
                    ? item
                    : best,
                departmentDetails[0]
              ).name
            : "—"}
        </strong>

        <span>Highest attendance department</span>
      </div>
    </div>
  </div>
</section>

        <section
          className="stats-grid"
          aria-label="Employee statistics"
        >
          <StatCard
            icon={
              <UsersRound size={19} />
            }
            label="Total Employees"
            value={employees.length}
            detail="View complete employee list"
            onClick={() =>
              setEmployeeListMode(
                "all"
              )
            }
          />

          <StatCard
            icon={
              <Activity size={19} />
            }
            label="Active"
            value={
              activeEmployees.length
            }
            detail="View active employees"
            onClick={() =>
              setEmployeeListMode(
                "active"
              )
            }
          />

          <StatCard
            icon={
              <CalendarDays size={19} />
            }
            label="On Leave"
            value={
              employeesOnLeave.length
            }
            detail="View employees on leave"
            onClick={() =>
              setEmployeeListMode(
                "leave"
              )
            }
          />

          <StatCard
            icon={
              <BriefcaseBusiness
                size={19}
              />
            }
            label="Avg. Attendance"
            value={`${averageAttendance}%`}
            detail="Open attendance analytics"
            onClick={() =>
              setAttendanceOpen(
                true
              )
            }
          />
        </section>

        <section
          className="employees-section"
          id="employees"
        >
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                PEOPLE
              </span>

              <h2>
                Employees
              </h2>

              <p>
                {filteredEmployees.length}{" "}
                of {employees.length}{" "}
                employees shown
              </p>
            </div>
          </div>

          <EmployeeToolbar
            searchTerm={searchTerm}
            onSearchChange={
              setSearchTerm
            }
            department={department}
            onDepartmentChange={
              setDepartment
            }
            departments={
              departments
            }
          />

          {loading && (
            <div className="loading-state">
              <div className="loading-spinner" />

              <span>
                Loading employee
                directory...
              </span>
            </div>
          )}

          {!loading && error && (
            <div className="error-state">
              <strong>
                Unable to load
                directory
              </strong>

              <span>
                {error}
              </span>

              <small>
                Make sure JSON Server
                is running on port
                3001.
              </small>
            </div>
          )}

          {!loading &&
            !error && (
              <div className="employee-directory-window">
                <div className="employee-directory-scroll">

                  <EmployeeGrid

                    employees={filteredEmployees}

                    onEmployeeClick={openEmployee}

                  />

                </div>
              </div>
            )}
        </section>

        <DepartmentSection
          departments={
            departmentDetails
          }
          onDepartmentClick={
            setSelectedDepartment
          }
        />

        <AdministrationSection
          onAddEmployee={
            openAddForm
          }
          onAddDepartment={
            openAddDepartmentForm
          }
        />

        <DeleteManagement
          employees={employees}
          departments={
            departmentDetails
          }
          onDeleteEmployee={
            requestEmployeeDelete
          }
          onDeleteDepartment={
            requestDepartmentDelete
          }
        />
      </main>

      {selectedEmployee && (
        <EmployeeProfile
          employee={
            selectedEmployee
          }
          onClose={() =>
            setSelectedEmployee(
              null
            )
          }
          onEdit={
            openEditForm
          }
          onDelete={() =>
            requestEmployeeDelete(
              selectedEmployee
            )
          }
        />
      )}

      {formOpen && (
        <EmployeeForm
          employee={
            editingEmployee
          }
          departments={
            departmentsData
          }
          onSave={
            handleSaveEmployee
          }
          onClose={() => {
            setFormOpen(false);
            setEditingEmployee(
              null
            );
          }}
          saving={saving}
        />
      )}

      {departmentFormOpen && (
        <DepartmentForm
          departments={
            departmentsData
          }
          onClose={() =>
            setDepartmentFormOpen(
              false
            )
          }
          onSave={
            handleSaveDepartment
          }
          saving={saving}
        />
      )}

      {employeeListMode && (
        <EmployeeListModal
          mode={
            employeeListMode
          }
          employees={
            employeeListMode ===
            "active"
              ? activeEmployees
              : employeeListMode ===
                "leave"
                ? employeesOnLeave
                : employees
          }
          onClose={() =>
            setEmployeeListMode(
              null
            )
          }
          onEmployeeClick={(
            employee
          ) => {
            setEmployeeListMode(
              null
            );

            setSelectedEmployee(
              employee
            );
          }}
        />
      )}

      {attendanceOpen && (
        <AttendanceModal
          employees={
            employees
          }
          onClose={() =>
            setAttendanceOpen(
              false
            )
          }
        />
      )}

      {selectedDepartment && (
        <DepartmentModal
          department={
            selectedDepartment
          }
          onClose={() =>
            setSelectedDepartment(
              null
            )
          }
          onEmployeeClick={(
            employee
          ) => {
            setSelectedDepartment(
              null
            );

            setSelectedEmployee(
              employee
            );
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          title={
            confirmDelete.type ===
            "department"
              ? "Delete Department Employees?"
              : "Delete Employee?"
          }
          message={
            confirmDelete.type ===
            "department"
              ? `${confirmDelete.department.name} has ${confirmDelete.department.employeeCount} employee${
                  confirmDelete
                    .department
                    .employeeCount ===
                  1
                    ? ""
                    : "s"
                }. Deleting this department's employees will permanently remove them from the directory.`
              : `Are you sure you want to delete ${confirmDelete.employee.name} (${confirmDelete.employee.employeeId})? This action cannot be undone.`
          }
          confirmLabel={
            confirmDelete.type ===
            "department"
              ? "Delete Department"
              : "Delete Employee"
          }
          danger
          loading={deleting}
          onCancel={() =>
            setConfirmDelete(
              null
            )
          }
          onConfirm={
            confirmDelete.type ===
            "department"
              ? performDepartmentDelete
              : performEmployeeDelete
          }
        />
      )}

      <Footer />
    </div>
  );
}

export default App;









