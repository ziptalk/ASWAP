import React, { useState } from "react";
import "./App.css";
import { Wallet } from "./wallet/wallet";
import { SwapNav } from "./Swap/SwapNav";
import SwapContainer from "./Swap/SwapContainer";
import Liquidity from "./Swap/Liquidity";
import styled from "@emotion/styled";
import { DeployProgram } from "./deployProgram/deployProgram";
import { Deploy } from "./deployProgram/deploy";

function App() {
  const [option, setOption] = useState("Swap");

  const handleSwitchOption = (option: string) => {
    if (option === "Swap") {
      setOption("Swap");
    } else {
      setOption("Liquidity");
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Wallet />
          <SwapNav option={option} handleSwitchOption={handleSwitchOption} />
          {option === "Swap" ? <SwapContainer /> : <Liquidity />}
          {/* <Deploy /> */}
        </Container>
      </header>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 400px;
  padding-top: 50px;
  margin-bottom: 100px;
`;
