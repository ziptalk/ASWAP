import { Deployment, WalletAdapterNetwork, WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback } from "react";

export const DeployProgram: FC = () => {
  const { publicKey, requestDeploy, requestTransaction } = useWallet();

  const onClick = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const program = `
      program hello.aleo;
      function main:
        input r0 as u32.public;
        input r1 as u32.private;
        add r0 r1 into r2;
        output r2 as u32.private;
    `;
    const fee = 4_835_000; // This will fail if fee is not set high enough

    if (requestTransaction) {
      const aleoDeployment = new Deployment(publicKey, WalletAdapterNetwork.Testnet, program, fee);
      console.log(aleoDeployment);
      // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
      if (aleoDeployment && requestDeploy) {
        await requestDeploy(aleoDeployment);
      }
    }
  };

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Deploy Program
    </button>
  );
};
