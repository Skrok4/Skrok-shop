import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import "../styles/login.scss";
import { buttonStyles } from "./Home.jsx";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log(user);
      setSubmitting(false);
      toast.success("Successfully logged in");
      navigate("/checkout");
    } catch (error) {
      setSubmitting(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4"> Login</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="auth__form">
                    <FormGroup className="form__group">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="form__error"
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="form__error"
                      />
                    </FormGroup>

                    <LoginButton
                      type="submit"
                      className="auth__btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader /> : "Login"}
                    </LoginButton>
                    <p>
                      Don't have an account? {""}
                      <Link to="/signup">Create an account</Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const LoginButton = styled.button`
  ${buttonStyles}
  background-color: #eee;
  color: var(--primary-color);
  transition: all 0.1s ease-in-out !important;
  &:hover {
    color: #eee;
    background-color: var(--primary-color);
    outline: 1px solid #eee;
  }
  &:active {
    outline: 2px solid #eee;
  }
`;

export default Login;

// import React, { useState } from "react";
// import { Modal, Form, Input, Button, Spin } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { auth } from "../firebase-config";
// import { Container, Row, Col } from "reactstrap";
// import { signInWithEmailAndPassword } from "firebase/auth";

// import Helmet from "../components/Helmet/Helmet";

// import styled from "styled-components";
// import "../styles/login.scss";
// import { buttonStyles } from "./Home.jsx";

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const onFinish = async (values) => {
//     setLoading(true);
//     const { email, password } = values;
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       console.log(user);
//       setLoading(false);
//       toast.success("Successfully logged in");
//       navigate("/checkout");
//       setVisible(false);
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message);
//     }
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   const showModal = () => {
//     setVisible(true);
//   };

//   return (
//     <Helmet title="Login">
//       <section>
//         <Container>
//           <Row>
//             <Col lg="6" className="m-auto text-center">
//               <h3 className="fw-bold mb-4"> Login</h3>
//               <LoginButton className="auth__btn" onClick={showModal}>
//                 Login
//               </LoginButton>
//               <p>
//                 Don't have an account? {""}
//                 <Link to="/signup">Create an account</Link>
//               </p>
//             </Col>
//           </Row>
//         </Container>
//         <Modal
//           open={visible}
//           title="Login"
//           onCancel={handleCancel}
//           footer={null}
//         >
//           <Form
//             {...layout}
//             name="basic"
//             initialValues={{ remember: true }}
//             onFinish={onFinish}
//             form={form}
//           >
//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { type: "email", message: "Please enter a valid email!" },
//                 { required: true, message: "Please enter your email!" },
//               ]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[
//                 { required: true, message: "Please enter your password!" },
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>

//             <Form.Item {...tailLayout} className="ant-col-offset-8">
//               <Button type="primary" htmlType="submit" block className="">
//                 {loading ? <Spin /> : "Login"}
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </section>
//     </Helmet>
//   );
// };

// const LoginButton = styled.button`
//   ${buttonStyles}
//   background-color: #eee;
//   color: var(--primary-color);
//   transition: all 0.1s ease-in-out !important;
//   margin-bottom: 30px;
//   &:hover {
//     color: #eee;
//     background-color: var(--primary-color);
//     outline: 1px solid #eee;
//   }
//   &:active {
//     outline: 2px solid #eee;
//   }
// `;

// export default Login;
