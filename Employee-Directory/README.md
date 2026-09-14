# Employee Directory

A professional, responsive Employee Directory web application built with **React, Vite, and JSON Server**. The application provides a centralized interface for managing employee records, departments, workforce statistics, attendance insights, and administrative operations.

The project demonstrates practical React development through a complete workforce-management interface with CRUD operations, responsive design, theme support, employee profiles, department management, attendance analytics, image uploads, and a REST-style JSON Server backend.

---

## Features

### Dashboard

- Workforce overview and company information
- Total employee count
- Active employee count
- On Leave employee count
- Average attendance
- Clickable workforce statistics
- Dynamic workforce statistics based on current employee data
- Attendance analytics with:
  - Today
  - Weekly
  - Monthly
  - Yearly
- Workforce information that updates when employee records are added or deleted

### Employee Management

- View all employees in a dedicated scrollable directory
- Search employees
- Filter employees by department
- View complete employee profiles
- Add new employees
- Edit employee information
- Delete employees
- Employee status management:
  - Active
  - On Leave
  - Inactive
- Attendance information
- Employee role and joining year
- Contact information
- Local and permanent addresses
- Project assignments
- Profile photo upload using JPG/PNG files
- Automatic client-side image compression
- Employee ID remains protected while editing
- Attendance remains protected while editing
- Responsive employee profiles

### Department Management

- Dedicated department overview
- Department cards with workforce information
- Department ID
- Department head
- Established year
- Employee count
- Department projects
- Department employee listings
- Department attendance overview
- Detailed department modal
- Add new departments
- Delete an entire department by Department ID
- Deleting a department also removes its associated employees

### Administration

- Dedicated administration section
- Add Employee action
- Add Department action
- Centralized management interface for organizational records

### Delete Management

- Delete individual employees by Employee ID
- Delete an entire department by Department ID
- Custom confirmation dialogs before destructive actions
- Dynamic UI updates after deletion
- Associated employee removal when a department is deleted

### User Interface

- Professional HR management dashboard design
- Responsive layout for desktop, laptop, tablet, and mobile
- Light mode
- Dark mode
- Fixed top navigation
- Active navigation section highlighting
- Rounded cards and modal interfaces
- Scrollable employee directory
- Responsive employee profiles
- Responsive department details
- Professional application footer
- Accessible form controls and clear interaction states

---

## Technology Stack

- **React 19**
- **Vite 8**
- **JavaScript (ES Modules)**
- **JSON Server**
- **Lucide React**
- **CSS3**
- **Lightning CSS**
- **ESLint**
- **Node.js**

---

## Project Structure

```text
Employee-Directory/

│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AdministrationSection.jsx
│   │   ├── AttendanceModal.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── DeleteManagement.jsx
│   │   ├── DepartmentForm.jsx
│   │   ├── DepartmentModal.jsx
│   │   ├── DepartmentSection.jsx
│   │   ├── EmployeeCard.jsx
│   │   ├── EmployeeForm.jsx
│   │   ├── EmployeeGrid.jsx
│   │   ├── EmployeeListModal.jsx
│   │   ├── EmployeeProfile.jsx
│   │   ├── EmployeeToolbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── StatCard.jsx
│   │
│   ├── services/
│   │   └── employeeApi.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── db.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── vite.config.js
```

---

## Data Model

### Employee

Each employee record contains information such as:

```json
{
  "id": 1,
  "name": "Employee Name",
  "employeeId": "EMP001",
  "department": "Department Name",
  "departmentId": "DEPT001",
  "gender": "Female",
  "phone": "+91 XXXXX XXXXX",
  "email": "employee@example.com",
  "localAddress": "Local Address",
  "permanentAddress": "Permanent Address",
  "status": "Active",
  "attendance": 95,
  "role": "Employee Role",
  "joiningYear": 2024,
  "projects": [
    "Project Alpha",
    "Project Beta"
  ],
  "image": "profile-image-data"
}
```

### Department

Department records contain information such as:

