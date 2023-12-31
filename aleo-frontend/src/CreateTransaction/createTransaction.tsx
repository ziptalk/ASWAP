import { Transaction, WalletAdapterNetwork, WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback } from "react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import styled from "@emotion/styled";

import BigNumber from "bignumber.js";

export const toDecimals = (amount: number, decimals: number) =>
  BigNumber(amount)
    .multipliedBy(10 ** decimals)
    .toNumber();

export const CreateTransaction: FC = () => {
  const { publicKey, requestTransaction, requestRecords, wallet } = useWallet();
  const fee = 5_500_000; // This will fail if fee is not set high enough

  let myAddr = "aleo120ku5evll5gf7x5wjv4xnvlxvdetg6tum0rlw9883wd0jvrqpspscu4tsl";
  let makerAddress: any = [myAddr];
  let receivingAddress = "aleo120ku5evll5gf7x5wjv4xnvlxvdetg6tum0rlw9883wd0jvrqpspscu4tsl";
  // TODO: 트랜잭션 서명 요청 후 reject 시에 에러 핸들링
  // TODO: 함수 이름 7가지 config로 따로 빼기
  const onClick = async (option: number) => {
    if (!publicKey) throw new WalletNotConnectedError();
    const program: string | undefined = process.env.REACT_APP_PROGRAM_NAME;
    if (!program) {
      throw new Error("Invalid program name");
    }
    if (option === 0) {
      const program = "credits.aleo";

      // The record here is an output from the Requesting Records above
      // const record =
      //   '{"id":"0f27d86a-1026-4980-9816-bcdce7569aa4","program_id":"credits.aleo","microcredits":"200000","spent":false,"data":{}}';
      let records: any;
      let targetRecord: any;
      const amount: number = 10_000;

      if (requestRecords) {
        records = await requestRecords(program);
        for (let i = 0; i < records.length; i++) {
          console.log(records[i]);
          console.log(records[i].data.microcredits);
          if (records[i].spent === false) {
            targetRecord = records[i];
            break;
          }
        }
      }

      // Note that the inputs must be formatted in the same order as the Aleo program function expects, otherwise it will fail
      const inputs = [targetRecord, receivingAddress, `${amount}u64`];

      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        program,
        "transfer_private",
        inputs,
        fee
      );

      if (requestTransaction) {
        // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
        await requestTransaction(aleoTransaction);
      }
    }
    // init demo tokens
    else if (option === 1) {
      const inputs: any = ["12345field"];

      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        program,
        "init_demo_tokens",
        inputs,
        fee
      );
      if (requestTransaction) {
        // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
        await requestTransaction(aleoTransaction);
      }
    }
    // create tokens
    else if (option === 2) {
      const inputs: any = ["100u64", "6u8", "1000000u128"];
      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        program,
        "create_token",
        inputs,
        fee
      );
      if (requestTransaction) {
        // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
        const response = await requestTransaction(aleoTransaction);
        console.log(response);
      }
    }
    // init_demo_market_maker
    else if (option === 3) {
      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        program,
        "init_demo_market_maker",
        makerAddress,
        fee
      );
      if (requestTransaction) {
        // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
        await requestTransaction(aleoTransaction);
      }
    }
    // remove liquidity
    else if (option === 4) {
      let liquidityAmount = "1000u128";
      let coinType = "1u64";
      const inputs: any = [coinType, liquidityAmount];
      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        program,
        "remove_liquidity",
        inputs,
        fee
      );
      if (requestTransaction) {
        // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
        await requestTransaction(aleoTransaction);
      }
    }

  };

  return (
    <Container>
      <button
        onClick={() => {
          onClick(0);
        }}
        disabled={!publicKey}
      >
        Transfer Credits Private
      </button>
      <button
        onClick={() => {
          onClick(1);
        }}
        disabled={!publicKey}
      >
        Init Demo Tokens
      </button>
      <button
        onClick={() => {
          onClick(2);
        }}
      >
        Create Token
      </button>
      <button
        onClick={() => {
          onClick(3);
        }}
      >
        Init Market Makers
      </button>
      <button
        onClick={() => {
          onClick(4);
        }}
      >
        Remove liquidity
      </button>

    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
`;
