import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Layout from '../../../../Layout';
import axios from 'axios';

function ClassList() {
    const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/class-subjects/');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/class-subjects/${id}`);
      fetchClasses(); // Refresh the class list after deletion
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleUpdateClass = (id) => {
    navigate(`/update-class/${id}`);
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="my-4 text-center">Class List</h2>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Class Name</th>
              <th>School Year</th>
              <th>Faculty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(cls => (
              <tr key={cls.id}>
                <td>{cls.className}</td>
                <td>{cls.school_year}</td>
                <td>{cls.faculty.full_name}</td> {/* Display faculty name */}
                <td>
                  <button className="btn portal mx-2" onClick={() => handleDeleteClass(cls.id)}>Delete</button>
                  <button className="btn portal mx-2" onClick={() => handleUpdateClass(cls.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default ClassList;
