import React, { useState } from "react";
import { Modal, Form, Input, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase-config";
import { Container, Row, Col } from "reactstrap";
import { signInWithEmailAndPassword } from "firebase/auth";

import Helmet from "../components/Helmet/Helmet";

import styled from "styled-components";
import "../styles/login.scss";
import { buttonStyles } from "./Home.jsx";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      setLoading(false);
      toast.success("Successfully logged in");
      navigate("/checkout");
      setVisible(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4"> Login</h3>
              <LoginButton className="auth__btn" onClick={showModal}>
                Login
              </LoginButton>
              <p>
                Don't have an account? {""}
                <Link to="/signup">Create an account</Link>
              </p>
            </Col>
          </Row>
        </Container>
        <Modal
          open={visible}
          title="Login"
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Please enter a valid email!" },
                { required: true, message: "Please enter your email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" block>
                {loading ? <Spin /> : "Login"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </section>
    </Helmet>
  );
};

const LoginButton = styled.button`
  ${buttonStyles}
  background-color: #eee;
  color: var(--primary-color);
  transition: all 0.1s ease-in-out !important;
  margin-bottom: 30px;
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
