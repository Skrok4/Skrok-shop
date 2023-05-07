import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "reactstrap";
import styles from "./Services.module.scss";

import serviceData from "../assets/data/serviceData";

const Services = () => {
  return (
    <section className={styles.services}>
      <Container>
        <Row>
          {serviceData.map((item, index) => (
            <Col lg="3" md="4" key={index}>
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={styles.services_item}
                style={{ background: `${item.bg}` }}
              >
                <span>
                  <i className={item.icon}></i>
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
