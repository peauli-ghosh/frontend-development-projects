import { UsersRound } from "lucide-react";
import EmployeeCard from "./EmployeeCard";

function EmployeeGrid({ employees, onEmployeeClick }) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <UsersRound size={25} />
        </div>

        <h3>No employees found</h3>

        <p>
          Try changing your search or department filter.
        </p>
      </div>
    );
  }

  return (
    <div className="employee-grid">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onClick={() => onEmployeeClick(employee)}
        />
      ))}
    </div>
  );
}

export default EmployeeGrid;
