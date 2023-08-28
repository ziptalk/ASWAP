import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback } from "react";

export const RequestRecordPlaintexts: FC = () => {
  const { publicKey, requestRecordPlaintexts } = useWallet();

  const onClick = async () => {
    const program = "credits.aleo";
    if (!publicKey) throw new WalletNotConnectedError();
    if (requestRecordPlaintexts) {
      const records = await requestRecordPlaintexts(program);
      console.log("Records: " + records);
    }
  };

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Request Records Plaintexts
    </button>
  );
};
