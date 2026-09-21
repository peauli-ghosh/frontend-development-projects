You're right — **Assignment 6 has nothing to do in this README.** I mixed the projects together.

Here is a README for **Authentication System / Assignment 7**, written in the **same straightforward GitHub style and structure** as your Task Manager README. It focuses on the actual project rather than over-explaining the design.

````markdown
# Authentication System

A responsive full-stack Authentication System built with React, React Router, Node.js, Express, SQLite, bcrypt, and JWT authentication. The application allows users to create accounts, securely log in, maintain authenticated sessions, access protected pages, and log out through a real server-side authentication system.

## Features

- User registration
- User login
- User logout
- Username / email based login
- Password validation
- Confirm password validation
- Password strength indicator
- Password visibility toggle
- Password hashing using bcrypt
- Real JWT-based authentication
- Server-side JWT verification
- Protected routes
- Protected dashboard
- Authentication session management
- Remember User functionality
- Session expiration
- Authentication state persistence
- Invalid credential handling
- Duplicate user prevention
- Form validation
- Loading states
- Error messages
- Authentication status display
- JWT diagnostics
- JWT algorithm information
- Session information
- Development-only local OTP feedback
- Light and dark theme
- Responsive design for mobile, tablet, and desktop
- Accessible reduced-motion support
- Interactive UI feedback and transitions

## Pages

- Login
- Sign Up / Registration
- Protected Dashboard
- Task Manager / Protected Application Pages

## Routing

The application uses React Router for navigation and protected routing.

Example routes:

```text
/

├── /login
├── /signup
└── /dashboard
````

Protected routes require an authenticated user session.

If an unauthenticated user attempts to access a protected route, the application redirects the user to the login page.

## Registration

New users can create an account by providing:

* Username
* Password
* Confirm Password

The registration process validates the submitted information before creating the account.

Passwords are hashed on the server using bcrypt before being stored.

Passwords are never stored as plain text.

## Login

Registered users can log in using their registered username or email and password.

The backend verifies the submitted credentials against the stored password hash.

After successful authentication, a real signed JWT session is created and the user can access protected pages.

Invalid credentials are rejected with an appropriate error message.

## JWT Authentication

The application uses a real JSON Web Token (JWT) authentication system.

JWTs are:

* Cryptographically signed
* Server generated
* Server verified
* Time limited
* Associated with an authenticated session

The backend validates the JWT before allowing access to protected resources.

JWT configuration includes:

* Secret key
* Issuer
* Audience
* Expiration

The JWT secret is stored in environment variables and is not exposed to the frontend.

## Protected Routes

Protected routes prevent unauthenticated users from accessing private application pages.

The authentication system checks the current session before allowing access to the protected dashboard.

Example:

```text
Unauthenticated User
        │
        ▼
     /login
        │
        │ Successful Login
        ▼
    /dashboard
        │
        ▼
 Protected Content
```

Attempting to directly access a protected route without authentication redirects the user back to the login page.

## Remember User

The login page includes a **Remember User** option.

This controls the persistence of the authenticated session.

The authentication system manages the session according to the selected login persistence behavior.

## Logout

The logout functionality:

* Ends the authenticated session
* Invalidates the server-side session
* Clears the authentication cookie
* Removes the authenticated application state
* Redirects the user to the login page

After logout, protected routes can no longer be accessed using the previous session.

## Password Strength

The registration page includes a real-time password strength indicator.

The password strength evaluation considers factors such as:

* Password length
* Uppercase characters
* Lowercase characters
* Numbers
* Symbols

The interface provides immediate feedback while the user enters a password.

## Password Visibility

Password fields include a visibility toggle.

Users can switch between:

```text
Password
```

and

```text
Visible Password
```

without changing the entered value.

## Development OTP Feedback

The project includes a local development OTP feedback mechanism.

The OTP is generated and displayed locally during development for authentication-flow feedback.

It does not require an external email service and is not used as the primary production authentication mechanism.

The feature can be controlled through the backend environment configuration.

## Authentication Dashboard

After successful authentication, the user is taken to a protected dashboard.

The dashboard displays information related to the active authentication session, including:

* Authentication status
* Current user identity
* Session status
* JWT status
* JWT algorithm
* JWT verification status
* Protected route status

This provides a visible demonstration that the authentication system is operating through the backend rather than using a simple frontend-only login flag.

## Data Persistence

User and authentication data are managed by the backend.

SQLite is used as the database for local development.

Passwords are stored as secure bcrypt hashes rather than plain text.

Authentication sessions and JWT-related information are handled by the backend authentication system.

## Technologies Used

### Frontend

* React
* React Router
* Vite
* JavaScript
* JSX
* HTML5
* CSS3
* Lucide React

### Backend

* Node.js
* Express
* SQLite
* bcrypt
* JSON Web Token (JWT)
* HTTP Cookies

## Assignment Requirements

**Assignment 7: Authentication System**

### Prerequisites

* React
* React Router
* Form Handling
* State Management
* Protected Routes
* Backend API Integration
* Authentication
* JWT

### Problem Statement

Build an authentication system that allows users to register, log in, access protected application pages, and log out securely.

The application should use real authentication rather than a simple frontend-only login simulation.

### Required Features

* Login
* Logout
* Protected Dashboard
* Remember User
* JWT Authentication
* Username Required
* Password Required
* Password Strength

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project

```bash
cd Authentication-System
```

## Backend Setup

### 3. Navigate to the backend

```bash
cd backend
```

### 4. Install dependencies

```bash
npm install
```

### 5. Configure environment variables

Create a `.env` file based on `.env.example`.

Example:

```env
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

JWT_SECRET=your-secret-key
JWT_ISSUER=authentication-system
JWT_AUDIENCE=authentication-system-web

JWT_REMEMBER_DAYS=30
JWT_SESSION_HOURS=12

COOKIE_SAME_SITE=lax
COOKIE_SECURE=false

DEV_OTP_FLASH=true
```

Do not commit the `.env` file to the repository.

### 6. Start the backend

```bash
npm run dev
```

The backend will be available at:

```text
http://localhost:5000
```

## Frontend Setup

### 7. Open another terminal

Navigate to the frontend:

```bash
cd Authentication-System/frontend
```

### 8. Install dependencies

```bash
npm install
```

### 9. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown in the terminal.

For the default Vite configuration:

```text
http://localhost:5173
```

## Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Responsive Design

The application is designed to work across:

* Mobile phones
* Tablets
* Laptops
* Desktop screens

The layout adapts to different screen sizes while maintaining usability, readability, and accessibility.

## Project Structure

```text
Authentication-System/

├── backend/
│   ├── api/
│   ├── data/
│   ├── src/
│   │   ├── app.js
│   │   ├── config.js
│   │   ├── database.js
│   │   ├── middleware.js
│   │   ├── services.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── vercel.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AppShell.jsx
│   │   │   ├── AuthVisual.jsx
│   │   │   ├── PasswordField.jsx
│   │   │   ├── PasswordStrength.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── vercel.json
```

## Security

The authentication system follows basic security practices including:

* Password hashing with bcrypt
* No plaintext password storage
* Real JWT signing and verification
* Server-side authentication checks
* Protected backend routes
* Protected frontend routes
* JWT expiration
* Server-side session management
* HttpOnly authentication cookies
* Environment-based JWT secrets
* Session invalidation during logout

Production deployments should use HTTPS and secure cookies.

## Author

**Peauli Ghosh**

BCA (Hons.)

Techno India University, Kolkata

## License

This project was created as part of an academic React and full-stack authentication assignment.