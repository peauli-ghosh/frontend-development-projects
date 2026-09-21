export default function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    password.length >= 12,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ];
  const score = checks.filter(Boolean).length;
  const label = !password ? 'EMPTY' : score <= 1 ? 'WEAK' : score <= 3 ? 'FAIR' : score === 4 ? 'STRONG' : 'VERY STRONG';
  return (
    <div className="strength" aria-live="polite">
      <div className="strength-top"><span>PASSWORD STRENGTH</span><strong>{label}</strong></div>
      <div className="strength-bars">{checks.map((active, index) => <span key={index} className={active ? 'active' : ''} />)}</div>
      <div className="strength-hints"><span>8+ chars</span><span>mixed case</span><span>number</span><span>symbol</span></div>
    </div>
  );
}
