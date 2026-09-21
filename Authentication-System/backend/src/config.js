import 'dotenv/config';

const required = ['JWT_SECRET', 'JWT_ISSUER', 'JWT_AUDIENCE'];
for (const key of required) {
  if (!process.env[key]) throw new Error(`${key} is required. Copy .env.example to .env and configure it.`);
}
if (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters in production.');
}

export const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET,
  jwtIssuer: process.env.JWT_ISSUER,
  jwtAudience: process.env.JWT_AUDIENCE,
  rememberDays: Number(process.env.JWT_REMEMBER_DAYS ?? 30),
  sessionHours: Number(process.env.JWT_SESSION_HOURS ?? 12),
  cookieSameSite: process.env.COOKIE_SAME_SITE ?? 'lax',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  devOtpFlash: process.env.DEV_OTP_FLASH !== 'false'
};
