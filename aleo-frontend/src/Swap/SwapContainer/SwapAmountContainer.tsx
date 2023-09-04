import styled from "@emotion/styled";
import SwapWhiteBox from "../SwapWhiteBox";
import StyledInput from "../StyledInput";
import BalanceBox from "../BalanceBox";
import IcSwitch from "../../assets/icons/common/Ic_switch.svg";
import { useState } from "react";
import ConfirmButton from "../ConfirmButton";

interface SwapAmountContainerProps {
  type?: string;
}

const SwapAmountContainer = (props: SwapAmountContainerProps) => {
  const [isSwitchSwap, setIsSwitchSwap] = useState(["BTC", "ETH"]);
  const [tokenIds, setTokenIds] = useState([1, 2]); // [from, to]
  const [selectedTokenFrom, setSelectedTokenFrom] = useState(0);
  const [selectedTokenTo, setSelectedTokenTo] = useState(0);
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);
  const { type } = props;

  const handleSwitchSwap = () => {
    const newSwitch = [...isSwitchSwap].reverse();
    setIsSwitchSwap(newSwitch);
  };

  const handleSelectTokenFrom = (tokenId: number) => {
    setSelectedTokenFrom(tokenId);
  };

  const handleSelectTokenTo = (tokenId: number) => {
    setSelectedTokenTo(tokenId);
  };

  const handleAmountFrom = (amount: number) => {
    setAmountFrom(amount);
  };

  const handleAmountTo = (amount: number) => {
    setAmountTo(amount);
  };

  return (
    <>
      <SwapWhiteBox>
        {type === "liquidity" && <LiquidityTitle>Amount</LiquidityTitle>}
        {type === "Swap" && <SwapAmountTitle>From.</SwapAmountTitle>}
        <StyledInput
          text={isSwitchSwap[0]}
          handleSelectTokenFrom={handleSelectTokenFrom}
          handleAmountFrom={handleAmountFrom}
        />
        <BalanceBox type={type} tokenId={tokenIds[0]} />
        {type === "liquidity" && <Space />}
        {type === "Swap" && (
          <SwitchWrapper>
            <SwitchBox onClick={handleSwitchSwap}>
              <img src={IcSwitch} alt="switch" style={{ position: "absolute", top: "10px", left: "8.8px" }} />
            </SwitchBox>
          </SwitchWrapper>
        )}
        {type === "Swap" && <SwapAmountTitle>To.</SwapAmountTitle>}
        {type === "Swap" && (
          <>
            <StyledInput
              text={isSwitchSwap[1]}
              handleSelectTokenTo={handleSelectTokenTo}
              handleAmountTo={handleAmountTo}
            />
            <BalanceBox type={type} tokenId={tokenIds[1]} />
          </>
        )}
      </SwapWhiteBox>
      <ConfirmButton
        text={type ? type : ""}
        amount1={amountFrom}
        amount2={amountTo}
        token1={selectedTokenFrom}
        token2={selectedTokenTo}
      />
    </>
  );
};

export default SwapAmountContainer;

const SwapAmountTitle = styled.div`
  width: 100%;
  margin-bottom: 10px;

  color: #33343e;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
`;

const SwitchWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 16px;

  text-align: center;
`;

const SwitchBox = styled.button`
  position: relative;
  width: 37px;
  height: 37px;

  border: none;
  border-radius: 50%;
  background-color: #6047f4;

  cursor: pointer;
`;

const LiquidityTitle = styled.div`
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
const Space = styled.div`
  width: 100%;
  height: 16px;
`;
