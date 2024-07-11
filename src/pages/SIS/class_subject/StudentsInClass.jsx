import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../../Layout";

function StudentsInClass() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [classInfo, setClassInfo] = useState({});
  const [facultyInfo, setFacultyInfo] = useState({});
  const [newStudentId, setNewStudentId] = useState("");
  const [grades, setGrades] = useState([]);
  const facultyID = sessionStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch faculty info
        const facultyResponse = await axios.get(`http://localhost:8080/faculty/${facultyID}`);
        setFacultyInfo(facultyResponse.data);

        // Fetch class info
        const classResponse = await axios.get(`http://localhost:8080/class-subjects/${id}`);
        setClassInfo(classResponse.data);

        // Fetch students in the class
        const studentsResponse = await axios.get(`http://localhost:8080/students/studentsinclass/${id}`);
        setStudents(studentsResponse.data);

        // Fetch grades for the students in the class
        await fetchGrades(studentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, facultyID]);

  const fetchGrades = async (students) => {
    try {
      const gradePromises = students.map(student =>
        axios.get(`http://localhost:8080/grades/student/${student.id}/class/${id}`)
      );
      const gradesResponses = await Promise.all(gradePromises);
      const allGrades = gradesResponses.map(response => response.data).flat();
      setGrades(allGrades);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch updated data after add/remove operations
      const studentsResponse = await axios.get(`http://localhost:8080/students/studentsinclass/${id}`);
      setStudents(studentsResponse.data);

      await fetchGrades(studentsResponse.data);
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  const handleAddStudent = async (studentId) => {
    try {
      await axios.put(`http://localhost:8080/class-subjects/${id}/add-student/${studentId}`);
      const response = await axios.post(`http://localhost:8080/grades/`, {
        student: { id: studentId },  // Ensure 'student' is correctly structured
        classSubjectObj: { id: id }, // Ensure 'classSubjectObj' is correctly structured
        grade: 0,
      });
      setNewStudentId("");
      fetchData(); // Re-fetch data after adding student
      // No need to refresh the whole page if using React Router for navigation
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  

  const handleRemoveStudent = async (studentId, gradeId) => {
    try {
      await axios.put(`http://localhost:8080/class-subjects/${id}/remove-student/${studentId}`);
      await axios.delete(`http://localhost:8080/grades/${gradeId}`);
      fetchData(); // Re-fetch data after removing student
      // No need to refresh the whole page if using React Router for navigation
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="my-4 text-center">Students in Class {id}</h1>

        <div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{classInfo.className}</h5>
              <p className="card-text">Faculty: {facultyInfo.full_name}</p>
              <p className="card-text">School Year: {classInfo.school_year}</p>
              <p className="card-text">Year Level: {classInfo.year_level}</p>
              <p className="card-text">Semester: {classInfo.semester}</p>
              <p className="card-text">Program: {classInfo.program}</p>
              <p className="card-text">Block: {classInfo.block}</p>
            </div>
          </div>
        </div>

        <h2 className="mt-4 text-center">Students List</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Grades</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>{student.full_name}</td>
                  <td>{student.address}</td>
                  <td>{student.gender}</td>
                  <td>{student.mobile_number}</td>
                  <td>
                    {grades
                      .filter((grade) => grade.student.id === student.id)
                      .map((grade) => (
                        <span key={grade.id}>
                          <Link to={`/SIS/grades/${grade.id}`}>{grade.grade}</Link>
                          <br />
                        </span>
                      ))}
                  </td>
                  <td>
                    {grades
                      .filter((grade) => grade.student.id === student.id)
                      .map((grade) => (
                        <span key={grade.id}>
                          <button
                            className="btn"
                            onClick={() => {
                              handleRemoveStudent(student.id, grade.id);
                            }}
                          >
                            Remove
                          </button>
                          <br />
                        </span>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Input for adding new student by ID */}
        <div className="form-group mt-4">
          <label>Add Student by ID:</label>
          <input
            type="text"
            className="form-control"
            value={newStudentId}
            onChange={(e) => setNewStudentId(e.target.value)}
          />
          <button
            className="btn mt-2"
            onClick={() => handleAddStudent(newStudentId)}
          >
            Add Student
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default StudentsInClass;
