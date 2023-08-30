import styled from "@emotion/styled";
import { useState } from "react";
import IcEth from "../assets/icons/common/Ic_eth.svg";

interface StyledInputProps {
  text: string;
}

const StyledInput = (props: StyledInputProps) => {
  const { text } = props;
  const [input, setInput] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <StyledInputBox>
      <StyleInput type="number" value={input} placeholder="0.00" onChange={onChange} />
      <TokenBox>
        <img src={IcEth} alt="eth" />
        <TokenText>{text}</TokenText>
      </TokenBox>
    </StyledInputBox>
  );
};

export default StyledInput;

const StyledInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 16px;
  margin-left: -24px;
  padding: 10px 20px 10px 20px;

  border-radius: 20px;
  border: 1px solid #d1d1d1;
`;
const StyleInput = styled.input`
  width: 80%;

  border: none;
  color: #15151a;

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
