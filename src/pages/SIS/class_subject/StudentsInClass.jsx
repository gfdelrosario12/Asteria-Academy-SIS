import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../../Layout";
import { Link } from "react-router-dom";

function StudentsInClass() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [classInfo, setClassInfo] = useState({});
  const [facultyInfo, setFacultyInfo] = useState({});
  const [grades, setGrades] = useState({});
  const facultyID = sessionStorage.getItem("id");

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/faculty/${facultyID}`);
        setFacultyInfo(response.data);
      } catch (error) {
        console.error("Error fetching faculty:", error);
      }
    };

    const fetchClassInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/class-subjects/${id}`);
        setClassInfo(response.data);
        console.log("API Response:", response.data); // Log the response to check its structure
      } catch (error) {
        console.error("Error fetching class info:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        console.log("Fetching students in class", id);
        const response = await axios.get(`http://localhost:8080/students/studentsinclass/${id}`);
        console.log("API Response:", response.data); // Log the response to check its structure
        if (Array.isArray(response.data)) {
          setStudents(response.data); // Assuming response.data is an array of students
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchFaculty();
    fetchClassInfo();
    fetchStudents();
  }, [id, facultyID]);

  useEffect(() => {
    const fetchGrades = async () => {
      if (students.length > 0) {
        try {
          const gradesResponse = await Promise.all(
            students.map((student) =>
              axios.get(`http://localhost:8080/grades/student/${student.id}/class/${id}`)
            )
          );
          const gradesData = gradesResponse.reduce((acc, response, index) => {
            acc[students[index].id] = response.data;
            return acc;
          }, {});
          setGrades(gradesData);
        } catch (error) {
          console.error("Error fetching grades:", error);
        }
      }
    };
  
    fetchGrades();
  }, [students, id]);
  

  return (
    <Layout>
      <div className="container">
        <h1 className="my-4 text-center">Students in Class {id}</h1>

        <div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{classInfo.className}</h5>
              <p className="card-text">Faculty: {facultyInfo.full_name}</p>
              <p className="card-text">School Year: {classInfo.school_year}</p>
              <p className="card-text">Year Level: {classInfo.year_level}</p>
              <p className="card-text">Semester: {classInfo.semester}</p>
              <p className="card-text">Program: {classInfo.program}</p>
              <p className="card-text">Block: {classInfo.block}</p>
            </div>
          </div>
        </div>

        <h2 className="mt-4 text-center">Students List</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Grades</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>{student.full_name}</td>
                  <td>{student.address}</td>
                  <td>{student.gender}</td>
                  <td>{student.mobile_number}</td>
                  <td>
                    {grades[student.id] && grades[student.id].length > 0
                      ? grades[student.id].map((grade) => (
                          <Link key={grade.id} to={`/SIS/grades/${grade.id}`}>
                            {grade.grade}
                          </Link>
                        ))
                      : "No grades available"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default StudentsInClass;
