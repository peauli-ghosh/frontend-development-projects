# Authentication System — Backend

Real username/password authentication for Assignment 7.

## Security model
- Passwords are hashed with bcrypt.
- JWTs are real signed HS256 tokens.
- JWT verification checks signature, issuer, audience and expiry.
- JWT is stored in an HttpOnly cookie, not localStorage.
- Each JWT points to a server-side session row, allowing logout/session revocation.
- Remember User changes cookie/session lifetime.
- Helmet, CORS, request IDs, body-size limits and a basic authentication rate limiter are included.
- Development OTP is a visual-only assignment/demo feedback event and is never used as an authentication factor.

## Run
1. Copy `.env.example` to `.env`.
2. Generate a long random `JWT_SECRET`.
3. `npm install`
4. `npm run dev`

Node 24+ is recommended for this package.
