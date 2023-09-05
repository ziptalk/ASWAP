import {
  DecryptPermission,
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import styled from "@emotion/styled";
import { FC, useState } from "react";
import { TokenLists } from "../constants";
import SwapWhiteBox from "../Swap/SwapWhiteBox";

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

    try {
      if (requestTransaction) {
        // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
        await requestTransaction(aleoTransaction);
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  return (
    <>
    <Container>
    <SwapWhiteBox>
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
      <AmountInputBox>
        <AmountInputTitle>Amount</AmountInputTitle>
        <StyledInputBox>
          <StyleInput
            type="text"
            placeholder="0.0"
            onChange={(e) => {
              handleAmountInput(e);
            }}
          />
        </StyledInputBox>
      </AmountInputBox>
      </SwapWhiteBox>
      </Container>
      <FeeBox>
        <FeeTitle>Fee</FeeTitle>
        <FeeAmount>{fee / 10 ** 6} Aleo</FeeAmount>
      </FeeBox>
      
    <MintButton onClick={mint}>Mint Tokens</MintButton>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 

  flex-direction: column;
  width: 100%;
`;

const StyledInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 16px;

  border-radius: 20px;
  border: 1px solid #d1d1d1;
`;

const StyleInput = styled.input`
  border: none;
  color: #15151a;
  margin-left: 20px;
  width: 60%;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;

  outline: none;
`;
const TokenSelectTitle = styled.div`
  width: 100%;
  margin-bottom: 20px;

  color: #33343e;
  /* Body text/Large 2 */
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  text-align: center;
`;
const TokenList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const TokensName = styled.button`
  font-size: 20px;
  font-family: "Montserrat";
  background-color: #fff;

  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const AmountInputBox = styled.div`
  margin-top: 30px;
`;
const AmountInputTitle = styled.div`
  width: 100%;
  margin-bottom: 20px;

  color: #33343e;
  /* Body text/Large 2 */
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  text-align: center;
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
  font-style: normal;
  font-weight: 500;
`;
const FeeAmount = styled.div`
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  margin-right: 20px;
`;

const MintButton = styled.button`
  width: 100%;
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