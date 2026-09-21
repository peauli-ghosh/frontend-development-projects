import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import crypto from 'node:crypto';
import { z } from 'zod';
import { config } from './config.js';
import { db, closeExpiredSessions } from './database.js';
import { requireAuth, requireTrustedOrigin } from './middleware.js';
import {
  normalizeUsername, validateCredentials, hashPassword, comparePassword,
  createSession, verifyToken, setAuthCookie, clearAuthCookie, getAuthToken,
  generateDevOtp
} from './security.js';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json({ limit: '32kb' }));
app.use(cookieParser());
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(requireTrustedOrigin);

app.use((req, res, next) => {
  res.setHeader('X-Request-ID', crypto.randomUUID());
  next();
});

const authLimiter = new Map();
function basicRateLimit(req, res, next) {
  const key = `${req.ip}:${req.path}`;
  const now = Date.now();
  const entry = authLimiter.get(key) ?? { count: 0, reset: now + 60_000 };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 60_000; }
  entry.count += 1;
  authLimiter.set(key, entry);
  if (entry.count > 20) return res.status(429).json({ message: 'Too many attempts. Please wait a minute and try again.' });
  next();
}

const authSchema = z.object({
  username: z.string().trim(),
  password: z.string(),
  remember: z.boolean().optional().default(false)
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'authentication-system', time: new Date().toISOString() }));

app.post('/api/auth/signup', basicRateLimit, async (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request.' });
  const { username, password } = parsed.data;
  const { username: normalized, errors } = validateCredentials(username, password);
  if (Object.keys(errors).length) return res.status(400).json({ message: 'Please fix the highlighted fields.', errors });
  const exists = db.prepare('SELECT id FROM users WHERE username = ?').get(normalized);
  if (exists) return res.status(409).json({ message: 'That username is already registered.', errors: { username: 'Username is already in use.' } });

  const id = crypto.randomUUID();
  const now = Date.now();
  const passwordHash = await hashPassword(password);
  db.prepare('INSERT INTO users (id, username, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?)').run(id, normalized, passwordHash, now, now);
  const user = { id, username: normalized };
  const session = createSession(user, parsed.data.remember);
  setAuthCookie(res, session.token, parsed.data.remember);
  const devOtp = config.devOtpFlash ? generateDevOtp() : null;
  res.status(201).json({ user, remember: parsed.data.remember, jwt: buildJwtDiagnostics(session.token), devOtp });
});

app.post('/api/auth/login', basicRateLimit, async (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request.' });
  const { username, password, remember } = parsed.data;
  const normalized = normalizeUsername(username);
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(normalized);
  if (!user || !(await comparePassword(password, user.password_hash))) return res.status(401).json({ message: 'Invalid username or password.' });
  const session = createSession(user, remember);
  setAuthCookie(res, session.token, remember);
  res.json({ user: { id: user.id, username: user.username }, remember, jwt: buildJwtDiagnostics(session.token) });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.auth.user, jwt: buildJwtDiagnostics(getAuthToken(req)) });
});

app.post('/api/auth/logout', (req, res) => {
  const token = getAuthToken(req);
  if (token) {
    try {
      const { session } = verifyToken(token);
      db.prepare('UPDATE sessions SET revoked_at = ? WHERE id = ?').run(Date.now(), session.id);
    } catch { /* already invalid; cookie still gets cleared */ }
  }
  clearAuthCookie(res);
  res.status(204).end();
});

app.get('/api/dashboard', requireAuth, (req, res) => {
  const stats = {
    session: 'VERIFIED',
    access: 'GRANTED',
    protectedRoute: true,
    authentication: 'JWT / HS256',
    subject: req.auth.user.username
  };
  res.json({ user: req.auth.user, stats, jwt: buildJwtDiagnostics(getAuthToken(req)) });
});

app.get('/api/tasks', requireAuth, (req, res) => {
  res.json({ tasks: [], message: 'Protected task API ready for Assignment 6 integration.' });
});

app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: 'Unexpected server error.' });
});

function buildJwtDiagnostics(token) {
  try {
    const verified = verifyToken(token);
    const [headerPart, payloadPart] = token.split('.');
    return {
      algorithm: verified.payload ? 'HS256' : 'HS256',
      tokenType: 'JWT',
      verified: true,
      header: JSON.parse(Buffer.from(headerPart, 'base64url').toString()),
      payload: JSON.parse(Buffer.from(payloadPart, 'base64url').toString()),
      expiresAt: new Date(verified.session.expires_at).toISOString()
    };
  } catch {
    return { algorithm: 'HS256', tokenType: 'JWT', verified: false };
  }
}

setInterval(() => closeExpiredSessions(), 60 * 60 * 1000).unref();

export default app;
