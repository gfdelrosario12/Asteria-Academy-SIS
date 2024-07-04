import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../../../../Layout";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const CreateClass = () => {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);

  // Fetch list of faculties on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/faculty/")
      .then((response) => {
        setFaculties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching faculties:", error);
      });
  }, []);

  const initialValues = {
    className: "",
    schoolYear: "",
    yearLevel: "",
    semester: "",
    program: "",
    block: "",
    selectedFaculty: "",
  };

  const validationSchema = Yup.object().shape({
    className: Yup.string().required("Class Name is required"),
    schoolYear: Yup.number().required("School Year is required"),
    yearLevel: Yup.number().required("Year Level is required"),
    semester: Yup.number().required("Semester is required"),
    program: Yup.string().required("Program is required"),
    block: Yup.number().required("Block is required"),
    selectedFaculty: Yup.string().required("Faculty selection is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:8080/class-subjects/", {
        className: values.className,
        school_year: parseInt(values.schoolYear),
        year_level: parseInt(values.yearLevel),
        semester: parseInt(values.semester),
        program: values.program,
        block: parseInt(values.block),
        faculty: { id: values.selectedFaculty }, // Include selected faculty ID
      });
      console.log("Class created:", response.data);
      resetForm();
      navigate("/SIS/get/classes");
    } catch (error) {
      console.error("Error creating class:", error);
      // Handle error, show error message
    }
    setSubmitting(false);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h5 className="card-header">Create Class</h5>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        <label className="form-label">Class Name:</label>
                        <Field
                          type="text"
                          name="className"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="className"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">School Year:</label>
                        <Field
                          type="number"
                          name="schoolYear"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="schoolYear"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Year Level:</label>
                        <Field
                          type="number"
                          name="yearLevel"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="yearLevel"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Semester:</label>
                        <Field
                          type="number"
                          name="semester"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="semester"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Program:</label>
                        <Field
                          type="text"
                          name="program"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="program"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Block:</label>
                        <Field
                          type="number"
                          name="block"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="block"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Select Faculty:</label>
                        <Field
                          as="select"
                          name="selectedFaculty"
                          className="form-select"
                        >
                          <option value="">Select Faculty</option>
                          {faculties.map((faculty) => (
                            <option key={faculty.id} value={faculty.id}>
                              {faculty.full_name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="selectedFaculty"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <button
                          type="submit"
                          className="btn portal"
                          disabled={isSubmitting}
                        >
                          Create Class
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

export default CreateClass;
