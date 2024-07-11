import React, { useEffect, useState } from "react";
import Layout from "../../../Layout";
import axios from "axios";

function StudentHomePage() {
  const [classes, setClasses] = useState(null); // Initialize as null for initial loading state
  const [classGradesMap, setClassGradesMap] = useState({}); // State to store grades for each class

  useEffect(() => {
    // Fetch student ID from session storage
    const studentId = sessionStorage.getItem("id");

    // Fetch classes based on student ID
    axios
      .get(`http://localhost:8080/class-subjects/student/${studentId}/classes`)
      .then((response) => {
        console.log("API Response:", response.data); // Log the response data for debugging
        if (Array.isArray(response.data)) {
          setClasses(response.data); // Update state with fetched data if response is an array
          // Fetch grades for each class
          const fetchGradesForClasses = response.data.map((classSubject) =>
            fetchGrades(studentId, classSubject.id)
          );
          Promise.all(fetchGradesForClasses)
            .then((results) => {
              const gradesMap = {};
              results.forEach((grades, index) => {
                gradesMap[response.data[index].id] = grades;
              });
              setClassGradesMap(gradesMap);
            })
            .catch((error) => {
              console.error("Error fetching grades:", error); // Log fetch error
            });
        } else {
          console.error("Unexpected API response format:", response.data); // Log unexpected response format
        }
      })
      .catch((error) => {
        console.error("Error fetching classes:", error); // Log fetch error
      });
  }, []); // Empty dependency array to run effect only once on mount

  const fetchGrades = async (studentId, classId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/grades/student/${studentId}/class/${classId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching grades for class ${classId}:`, error); // Log fetch error
      return [];
    }
  };

  return (
    <div>
      <Layout>
        <div className="px-5">
          {" "}
          <h1 className="text-center my-4">Your Classes</h1>
          {classes === null ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Class Name</th>
                  <th>School Year</th>
                  <th>Year Level</th>
                  <th>Semester</th>
                  <th>Program</th>
                  <th>Block</th>
                  <th>Faculty</th>
                  <th>Grades</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classSubject) => (
                  <tr key={classSubject.id}>
                    <td>{classSubject.className}</td>
                    <td>{classSubject.schoolYear}</td>
                    <td>{classSubject.yearLevel}</td>
                    <td>{classSubject.semester}</td>
                    <td>{classSubject.program}</td>
                    <td>{classSubject.block}</td>
                    <td>{classSubject.faculty.full_name}</td>
                    <td>
                      {classGradesMap[classSubject.id]
                        ? classGradesMap[classSubject.id].map((grade, index) => (
                            <span key={grade.id}>
                              {index > 0 && ", "} {grade.grade}
                            </span>
                          ))
                        : "No grades available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default StudentHomePage;
