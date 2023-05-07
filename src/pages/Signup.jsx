import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import Loader from "../components/Loader/Loader";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth, storage, db } from "../firebase-config";
import { toast } from "react-toastify";

import "../styles/login.scss";
import { buttonStyles } from "./Home.jsx";
import styled from "styled-components";

const Signup = () => {
  const [username, setUsename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload file to Firebase Storage and get download URL
      const storageRef = ref(storage, `images/${Date.now() + file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const snapshot = await uploadTask;

      const downloadURL = await getDownloadURL(snapshot.ref);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
        photoURL: downloadURL,
      });

      //store user data in firestore database
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        displayName: username,
        email,
        photoURL: downloadURL,
      });

      setLoading(false);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Loader />
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4"> Signup</h3>
                <Form className="auth__form " onSubmit={handleSignup}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsename(e.target.value)}
                      required
                    ></input>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></input>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    ></input>
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input type="file" onChange={handleFileChange}></input>
                  </FormGroup>

                  <AuthButton type="submit" className="buy__btn auth__btn">
                    Create an account
                  </AuthButton>
                  <p>
                    Already have an account?{""} <Link to="/login"> Login</Link>
                  </p>
                </Form>
              </Col>
            )}
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
