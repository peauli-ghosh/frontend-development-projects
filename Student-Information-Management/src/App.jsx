import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import StudentList from "./components/StudentList";
import Footer from "./components/Footer";

const STORAGE_KEY = "tiuStudentPortalStudents";
const STORAGE_VERSION_KEY = "tiuStudentPortalVersion";
const CURRENT_DATA_VERSION = "3";

const initialStudents = [
  {
    name: "Aarav Sharma",
    rollNumber: "BCA001",
    department: "Computer Applications",
    section: "A",
    semester: 4,
    cgpa: 8.7,
    previousSgpa: 8.4,
    attendance: 91,
    contact: "+91 98765 12001",
    email: "aarav.sharma@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Das",
    rollNumber: "BCA002",
    department: "Computer Applications",
    section: "A",
    semester: 4,
    cgpa: 9.2,
    previousSgpa: 8.9,
    attendance: 96,
    contact: "+91 98765 12002",
    email: "priya.das@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Rohan Sen",
    rollNumber: "BCA003",
    department: "Computer Applications",
    section: "B",
    semester: 4,
    cgpa: 7.9,
    previousSgpa: 7.6,
    attendance: 84,
    contact: "+91 98765 12003",
    email: "rohan.sen@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Ananya Roy",
    rollNumber: "BCA004",
    department: "Computer Applications",
    section: "B",
    semester: 4,
    cgpa: 8.4,
    previousSgpa: 8.1,
    attendance: 89,
    contact: "+91 98765 12004",
    email: "ananya.roy@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Ishita Mukherjee",
    rollNumber: "BCA005",
    department: "Computer Applications",
    section: "A",
    semester: 4,
    cgpa: 9.0,
    previousSgpa: 8.7,
    attendance: 94,
    contact: "+91 98765 12005",
    email: "ishita.mukherjee@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Arjun Mehta",
    rollNumber: "BCA006",
    department: "Computer Applications",
    section: "B",
    semester: 4,
    cgpa: 8.1,
    previousSgpa: 7.9,
    attendance: 87,
    contact: "+91 98765 12006",
    email: "arjun.mehta@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "Sneha Roy",
    rollNumber: "BCA007",
    department: "Computer Applications",
    section: "A",
    semester: 4,
    cgpa: 8.9,
    previousSgpa: 8.6,
    attendance: 93,
    contact: "+91 98765 12007",
    email: "sneha.roy@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Kabir Singh",
    rollNumber: "BCA008",
    department: "Computer Applications",
    section: "B",
    semester: 4,
    cgpa: 7.6,
    previousSgpa: 7.4,
    attendance: 79,
    contact: "+91 98765 12008",
    email: "kabir.singh@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=68",
  },
  {
    name: "Meera Kapoor",
    rollNumber: "BCA009",
    department: "Computer Applications",
    section: "A",
    semester: 4,
    cgpa: 8.6,
    previousSgpa: 8.3,
    attendance: 92,
    contact: "+91 98765 12009",
    email: "meera.kapoor@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=48",
  },
  {
    name: "Dev Malhotra",
    rollNumber: "BCA010",
    department: "Computer Applications",
    section: "B",
    semester: 4,
    cgpa: 8.3,
    previousSgpa: 8.0,
    attendance: 88,
    contact: "+91 98765 12010",
    email: "dev.malhotra@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=14",
  },
  {
    name: "Neha Banerjee",
    rollNumber: "BBA011",
    department: "Business Administration",
    section: "A",
    semester: 4,
    cgpa: 8.8,
    previousSgpa: 8.5,
    attendance: 95,
    contact: "+91 98765 12011",
    email: "neha.banerjee@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=49",
  },
  {
    name: "Aditya Bose",
    rollNumber: "ECE012",
    department: "Electronics and Communication",
    section: "A",
    semester: 3,
    cgpa: 8.0,
    previousSgpa: 7.8,
    attendance: 86,
    contact: "+91 98765 12012",
    email: "aditya.bose@tiu.edu.in",
    year: "2026",
    photo: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Riya Chatterjee",
    rollNumber: "BCA013",
    department: "Computer Applications",
    section: "C",
    semester: 3,
    cgpa: 8.5,
    previousSgpa: 8.2,
    attendance: 90,
    contact: "+91 98765 12013",
    email: "riya.chatterjee@tiu.edu.in",
    year: "2025",
    photo: "https://i.pravatar.cc/150?img=43",
  },
  {
    name: "Soham Ghosh",
    rollNumber: "BBA014",
    department: "Business Administration",
    section: "B",
    semester: 3,
    cgpa: 7.8,
    previousSgpa: 7.5,
    attendance: 82,
    contact: "+91 98765 12014",
    email: "soham.ghosh@tiu.edu.in",
    year: "2025",
    photo: "https://i.pravatar.cc/150?img=52",
  },
  {
    name: "Tanya Dutta",
    rollNumber: "ECE015",
    department: "Electronics and Communication",
    section: "B",
    semester: 2,
    cgpa: 8.9,
    previousSgpa: 8.6,
    attendance: 94,
    contact: "+91 98765 12015",
    email: "tanya.dutta@tiu.edu.in",
    year: "2025",
    photo: "https://i.pravatar.cc/150?img=25",
  },
  {
    name: "Rahul Verma",
    rollNumber: "BCA016",
    department: "Computer Applications",
    section: "C",
    semester: 2,
    cgpa: 7.5,
    previousSgpa: 7.2,
    attendance: 81,
    contact: "+91 98765 12016",
    email: "rahul.verma@tiu.edu.in",
    year: "2025",
    photo: "https://i.pravatar.cc/150?img=59",
  },
];

