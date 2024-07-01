import React from 'react';
import Layout from '../../Layout';

function Register() {
  return (
    <Layout>
      <div className="d-flex flex-row justify-content-center align-items-center my-3">
      <form className="form p-4">
        <h1 className="fs-5 text-center parent-font">Register to Asteria Academy</h1>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label child-font">
            Email address:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label child-font">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="birthday" className="form-label child-font">
            Birthday:
          </label>
          <input
            type="date"
            className="form-control"
            id="birthday"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="address" className="form-label child-font">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label child-font">
            Mobile Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="gender" className="form-label child-font">
            Gender:
          </label>
          <select
            className="form-select"
            id="gender"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        
        <div className="d-flex flex-row justify-content-center align-items-center mt-3">
          <button type="submit" className="btn submit parent-font">
            Submit
          </button>
        </div>
      </form>
    </div>
    </Layout>
  );
}

export default Register;
