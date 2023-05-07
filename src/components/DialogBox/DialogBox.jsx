import React, { useState, useEffect } from "react";
import styles from "./DialogBox.module.scss";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

const DialogBox = ({ handleClose }) => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDialog(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (!showDialog) {
      handleClose();
    }
  };

  return (
    <CSSTransition
      in={showDialog}
      timeout={300}
      classNames={{
        enter: styles.dialog_box_enter,
        enterActive: styles.dialog_box_enter_active,
        exit: styles.dialog_box_exit,
        exitActive: styles.dialog_box_exit_active,
      }}
      unmountOnExit
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={styles.dialog_box}>
        <button className={styles.close_button} onClick={handleClose}>
          <i className="ri-close-circle-fill"></i>
        </button>
        <h2>Welcome to Skrok-store!</h2>
        <p>We have a wide selection of products for you to choose from.</p>
        <button className={styles.shop_button}>
          <Link to="/shop">Start Shopping</Link>
        </button>
      </div>
    </CSSTransition>
  );
};

export default DialogBox;
