import { Transaction, WalletAdapterNetwork, WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback } from "react";

export const CreateTransaction: FC = () => {
  const { publicKey, requestTransaction, requestRecords } = useWallet();

  const onClick = async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    const program = "credits.aleo";

    // The record here is an output from the Requesting Records above
    // const record =
    //   '{"id":"0f27d86a-1026-4980-9816-bcdce7569aa4","program_id":"credits.aleo","microcredits":"200000","spent":false,"data":{}}';

    let records: any;
    let targetRecord: any;
    if (requestRecords) {
      records = await requestRecords(program);
      for (let i = 0; i < records.length; i++) {
        console.log(records[i]);
        if (records[i].spent === false) {
          targetRecord = records[i];
          break;
        }
      }
    }

    let receivingAddress = "aleo14wrpqsv6w99kdxcxd0kyh068q4vuul5ypzdmczcn8d2lj7wmn5qs536n0z";

    // Note that the inputs must be formatted in the same order as the Aleo program function expects, otherwise it will fail
    const amount: number = 1_000;
    const inputs = [targetRecord, receivingAddress, `${amount}u64`];
    const fee = 5_000; // This will fail if fee is not set high enough

    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      "credits.aleo",
      "transfer_private",
      inputs,
      fee
    );

    if (requestTransaction) {
      // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
      await requestTransaction(aleoTransaction);
    }
  };

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Create Transaction
    </button>
  );
};
