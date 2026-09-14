import { Building2, UserPlus } from "lucide-react";

function AdministrationSection({ onAddEmployee, onAddDepartment }) {
  return (
    <section className="administration-section" id="administration">
      <div className="section-heading">
        <div>
          <span className="section-kicker">ADMINISTRATION</span>
          <h2>Add Management</h2>
          <p>Create new employee and department records for the directory.</p>
        </div>
      </div>

      <div className="administration-grid">
        <article className="administration-card management-action-card">
          <div className="administration-card-icon employee-action"><UserPlus size={23} /></div>
          <div className="administration-card-content">
            <h3>Add Employee</h3>
            <p>Create a complete employee record with personal, contact, department, attendance and project information.</p>
            <button className="primary-button administration-action" type="button" onClick={onAddEmployee}>
              <UserPlus size={17} />
              Add Employee
            </button>
          </div>
        </article>

        <article className="administration-card management-action-card">
          <div className="administration-card-icon department-action"><Building2 size={23} /></div>
          <div className="administration-card-content">
            <h3>Add Department</h3>
            <p>Create a new department with its identifier, leadership, description and project information.</p>
            <button className="primary-button administration-action" type="button" onClick={onAddDepartment}>
              <Building2 size={17} />
              Add Department
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default AdministrationSection;
