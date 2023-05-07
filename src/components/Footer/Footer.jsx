import React from "react";
import styles from "./Footer.module.scss";
import headerStyles from "../Header/Header.module.scss";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import Debug from "./../Debug/Debug";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col lg="4" className="mb-2" md="6">
            <div className={headerStyles.logo}>
              <div>
                <h1>Skrok-store</h1>
                <p>Since 1995</p>
              </div>
            </div>
            <p className={`${styles.footer__text} mt-4`}>
              Our team of experts is always on hand to provide you with
              personalized advice and guidance to help you create your dream
              interior. It has never been easier to create a modern and
              minimalist interior that you'll love.
            </p>
          </Col>
          <Col lg="3" className="mb-2" md="3">
            <div className={styles.footer__quick_links}>
              <h4 className={styles.quick__links_title}>Top Categories</h4>
              <ListGroup className={styles.list}>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Tables</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Bed</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="2" className="mb-2" md="3">
            <div className={styles.footer__quick_links}>
              <h4 className={styles.quick__links_title}>Navigation</h4>
              <ListGroup className={styles.list}>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Authorization</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/privacy">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" className="mb-2" md="4">
            <div className={styles.footer__quick_links}>
              <h4 className={styles.quick__links_title}>Contact</h4>
              <ListGroup className={styles.list}>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span className="pr-2">
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p>123 ZindaBazar, Sylhet, Bangladesh</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <a href="tel:+1234567890">+1234567890</a>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <a href="mailto:example@example.com">example@gmail.com</a>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <div className="justify-content-center d-flex">
            <div className={styles.card__name}>
              <img
                alt="mastercard"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
              />
            </div>
            <div className={styles.card__name}>
              <img
                alt="maestro"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Maestro_logo.svg/1200px-Maestro_logo.svg.png"
              />
            </div>
            <div className={styles.card__name}>
              <img
                alt="paypal"
                src="https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg"
              />
            </div>
            <div className={styles.card__name}>
              <img
                alt="discover"
                src="https://1000logos.net/wp-content/uploads/2021/05/Discover-logo.png"
              />
            </div>
            <div className={styles.card__name}>
              <img
                alt="visa"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1920px-Visa.svg.png"
              />
            </div>
          </div>

          <Col lg="12">
            <p className={styles.footer__copyright}>
              Copyright {year} ©. All rights reserved
            </p>
          </Col>
          <Debug />
        </Row>
      </Container>
    </footer>
  );
};

// 1:27
export default Footer;
