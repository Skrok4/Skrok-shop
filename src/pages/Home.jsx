import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";

import styled, { css } from "styled-components";
import products from "../assets/data/products";
import heroImg from "../assets/images/hero-img.png";
import counterImg from "../assets/images/counter-timer-img.png";

import Helmet from "../components/Helmet/Helmet";
import Clock from "../components/UI/Clock";
import Services from "../services/Services";
import ProductList from "../components/UI/ProductsList";
import DialogBox from "../components/DialogBox/DialogBox";

import useGetData from "../custom-hooks/useGetData";
import Loader from "../components/Loader/Loader";
import useLocalStorage from "../custom-hooks/useLocalStorage";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [tableProducts, setTableProducts] = useState([]);
  const [bedProducts, setBedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useLocalStorage(
    "isDialogBoxOpen",
    true
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const monthNames = [
    "☃️January❄️",
    "💝February💕",
    "🍀March🌸",
    "🌷April☂️",
    "🐝May🌈",
    "🌞June🌴",
    "🍦July🎆",
    "🍎August🌊",
    "✏️September🍂",
    "☕October🎃",
    "🍁November🦃",
    "🎅December🎄",
  ];
  const month = monthNames[new Date().getMonth()];

  const { data: products, loading } = useGetData("products");

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );
    const filteredBestProducts = products.filter(
      (item) => item.category === "sofa"
    );
    const filteredTableProducts = products.filter(
      (item) => item.category === "table"
    );
    const filteredBedProducts = products.filter(
      (item) => item.category === "bed"
    );
    const filteredDeskProducts = products.filter(
      (item) => item.category === "desk"
    );
    setTrendingProducts(filteredTrendingProducts);
    setPopularProducts(filteredDeskProducts);
    setBestSalesProducts(filteredBestProducts);
    setTableProducts(filteredTableProducts);
    setBedProducts(filteredBedProducts);
  }, [products]);

  useEffect(() => {
    if (!localStorage.getItem("isDialogBoxOpen")) {
      setIsDialogBoxOpen(true);
    }
  }, [setIsDialogBoxOpen]);

  const handleCloseDialog = () => {
    setIsDialogBoxOpen(false);
  };

  return (
    <Helmet title={"Home"}>
      {isDialogBoxOpen && <DialogBox handleClose={handleCloseDialog} />}
      <HeroSection>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <HeroContent>
                <p>Trending Product in {month}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Welcome to our online furniture store where we offer a wide
                  range of furniture pieces designed to help you achieve a
                  minimalistic and modern interior look. Our collection features
                  sleek and stylish furniture pieces that are designed to create
                  a clutter-free and contemporary atmosphere.
                </p>
                <Button whileTap={{ scale: 1.2 }}>
                  <Link to="/shop">SHOP NOW</Link>
                </Button>
              </HeroContent>
            </Col>
            <Col lg="6" md="6">
              <img
                src={heroImg}
                alt="HeroImage"
                style={{ pointerEvents: "none" }}
              />
            </Col>
          </Row>
        </Container>
      </HeroSection>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-3">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {loading ? <Loader /> : <ProductList data={trendingProducts} />}
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-3">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            {loading ? <Loader /> : <ProductList data={bestSalesProducts} />}
          </Row>
        </Container>
      </section>

      <TimerCount>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" className="timer">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />

              <StoreButton whileTap={{ scale: 1.2 }}>
                <Link to="/shop">Visit Store</Link>
              </StoreButton>
            </Col>
            <Col lg="6" md="6" sm="6" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </TimerCount>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-3">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            {loading ? <Loader /> : <ProductList data={tableProducts} />}
          </Row>
        </Container>

        <section className="popular__category">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-3">
                <h2 className="section__title">Popular in Category</h2>
              </Col>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <ProductList data={bedProducts} />
                  <ProductList data={popularProducts} />
                </>
              )}
            </Row>
          </Container>
        </section>
      </section>
    </Helmet>
  );
};

const HeroSection = styled.section`
  background: var(--hero-bg);

  h2 {
    color: var(--primary-color);
    font-size: 2.5rem;
    font-weight: 600;
    margin: 20px 0px;
  }
  p {
    color: var(--primary-color);
    line-height: 28px;
  }
  p:nth-child(1) {
    font-weight: 550;
  }

  @media only screen and (max-width: 992px) {
    h2 {
      font-size: 2rem;
    }
  }

  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 1.6rem;
    }
    p {
      font-size: 0.9rem;
    }

    @media only screen and (max-width: 576px) {
      padding-top: 0;
      margin-bottom: 40px;
    
  }
`;

export const buttonStyles = css`
  border: none;
  outline: none;
  padding: 8px 20px;
  border-radius: 5px;
  background: var(--primary-color);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 40px;
  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const Button = styled(motion.button)`
 ${buttonStyles}
  a:hover {
    color: color: var(--primary-color);
  }
  &:hover {
    outline: 1px solid var(--primary-color);
    color: var(--primary-color);
    background-color: #eee;
    color: var(--primary-color);
    font-weight: 650;
  }
`;

const StoreButton = styled(motion.button)`
  ${buttonStyles}
  background: #fff;
  color: var(--primary-color);
  font-weight: 600;
  & a:hover {
    color: #fff;
  }
  &:hover {
    background: var(--primary-color);
    color: #fff;
    outline: 2px solid #fff;
  }
`;

const HeroContent = styled.div`
  padding-top: 45px;
  @media only screen and (max-width: 992px) {
    & {
      font-size: 2rem;
      img {
        display: none;
      }
    }
  }
`;

const TimerCount = styled.section`
  background: var(--primary-color);
  height: 300px;

  & img {
    width: 70% !important;
    height: 70% !important;
    object-fit: contain;
  }

  @media only screen and (max-width: 685px) {
    & {
      height: 260px;
      .timer {
        width: 100%;
        text-align: center;
      }
      .text-end {
        display: none;
      }
      .clock__top-content {
        text-align: center;
        h4 {
          font-size: 0.9rem !important;
        }
        h3 {
          font-size: 1rem !important;
        }
      }
    }
  }
`;

export default Home;
