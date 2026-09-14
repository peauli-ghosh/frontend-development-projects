import { useState } from "react";
import { ImagePlus, Save, X } from "lucide-react";

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
  const [imageError, setImageError] = useState("");

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

  function handleDepartmentChange(event) {
    const selectedDepartment = departments.find(
      (item) => item.name === event.target.value
    );

    setForm((current) => ({
      ...current,
      department: event.target.value,
      departmentId: selectedDepartment?.id || ""
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setImageError("Please select a JPG or PNG image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image must be smaller than 2 MB.");
      return;
    }

    setImageError("");

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxDimension = 256;
        const scale = Math.min(
          1,
          maxDimension / Math.max(image.width, image.height)
        );

        const canvas = document.createElement("canvas");

        canvas.width = Math.max(
          1,
          Math.round(image.width * scale)
        );

        canvas.height = Math.max(
          1,
          Math.round(image.height * scale)
        );

        const context = canvas.getContext("2d");

        if (!context) {
          setImageError("Unable to process this image.");
          return;
        }

        context.drawImage(
          image,
          0,
          0,
          canvas.width,
          canvas.height
        );

        let quality = 0.78;
        let compressedImage = canvas.toDataURL(
          "image/jpeg",
          quality
        );

        while (
          compressedImage.length > 90000 &&
          quality > 0.35
        ) {
          quality -= 0.05;

          compressedImage = canvas.toDataURL(
            "image/jpeg",
            quality
          );
        }

        setForm((current) => ({
          ...current,
          image: compressedImage
        }));
      };

      image.onerror = () => {
        setImageError("Unable to read this image.");
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      setImageError("Unable to read this image.");
    };

    reader.readAsDataURL(file);
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
                  readOnly={Boolean(employee)}
                  required
                />
              </label>

              <label className="form-field">
                <span>Employee ID *</span>

                <input
                  className={employee ? "readonly-field" : ""}
                  name="employeeId"
                  value={form.employeeId}
                  onChange={handleChange}
                  readOnly={Boolean(employee)}
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
                  <option value="">
                    Select gender
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Other">
                    Other
                  </option>
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
                  onChange={handleDepartmentChange}
                  required
                >
                  <option value="">
                    Select department
                  </option>

                  {departments.map((item) => (
                    <option
                      key={item.id}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span>Department ID</span>

                <input
                  name="departmentId"
                  value={form.departmentId}
                  readOnly
                  placeholder="Automatically assigned"
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
                  className={employee ? "readonly-field" : ""}
                  name="attendance"
                  type="number"
                  min="0"
                  max="100"
                  value={form.attendance}
                  onChange={handleChange}
                  readOnly={Boolean(employee)}
                />
              </label>

              <div className="form-field">
                <span>Profile Photo</span>

                <div className="image-upload">
                  <label
                    className="image-upload-button"
                    htmlFor="employee-image"
                  >
                    <ImagePlus size={17} />
                    Choose JPG / PNG
                  </label>

                  <input
                    id="employee-image"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    hidden
                  />

                  {form.image && (
                    <div className="image-preview">
                      <img
                        src={form.image}
                        alt="Profile preview"
                      />

                      <div>
                        <strong>Photo selected</strong>
                        <small>
                          This image will be saved with the employee.
                        </small>
                      </div>
                    </div>
                  )}

                  {!form.image && (
                    <small>
                      Upload a JPG or PNG image, up to 2 MB.
                    </small>
                  )}

                  {imageError && (
                    <small className="form-error">
                      {imageError}
                    </small>
                  )}
                </div>
              </div>
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
