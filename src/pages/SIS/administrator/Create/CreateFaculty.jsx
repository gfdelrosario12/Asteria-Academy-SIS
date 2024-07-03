import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import axios from "axios";
import Layout from "../../../../Layout";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons from react-icons

function CreateFaculty() {
    const navigate = useNavigate(); // useNavigate hook
  const [faculty, setFaculty] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    address: "",
    gender: "",
    mobile_number: "",
    role: "", // Remove 'role' from user input
    department: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (faculty.password !== faculty.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Set role to 'FACULTY' before sending the request
      const response = await axios.post("http://localhost:8080/faculty/", {
        email: faculty.email,
        password: faculty.password,
        full_name: faculty.full_name,
        address: faculty.address,
        gender: faculty.gender,
        mobile_number: parseInt(faculty.mobile_number),
        role: "FACULTY", // Set role directly here
        department: faculty.department,
      });
      console.log("Faculty created:", response.data);
      navigate("/SIS/get/faculty"); // Navigate to the faculty list after successful creation
    } catch (error) {
      console.error("Error creating faculty:", error);
      // Handle error, show error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaculty({ ...faculty, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h5 className="card-header">Create Faculty</h5>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={faculty.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={faculty.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm Password:</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        name="confirmPassword"
                        value={faculty.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Full Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="full_name"
                      value={faculty.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={faculty.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender:</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={faculty.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile Number:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="mobile_number"
                      value={faculty.mobile_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={faculty.department}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <button type="submit" className="btn portal">
                      Create Faculty
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateFaculty;
