import React from "react";
import Layout from "../../../Layout";
import { Link } from 'react-router-dom';

function AdministratorHomePage() {
  // Retrieve id from sessionStorage
  let id = sessionStorage.getItem("id");

  return (
    <div>
      <Layout>
        <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="my-4">Welcome Administrator {id}</h1>
        <div className="d-flex flex-column justify-content-center align-items-center my-3">
          <Link to = "/SIS/get/admin" className="fs-3 my-2">Get All Administrators</Link>
          <Link to = "/SIS/get/students" className="fs-3 my-2">Get All Students</Link>
          <Link to = "/SIS/get/faculty" className="fs-3 my-2">Get All Faculty</Link>
          <Link to = "/SIS/get/classes" className="fs-3 my-2">Get All Classes</Link>
          <Link to = "/SIS/create/student" className="fs-3 my-2">Create Student</Link>
          <Link to = "/SIS/create/admin" className="fs-3 my-2">Create Administrator</Link>
          <Link to = "/SIS/create/faculty" className="fs-3 my-2">Create Faculty</Link>
          <Link to = "/SIS/create/class" className="fs-3 my-2">Create Class</Link>
        </div>
        </div>

      </Layout>
    </div>
  );
}

export default AdministratorHomePage;
