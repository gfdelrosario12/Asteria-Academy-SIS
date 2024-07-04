import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../../../Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Required"),
  full_name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  mobile_number: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Required"),
});

function CreateAdministrator() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/administrators/", values);
      navigate("/SIS/get/admin");
    } catch (error) {
      console.error("Error creating administrator:", error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h5 className="card-header">Create Administrator</h5>
              <div className="card-body">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: "",
                    full_name: "",
                    address: "",
                    gender: "",
                    mobile_number: "",
                    role: "ADMIN",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange }) => (
                    <Form>
                      <div className="mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                        />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <Field
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            placeholder="Password"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={togglePasswordVisibility}
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
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                          </button>
                        </div>
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          name="full_name"
                          placeholder="Full Name"
                        />
                        <ErrorMessage name="full_name" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder="Address"
                        />
                        <ErrorMessage name="address" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Gender:</label>
                        <Field
                          as="select"
                          className="form-select"
                          name="gender"
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
                        <label className="form-label">Mobile Number:</label>
                        <Field
                          type="text"
                          className="form-control"
                          name="mobile_number"
                          placeholder="Mobile Number"
                        />
                        <ErrorMessage name="mobile_number" component="div" className="text-danger" />
                      </div>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <button type="submit" className="btn portal">
                          Create Administrator
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
}

export default CreateAdministrator;
