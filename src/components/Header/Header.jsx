import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import styles from "./Header.module.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const nav__link = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = React.useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const profileActionRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error("err.message");
      });
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add(styles.sticky__header);
      } else {
        headerRef.current.classList.remove(styles.sticky__header);
      }
    });
  };

  React.useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle(styles.show__profileActions);

  const menuToggle = () =>
    menuRef.current.classList.toggle(styles.active__menu);

  return (
    <header className={styles.header} ref={headerRef}>
      <Container>
        <Row>
          <div className={styles.nav__wrapper}>
            <Link to="/home">
              <div className={styles.logo}>
                <img src={logo} alt="logo" />
                <div>
                  <h1>Skrok-store</h1>
                </div>
              </div>
            </Link>

            <div
              className={styles.navigation}
              ref={menuRef}
              onClick={menuToggle}
            >
              <ul className={styles.menu}>
                {nav__link.map((item, index) => (
                  <li className={styles.nav__item} key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? styles.nav__active : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.nav__icons}>
              <span className={styles.fav__icon}>
                <i className="ri-heart-line"></i>
                <span className={styles.badge}>2</span>
              </span>

              <span className={styles.cart__icon} onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                {totalQuantity !== 0 && (
                  <span className={styles.badge}>{totalQuantity}</span>
                )}
              </span>

              <div className={styles.profile}>
                <motion.img
                  src={currentUser ? currentUser.photoURL : userIcon}
                  whileTap={{ scale: 1.2 }}
                  alt=" "
                  onClick={toggleProfileActions}
                ></motion.img>

                <div
                  className={styles.profile__actions}
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.mobile__menu}>
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