```json
{
  "id": "DEPT001",
  "name": "Department Name",
  "head": "Department Head",
  "year": 2020,
  "description": "Department description",
  "projects": [
    "Project Alpha",
    "Project Beta"
  ]
}
```

---

## API

The application uses **JSON Server** as a temporary REST API for employee and department data.

### Employee Endpoints

```text
GET    /employees
POST   /employees
PUT    /employees/:id
DELETE /employees/:id
```

### Department Endpoints

```text
GET    /departments
POST   /departments
DELETE /departments/:id
```

The API communication layer is centralized in:

```text
src/services/employeeApi.js
```

The frontend API base URL is configurable through the `VITE_API_URL` environment variable.

```text
VITE_API_URL
```

If the variable is not provided, the application automatically falls back to:

```text
http://localhost:3001
```

This allows the same frontend codebase to work in both local development and hosted environments.

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

### Installation

Clone the repository and navigate to the project:

```bash
git clone <repository-url>

cd frontend-development-projects/Employee-Directory
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

The application uses two processes during local development:

1. React/Vite development server
2. JSON Server API

### Start JSON Server

Open a terminal in the project directory:

```bash
npm run server
```

The API runs locally on:

```text
http://localhost:3001
```

Available endpoints:

```text
http://localhost:3001/employees
http://localhost:3001/departments
```

### Start the React Application

Open another terminal in the project directory:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

The React application automatically uses the local JSON Server because `VITE_API_URL` defaults to:

```text
http://localhost:3001
```

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Backend

```bash
npm run server
```

Starts the JSON Server API through `server.js`.

The server uses the `PORT` environment variable when supplied and defaults to port `3001` for local development.

### Lint

```bash
npm run lint
```

Runs ESLint to check the project for code-quality issues.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Preview

```bash
npm run preview
```

Serves the production build locally for preview.

---

## Employee Photo Handling

Employee profile photos can be uploaded directly through the employee form.

Supported formats:

```text
JPG
PNG
```

Uploaded images are processed in the browser before being stored.

The application:

1. Validates the selected file type.
2. Validates the maximum source file size.
3. Resizes the image.
4. Converts the image into a compressed format.
5. Reduces image quality when necessary.
6. Stores the resulting image data with the employee record.

This keeps the resulting payload small enough for the temporary JSON Server storage and avoids requiring a separate image-storage service for the project.

---

## State Management

The application uses React's built-in state management:

- `useState` for application state
- `useEffect` for data loading and side effects
- `useMemo` for derived workforce and department data

Employee and department information is dynamically derived from the current backend data.

This allows dashboard statistics, employee counts, department counts, status-based lists, and filtered views to update when records are added, edited, or deleted.

---

## Responsive Design

The interface is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

The layout adapts navigation, employee cards, department cards, forms, modals, statistics, and administrative controls according to screen size.

The employee directory uses a dedicated scrollable area so that large employee collections can be browsed without making the entire page unnecessarily long.

---

## Theme Support

The application supports:

- Light Mode
- Dark Mode

The theme can be switched using the control in the top navigation.

UI controls, forms, filters, cards, modals, and data displays are styled to remain readable and consistent across both themes.

---

## CRUD Operations

The application demonstrates complete CRUD functionality for employee records.

### Create

Users can create new employee records through the Add Employee form.

### Read

Employee and department records are retrieved from JSON Server and displayed throughout the application.

### Update

Existing employee information can be edited.

Protected fields such as Employee ID and Attendance remain unchanged during editing.

### Delete

Users can delete:

- Individual employees
- Entire departments

Department deletion removes the department record as well as the employees associated with that department.

---

## Validation and Error Handling

The application includes:

- Required form fields
- Employee photo type validation
- Employee photo size validation
- Image processing error handling
- API error handling
- Loading states
- Delete confirmation dialogs
- User-friendly error messages
- Protected employee fields during editing

---

## Architecture

The application follows a component-based React architecture.

### Presentation Components

Reusable components are responsible for individual parts of the interface, including:

- Header
- Footer
- Employee cards
- Employee grid
- Employee toolbar
- Statistics cards
- Department cards
- Forms
- Modals
- Confirmation dialogs
- Administration controls

### API Layer

Backend communication is separated into:

```text
src/services/employeeApi.js
```

The API layer handles:

- Employee retrieval
- Employee creation
- Employee updates
- Employee deletion
- Department creation
- Department deletion

This separation keeps API operations independent from the presentation layer and makes it easier to replace JSON Server with a production backend in the future.

### Backend Launcher

The project includes:

```text
server.js
```

This file launches JSON Server and supports hosting environments that provide a dynamic `PORT`.

The server binds to:

```text
0.0.0.0
```

when running, allowing it to receive external requests from a hosted frontend.

---

## Vite CSS Configuration

The project explicitly uses **Lightning CSS** as its CSS transformer through the Vite configuration.

This configuration is defined in:

```text
vite.config.js
```

The project therefore avoids relying on a separate application-level PostCSS configuration.

---

## Deployment

The project is designed so that the React frontend and JSON Server backend can be deployed separately.

### Deployment Architecture

```text
                    ┌──────────────────────┐
                    │   React + Vite App   │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ VITE_API_URL
                               ▼
                    ┌──────────────────────┐
                    │   JSON Server API    │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                               ▼
                         ┌───────────┐
                         │  db.json  │
                         └───────────┘
