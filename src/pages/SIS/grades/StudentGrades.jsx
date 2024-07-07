import React from 'react';
import Layout from '../../../Layout';

function StudentGrades() {
  

  return (
    <Layout>
      <div>
        <h1 className='text-center'>Student Grades</h1>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>90</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>85</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default StudentGrades;
