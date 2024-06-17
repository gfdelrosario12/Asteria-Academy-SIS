import React from 'react';
import Layout from '../../../Layout';

function StudentGrades() {
  // Sample data, replace this with actual data
  const grades = [
    {
      id: 1,
      subjectCode: 'MATH101',
      description: 'Calculus I',
      facultyName: 'Dr. John Doe',
      units: 3,
      sectCode: 'A',
      finalGrade: 'A',
      gradeStatus: 'Passed'
    },
    {
      id: 2,
      subjectCode: 'ENG102',
      description: 'English Literature',
      facultyName: 'Prof. Jane Smith',
      units: 2,
      sectCode: 'B',
      finalGrade: 'B',
      gradeStatus: 'Passed'
    }
    // Add more data as needed
  ];

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className='text-center'>1st Year, 1st Semester</h1>
        <table className="table table-bordered table-striped mt-4">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Subject Code</th>
              <th>Description</th>
              <th>Faculty Name</th>
              <th>Units</th>
              <th>Sect Code</th>
              <th>Final Grade</th>
              <th>Grade Status</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={grade.id}>
                <td>{index + 1}</td>
                <td>{grade.subjectCode}</td>
                <td>{grade.description}</td>
                <td>{grade.facultyName}</td>
                <td>{grade.units}</td>
                <td>{grade.sectCode}</td>
                <td>{grade.finalGrade}</td>
                <td>{grade.gradeStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default StudentGrades;
