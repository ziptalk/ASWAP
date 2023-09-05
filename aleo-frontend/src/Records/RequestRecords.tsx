import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import styled from "@emotion/styled";
import React, { FC, useCallback, useState } from "react";

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
        <ProgramInputContainer>
          <ProgramName>Program Name</ProgramName>
          <input
            type="text"
            placeholder="example.aleo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </ProgramInputContainer>

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

const ProgramInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;
`;

const ProgramName = styled.div`
  font-size: 18px;
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
`;

const RequestButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 200px;
  padding: 9px 0;

  border-radius: 20px;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.09px;

  text-align: center;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
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
