import styled from "@emotion/styled";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";

interface BalanceBoxProps {
  type?: string;
  tokenId?: number;
}

const BalanceBox = (props: BalanceBoxProps) => {
  const { type, tokenId } = props;
  const { requestRecords, publicKey } = useWallet();
  const [requested, setRequested] = useState(false);
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    if (requestRecords) {
      const program: string | undefined = process.env.REACT_APP_PROGRAM_NAME;
      if (!program) throw new Error("Please set REACT_APP_PROGRAM_NAME in .env");
      let sumBalance = 0;
      try {
        const records = await requestRecords(program);
        for (let i = 0; i < records.length; i++) {
          console.log(
            records[i].data.token_id === (tokenId + "u64.private").toString(),
            records[i].data.token_id,
            tokenId + "u64.private"
          );
          console.log("tokenId", tokenId);
          if (records[i].data.token_id === (tokenId + "u64.private").toString()) {
            console.log("check");
            let amount = records[i].data.amount.replace("u128.private", "");
            sumBalance += parseFloat(amount);
          }
        }
      } catch (e) {
        console.log("Error: " + e);
      }

      if (sumBalance !== 0) setBalance(sumBalance);
    }
  };

  //getBalance();

  return (
    <BalanceBoxContainer>
      {type === "Swap" ? <BalanceText>$ --- </BalanceText> : <BalanceText>$ ---</BalanceText>}
      <BalanceText
        onClick={() => {
          getBalance();
        }}
      >
        Balance {balance}
      </BalanceText>
    </BalanceBoxContainer>
  );
};

export default BalanceBox;

const BalanceBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 10px;
`;

const BalanceText = styled.button`
  color: #4a5967;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;

  background-color: #fff;
  border: none;
`;
