import { WalletNotConnectedError, Adapter } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback } from "react";

export const RequestRecords: FC = () => {
  const { publicKey, requestTransactionHistory } = useWallet();

  const onClick = async () => {
    const program = "credits.aleo";
    if (!publicKey) throw new WalletNotConnectedError();
    console.log("pub key: " + publicKey);
    if (requestTransactionHistory) {
      console.log(requestTransactionHistory);
      const transactions = await requestTransactionHistory(program);
      console.log("Transactions: " + transactions);
    }
  };

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Request Records Transaction History
    </button>
  );
};
