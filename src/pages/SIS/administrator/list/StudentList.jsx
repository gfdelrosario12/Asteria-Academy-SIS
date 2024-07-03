import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import Layout from "../../../../Layout";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/students/");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/students/${id}`);
      fetchStudents(); // Refresh the student list after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleUpdateStudent = (id) => {
    navigate(`/update-student/${id}`);
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="my-4 text-center">Student List</h2>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.username}</td>
                <td>{student.email}</td>
                <td>{student.full_name}</td>
                <td>
                  <button
                    className="btn portal mx-2"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn portal mx-2"
                    onClick={() => handleUpdateStudent(student.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default StudentList;
