import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import notFoundImg from "../assets/images/not-found.png";

const NotFound = () => {
  return (
    <>
      <Container className="my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Page Not Found</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src={notFoundImg}
            alt="Not-found"
          />
          <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
            <Link to="/home" className="text-white text-decoration-none">
              Home page
            </Link>
          </button>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
