import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333333;
`;

const Heading = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
  text-align: center;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #0066cc;

  &:hover {
    text-decoration: underline;
  }
`;

const Strong = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.agree ? "#4CAF50" : "#f44336")};
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 20px;

  &:hover {
    background-color: ${(props) => (props.agree ? "#3e8e41" : "#c62828")};
    cursor: pointer;
  }

  ${(props) =>
    props.agree &&
    css`
      font-weight: bold;
      margin-top: 30px;
    `}
`;

const PrivacyPolicy = () => {
  const [agree, setAgree] = useState(false);

  const handleAgree = () => {
    setAgree(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Container
      className="d-flex"
      style={{ padding: 30, flexDirection: "column" }}
    >
      <Heading>Privacy Policy</Heading>
      <Paragraph>
        At Skrok-store, we are committed to protecting your privacy. This
        Privacy Policy explains how we collect, use, and store your personal
        information. Please read this Privacy Policy carefully before using our
        services. By using our services, you agree to the terms of this Privacy
        Policy.
      </Paragraph>
      <Paragraph>
        <Strong>What information do we collect?</Strong> We collect information
        that you provide to us when you sign up for our services, such as your
        name, email address, and payment information. We also collect
        information about your use of our services, such as the pages you view
        and the actions you take.
      </Paragraph>
      <Paragraph>
        <Strong>How do we use your information?</Strong> We use your information
        to provide and improve our services, to communicate with you about our
        services, and to market our products and services to you. We may also
        use your information to comply with legal and regulatory requirements
        and to protect our rights and the rights of others.
      </Paragraph>
      <Paragraph>
        <Strong>How do we store your information?</Strong> We store your
        information on secure servers located in [insert location]. We take
        reasonable measures to protect your information from unauthorized access
        and disclosure.
      </Paragraph>
      <Paragraph>
        <Strong>Do we share your information with third parties?</Strong> We may
        share your information with third-party service providers who help us to
        provide and improve our services. We may also share your information
        with our affiliates and with law enforcement and regulatory authorities
        as required by law. We will not sell your information to third parties
        for their own marketing purposes.
      </Paragraph>
      <Paragraph>
        <Strong>What are your rights?</Strong> You have the right to access,
        correct, and delete your information. You also have the right to object
        to the processing of your information and to withdraw your consent at
        any time. To exercise these rights, please contact us at [insert contact
        information].
      </Paragraph>
      <Paragraph>
        <Strong>Changes to this Privacy Policy</Strong> We may update this
        Privacy Policy from time to time. We will notify you of any changes by
        posting the new Privacy Policy on our website. You are advised to review
        this Privacy Policy periodically for any changes.
      </Paragraph>
      {agree ? (
        <Paragraph>
          By continuing to use our services, you agree to the terms of this
          Privacy Policy.
        </Paragraph>
      ) : (
        <Paragraph>
          In order to use our services, you must agree to our Privacy Policy.
          Please <Link href="/privacy-policy">click here</Link> to read it.
        </Paragraph>
      )}
      <Button agree={agree} onClick={handleAgree}>
        {agree ? "Agreed!" : "I Agree"}
      </Button>
    </Container>
  );
};

export default PrivacyPolicy;
