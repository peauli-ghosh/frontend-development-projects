import StudentCard from "./StudentCard";

function StudentList({
  students,
  onStudentClick,
}) {
  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard
          key={student.rollNumber}
          name={student.name}
          rollNumber={student.rollNumber}
          department={student.department}
          section={student.section}
          semester={student.semester}
          cgpa={student.cgpa}
          photo={student.photo}
          onClick={() => onStudentClick(student)}
        />
      ))}
    </div>
  );
}

export default StudentList;