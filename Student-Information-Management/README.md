# Student Information Management System

A React-based Student Information Management System developed for the Advanced Front-End Development course.

The project demonstrates the use of **React components, Props, state management, event handling, conditional rendering, and dynamic student data** to create a functional student management portal.

## Assignment

**Assignment 2 – Student Information Management using Props**

The main objective of this assignment is to demonstrate how student information can be passed between React components using **Props** and displayed through reusable components.

## Features

- Student information displayed using reusable React components
- Student Name
- Roll Number
- Department
- Section
- Semester
- CGPA
- Student Photo
- Student data passed using React Props
- Student List component
- Reusable Student Card component
- Sorting by Highest CGPA
- Sorting by Lowest CGPA
- Original student order
- Search students by name, roll number, department, or section
- Add new student records
- Delete individual or category-based student records
- Student profile details
- Academic performance information
- Academic summary generation
- All Students directory
- User Guide
- Dark Mode
- Local Storage for student data persistence
- Responsive dashboard interface

## Technologies Used

- React
- JavaScript
- JSX
- CSS
- Vite
- HTML5
- Local Storage

## Component Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── StudentList.jsx
│   └── StudentCard.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
````

## React Props Implementation

Student information is stored in the main `App` component and passed to the `StudentList` component.

The `StudentList` component then passes individual student properties to the reusable `StudentCard` component.

```text
App
 │
 │ students
 ▼
StudentList
 │
 │ student properties
 ▼
StudentCard
```

Example:

```jsx
<StudentCard
  name={student.name}
  rollNumber={student.rollNumber}
  department={student.department}
  section={student.section}
  semester={student.semester}
  cgpa={student.cgpa}
  photo={student.photo}
/>
```

This demonstrates the use of **Props for passing data between React components**.

## Student Information

Each student record contains information such as:

* Name
* Roll Number
* Department
* Section
* Semester
* CGPA
* Previous SGPA
* Attendance
* Contact
* Email
* Academic Year
* Photo

## Running the Project

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application can then be opened in the browser using the local development URL provided by Vite.

## Production Build

To create a production build:

```bash
npm run build
```

## Institution

**Techno India University, Kolkata**

This project is developed as an academic React front-end project for demonstrating practical implementation of React Props and component-based development.

