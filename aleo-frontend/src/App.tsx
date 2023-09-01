import React, { useMemo, useState } from "react";
import "./App.css";
import { Wallet } from "./wallet/wallet";
import { SwapNav } from "./Swap/SwapNav";
import SwapContainer from "./Swap/SwapContainer";
import Liquidity from "./Swap/Liquidity";
import styled from "@emotion/styled";
import { RequestRecord } from "./Records/RequestRecords";
import { CreateTransaction } from "./CreateTransaction/createTransaction";
import { MintTokens } from "./MintToken/MintTokens";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { DecryptPermission, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";

function App() {
  const [option, setOption] = useState("Swap");
  const [menuOption, setMenuOption] = useState(0);

  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  const handleSwitchOption = (option: string) => {
    if (option === "Swap") {
      setOption("Swap");
    } else {
      setOption("Liquidity");
    }
  };

  const handleMenuOption = (option: number) => {
    setMenuOption(option);
  };

  return (
    <div className="App">
      <header className="App-header">
        <WalletProvider
          wallets={wallets}
          decryptPermission={DecryptPermission.UponRequest}
          network={WalletAdapterNetwork.Testnet}
          autoConnect
        >
          {" "}
          <WalletModalProvider>
            <Header>
              <Title>Simple Aleo Swap</Title>
              <NavBar>
                <SwapButton
                  onClick={() => {
                    handleMenuOption(0);
                  }}
                >
                  Swap
                </SwapButton>
                <MintButton
                  onClick={() => {
                    handleMenuOption(1);
                  }}
                >
                  Mint Tokens
                </MintButton>
                <RequestRecordButton
                  onClick={() => {
                    handleMenuOption(2);
                  }}
                >
                  Request Records
                </RequestRecordButton>
              </NavBar>
              <Wallet />
            </Header>

            <CreateTransaction />
            <Body>
              {menuOption === 0 ? (
                <SwapAndLiquidityContainer>
                  <SwapNav option={option} handleSwitchOption={handleSwitchOption} />
                  {option === "Swap" ? <SwapContainer /> : <Liquidity />}
                </SwapAndLiquidityContainer>
              ) : (
                <></>
              )}
              {menuOption === 1 ? (
                <MintTokenContainer>
                  <MintTokens />
                </MintTokenContainer>
              ) : (
                <></>
              )}
              {menuOption === 2 ? (
                <RequestRecordContainer>
                  <RequestRecord />
                </RequestRecordContainer>
              ) : (
                <></>
              )}
            </Body>
          </WalletModalProvider>
        </WalletProvider>
      </header>
    </div>
  );
}

export default App;

const Header = styled.div`
  width: 90%;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 30px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SwapButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 40px;

  border-radius: 10px;
  text-align: center;

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  text-align: center;
  cursor: pointer;
`;

const MintButton = styled(SwapButton)``;

const RequestRecordButton = styled(SwapButton)``;

const Body = styled.div`
  width: 400px;
  padding-top: 50px;
  margin-bottom: 100px;
`;

const SwapAndLiquidityContainer = styled.div``;

const MintTokenContainer = styled.div``;

const RequestRecordContainer = styled.div``;
