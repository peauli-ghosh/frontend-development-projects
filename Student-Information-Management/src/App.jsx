import { useState } from "react";
import Header from "./components/Header";
import StudentList from "./components/StudentList";
import Footer from "./components/Footer";

function App() {
  const students = [
    {
      name: "Aarav Sharma",
      rollNumber: "BCA001",
      department: "Computer Applications",
      semester: 4,
      cgpa: 8.7,
      photo: "https://via.placeholder.com/150",
    },
    {
      name: "Priya Das",
      rollNumber: "BCA002",
      department: "Computer Applications",
      semester: 4,
      cgpa: 9.2,
      photo: "https://via.placeholder.com/150",
    },
    {
      name: "Rohan Sen",
      rollNumber: "BCA003",
      department: "Computer Applications",
      semester: 4,
      cgpa: 7.9,
      photo: "https://via.placeholder.com/150",
    },
    {
      name: "Ananya Roy",
      rollNumber: "BCA004",
      department: "Computer Applications",
      semester: 4,
      cgpa: 8.4,
      photo: "https://via.placeholder.com/150",
    },
  ];

  const [sortOrder, setSortOrder] = useState("none");

  const sortedStudents = [...students].sort((a, b) => {
    if (sortOrder === "high") {
      return b.cgpa - a.cgpa;
    }

    if (sortOrder === "low") {
      return a.cgpa - b.cgpa;
    }

    return 0;
  });

  return (
    <div className="app">
      <Header />

      <main>
        <section className="student-section">
          <h2>Students</h2>

          <div className="sort-controls">
            <button onClick={() => setSortOrder("high")}>
              Highest CGPA
            </button>

            <button onClick={() => setSortOrder("low")}>
              Lowest CGPA
            </button>

            <button onClick={() => setSortOrder("none")}>
              Original Order
            </button>
          </div>

          <StudentList students={sortedStudents} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
