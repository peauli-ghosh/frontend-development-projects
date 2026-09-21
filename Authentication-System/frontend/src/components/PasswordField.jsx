import React, { useState } from 'react';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';

export default function PasswordField({ label = 'Password', value, onChange, error, autoComplete = 'current-password' }) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="field">
      <span className="field-label"><LockKeyhole size={14} /> {label}</span>
      <span className="field-control">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          required
        />
        <button type="button" className="icon-button" onClick={() => setVisible((v) => !v)} aria-label={visible ? 'Hide password' : 'Show password'}>
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </span>
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

