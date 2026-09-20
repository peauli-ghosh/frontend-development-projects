export default function ProgressBar({ value = 0, label = 'Completion' }) {
  return <div className="progress-wrap"><div className="progress-label"><span>{label}</span><strong>{value}%</strong></div><div className="progress-track"><div className="progress-fill" style={{ width: `${value}%` }} /></div></div>;
}
