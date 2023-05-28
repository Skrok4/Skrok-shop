import React from "react";
import "../styles/cart.scss";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { deleteItem, decrementItem, updateItem } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { buttonStyles } from "./Home.jsx";
import styled from "styled-components";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index}></Tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal:
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
                <p className="fs-6 mt-2">
                  taxes an shipping will calculate in checkout
                </p>
                <div>
                  <Link to="/checkout">
                    <Button className="w-100">Checkout</Button>
                  </Link>
                  <Link to="/shop">
                    <Button className="w-100  mt-3">Continue Shopping</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const incrementQuantity = () => {
    dispatch(
      updateItem({
        ...item,
        quantity: item.quantity + 1,
      })
    );
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      dispatch(decrementItem(item.id));
    } else {
      deleteProduct();
    }
  };

  const deleteProduct = () => {
    dispatch(deleteItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt=""></img>
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>
        {item.quantity} pcs.
        <button onClick={incrementQuantity} className="increase__qty">
          <i className="ri-add-line"></i>
        </button>
        {item.quantity > 1 && (
          <button onClick={decrementQuantity} className="reduce__qty">
            <i className="ri-subtract-line"></i>
          </button>
        )}
      </td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};
// const Tr = ({ item }) => {
//   const dispatch = useDispatch();

//   const decrementQuantity = () => {
//     if (item.quantity > 1) {
//       dispatch(
//         cartActions.updateItem({
//           ...item,
//           quantity: item.quantity - 1,
//         })
//       );
//     } else {
//       deleteProduct();
//     }
//   };

//   const deleteProduct = () => {
//     dispatch(cartActions.deleteItem(item.id));
//   };

//   return (
//     <tr>
//       <td>
//         <img src={item.imgUrl} alt=""></img>
//       </td>
//       <td>{item.productName}</td>
//       <td>${item.price}</td>
//       <td>
//         {item.quantity} pcs.
//         {item.quantity > 1 && (
//           <button onClick={decrementQuantity} className="reduce__qty">
//             <i className="ri-close-line"></i>
//           </button>
//         )}
//       </td>
//       <td>
//         <motion.i
//           whileTap={{ scale: 1.2 }}
//           onClick={deleteProduct}
//           className="ri-delete-bin-line"
//         ></motion.i>
//       </td>
//     </tr>
//   );
// };

const Button = styled(motion.button)`
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
export default Cart;
