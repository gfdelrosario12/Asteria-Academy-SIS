import React, { useState, useEffect } from 'react';
import Layout from '../../../../Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get('http://localhost:8080/faculty/');
      setFaculties(response.data);
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  const handleDeleteFaculty = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/faculty/${id}`);
      fetchFaculties(); // Refresh the faculty list after deletion
    } catch (error) {
      console.error('Error deleting faculty:', error);
    }
  };

  const handleUpdateFaculty = (id) => {
    navigate(`/update-faculty/${id}`);
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="my-4 text-center">Faculty List</h2>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map(faculty => (
              <tr key={faculty.id}>
                <td>{faculty.email}</td>
                <td>{faculty.username}</td>
                <td>
                  <button className="btn portal mx-2" onClick={() => handleDeleteFaculty(faculty.id)}>Delete</button>
                  <button className="btn portal mx-2" onClick={() => handleUpdateFaculty(faculty.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default FacultyList;
