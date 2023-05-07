import React from "react";
import { Container, Row, Col, FormGroup, Form } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useSelector } from "react-redux";
import "../styles/checkout.scss";
import styled from "styled-components";
import { buttonStyles } from "./Home.jsx";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Enter your name" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="Enter your email" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="number" placeholder="Phone Number" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Stress Address" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="City" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Postal Code" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty:<span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal:<span>${totalAmount}</span>
                </h6>
                <h6>
                  Shipping:
                  <br></br>free shipping<span>$0</span>
                </h6>
                <h4>
                  Total Cost:<span>${totalAmount}</span>
                </h4>
                <Button className="auth__btn w-100">Place an order</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Button = styled.button`
  ${buttonStyles}
  outline: 1px solid var(--primary-color);
  color: var(--primary-color);
  background-color: #eee;
  color: var(--primary-color);
  font-weight: 650;
  transition: all 0.1s ease-in-out !important;

  &:hover {
    color: var(--primary-color);
    background: var(--hero-bg);
  }
`;

export default Checkout;
