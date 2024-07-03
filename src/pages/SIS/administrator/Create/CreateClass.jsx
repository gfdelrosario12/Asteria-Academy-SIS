import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../../../Layout";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function CreateClass() {
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [program, setProgram] = useState("");
  const [block, setBlock] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  // Fetch list of faculties on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/faculty/")
      .then((response) => {
        setFaculties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching faculties:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/class-subjects/", {
        className,
        school_year: parseInt(schoolYear),
        year_level: parseInt(yearLevel),
        semester: parseInt(semester),
        program,
        block: parseInt(block),
        faculty: { id: selectedFaculty }, // Include selected faculty ID
      });
      console.log("Class created:", response.data);
      navigate("/SIS/get/classes");
    } catch (error) {
      console.error("Error creating class:", error);
      // Handle error, show error message
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h5 className="card-header">Create Class</h5>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Class Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">School Year:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={schoolYear}
                      onChange={(e) => setSchoolYear(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Year Level:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={yearLevel}
                      onChange={(e) => setYearLevel(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Semester:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Program:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Block:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={block}
                      onChange={(e) => setBlock(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Select Faculty:</label>
                    <select
                      className="form-select"
                      value={selectedFaculty}
                      onChange={(e) => setSelectedFaculty(e.target.value)}
                      required
                    >
                      <option value="">Select Faculty</option>
                      {faculties.map((faculty) => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <button type="submit" className="btn portal">
                      Create Class
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

export default CreateClass;
