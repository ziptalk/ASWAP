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
import Header from "./Common/header";
import Body from "./Common/body";

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

  const handleMenuOption = (option: number) => {
    setMenuOption(option);
  };

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
          <WalletProvider
            wallets={wallets}
            decryptPermission={DecryptPermission.UponRequest}
            network={WalletAdapterNetwork.Testnet}
            autoConnect
          >
            <WalletModalProvider>
              <Header handleMenuOption={handleMenuOption} />
              {/* <CreateTransaction /> */}
              <Body menuOption={menuOption} option={option} handleSwitchOption={handleSwitchOption} />
            </WalletModalProvider>
          </WalletProvider>
        </Container>
      </header>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  font-family: "Montserrat";
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
