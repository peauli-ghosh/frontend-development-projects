import { config } from './config.js';
import { verifyToken, getAuthToken } from './security.js';

export function requireAuth(req, res, next) {
  const token = getAuthToken(req);
  if (!token) return res.status(401).json({ message: 'Authentication required.' });
  try {
    req.auth = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ message: 'Your session is invalid or expired. Please sign in again.' });
  }
}

export function requireTrustedOrigin(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const origin = req.get('origin');
  if (origin && origin !== config.clientOrigin) return res.status(403).json({ message: 'Untrusted request origin.' });
  next();
}
