import React from "react";
import { motion } from "framer-motion";
import "../../styles/products.scss";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );
    toast.success("Product added successfully");
  };

  return (
    <Col lg="3" mb="4" sm="6" className="mb-2">
      <div className="product__item">
        <Link to={`/shop/${item.id}`}>
          <div className="product_img">
            <motion.img
              whileHover={{ scale: 0.9 }}
              src={item.imgUrl}
              alt={item.productName}
              style={{ height: "250px", width: "250px" }}
            />
          </div>
          <div className="p-2 product__info">
            <h3 className="product__name">{item.productName}</h3>
            <span>{item.category}</span>
          </div>
        </Link>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.span whileTap={{ scale: 1.25 }} onClick={addToCart}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
