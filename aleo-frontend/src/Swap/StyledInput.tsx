import styled from "@emotion/styled";
import IcEth from "../assets/icons/common/Ic_eth.svg";
import { TokenLists } from "../constants";
import Select from "react-select";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";


interface StyledInputProps {
  text: string;
  handleSelectTokenFrom?: (tokenId: number) => void;
  handleSelectTokenTo?: (tokenId: number) => void;
  handleAmountFrom?: (amount: number) => void;
  handleAmountTo?: (amount: number) => void;
}

const StyledInput = (props: StyledInputProps) => {
  const { text } = props;
  // const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(TokenLists[0].name);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInput(e.target.value);
    props.handleAmountFrom && props.handleAmountFrom(Number(e.target.value));
    props.handleAmountTo && props.handleAmountTo(Number(e.target.value));
  };

  // Convert tokens to the format react-select expects
  const selectOptions = TokenLists.map((token) => ({
    label: token.name,
    value: token.id,
  }));

  const { requestRecords, publicKey } = useWallet();
  const [requested, setRequested] = useState(false);
  const [balance, setBalance] = useState(0);
  const [tokenName, setTokenName] = useState("");

  const getBalance = async (tokenId: number) => {
    setBalance(-1)
    if (!publicKey) throw new WalletNotConnectedError();

    if (requestRecords) {
      const program: string | undefined = process.env.REACT_APP_PROGRAM_NAME;
      if (!program) throw new Error("Please set REACT_APP_PROGRAM_NAME in .env");
      let sumBalance = 0;
      try {
        const records = await requestRecords(program);
        for (let i = 0; i < records.length; i++) {
          // console.log(
          //   records[i].data.token_id === (tokenId + "u64.private").toString(),
          //   records[i].data.token_id,
          //   tokenId + "u64.private"
          // );
          if (records[i].data.token_id === (tokenId + "u64.private").toString()) {
            let amount = records[i].data.amount.replace("u128.private", "");
            sumBalance += parseFloat(amount);
          }
        }
      } catch (e) {
        console.log("Error: " + e);
      }
      setBalance(sumBalance);
    }
  };

  const handleSelectChange = (option: any) => {
    // setSelectedOption(option ? { name: option.label, value: option.value } : null);
    props.handleSelectTokenFrom && props.handleSelectTokenFrom(option.value);
    props.handleSelectTokenTo && props.handleSelectTokenTo(option.value);
    setTokenName(option.label)
    getBalance(option.value);
  };

  return (
    <>
    <StyledInputBox>
      <StyleInput type="number" placeholder="0.00" onChange={onChange} />
      <TokenBox>
        <img src={IcEth} alt="eth" />
        {/* <TokenText>{text}</TokenText> */}
        <Select options={selectOptions} onChange={handleSelectChange} styles={SelectStyle} placeholder={"Select"} />
      </TokenBox>
    </StyledInputBox>
    <TokenText>
    {balance !== -1 && (
      <div>
        {tokenName} Balance: {balance} {/* Display the balance here */}
      </div>
    )}
    </TokenText>
    </>
  );
};

export default StyledInput;

const SelectStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    fontSize: "16px",
    paddingRight: "0px",
    borderColor: state.isFocused ? "black" : "gray",
    border: "none",
    backgroundColor: "#f8f8fb",

    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: "gray",
    },
    fontWeight: "500",
    textAlign: "center",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "black" : "gray",
    fontSize: "16px",
    fontWeight: "500",
  }),
  input: (provided: any) => ({
    ...provided,
    fontSize: "16px",
    width: "50px",
    marginRight: "30px",
    fontWeight: "700",
    textAlign: "left",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    textAlign: "left",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    textAlign: "left",
    marginLeft: "10px",
  }),
};

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

const TokenBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 7px 20px 7px 7px;

  border-radius: 20px;
  background-color: #f8f8fb;
`;

const Tokenimg = styled.div`
  width: 26px;
  height: 26px;

  border-radius: 50%;
  background-color: white;
`;

const TokenText = styled.span`
  color: #09090a;
  /* Body text/Large 1 */
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;


