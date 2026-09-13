import { useState } from "react";
import { Save, X } from "lucide-react";

const emptyEmployee = {
  name: "",
  employeeId: "",
  department: "",
  departmentId: "",
  role: "",
  gender: "",
  phone: "",
  email: "",
  localAddress: "",
  permanentAddress: "",
  status: "Active",
  attendance: 100,
  joiningYear: "",
  image: "",
  projects: []
};

function EmployeeForm({
  employee,
  departments,
  onSave,
  onClose,
  saving
}) {
  const initialForm = employee
    ? {
        ...emptyEmployee,
        ...employee
      }
    : emptyEmployee;

  const initialProjects = Array.isArray(employee?.projects)
    ? employee.projects.join(", ")
    : employee?.projects || "";

  const [form, setForm] = useState(initialForm);
  const [projectsText, setProjectsText] = useState(initialProjects);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        name === "attendance"
          ? Number(value)
          : value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const projects = projectsText
      .split(",")
      .map((project) => project.trim())
      .filter(Boolean);

    onSave({
      ...form,
      projects
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="employee-modal form-modal">
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              {employee ? "EDIT EMPLOYEE" : "NEW EMPLOYEE"}
            </span>

            <h2>
              {employee ? "Edit Employee" : "Add Employee"}
            </h2>
          </div>

          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Information</h3>

            <div className="form-grid">
              <label className="form-field">
                <span>Full Name *</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Employee ID *</span>
                <input
                  name="employeeId"
                  value={form.employeeId}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Gender</span>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="form-field">
                <span>Joining Year</span>
                <input
                  name="joiningYear"
                  type="number"
                  min="1900"
                  max="2100"
                  value={form.joiningYear}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Work Information</h3>

            <div className="form-grid">
              <label className="form-field">
                <span>Department *</span>

                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select department
                  </option>

                  {departments.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span>Department ID</span>

                <input
                  name="departmentId"
                  value={form.departmentId}
                  onChange={handleChange}
                  placeholder="e.g. DEPT001"
                />
              </label>

              <label className="form-field">
                <span>Role *</span>

                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Status</span>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="On Leave">
                    On Leave
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </label>

              <label className="form-field">
                <span>Attendance (%)</span>

                <input
                  name="attendance"
                  type="number"
                  min="0"
                  max="100"
                  value={form.attendance}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Profile Image URL</span>

                <input
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Information</h3>

            <div className="form-grid">
              <label className="form-field">
                <span>Phone</span>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Email</span>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field full-width">
                <span>Local Address</span>

                <textarea
                  name="localAddress"
                  value={form.localAddress}
                  onChange={handleChange}
                  rows="2"
                />
              </label>

              <label className="form-field full-width">
                <span>Permanent Address</span>

                <textarea
                  name="permanentAddress"
                  value={form.permanentAddress}
                  onChange={handleChange}
                  rows="2"
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Projects</h3>

            <label className="form-field full-width">
              <span>Projects</span>

              <input
                value={projectsText}
                onChange={(event) =>
                  setProjectsText(event.target.value)
                }
                placeholder="Project Alpha, Farm Expansion, Irrigation Upgrade"
              />

              <small>
                Separate multiple projects with commas.
              </small>
            </label>
          </div>

          <div className="modal-footer">
            <button
              className="secondary-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="primary-button"
              type="submit"
              disabled={saving}
            >
              <Save size={16} />

              {saving
                ? "Saving..."
                : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
