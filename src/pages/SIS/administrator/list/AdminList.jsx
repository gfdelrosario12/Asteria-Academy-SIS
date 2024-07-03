import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of usenavigate
import Layout from '../../../../Layout';
import axios from 'axios';

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8080/administrators/');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/administrators/${id}`);
      fetchAdmins(); // Refresh the admin list after deletion
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleUpdateAdmin = (id) => {
    navigate(`/update-admin/${id}`);
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="my-4 text-center">Admin List</h2>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.email}</td>
                <td>{admin.username}</td>
                <td>
                  <button className="btn portal mx-2" onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
                  <button className="btn portal mx-2" onClick={() => handleUpdateAdmin(admin.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AdminList;
