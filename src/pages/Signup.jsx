import React, { useEffect } from "react";
import { Container, Row, Col, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import { toast } from "react-toastify";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/login.scss";
import { buttonStyles } from "./Home.jsx";
import styled from "styled-components";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .max(40, "Last name cannot exceed 40 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        "Password must contain at least 1 capital letter and 1 special character"
      )
      .required("Password is required"),
  });

  const handleSignup = (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Registration successful");
      console.log(
        "First Name:",
        values.firstName,
        "\nLast Name:",
        values.lastName,
        "\nEmail:",
        values.email
      );
      resetForm();
      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
    setSubmitting(false);
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Signup</h3>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSignup}
              >
                <Form className="auth__form">
                  <FormGroup className="form__group">
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      required
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error-message"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      required
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="error-message"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </FormGroup>
                  <AuthButton type="submit" className="buy__btn auth__btn">
                    Create an account
                  </AuthButton>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </Form>
              </Formik>
            </Col>
            {/* )} */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const AuthButton = styled.button`
  ${buttonStyles}
  transition: all 0.1s ease-in-out !important;
  background-color: #eee;
  color: var(--primary-color);
  &:hover {
    color: #eee;
    background-color: var(--primary-color);
    outline: 1px solid #eee;
  }
`;

export default Signup;
