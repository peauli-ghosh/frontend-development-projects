import { Search, SlidersHorizontal } from "lucide-react";

function EmployeeToolbar({
  searchTerm,
  onSearchChange,
  department,
  onDepartmentChange,
  departments
}) {
  return (
    <div className="employee-toolbar">
      <label className="search-box">
        <Search size={18} aria-hidden="true" />

        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search employees..."
          aria-label="Search employees"
        />
      </label>

      <label className="filter-box">
        <SlidersHorizontal size={17} aria-hidden="true" />

        <select
          value={department}
          onChange={(event) => onDepartmentChange(event.target.value)}
          aria-label="Filter employees by department"
        >
          <option value="All">All Departments</option>

          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default EmployeeToolbar;
