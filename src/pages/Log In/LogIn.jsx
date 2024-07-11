import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogIn() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    role: "",
  };

  function extractNumberAfterLastDash(inputString) {
    // Find the last index of '-'
    const lastIndex = inputString.lastIndexOf('-');

    // Extract the substring after the last '-'
    const substringAfterLastDash = inputString.substring(lastIndex + 1);

    // Parse the substring to get the number
    const numberAfterLastDash = parseInt(substringAfterLastDash, 10);

    // Return the number
    return numberAfterLastDash;
}

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required").oneOf(
      ["administrators", "faculty", "students"],
      "Invalid role"
    ),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/${values.role.toLowerCase()}/login`,
        {
          username: values.username,
          password: values.password,
          role: values.role,
        }
      );
      if (response.data === "Login successful") {
        console.log("Login successful");
        let id = extractNumberAfterLastDash(values.username);
        sessionStorage.setItem("id", id);
        console.log(id);
        sessionStorage.setItem("role", values.role);
        sessionStorage.setItem("isLoggedIn", true);
        navigate(`/SIS/${values.role.toLowerCase()}`); // Redirect to appropriate role-specific URL
      } else {
        console.log("Invalid username, password, or role");
        setFieldError("general", "Invalid username, password, or role");
      }
    } catch (error) {
      console.error("Login error:", error);
      setFieldError("general", "Error occurred during login");
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center my-3">
      <div className="d-flex flex-column justify-content-center align-items-center my-3">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form p-4">
            <h1 className="fs-5 text-center parent-font">Log In to SIS</h1>
            <div className="mb-3">
              <label htmlFor="username" className="form-label child-font">
                Username:
              </label>
              <Field
                type="text"
                className="form-control"
                id="username"
                name="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label child-font">
                Password:
              </label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label child-font">
                Role:
              </label>
              <Field
                as="select"
                className="form-select"
                id="role"
                name="role"
              >
                <option value="">Select Role</option>
                <option value="administrators">Administrator</option>
                <option value="faculty">Faculty</option>
                <option value="students">Student</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
              <button type="submit" className="btn portal">
                Login
              </button>
              <ErrorMessage
                name="general"
                component="div"
                className="text-danger"
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default LogIn;
