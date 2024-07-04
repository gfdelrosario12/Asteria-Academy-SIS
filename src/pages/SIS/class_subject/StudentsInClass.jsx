import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function StudentsInClass() {
  const { id } = useParams();
  const [students, setStudents] = useState([]); // Ensure initial state is an array

  useEffect(() => {
    axios.get(`/api/students/class/${id}`)
      .then(response => {
        console.log('API Response:', response.data); // Log the response to check its structure
        if (Array.isArray(response.data)) {
          setStudents(response.data); // Only set state if the data is an array
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Students in Class</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.full_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsInClass;