function getInitialStudents() {
  const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
  const savedStudents = localStorage.getItem(STORAGE_KEY);

  if (savedVersion === CURRENT_DATA_VERSION && savedStudents) {
    try {
      return JSON.parse(savedStudents);
    } catch {
      return initialStudents;
    }
  }

  localStorage.setItem(
    STORAGE_VERSION_KEY,
    CURRENT_DATA_VERSION
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(initialStudents)
  );

  return initialStudents;
}

function App() {
  const [students, setStudents] = useState(getInitialStudents);

  const [darkMode, setDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const [sortOrder, setSortOrder] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [showHelp, setShowHelp] = useState(false);
  const [showAcademicInfo, setShowAcademicInfo] = useState(false);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showDeleteStudents, setShowDeleteStudents] = useState(false);

  const [deleteMode, setDeleteMode] = useState("roll");
  const [deleteRollNumber, setDeleteRollNumber] = useState("");
  const [deleteSemester, setDeleteSemester] = useState("4");
  const [deleteDepartment, setDeleteDepartment] = useState("");
  const [deleteSection, setDeleteSection] = useState("");

  const [academicYear, setAcademicYear] = useState("2026");
  const [academicSemester, setAcademicSemester] = useState("4");
  const [academicDepartment, setAcademicDepartment] =
    useState("");

  const [academicResult, setAcademicResult] = useState(null);

  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNumber: "",
    department: "",
    section: "A",
    semester: 4,
    cgpa: "",
    previousSgpa: "",
    attendance: "",
    contact: "",
    email: "",
    year: "2026",
    photo: "",
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(students)
    );

    localStorage.setItem(
      STORAGE_VERSION_KEY,
      CURRENT_DATA_VERSION
    );
  }, [students]);

  const filteredStudents = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return students.filter((student) => {
      if (!search) {
        return true;
      }

      return (
        student.name.toLowerCase().includes(search) ||
        student.rollNumber.toLowerCase().includes(search) ||
        student.department.toLowerCase().includes(search) ||
        student.section.toLowerCase().includes(search)
      );
    });
  }, [students, searchTerm]);

  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      if (sortOrder === "high") {
        return Number(b.cgpa) - Number(a.cgpa);
      }

      if (sortOrder === "low") {
        return Number(a.cgpa) - Number(b.cgpa);
      }

      return 0;
    });
  }, [filteredStudents, sortOrder]);

  const highestCgpa =
    students.length > 0
      ? Math.max(
          ...students.map((student) => Number(student.cgpa))
        )
      : 0;

  const averageCgpa =
    students.length > 0
      ? students.reduce(
          (total, student) => total + Number(student.cgpa),
          0
        ) / students.length
      : 0;

  const averageAttendance =
    students.length > 0
      ? students.reduce(
          (total, student) =>
            total + Number(student.attendance),
          0
        ) / students.length
      : 0;

  const departments = [
    ...new Set(students.map((student) => student.department)),
  ];

  const sections = [
    ...new Set(students.map((student) => student.section)),
  ];

  const topStudent =
    [...students].sort(
      (a, b) => Number(b.cgpa) - Number(a.cgpa)
    )[0] || null;

  const scrollToSection = (section, navName) => {
    setActiveNav(navName);

    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewStudent((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setNewStudent((previous) => ({
        ...previous,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const addStudent = (event) => {
    event.preventDefault();

    if (
      !newStudent.name.trim() ||
      !newStudent.rollNumber.trim() ||
      !newStudent.department.trim() ||
      !newStudent.cgpa
    ) {
      return;
    }

    const duplicate = students.some(
      (student) =>
        student.rollNumber.toLowerCase() ===
        newStudent.rollNumber.toLowerCase()
    );

    if (duplicate) {
      alert("A student with this roll number already exists.");
      return;
    }

    const student = {
      ...newStudent,
      semester: Number(newStudent.semester),
      cgpa: Number(newStudent.cgpa),
      previousSgpa: Number(newStudent.previousSgpa || 0),
      attendance: Number(newStudent.attendance || 0),
      photo:
        newStudent.photo ||
        "https://i.pravatar.cc/150?img=5",
    };

    setStudents((previous) => [...previous, student]);

    setNewStudent({
      name: "",
      rollNumber: "",
      department: "",
      section: "A",
      semester: 4,
      cgpa: "",
      previousSgpa: "",
      attendance: "",
      contact: "",
      email: "",
      year: "2026",
      photo: "",
    });

    setShowAddStudent(false);
  };

  const generateAcademicSummary = (event) => {
    event.preventDefault();

    const matchingStudents = students.filter((student) => {
      const yearMatch = student.year === academicYear;

      const semesterMatch =
        Number(student.semester) ===
        Number(academicSemester);

      const departmentMatch =
        !academicDepartment ||
        student.department === academicDepartment;

      return yearMatch && semesterMatch && departmentMatch;
    });

    const resultAverageCgpa =
      matchingStudents.length > 0
        ? matchingStudents.reduce(
            (total, student) =>
              total + Number(student.cgpa),
            0
          ) / matchingStudents.length
        : 0;

    const resultAverageAttendance =
      matchingStudents.length > 0
        ? matchingStudents.reduce(
            (total, student) =>
              total + Number(student.attendance),
            0
          ) / matchingStudents.length
        : 0;

    const resultHighest =
      matchingStudents.length > 0
        ? Math.max(
            ...matchingStudents.map((student) =>
              Number(student.cgpa)
            )
          )
        : 0;

    setAcademicResult({
      students: matchingStudents,
      averageCgpa: resultAverageCgpa,
      averageAttendance: resultAverageAttendance,
      highestCgpa: resultHighest,
    });
  };

  const deleteByRollNumber = () => {
    const roll = deleteRollNumber.trim().toLowerCase();

    if (!roll) {
      return;
    }

    const student = students.find(
      (item) =>
        item.rollNumber.toLowerCase() === roll
    );

    if (!student) {
      alert("No student was found with that roll number.");
      return;
    }

    const confirmed = window.confirm(
      `Delete ${student.name} (${student.rollNumber})?`
    );

    if (!confirmed) {
      return;
    }

    setStudents((previous) =>
      previous.filter(
        (item) =>
          item.rollNumber.toLowerCase() !== roll
      )
    );

    setDeleteRollNumber("");
  };

  const deleteByCategory = () => {
    if (
      !deleteSemester ||
      !deleteDepartment ||
      !deleteSection
    ) {
      alert(
        "Please select semester, department and section."
      );
      return;
    }

    const matchingStudents = students.filter(
      (student) =>
        Number(student.semester) ===
          Number(deleteSemester) &&
        student.department === deleteDepartment &&
        student.section === deleteSection
    );

    if (matchingStudents.length === 0) {
      alert("No students match this category.");
      return;
    }

    const confirmed = window.confirm(
      `Delete all ${matchingStudents.length} student(s) from Semester ${deleteSemester}, ${deleteDepartment}, Section ${deleteSection}?`
    );

    if (!confirmed) {
      return;
    }

    setStudents((previous) =>
      previous.filter(
        (student) =>
          !(
            Number(student.semester) ===
              Number(deleteSemester) &&
            student.department === deleteDepartment &&
            student.section === deleteSection
          )
      )
    );
  };

  const resetAcademicSummary = () => {
    setAcademicResult(null);
    setAcademicYear("2026");
    setAcademicSemester("4");
    setAcademicDepartment("");
  };

  // SYNCHRONIZE SIDE COLUMN HEIGHTS
  useEffect(() => {
    const dashboard = document.querySelector(".dashboard-layout");
    const sidebar = document.querySelector(
      ".dashboard-layout > .sidebar"
    );
    const rightPanel = document.querySelector(
      ".dashboard-layout > .right-panel"
    );

    if (!dashboard || !sidebar || !rightPanel) {
      return;
    }

    const syncSideColumns = () => {
      const sidebarHeight = sidebar.getBoundingClientRect().height;

      rightPanel.style.setProperty(
        "--matched-side-height",
        `${sidebarHeight}px`
      );
    };

    syncSideColumns();

    const observer = new ResizeObserver(syncSideColumns);
    observer.observe(sidebar);

    window.addEventListener("resize", syncSideColumns);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncSideColumns);
      rightPanel.style.removeProperty("--matched-side-height");
    };
  }, []);
  // END SYNCHRONIZE SIDE COLUMN HEIGHTS

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="dashboard-layout">
        {/* LEFT PANEL */}

        <aside className="sidebar">
          <div className="profile-card sidebar-profile-card">
            <div className="profile-avatar">TIU</div>

            <h3>Techno India University</h3>

            <p>Kolkata · Student Academic Portal</p>
          </div>

          <nav className="navigation">
            <button
              className={
                activeNav === "Dashboard"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                scrollToSection(
                  "dashboard-top",
                  "Dashboard"
                )
              }
            >
              <span>▦</span>
              Dashboard
            </button>

            <button
              className={
                activeNav === "Students"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                scrollToSection("students", "Students")
              }
            >
              <span>♙</span>
              Students
            </button>

            <button
              className="nav-item"
              onClick={() => {
                setActiveNav("Academic Info");
                setShowAcademicInfo(true);
              }}
            >
              <span>▤</span>
              Academic Info
            </button>

            <button
              className={
                activeNav === "Semester"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                scrollToSection(
                  "semester",
                  "Semester"
                )
              }
            >
              <span>◷</span>
              Semester
            </button>
          </nav>

          <button
            className="help-card"
            onClick={() => setShowHelp(true)}
          >
            <div className="help-icon">?</div>

            <h3>Need help?</h3>

            <p>
              Learn how to use the portal and find important
              features.
            </p>

            <span className="help-link">
              Open user guide →
            </span>
          </button>
        </aside>

        {/* MAIN CONTENT */}

        <main className="main-content">
          <section
            className="welcome-section"
            id="dashboard-top"
          >
            <div className="dashboard-introduction">
              <p className="eyebrow">DASHBOARD</p>

          <h2>Techno India University</h2>

          <p className="welcome-text">
            Student Information &amp; Academic Management Portal
          </p>

          <p className="dashboard-context">
            This portal provides a central place to manage
            student information and academic records for
            Techno India University, Kolkata. Explore student
            profiles, search and organize records, review
            academic performance, and access semester,
            department and academic summary information.
          </p>
          <div className="university-hero">
            <img
              src="https://www.technoindiauniversity.ai/assets/images/c1.jpg"
              alt="Techno India University entrance lobby"
              className="university-hero-image"
            />
          </div>
          </div>
</section>

          {/* UNIVERSITY CONTEXT */}

          <section className="context-strip">
            <div>
              <span>Institution</span>
              <strong>
                Techno India University, Kolkata
              </strong>
            </div>

            <div>
              <span>Portal Purpose</span>
              <strong>Academic records, student profiles & performance</strong>
            </div>

            <div>
              <span>Records Managed</span>
              <strong>{students.length} Students</strong>
            </div>
          </section>

          {/* STAT CARDS */}

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple">S</div>

              <div>
                <span>Total Students</span>
                <strong>{students.length}</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon yellow">C</div>

              <div>
                <span>University</span>
                <strong>Techno India University</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">★</div>

              <div>
                <span>Highest CGPA</span>
                <strong>{highestCgpa.toFixed(1)}</strong>
              </div>
            </div>
          </section>

          {/* STUDENTS */}

          <section
            className="students-section"
            id="students"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  STUDENT RECORDS
                </p>

                <h2>Students</h2>

                <p className="section-description">
                  Search by name, roll number, department or
                  section.
                </p>
              </div>

              <div className="student-actions">
                <div className="search-box">
                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                  />

                  {searchTerm && (
                    <button
                      className="clear-search"
                      onClick={() => setSearchTerm("")}
                    >
                      ×
                    </button>
                  )}
                </div>

                <button
                  className="add-student-button"
                  onClick={() => setShowAddStudent(true)}
                >
                  + Add Student
                </button>
              </div>
            </div>

            <div className="sort-controls">
              <button
                className={
                  sortOrder === "high"
                    ? "selected"
                    : ""
                }
                onClick={() => setSortOrder("high")}
              >
                Highest CGPA
              </button>

              <button
                className={
                  sortOrder === "low"
                    ? "selected"
                    : ""
                }
                onClick={() => setSortOrder("low")}
              >
                Lowest CGPA
              </button>

              <button
                className={
                  sortOrder === "none"
                    ? "selected"
                    : ""
                }
                onClick={() => setSortOrder("none")}
              >
                Original Order
              </button>
            </div>

            {/* ONLY RECORD AREA HAS ITS OWN SCROLL */}

            <div className="student-record-scroll">
              {sortedStudents.length > 0 ? (
                <StudentList
                  students={sortedStudents}
                  onStudentClick={setSelectedStudent}
                />
              ) : (
                <div className="empty-state">
                  <div>⌕</div>

                  <h3>No students found</h3>

                  <p>
                    Try a different name, roll number,
                    department or section.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SEMESTER OVERVIEW */}

          <section
            className="semester-section"
            id="semester"
          >
            <div>
              <p className="eyebrow">
                SEMESTER OVERVIEW
              </p>

              <h2>Academic Progress</h2>

              <p className="section-description">
                Overall academic indicators for the students
                currently registered in the portal.
              </p>
            </div>

            <div className="semester-grid">
              <div>
                <span>Current Semester</span>
                <strong>4</strong>
              </div>

              <div>
                <span>Average CGPA</span>
                <strong>
                  {averageCgpa.toFixed(2)}
                </strong>
              </div>

              <div>
                <span>Average Attendance</span>
                <strong>
                  {averageAttendance.toFixed(0)}%
                </strong>
              </div>

              <div>
                <span>Academic Year</span>
                <strong>2026</strong>
              </div>
            </div>
          </section>
        </main>

        {/* RIGHT PANEL */}

        <aside className="right-panel">
{/* ACADEMIC SUMMARY */}

          <div className="side-card academic-selector-card">
            <div className="side-card-header">
              <h3>Academic Summary</h3>
            </div>

            <form onSubmit={generateAcademicSummary}>
              <label>
                Academic Year

                <select
                  value={academicYear}
                  onChange={(event) =>
                    setAcademicYear(
                      event.target.value
                    )
                  }
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </label>

              <label>
                Semester

                <select
                  value={academicSemester}
                  onChange={(event) =>
                    setAcademicSemester(
                      event.target.value
                    )
                  }
                >
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                </select>
              </label>

              <label>
                Department
                <span className="optional-label">
                  Optional
                </span>

                <select
                  value={academicDepartment}
                  onChange={(event) =>
                    setAcademicDepartment(
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    All Departments
                  </option>

                  {departments.map((department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="summary-submit"
              >
                Generate Summary
              </button>
            </form>

            {academicResult && (
              <div className="summary-result">
                <span>Generated Result</span>

                <strong>
                  {academicResult.students.length} Students
                </strong>

                <small>
                  Average CGPA{" "}
                  {academicResult.averageCgpa.toFixed(2)}
                </small>
              </div>
            )}
          </div>

          {/* QUICK ACCESS */}

          <div className="side-card quick-access-card">
            <div className="side-card-header">
              <h3>Quick Access</h3>
            </div>

            <button
              className="quick-action"
              onClick={() => setShowAcademicInfo(true)}
            >
              <span className="quick-action-icon purple">
                ◈
              </span>

              <div>
                <strong>Academic Analysis</strong>
                <small>
                  Performance and department statistics
                </small>
              </div>

              <span>→</span>
            </button>

            <button
              className="quick-action"
              onClick={() => setShowAllStudents(true)}
            >
              <span className="quick-action-icon blue">
                ☷
              </span>

              <div>
                <strong>All Students</strong>
                <small>
                  View complete student directory
                </small>
              </div>

              <span>→</span>
            </button>

            <button
              className="quick-action"
              onClick={() => setShowAddStudent(true)}
            >
              <span className="quick-action-icon yellow">
                +
              </span>

              <div>
                <strong>Add Student</strong>
                <small>Create a new record</small>
              </div>

              <span>→</span>
            </button>

            <button
              className="quick-action"
              onClick={() =>
                setShowDeleteStudents(true)
              }
            >
              <span className="quick-action-icon red">
                −
              </span>

              <div>
                <strong>Delete Students</strong>
                <small>
                  Remove individual or category records
                </small>
              </div>

              <span>→</span>
            </button>

            <button
              className="quick-action"
              onClick={() => setShowHelp(true)}
            >
              <span className="quick-action-icon green">
                ?
              </span>

              <div>
                <strong>User Guide</strong>
                <small>
                  Learn how to use the portal
                </small>
              </div>

              <span>→</span>
            </button>
          </div>
        </aside>
      </div>

      <Footer />

      {/* STUDENT DETAILS */}

      {selectedStudent && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="student-modal details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="close-button"
              onClick={() =>
                setSelectedStudent(null)
              }
            >
              ×
            </button>

            <div className="modal-student-header">
              <img
                src={selectedStudent.photo}
                alt={selectedStudent.name}
                className="modal-photo"
              />

              <div>
                <p className="eyebrow">
                  STUDENT PROFILE
                </p>

                <h2>{selectedStudent.name}</h2>

                <p className="modal-department">
                  {selectedStudent.department}
                </p>
              </div>
            </div>

            <div className="student-profile-grid">
              <div>
                <span>Roll Number</span>
                <strong>
                  {selectedStudent.rollNumber}
                </strong>
              </div>

              <div>
                <span>Section</span>
                <strong>
                  Section {selectedStudent.section}
                </strong>
              </div>

              <div>
                <span>Semester</span>
                <strong>
                  {selectedStudent.semester}
                </strong>
              </div>

              <div>
                <span>Academic Year</span>
                <strong>{selectedStudent.year}</strong>
              </div>

              <div>
                <span>Current CGPA</span>
                <strong>{selectedStudent.cgpa}</strong>
              </div>

              <div>
                <span>Previous SGPA</span>
                <strong>
                  {selectedStudent.previousSgpa}
                </strong>
              </div>

              <div>
                <span>Attendance</span>
                <strong>
                  {selectedStudent.attendance}%
                </strong>
              </div>

              <div>
                <span>Contact</span>
                <strong>
                  {selectedStudent.contact ||
                    "Not provided"}
                </strong>
              </div>

              <div>
                <span>Email</span>
                <strong>
                  {selectedStudent.email ||
                    "Not provided"}
                </strong>
              </div>
            </div>

            <div className="performance-box">
              <div>
                <span>Attendance</span>

                <div className="progress-bar">
                  <div
                    style={{
                      width: `${selectedStudent.attendance}%`,
                    }}
                  ></div>
                </div>
              </div>

              <strong>
                {selectedStudent.attendance}%
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* HELP */}

      {showHelp && (
        <div
          className="modal-overlay"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="student-modal help-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="close-button"
              onClick={() => setShowHelp(false)}
            >
              ×
            </button>

            <p className="eyebrow">USER GUIDE</p>

            <h2>How to use the Student Portal</h2>

            <div className="guide-content">
              <div>
                <strong>Dashboard</strong>

                <p>
                  The Dashboard provides the overall context
                  of the portal, university and current student
                  records.
                </p>
              </div>

              <div>
                <strong>Students</strong>

                <p>
                  Search students by name, roll number,
                  department or section. Use the CGPA buttons
                  to sort the records.
                </p>
              </div>

              <div>
                <strong>Student Cards</strong>

                <p>
                  Click any student card to view the student's
                  complete profile, including section,
                  attendance, contact details and previous
                  SGPA.
                </p>
              </div>

              <div>
                <strong>Academic Info</strong>

                <p>
                  Open Academic Info to see student counts,
                  CGPA statistics, attendance statistics and
                  department distribution.
                </p>
              </div>

              <div>
                <strong>Academic Summary</strong>

                <p>
                  Select an academic year and semester.
                  Department can optionally be selected.
                  Press Generate Summary to calculate the
                  matching academic information.
                </p>
              </div>

              <div>
                <strong>All Students</strong>

                <p>
                  The All Students directory provides a compact
                  list of every student currently stored in the
                  portal.
                </p>
              </div>

              <div>
                <strong>Delete Students</strong>

                <p>
                  Students can be removed individually using
                  their roll number, or an entire category can
                  be removed using semester, department and
                  section.
                </p>
              </div>

              <div>
                <strong>Add Student</strong>

                <p>
                  Use Add Student to create a new record. The
                  round yellow button allows a temporary student
                  picture to be uploaded from the computer.
                </p>
              </div>

              <div>
                <strong>Dark / Light Mode</strong>

                <p>
                  The top-right button changes the appearance
                  of the complete portal.
                </p>
              </div>
            </div>

            <div className="support-box">
              <strong>Still need help?</strong>

              <p>
                For technical issues, corrections or support,
                contact:
              </p>

              <a href="mailto:student.support@tiu.edu.in">
                student.support@tiu.edu.in
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ACADEMIC ANALYSIS */}

      {showAcademicInfo && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowAcademicInfo(false)
          }
        >
          <div
            className="student-modal academic-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="close-button"
              onClick={() =>
                setShowAcademicInfo(false)
              }
            >
              ×
            </button>

            <p className="eyebrow">
              ACADEMIC ANALYSIS
            </p>

            <h2>Academic Information</h2>

            <p className="modal-department">
              Overall academic statistics for Techno India
              University student records.
            </p>

            <div className="analytics-grid">
              <div>
                <span>Total Students</span>
                <strong>{students.length}</strong>
              </div>

              <div>
                <span>Average CGPA</span>
                <strong>
                  {averageCgpa.toFixed(2)}
                </strong>
              </div>

              <div>
                <span>Highest CGPA</span>
                <strong>
                  {highestCgpa.toFixed(1)}
                </strong>
              </div>

              <div>
                <span>Average Attendance</span>
                <strong>
                  {averageAttendance.toFixed(0)}%
                </strong>
              </div>
            </div>

            <h3 className="analytics-title">
              Department Distribution
            </h3>

            <div className="department-chart">
              {departments.map((department) => {
                const count = students.filter(
                  (student) =>
                    student.department === department
                ).length;

                const percentage =
                  (count / students.length) * 100;

                return (
                  <div
                    className="department-row"
                    key={department}
                  >
                    <div className="department-label">
                      <span>{department}</span>
                      <strong>{count}</strong>
                    </div>

                    <div className="chart-track">
                      <div
                        className="chart-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="analysis-highlight">
              <div>
                <span>Top Performer</span>

                <strong>
                  {topStudent?.name || "No data"}
                </strong>
              </div>

              <div>
                <span>CGPA</span>

                <strong>
                  {topStudent?.cgpa || "-"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ALL STUDENTS */}

      {showAllStudents && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowAllStudents(false)
          }
        >
          <div
            className="student-modal all-students-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="close-button"
              onClick={() =>
                setShowAllStudents(false)
              }
            >
              ×
            </button>

            <p className="eyebrow">
              STUDENT DIRECTORY
            </p>

            <h2>All Students</h2>

            <p className="modal-department">
              {students.length} student records currently
              available.
            </p>

            <div className="all-students-list">
              {students.map((student) => (
                <button
                  className="directory-row"
                  key={student.rollNumber}
                  onClick={() => {
                    setShowAllStudents(false);
                    setSelectedStudent(student);
                  }}
                >
                  <img
                    src={student.photo}
                    alt={student.name}
                  />

                  <div>
                    <strong>{student.name}</strong>

                    <span>
                      {student.rollNumber} ·{" "}
                      {student.department}
                    </span>
                  </div>

                  <div className="directory-cgpa">
                    <span>CGPA</span>
                    <strong>{student.cgpa}</strong>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DELETE STUDENTS */}

      {showDeleteStudents && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowDeleteStudents(false)
          }
        >
          <div
            className="student-modal delete-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="close-button"
              onClick={() =>
                setShowDeleteStudents(false)
              }
            >
              ×
            </button>

            <p className="eyebrow">
              RECORD MANAGEMENT
            </p>

            <h2>Delete Students</h2>

            <p className="modal-department">
              Remove a single student or an entire student
              category.
            </p>

            <div className="delete-tabs">
              <button
                className={
                  deleteMode === "roll"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setDeleteMode("roll")
                }
              >
                Delete by Roll Number
              </button>

              <button
                className={
                  deleteMode === "category"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setDeleteMode("category")
                }
              >
                Delete by Category
              </button>
            </div>

            {deleteMode === "roll" ? (
              <div className="delete-form">
                <label>
                  Roll Number

                  <input
                    type="text"
                    value={deleteRollNumber}
                    onChange={(event) =>
                      setDeleteRollNumber(
                        event.target.value
                      )
                    }
                    placeholder="Example: BCA001"
                  />
                </label>

                <button
                  className="danger-button"
                  onClick={deleteByRollNumber}
                >
                  Delete Student
                </button>
              </div>
            ) : (
              <div className="delete-form">
                <label>
                  Semester

                  <select
                    value={deleteSemester}
                    onChange={(event) =>
                      setDeleteSemester(
                        event.target.value
                      )
                    }
                  >
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                  </select>
                </label>

                <label>
                  Department

                  <select
                    value={deleteDepartment}
                    onChange={(event) =>
                      setDeleteDepartment(
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Department
                    </option>

                    {departments.map((department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Section

                  <select
                    value={deleteSection}
                    onChange={(event) =>
                      setDeleteSection(
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Section
                    </option>

                    {sections.map((section) => (
                      <option
                        key={section}
                        value={section}
                      >
                        Section {section}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  className="danger-button"
                  onClick={deleteByCategory}
                >
                  Delete Category
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD STUDENT */}

      {showAddStudent && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowAddStudent(false)
          }
        >
          <form
            className="student-modal add-modal"
            onSubmit={addStudent}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="close-button"
              onClick={() =>
                setShowAddStudent(false)
              }
            >
              ×
            </button>

            <p className="eyebrow">NEW RECORD</p>

            <h2>Add Student</h2>

            <p className="modal-department">
              Add a new student to the university portal.
            </p>

            <label className="upload-avatar">
              {newStudent.photo ? (
                <img
                  src={newStudent.photo}
                  alt="Student preview"
                />
              ) : (
                <span>+</span>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </label>

            <p className="upload-hint">
              Click the round button to upload a picture.
            </p>

            <div className="form-grid">
              <label>
                Name

                <input
                  type="text"
                  name="name"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  placeholder="Student name"
                  required
                />
              </label>

              <label>
                Roll Number

                <input
                  type="text"
                  name="rollNumber"
                  value={newStudent.rollNumber}
                  onChange={handleInputChange}
                  placeholder="BCA017"
                  required
                />
              </label>

              <label>
                Department

                <input
                  type="text"
                  name="department"
                  value={newStudent.department}
                  onChange={handleInputChange}
                  placeholder="Department"
                  required
                />
              </label>

              <label>
                Section

                <select
                  name="section"
                  value={newStudent.section}
                  onChange={handleInputChange}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </label>

              <label>
                Semester

                <select
                  name="semester"
                  value={newStudent.semester}
                  onChange={handleInputChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </label>

              <label>
                CGPA

                <input
                  type="number"
                  name="cgpa"
                  value={newStudent.cgpa}
                  onChange={handleInputChange}
                  placeholder="8.5"
                  min="0"
                  max="10"
                  step="0.1"
                  required
                />
              </label>

              <label>
                Previous SGPA

                <input
                  type="number"
                  name="previousSgpa"
                  value={newStudent.previousSgpa}
                  onChange={handleInputChange}
                  placeholder="8.2"
                  min="0"
                  max="10"
                  step="0.1"
                />
              </label>

              <label>
                Attendance %

                <input
                  type="number"
                  name="attendance"
                  value={newStudent.attendance}
                  onChange={handleInputChange}
                  placeholder="90"
                  min="0"
                  max="100"
                />
              </label>

              <label>
                Contact

                <input
                  type="text"
                  name="contact"
                  value={newStudent.contact}
                  onChange={handleInputChange}
                  placeholder="+91..."
                />
              </label>

              <label>
                Email

                <input
                  type="email"
                  name="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  placeholder="student@tiu.edu.in"
                />
              </label>

              <label>
                Academic Year

                <input
                  type="text"
                  name="year"
                  value={newStudent.year}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <button
              type="submit"
              className="save-student-button"
            >
              Add Student
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;