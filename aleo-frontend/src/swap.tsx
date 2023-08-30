import Liquidity from "./Swap/Liquidity";
import SwapContainer from "./Swap/SwapContainer";
import { SwapNav } from "./Swap/SwapNav";
import styled from "@emotion/styled";
import React, { useState } from "react";

const Swap = () => {
  const [option, setOption] = useState("Swap");

  const handleSwitchOption = (option: string) => {
    if (option === "Swap") {
      setOption("Swap");
    } else {
      setOption("Liquidity");
    }
  };

  return (
    <>
      <InnerContainer>
        <SwapNav option={option} handleSwitchOption={handleSwitchOption} />
        {option === "Swap" ? <SwapContainer /> : <Liquidity />}
      </InnerContainer>
    </>
  );
};

export default Swap;

const InnerContainer = styled.div`
  padding-top: 110px;
`;
