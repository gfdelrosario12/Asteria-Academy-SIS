import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate instead of useHistory
import axios from "axios";
import Layout from "../../../../Layout";

function UpdateAdministrator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
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
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/administrators/${id}`);
      setAdmin(response.data);
    } catch (error) {
      console.error("Error fetching admin:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/administrators/${id}`, admin);
      navigate("/SIS/get/admin"); // Navigate to the admin list after update
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="my-4">Update Administrator</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={admin.email}
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
              value={admin.full_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={admin.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input
              type="text"
              className="form-control"
              name="gender"
              value={admin.gender}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              className="form-control"
              name="mobile_number"
              value={admin.mobile_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              className="form-control"
              name="role"
              value={admin.role}
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

export default UpdateAdministrator;
