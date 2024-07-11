import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../../Layout";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch all students
  const fetchStudents = () => {
    axios.get("http://localhost:8080/students/")
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  };

  // Function to delete a student by ID
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:8080/students/${id}`)
      .then(response => {
        console.log('Student deleted successfully');
        fetchStudents(); // Refresh the student list after deletion
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
  };

  // Function to navigate to the update page for a student
  const updateStudent = (id) => {
    navigate(`/update-student/${id}`);
  };

  return (
    <Layout>
      <div className="container">
        <h2>All Students</h2>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Mobile Number</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.email}</td>
                <td>{student.username}</td>
                <td>{student.full_name}</td>
                <td>{student.address}</td>
                <td>{student.gender}</td>
                <td>{student.mobile_number}</td>
                <td>{student.role}</td>
                <td>
                  <button className="btn mx-2" onClick={() => updateStudent(student.id)}>Update</button>
                  <button className="btn mx-2" onClick={() => deleteStudent(student.id)}>Delete</button>
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
