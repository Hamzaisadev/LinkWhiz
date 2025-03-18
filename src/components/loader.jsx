import React from "react";
import styled from "styled-components";

const Loader = ({ loadMsg }) => {
  return (
    <StyledWrapper>
      <div className="textWrapper">
        <p className="text">{loadMsg}</p>
        <div className="invertbox" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .textWrapper {
    height: fit-content;
    min-width: 3rem;
    width: fit-content;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.25ch;
    position: relative;
    z-index: 0;
    color: white;
  }

  .invertbox {
    position: absolute;
    height: 100%;
    aspect-ratio: 1/1;
    left: 0;
    top: 0;
    border-radius: 20%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: invert(100%);
    animation: move 2s ease-in-out infinite;
  }

  @keyframes move {
    50% {
      left: calc(100% - 3rem);
    }
  }
`;

export default Loader;
