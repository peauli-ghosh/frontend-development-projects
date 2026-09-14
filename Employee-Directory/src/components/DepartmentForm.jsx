import { Building2, Save, X } from "lucide-react";
import { useState } from "react";

function getNextDepartmentId(departments) {
  const numbers = departments
    .map((department) => Number(String(department.id || "").replace(/^DEPT/i, "")))
    .filter(Number.isFinite);

  const nextNumber = numbers.length ? Math.max(...numbers) + 1 : 1;
  return `DEPT${String(nextNumber).padStart(3, "0")}`;
}

function DepartmentForm({ departments, onClose, onSave, saving }) {
  const [form, setForm] = useState(() => ({
    id: getNextDepartmentId(departments),
    name: "",
    head: "",
    year: new Date().getFullYear(),
    description: "",
    projects: ""
  }));

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const projects = form.projects.split(",").map((project) => project.trim()).filter(Boolean);

    onSave({
      id: form.id,
      name: form.name.trim(),
      head: form.head.trim(),
      year: Number(form.year),
      description: form.description.trim(),
      projects
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="employee-modal department-form-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="add-department-title">
        <div className="modal-header">
          <div className="modal-header-copy">
            <span className="modal-eyebrow">NEW DEPARTMENT</span>
            <h2 id="add-department-title">Add Department</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close department form"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Department Information</h3>

            <div className="form-grid department-form-grid">
              <label className="form-field">
                <span>Department ID *</span>
                <input name="id" value={form.id} readOnly />
                <small>Automatically generated.</small>
              </label>

              <label className="form-field">
                <span>Department Name *</span>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Finance" required />
              </label>

              <label className="form-field">
                <span>Department Head</span>
                <input name="head" value={form.head} onChange={handleChange} placeholder="Department head" />
              </label>

              <label className="form-field">
                <span>Established Year</span>
                <input name="year" type="number" min="1900" max="2100" value={form.year} onChange={handleChange} />
              </label>

              <label className="form-field full-width">
                <span>Description</span>
                <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Describe the department's responsibilities..." />
              </label>

              <label className="form-field full-width">
                <span>Projects</span>
                <input name="projects" value={form.projects} onChange={handleChange} placeholder="Project Alpha, Operations Upgrade" />
                <small>Separate multiple projects with commas.</small>
              </label>
            </div>
          </div>

          <div className="department-form-note">
            <div className="department-form-note-icon"><Building2 size={17} /></div>
            <span>Employees can be assigned to this department after it is created.</span>
          </div>

          <div className="modal-footer">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="primary-button" type="submit" disabled={saving}>
              <Save size={16} />
              {saving ? "Creating..." : "Create Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentForm;
