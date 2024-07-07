import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../../Layout";

function UpdateGrades() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [grades, setGrades] = useState({
    studentName: "",
    grade: "",
    classSubjectID: null // Initialize classSubjectID as null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch grades first
        const responseGrades = await axios.get(`http://localhost:8080/grades/${id}`);
        console.log("API Response (Grades):", responseGrades.data);
        setGrades(prevGrades => ({
          ...prevGrades,
          studentID: responseGrades.data.studentID,
          grade: responseGrades.data.grade,
          classSubjectID: responseGrades.data.classSubjectObj.id // Add classSubjectID to the state
        }));

        // Fetch student details based on fetched studentID
        const responseStudent = await axios.get(`http://localhost:8080/students/${responseGrades.data.student.id}`);
        console.log("API Response (Student):", responseStudent.data);
        setGrades(prevGrades => ({
          ...prevGrades,
          studentName: responseStudent.data.full_name,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrades({ ...grades, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/grades/${id}`, grades);
      console.log(`Class ID: ${grades.classSubjectID}`);
      navigate(`/SIS/class-details/${grades.classSubjectID}`);
    } catch (error) {
      console.error("Error updating grades:", error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="my-4">Update Grades</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <p>Student Name: {grades.studentName}</p>
          </div>
          <div className="form-group">
            <label>Grade</label>
            <input
              type="text"
              className="form-control"
              name="grade"
              value={grades.grade}
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

export default UpdateGrades;
