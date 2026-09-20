# Task Manager

A responsive Task Manager web application built with React and React Router. The application allows users to create, manage, organize, update, complete, and delete tasks through a structured multi-page interface.

## Features

- Dashboard with task statistics and progress
- Create new tasks
- View all tasks
- View individual task details
- Edit existing tasks
- Mark tasks as completed
- Delete tasks
- Duplicate tasks
- Completed tasks archive
- Search tasks
- Filter tasks by:
  - Status
  - Priority
  - Category
- Sort tasks
- List and grid view
- Task priority levels:
  - Low
  - Medium
  - High
- Task categories
- Due dates
- Task labels
- Subtasks / checklist
- Task completion progress
- Dynamic task detail pages
- URL parameters
- Nested routing
- Navigation between application pages
- Basic protected route with demo authentication
- Light and dark theme
- Persistent data using localStorage
- Responsive design for mobile, tablet, and desktop
- Custom empty states and error handling
- Accessible reduced-motion support
- Interactive UI feedback and transitions

## Pages

- Dashboard
- Tasks
- Add Task
- Task Details
- Completed Tasks
- Login / Protected Route

## Routing

The application uses React Router for navigation and dynamic routing.

Example routes:

```text
/
├── /dashboard
├── /tasks
│   └── /tasks/:taskId
├── /add-task
├── /completed
└── /login
````

The task details page uses a dynamic URL parameter:

```text
/tasks/:taskId
```

This allows each task to have its own dedicated details page.

## Task Fields

Each task can contain:

* Title / Description
* Priority
* Category
* Due Date
* Status
* Labels
* Notes
* Subtasks

## Data Persistence

Task data and application preferences are stored in the browser using `localStorage`.

This allows tasks, completion status, theme preferences, and other application data to remain available after refreshing the page.

## Technologies Used

* React
* React Router
* Vite
* JavaScript
* HTML5
* CSS3
* LocalStorage API

## Assignment Requirements

**Assignment 6: Task Manager with Routing**

### Prerequisites

* React Router
* Nested Routes
* Dynamic Routes

### Problem Statement

Build a task management application using React that allows users to create, view, update, complete, filter, and delete tasks.

Each task contains:

* Description
* Priority
* Category
* Due Date
* Status

### Required Pages

* Dashboard
* Tasks
* Add Task
* Task Details
* Completed Tasks

### Required Features

* URL Parameters
* Navigation
* Basic Protected Route

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project

```bash
cd Task-Manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown in the terminal.

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

The layout adapts to different screen sizes while maintaining usability and accessibility.

## Project Structure

```text
Task-Manager/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── data/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## Author

**Peauli Ghosh**

BCA (Hons.)
Techno India University, Kolkata

## License

This project was created as part of an academic React assignment.

```

This version is better for your GitHub repo because it focuses on **what the application does, its routing, features, technologies, setup, and assignment requirements**, rather than spending space on the visual design terminology.
```