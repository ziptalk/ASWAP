import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback, useState } from "react";

export const RequestRecordPlaintexts: FC = () => {
  const { publicKey, requestRecords } = useWallet();
  const [inputValue, setInputValue] = useState<string>("");

  const inputHandler = (e: any) => {
    console.log(e.target.value);
  };
  const onClick = async () => {
    try {
      const program = "aleoswap05.aleo";
      if (!publicKey) throw new WalletNotConnectedError();
      if (requestRecords) {
        const records = await requestRecords(program);
        for (let i = 0; i < records.length; i++) {
          console.log(records[i]);
        }
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  return (
    <>
      <div>
        <span>Program Name: </span>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={onClick} disabled={!publicKey}>
          Request Records
        </button>
      </div>
    </>
  );
};
