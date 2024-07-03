import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../../Layout';

function UpdateFaculty() {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [faculty, setFaculty] = useState({
    email: '',
    username: '',
    password: '',
    full_name: '',
    address: '',
    gender: '',
    mobile_number: '',
    role: '',
    department: ''
  });
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/faculty/${id}`);
      setFaculty(response.data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFaculty({ ...faculty, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/faculty/${id}`, faculty);
      navigate('/SIS/get/faculty'); // Navigate to the faculty list after successful update
    } catch (error) {
      setError(error.response.data.message); // Set error state with the error message from API
      console.error('Error updating faculty:', error);
    }
  };

  return (
    <Layout>
        <div className="container">
      <h2 className="my-4">Update Faculty</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error if there is one */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={faculty.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" placeholder='Input your password here' onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-control" name="full_name" value={faculty.full_name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" name="address" value={faculty.address} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input type="text" className="form-control" name="gender" value={faculty.gender} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input type="text" className="form-control" name="mobile_number" value={faculty.mobile_number} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" className="form-control" name="department" value={faculty.department} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
    </Layout>
  );
}

export default UpdateFaculty;
