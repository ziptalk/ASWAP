import React, { FC, useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import {
  WalletConnectButton,
  WalletDisconnectButton,
  WalletIcon,
  WalletModal,
  WalletModalButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { DecryptPermission, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import { SignMessage } from "./signing";
import { RequestTransactionHistory } from "./requestTransactionHistory";
import { CreateTransaction } from "./createTransaction";
import styled from "@emotion/styled";
import { RequestRecord } from "./requestRecord";

// Default styles that can be overridden by your app
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");

export const Wallet: FC = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Testnet}
      autoConnect
    >
      <WalletModalProvider>
        <WalletConnect>
          <WalletMultiButton />
          {/* <WalletConnectButton /> */}
          <WalletDisconnectButton />
        </WalletConnect>
        {/* <WalletModal /> */}
        {/* <WalletModalButton /> */}
        {/* <SignMessage /> */}
        <RequestRecord />
        {/* <RequestTransactionHistory /> */}
        <CreateTransaction />
      </WalletModalProvider>
    </WalletProvider>
  );
};

const WalletConnect = styled.div`
  display: flex;
  justify-content: space-between;
`;
