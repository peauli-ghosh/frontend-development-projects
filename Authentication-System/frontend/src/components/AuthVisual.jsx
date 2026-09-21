import { Activity, Binary, Crosshair, Cpu, ScanLine, ShieldCheck, TerminalSquare } from 'lucide-react';

export default function AuthVisual({ mode }) {
  const signup = mode === 'signup';
  return (
    <aside className="auth-visual">
      <div className="visual-noise" />
      <div className="visual-grid" />
      <div className="visual-scanline" />

      <div className="dossier-header">
        <span>IDENTITY_DOSSIER // 07</span>
        <span className="dossier-live"><i /> LIVE</span>
      </div>

      <div className="dossier-stage">
        <div className="stage-crosshair"><Crosshair size={18} /></div>
        <div className="stage-ring ring-one" />
        <div className="stage-ring ring-two" />
        <div className="stage-ring ring-three" />

        <div className="subject-frame">
          <div className="subject-glow" />
          <div className="subject-head" />
          <div className="subject-neck" />
          <div className="subject-body" />
          <div className="subject-scan scan-a" />
          <div className="subject-scan scan-b" />
          <div className="subject-pixels pixels-a"><b /><b /><b /><b /></div>
          <div className="subject-pixels pixels-b"><b /><b /><b /></div>
          <div className="subject-label label-top">BIOMETRIC / ABSTRACT</div>
          <div className="subject-label label-bottom">NO IMAGE DATA STORED</div>
        </div>

        <div className="stage-readout readout-left">
          <span><Activity size={12} /> SIGNAL</span>
          <strong>98.7%</strong>
          <small>STABLE</small>
        </div>
        <div className="stage-readout readout-right">
          <span><Cpu size={12} /> CORE</span>
          <strong>HS256</strong>
          <small>SERVER SIGNED</small>
        </div>
      </div>

      <div className="visual-copy">
        <div className="eyebrow"><ScanLine size={13} /> SECURE ACCESS PROTOCOL</div>
        <h2>{signup ? <>BUILD YOUR<br /><em>IDENTITY.</em></> : <>ACCESS YOUR<br /><em>NODE.</em></>}</h2>
        <p>Server-side credential validation, protected routes and cryptographically signed sessions. No simulated authentication.</p>
      </div>

      <div className="visual-terminal">
        <div className="terminal-head"><span><TerminalSquare size={13} /> AUTH TRACE</span><span>07:AUTH</span></div>
        <pre>{`01  INIT::SESSION
02  HASH::CREDENTIALS
03  SIGN::JWT / HS256
04  GUARD::ROUTE
05  STATUS::${signup ? 'REGISTER' : 'READY'}`}</pre>
      </div>

      <div className="visual-footer">
        <span><Binary size={12} /> 0xA7 // AUTH_NODE</span>
        <span><ShieldCheck size={12} /> SERVER VERIFIED</span>
      </div>
    </aside>
  );
}
