import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../../Layout";

function UpdateClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classInfo, setClassInfo] = useState({
    className: "",
    school_year: "",
    facultyId: "",
  });
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchClass();
    fetchFaculties();
  }, []);

  const fetchClass = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/class-subjects/${id}`);
      setClassInfo(response.data);
    } catch (error) {
      console.error("Error fetching class:", error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("http://localhost:8080/faculty/");
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassInfo({ ...classInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating class:", classInfo);
      await axios.put(`http://localhost:8080/class-subjects/${id}`, classInfo);
      navigate("/SIS/get/classes");
    } catch (error) {
      console.error("Error updating class:", error);
      if (error.response && error.response.data) {
        console.error("Backend Error:", error.response.data.message);
      }
    }
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="my-4">Update Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Class Name</label>
            <input
              type="text"
              className="form-control"
              name="className"
              value={classInfo.className}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>School Year</label>
            <input
              type="text"
              className="form-control"
              name="school_year"
              value={classInfo.school_year}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Faculty</label>
            <select
              className="form-control"
              name="facultyId"
              value={classInfo.facultyId}
              onChange={handleInputChange}
            >
              <option value="">Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.full_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateClass;
