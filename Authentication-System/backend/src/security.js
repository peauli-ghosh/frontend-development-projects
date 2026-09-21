import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from './config.js';
import { db } from './database.js';

const COOKIE_NAME = 'auth_token';
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 72;

export function normalizeUsername(value) {
  return String(value ?? '').trim().toLowerCase();
}

export function validateCredentials(username, password) {
  const normalized = normalizeUsername(username);
  const errors = {};
  if (!normalized) errors.username = 'Username is required.';
  else if (normalized.includes('@')) {
    if (normalized.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) errors.username = 'Enter a valid email address.';
  } else if (!/^[a-z0-9_]{3,24}$/.test(normalized)) errors.username = 'Use 3–24 characters: letters, numbers, and underscores.';
  if (!password) errors.password = 'Password is required.';
  else if (password.length < PASSWORD_MIN) errors.password = `Password must be at least ${PASSWORD_MIN} characters.`;
  else if (password.length > PASSWORD_MAX) errors.password = `Password must be at most ${PASSWORD_MAX} characters.`;
  return { username: normalized, errors };
}

export function passwordStrength(password) {
  const value = String(password ?? '');
  if (!value) return { label: 'EMPTY', score: 0, percent: 0 };
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  const label = score <= 1 ? 'WEAK' : score <= 3 ? 'FAIR' : score === 4 ? 'STRONG' : 'VERY STRONG';
  return { label, score, percent: score * 20 };
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function createSession(user, remember) {
  const id = crypto.randomUUID();
  const now = Date.now();
  const ttl = remember ? config.rememberDays * 24 * 60 * 60 * 1000 : config.sessionHours * 60 * 60 * 1000;
  const expiresAt = now + ttl;
  db.prepare('INSERT INTO sessions (id, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)').run(id, user.id, now, expiresAt);
  const token = jwt.sign(
    { sub: user.id, username: user.username, sid: id },
    config.jwtSecret,
    { algorithm: 'HS256', issuer: config.jwtIssuer, audience: config.jwtAudience, expiresIn: Math.floor(ttl / 1000) }
  );
  return { token, sessionId: id, expiresAt };
}

export function verifyToken(token) {
  const payload = jwt.verify(token, config.jwtSecret, {
    algorithms: ['HS256'],
    issuer: config.jwtIssuer,
    audience: config.jwtAudience
  });
  const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(payload.sid);
  if (!session || session.revoked_at || session.expires_at <= Date.now()) throw new Error('Session is invalid or expired.');
  const user = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(payload.sub);
  if (!user) throw new Error('User no longer exists.');
  return { payload, user, session };
}

export function setAuthCookie(res, token, remember) {
  const maxAge = remember ? config.rememberDays * 24 * 60 * 60 * 1000 : undefined;
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: config.cookieSameSite,
    path: '/',
    ...(maxAge ? { maxAge } : {})
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: config.cookieSameSite,
    path: '/'
  });
}

export function getAuthToken(req) {
  return req.cookies?.[COOKIE_NAME] ?? null;
}

export function generateDevOtp() {
  return String(crypto.randomInt(100000, 1000000));
}

export function getCookieName() { return COOKIE_NAME; }
