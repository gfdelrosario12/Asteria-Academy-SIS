import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../../../../Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const CreateFaculty = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    address: "",
    gender: "",
    mobile_number: "",
    department: "",
    role: "FACULTY",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    mobile_number: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:8080/faculty/", values);
      navigate("/SIS/get/faculty");
    } catch (error) {
      console.error("Error creating faculty:", error);
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h5 className="card-header">Create Faculty</h5>
              <div className="card-body">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        <Field type="email" name="email" className="form-control" placeholder="Email" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control"
                            placeholder="Password"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                          </button>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <Field
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm Password"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                          </button>
                        </div>
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="text" name="first_name" className="form-control" placeholder="First Name" />
                        <ErrorMessage name="first_name" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="text" name="last_name" className="form-control" placeholder="Last Name" />
                        <ErrorMessage name="last_name" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="text" name="address" className="form-control" placeholder="Address" />
                        <ErrorMessage name="address" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field as="select" name="gender" className="form-select">
                          <option value="">Select Gender</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="O">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </Field>
                        <ErrorMessage name="gender" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="text" name="mobile_number" className="form-control" placeholder="Mobile Number" />
                        <ErrorMessage name="mobile_number" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field type="text" name="department" className="form-control" placeholder="Department" />
                        <ErrorMessage name="department" component="div" className="text-danger" />
                      </div>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <button type="submit" className="btn portal" disabled={isSubmitting}>
                          Create Faculty
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateFaculty;
