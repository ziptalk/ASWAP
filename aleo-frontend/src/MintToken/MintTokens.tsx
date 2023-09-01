import {
  DecryptPermission,
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@demox-labs/aleo-wallet-adapter-base";
import { WalletProvider, useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import styled from "@emotion/styled";
import { FC, useMemo, useState } from "react";
import { TokenLists } from "../constants";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";

export const MintTokens: FC = () => {
  const { publicKey, requestTransaction, requestRecords } = useWallet();
  const [selectedToken, setSelectedToken] = useState(0);
  const [selectedTokenName, setSelectedTokenName] = useState("None");
  const [mintAmount, setMintAmount] = useState(0);
  const fee = 5_500_000;
  const handleTokenSelect = (name: string, id: number) => {
    setSelectedToken(id);
    setSelectedTokenName(name);
  };

  const handleAmountInput = (e: any) => {
    console.log(e.target.value);
    setMintAmount(e.target.value);
  };

  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  const mint = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const program = process.env.REACT_APP_PROGRAM_NAME;
    if (!program) throw new Error("Invalid program name");

    let coinType = selectedToken + "u64";
    let coinAmount = mintAmount + "u128";
    const inputs: any = [publicKey, coinType, coinAmount];

    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      program,
      "mint_private",
      inputs,
      fee
    );
    if (requestTransaction) {
      // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
      await requestTransaction(aleoTransaction);
    }
  };

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Testnet}
      autoConnect
    >
      <WalletModalProvider>
        <Container>
          <TokenSelectBox>
            <TokenSelectTitle>Selected Token: {selectedTokenName}</TokenSelectTitle>
            <TokenList>
              {TokenLists.map((token: any) => (
                <TokensName
                  onClick={() => {
                    handleTokenSelect(token.name, token.id);
                  }}
                >
                  {token.name}
                </TokensName>
              ))}
            </TokenList>
          </TokenSelectBox>
          <AmountInputBox>
            <AmountInputTitle>Amount</AmountInputTitle>
            <InputBox>
              <AmountInput
                type="text"
                placeholder="0.0"
                onChange={(e) => {
                  handleAmountInput(e);
                }}
              />
            </InputBox>
          </AmountInputBox>
          <FeeBox>
            <FeeTitle>Fee</FeeTitle>
            <FeeAmount>{fee / 10 ** 6} Aleo</FeeAmount>
          </FeeBox>
          <MintButton onClick={mint}>Mint Tokens</MintButton>
        </Container>
      </WalletModalProvider>
    </WalletProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  width: 100%;
  margin-top: 14px;
  padding: 35px;
  color: black;
  font-style: normal;

  border-radius: 20px;
  background-color: #fff;
`;

const TokenSelectBox = styled.div``;
const TokenSelectTitle = styled.div`
  font-size: 17px;
  margin-bottom: 10px;
`;
const TokenList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const TokensName = styled.button`
  font-size: 20px;
  font-style: normal;
`;

const AmountInputBox = styled.div`
  margin-top: 30px;
`;
const AmountInputTitle = styled.div`
  font-size: 17px;
`;
const InputBox = styled.div`
  display: flex;
  justify-content: center;
`;
const AmountInput = styled.input`
  text-align: center;
  width: 50%;

  border: none;
  color: #15151a;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;

  outline: none;
`;
const FeeBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;
const FeeTitle = styled.div`
  font-size: 17px;
`;
const FeeAmount = styled.div`
  font-size: 13px;
  margin-right: 20px;
`;

const MintButton = styled.button`
  width: 50%;
  margin-left: 25%;
  margin-top: 14px;
  padding: 17px 0;

  border: none;
  border-radius: 8px;
  background: #b7b8cd;

  color: #fff;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;
