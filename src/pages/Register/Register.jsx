import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../../Layout';

const Register = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    address: Yup.string()
      .required('Address is required'),
    gender: Yup.string()
      .oneOf(['M', 'F', 'O', 'Prefer not to say'], 'Invalid gender selection')
      .required('Gender is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    role: Yup.string()
      .oneOf(['Administrator', 'Faculty', 'Student'], 'Invalid role selection')
      .required('Role is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/administrators/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Administrator created successfully:', data);
      } else {
        console.error('Error creating administrator:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating administrator:', error);
    }
  };

  return (
    <Layout>
      <div className="d-flex flex-row justify-content-center align-items-center my-3">
        <Formik
          initialValues={{
            email: '',
            password: '',
            address: '',
            gender: '',
            mobileNumber: '',
            role: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form p-4">
              <h1 className="fs-5 text-center parent-font">Register to Asteria Academy</h1>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label child-font">
                  Email address:
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label child-font">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="address" className="form-label child-font">
                  Address:
                </label>
                <Field
                  type="text"
                  name="address"
                  className="form-control"
                />
                <ErrorMessage name="address" component="div" className="text-danger" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="gender" className="form-label child-font">
                  Gender:
                </label>
                <Field
                  as="select"
                  name="gender"
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-danger" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label child-font">
                  Mobile Number:
                </label>
                <Field
                  type="text"
                  name="mobileNumber"
                  className="form-control"
                />
                <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="role" className="form-label child-font">
                  Role:
                </label>
                <Field
                  as="select"
                  name="role"
                  className="form-select"
                >
                  <option value="">Select Role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Student">Student</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-danger" />
              </div>
              
              <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                <button type="submit" className="btn submit parent-font" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Register;
