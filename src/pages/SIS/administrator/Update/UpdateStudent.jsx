import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../../Layout";

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    email: "",
    username: "",
    password: "",
    full_name: "",
    address: "",
    gender: "",
    mobile_number: "",
    role: "",
  });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating student:", student); // Log the data being sent
      await axios.put(`http://localhost:8080/students/${id}`, student);
      navigate("/SIS/get/students"); // Navigate to the student list after successful update
    } catch (error) {
      console.error("Error updating student:", error);
      // Handle specific error messages if available from backend
      if (error.response && error.response.data) {
        console.error("Backend Error:", error.response.data.message);
        // Example: setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="my-4">Update Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={student.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Input your password here"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              name="full_name"
              value={student.full_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={student.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input
              type="text"
              className="form-control"
              name="gender"
              value={student.gender}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              className="form-control"
              name="mobile_number"
              value={student.mobile_number}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateStudent;
