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
import Logo from "../src/assets/icons/logo/aleo-logo.svg";

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
        <Container>
          <WalletProvider
            wallets={wallets}
            decryptPermission={DecryptPermission.UponRequest}
            network={WalletAdapterNetwork.Testnet}
            autoConnect
          >
            {" "}
            <WalletModalProvider>
              <Header>
                <Title>
                  <LogoImg src={Logo} />
                  <TitleText>ASAP</TitleText>
                </Title>
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
                    Token Faucet
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

              {/* <CreateTransaction /> */}
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
        </Container>
      </header>
    </div>
  );
}

export default App;

const LogoImg = styled.img`
  margin-right: 10px;
`;

const Container = styled.div`
  width: 100%;
  font-family: "Montserrat";
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 90%;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleText = styled.div`
  font-size: 40px;
  color: #0092ff;
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
