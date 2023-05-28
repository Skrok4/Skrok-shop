import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import "../styles/product-details.scss";
import { motion } from "framer-motion";
import { buttonStyles } from "./Home.jsx";
import styled from "styled-components";

import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("decs");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState({
    avgRating: 4.6,
    reviews: [
      {
        name: "Hung Phan",
        rating: 4.6,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      },
    ],
  });
  const [currency, setCurrency] = useState("USD");
  const [currencyText, setCurrencyText] = useState("₴");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: products } = useGetData("products");
  // const product = products.find((item) => item.id === id);
  const docRef = doc(db, "products", id);

  const convertCurrency = () => {
    setLoading(true);
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates.UAH;
        setCurrency(rate);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const toggleCurrency = () => {
    if (currency === "USD") {
      setCurrency("UAH");
      setCurrencyText("$");
      convertCurrency();
    } else {
      setCurrency("USD");
      setCurrencyText("₴");
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      // setProduct(products);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
        // setReview(docSnap.data().review);
      } else {
        console.log("no product");
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const {
    imgUrl,
    productName,
    category,
    price,

    description,
    shortDesc,
  } = product;

  const { avgRating, reviews } = review;
  const relatedProducts = products.filter((item) => item.category === category);

  const submitHander = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    const reviewObj = {
      name: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    setReview({
      avgRating: (avgRating + rating) / (reviews.length + 1),
      reviews: [...reviews, reviewObj],
    });
    toast.success("Review submitted");
    console.log(
      `Name: ${reviewUserName}\n Rating:${rating}\n Feedback: "${reviewUserMsg}"`
    );
    alert(
      `${reviewUserName}, your feedback: '${reviewUserMsg}' with rating:${rating} added successfully! `
    );

    reviewUser.current.value = "";
    reviewMsg.current.value = "";
    setRating(0);
  };

  const addToCart = () => {
    dispatch(
      addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-6">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>

            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 md-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating.toFixed(1)}</span> ratings)
                  </p>
                </div>
                <div>
                  <span className="product__price d-flex align-items-center gap-5">
                    {loading
                      ? "Loading..."
                      : currency === "USD"
                      ? "$" + price
                      : "₴" + (price * currency).toFixed(1)}
                    <button
                      className="currency-button"
                      onClick={toggleCurrency}
                    >
                      {currencyText}
                    </button>
                  </span>
                  <span>Category : {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <BuyButton whileTap={{ scale: 1.2 }} onClick={addToCart}>
                  Add to Cart
                </BuyButton>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "decs" ? "active__tab" : ""}`}
                  onClick={() => setTab("decs")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>

              {tab === "decs" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>{item.name}</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHander}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                            className={rating >= 1 ? "selected" : ""}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                            className={rating >= 2 ? "selected" : ""}
                          >
                            2<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                            className={rating >= 3 ? "selected" : ""}
                          >
                            3<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                            className={rating >= 4 ? "selected" : ""}
                          >
                            4<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                            className={rating >= 5 ? "selected" : ""}
                          >
                            5<i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>

                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            placeholder="Leave rewiew"
                            required
                          />
                        </div>
                        <BuyButton
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="mt-1 text-center"
                        >
                          Submit
                        </BuyButton>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related__title ">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const BuyButton = styled(motion.button)`
 ${buttonStyles}
 transition: all 0.1s ease-in-out !important;
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
export default ProductDetails;


