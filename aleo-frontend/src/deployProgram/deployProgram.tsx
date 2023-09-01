import { Deployment, WalletAdapterNetwork, WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import styled from "@emotion/styled";
import React, { FC, useCallback } from "react";

export const DeployProgram: FC = () => {
  const { publicKey, requestDeploy, requestTransaction } = useWallet();

  const onClick = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const program = `
      program hello13425.aleo;
      function main:
        input r0 as u32.public;
        input r1 as u32.private;
        add r0 r1 into r2;
        output r2 as u32.private;
    `;
    const fee = 1_000_000; // This will fail if fee is not set high enough (4 Aleo)

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
    <Container>
      <DeployTitle>Deploy Program</DeployTitle>
      <DeployCodeBox />
      <DeployProgramButton onClick={onClick} disabled={!publicKey}>
        Deploy Program
      </DeployProgramButton>
    </Container>
  );
};

const Container = styled.div``;

const DeployTitle = styled.div``;
const DeployCodeBox = styled.input``;
const DeployProgramButton = styled.button`
  background-color: white;
`;
