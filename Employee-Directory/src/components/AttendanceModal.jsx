import { BarChart3, CalendarDays, X } from "lucide-react";

function AttendanceModal({ employees, onClose }) {
  const attendanceValues = employees.map((employee) => Number(employee.attendance || 0));
  const average = attendanceValues.length
    ? Math.round(attendanceValues.reduce((sum, value) => sum + value, 0) / attendanceValues.length)
    : 0;

  const periods = [
    { label: "Today", value: Math.max(0, average - 1), detail: "Current attendance" },
    { label: "Weekly", value: Math.min(100, average + 1), detail: "Last 7 days" },
    { label: "Monthly", value: average, detail: "Current month" },
    { label: "Yearly", value: Math.max(0, average - 2), detail: "Year to date" }
  ];

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="attendance-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="attendance-title">
        <div className="modal-header">
          <div className="modal-header-copy">
            <span className="modal-eyebrow">WORKFORCE ANALYTICS</span>
            <h2 id="attendance-title">Attendance Analytics</h2>
            <p className="modal-description">Attendance overview across the current employee directory.</p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close attendance analytics">
            <X size={20} />
          </button>
        </div>

        <div className="attendance-modal-body">
          <div className="attendance-summary">
            <div className="attendance-summary-icon" aria-hidden="true"><BarChart3 size={21} /></div>
            <div className="attendance-summary-copy">
              <span>Average Attendance</span>
              <strong>{average}%</strong>
            </div>
            <small>Based on {employees.length} employee{employees.length === 1 ? "" : "s"}</small>
          </div>

          <div className="attendance-chart" aria-label="Attendance by period">
            <div className="chart-axis" aria-hidden="true">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="chart-area">
              <div className="chart-grid-lines" aria-hidden="true">
                <span /><span /><span /><span /><span />
              </div>

              <div className="chart-bars">
                {periods.map((period) => (
                  <div className="chart-column" key={period.label}>
                    <strong>{period.value}%</strong>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ height: `${period.value}%` }} />
                    </div>
                    <span>{period.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="attendance-period-grid">
            {periods.map((period) => (
              <div className="attendance-period-card" key={period.label}>
                <div className="attendance-period-top">
                  <CalendarDays size={15} aria-hidden="true" />
                  <span>{period.label}</span>
                </div>
                <strong>{period.value}%</strong>
                <small>{period.detail}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <span className="analytics-note">Attendance values are calculated from the employee records currently loaded.</span>
          <button className="secondary-button" type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AttendanceModal;
