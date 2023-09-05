import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import styled from "@emotion/styled";
import React, { FC, useCallback, useState } from "react";
import SwapWhiteBox from "../Swap/SwapWhiteBox";

export const RequestRecord: FC = () => {
  const { wallet, publicKey, requestRecords } = useWallet();
  const [inputValue, setInputValue] = useState<string>("");
  const [requestList, setRequestList] = useState<any>([]);

  const inputHandler = (e: any) => {
    console.log(e.target.value);
  };
  const onClick = async () => {
    try {
      console.log("program name:", inputValue);
      if (!inputValue) {
        alert("Please enter a program name");
        throw new Error("Please enter a program name");
      }
      if (!inputValue.includes(".aleo")) {
        alert("Please enter a valid program name");
        throw new Error("Please enter a valid program name");
      }
      const program = inputValue;
      if (!publicKey) throw new WalletNotConnectedError();
      if (requestRecords) {
        const records = await requestRecords(program);
        for (let i = 0; i < records.length; i++) {
          console.log(records[i]);
        }
        setRequestList(records);
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  };

  return (
    <>
      <Container>
        <SwapWhiteBox>
          <ProgramName>Program Name</ProgramName>
          <StyledInputBox>
            <StyleInput
              type="text"
              placeholder="example.aleo"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </StyledInputBox>
        </SwapWhiteBox>
        <RequestButton onClick={onClick} disabled={!publicKey}>
          Request Records
        </RequestButton>

        <RequestLists>
          {requestList.map((request: any) => (
            <RequestList>
              <RequestItem>
                {request.id} {JSON.stringify(request.data)} {`Spent: ${request.spent.toString()}`}
              </RequestItem>
            </RequestList>
          ))}
        </RequestLists>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const StyledInputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;

  margin-bottom: 16px;
  background: white;

  border-radius: 20px;
  border: 1px solid #d1d1d1;
`;

const StyleInput = styled.input`
  border: none;
  margin-left: 20px;
  width: 60%;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;

  outline: none;
`;

const ProgramName = styled.div`
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

const RequestButton = styled.button`
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

const RequestLists = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const RequestList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-content: center;
  width: 300px;
  padding: 10px 0;
  border-bottom: 1px solid #33343e;
`;

const RequestItem = styled.div`
  font-size: 18px;
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
`;
