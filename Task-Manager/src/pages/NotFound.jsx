import { Link } from 'react-router-dom';
export default function NotFound(){return <div className="not-found-page"><div className="not-found-card neo-card"><div className="eyebrow">404 / WRONG ROUTE</div><h1>PAGE<br/>NOT FOUND.</h1><p>The route you requested does not exist.</p><Link to="/dashboard" className="neo-button primary">Return to dashboard</Link></div></div>}
