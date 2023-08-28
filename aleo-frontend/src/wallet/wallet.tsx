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
import { DeployProgram } from "./deployProgram";
import { RequestRecordPlaintexts } from "./requestRecordPlainText";
import { RequestRecords } from "./requestTransactionHistory";
import { CreateTransaction } from "./createTransaction";

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
        <WalletMultiButton />
        {/* <WalletConnectButton /> */}
        <WalletDisconnectButton />
        {/* <WalletModal /> */}
        {/* <WalletModalButton /> */}
        <SignMessage />
        <DeployProgram />
        <RequestRecordPlaintexts />
        <RequestRecords />
        <CreateTransaction />
      </WalletModalProvider>
    </WalletProvider>
  );
};
