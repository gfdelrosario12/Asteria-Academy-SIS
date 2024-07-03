import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Layout from "../../../../Layout";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons from react-icons

function CreateAdministrator() {
  const navigate = useNavigate(); // useNavigate hook

  const [administrator, setAdministrator] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    address: "",
    gender: "",
    mobile_number: "",
    role: "ADMIN",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (administrator.password !== administrator.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/administrators/", administrator);
      navigate("/SIS/get/admin"); // Navigate to the admin list after successful creation
    } catch (error) {
      console.error("Error creating administrator:", error);
      // Handle error, show error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdministrator({ ...administrator, [name]: value });
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
              <h5 className="card-header">Create Administrator</h5>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={administrator.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={administrator.password}
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
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        name="confirmPassword"
                        value={administrator.confirmPassword}
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
                    <input
                      type="text"
                      className="form-control"
                      name="full_name"
                      value={administrator.full_name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={administrator.address}
                      onChange={handleChange}
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender:</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={administrator.gender}
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
                      value={administrator.mobile_number}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <button type="submit" className="btn portal">
                      Create Administrator
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

export default CreateAdministrator;