```

### Frontend

The React/Vite frontend can be deployed to:

```text
Vercel
```

The deployed frontend must be configured with:

```text
VITE_API_URL=<deployed-json-server-api-url>
```

For example:

```text
VITE_API_URL=https://your-api-service.example.com
```

The environment variable is read during the Vite production build.

After changing `VITE_API_URL` on the hosting platform, the frontend must be redeployed so the new value is included in the production build.

### Backend

The JSON Server backend can be deployed as a Node.js web service.

The service should:

- Use the `Employee-Directory` project directory
- Install dependencies with `npm install`
- Start using:

```bash
npm run server
```

The included `server.js` uses the hosting platform's `PORT` environment variable and binds JSON Server to `0.0.0.0`.

### Local vs Production API

Local development:

```text
React
  ↓
http://localhost:3001
  ↓
JSON Server
  ↓
db.json
```

Hosted deployment:

```text
Vercel React application
  ↓
VITE_API_URL
  ↓
Hosted JSON Server API
  ↓
db.json
```

This separation prevents the deployed frontend from attempting to access `localhost:3001`, which would refer to the visitor's own computer rather than the hosted backend.

---

## Temporary Backend Limitation

JSON Server and `db.json` are being used as a **temporary backend for this project and educational demonstration**.

A hosted JSON file is not equivalent to a production database.

Depending on the hosting provider and service configuration, filesystem changes made to `db.json` may not survive service restarts, redeployments, or instance replacement.

For a production application, the JSON Server backend should be replaced with a persistent database and proper backend infrastructure.

Recommended production improvements include:

- PostgreSQL or another persistent database
- Proper backend API
- Authentication
- Authorization
- Server-side validation
- Persistent file or object storage
- Database migrations
- API security
- Audit logging

---

## Future Improvements

Potential improvements for a production environment include:

- Authentication and role-based authorization
- Real database integration
- Cloud-based image storage
- Employee document management
- Advanced attendance tracking
- Leave management
- Payroll integration
- Notifications
- Audit logs
- Pagination and server-side search
- Advanced reporting
- Export to CSV/PDF
- Backend validation
- Secure API authentication
- Persistent database storage
- Production-grade backend architecture
- Automated testing
- CI/CD pipeline
- Performance monitoring

---

## Project Purpose

This project demonstrates practical React development concepts including:

- Components
- Props
- State
- Events
- Forms
- Conditional rendering
- Lists and keys
- Derived state
- API integration
- CRUD operations
- Responsive UI development
- Modal interfaces
- File uploads
- Client-side image processing
- Theme management
- REST-style API communication
- Environment-based configuration
- Reusable component architecture

The project also demonstrates how a frontend application can communicate with a separate backend service during development and deployment.

---

## License

This project was created for educational purposes.