import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../../Layout';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function FacultyHomePage() {
  const facultyID = sessionStorage.getItem('id'); // Retrieve faculty ID from session storage
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (facultyID) {
      fetchClassesByFacultyId(facultyID);
    }
  }, [facultyID]);

  const fetchClassesByFacultyId = async (facultyId) => {
    try {
      const response = await axios.get(`http://localhost:8080/class-subjects/faculty/${facultyId}/classes`);
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  return (
    <div>
      <Layout>
        <h1 className='text-center'>Classes Associated with Faculty {facultyID}</h1>
        <div className="table-responsive px-5 py-3"> {/* Ensure responsiveness for smaller screens */}
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark"> {/* Dark header for better contrast */}
              <tr>
                <th>Class Name</th>
                <th>School Year</th>
                <th>Year Level</th>
                <th>Semester</th>
                <th>Program</th>
                <th>Block</th>
                <th>Faculty Name</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem) => (
                <tr key={classItem.id}>
                  <td>
                    <Link to={`/SIS/class-details/${classItem.id}`}>{classItem.className}</Link>
                  </td>
                  <td>{classItem.school_year}</td>
                  <td>{classItem.year_level}</td>
                  <td>{classItem.semester}</td>
                  <td>{classItem.program}</td>
                  <td>{classItem.block}</td>
                  <td>{classItem.faculty.full_name}</td> {/* Assuming faculty object has a full_name field */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
}

export default FacultyHomePage;