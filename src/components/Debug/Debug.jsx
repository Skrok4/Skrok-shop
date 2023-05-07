import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Debug = () => {
  const [history, setHistory] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, location.pathname]);
  }, [location.pathname]);

  const [debug, setDebug] = useState(false);
  return (
    <>
      <DebugButton onClick={() => setDebug((prevDebug) => !prevDebug)}>
        Debug
      </DebugButton>

      {debug && (
        <DebugInfo>
          <h3>History</h3>
          {history.map((path, index) => (
            <p key={index}>{path}</p>
          ))}
        </DebugInfo>
      )}
    </>
  );
};

const DebugButton = styled.button`
  background-color: #ff6666;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:hover {
    background-color: #ff8080;
  }

  &:active {
    background-color: #ff4d4d;
  }
`;

const DebugInfo = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  width: 200px;
  height: 200px;
  overflow: scroll;
  z-index: 3;
  background-color: white;
`;

export default Debug;
