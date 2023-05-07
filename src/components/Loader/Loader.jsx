import React from "react";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <LoaderContainer>
      <TailSpin color="#0a1d37" height={200} width={200} />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loader;
