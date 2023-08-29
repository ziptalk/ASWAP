import {
  WalletNotConnectedError,
  Adapter,
  Transaction,
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback } from "react";

export const RequestRecords: FC = () => {
  const { publicKey, requestTransactionHistory, connect } = useWallet();

  const onClick = async () => {
    const program = "credits.aleo";
    if (!publicKey) throw new WalletNotConnectedError();
    console.log("pub key: " + publicKey);
    await connect(DecryptPermission.OnChainHistory, WalletAdapterNetwork.Testnet, [program]);
    if (requestTransactionHistory) {
      try {
        const transactions = await requestTransactionHistory(program);
        console.log("Transactions: " + transactions);
      } catch (e) {
        console.log("Error: " + e);
      }
    }
  };

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Request Records Transaction History
    </button>
  );
};
