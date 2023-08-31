import styled from "@emotion/styled";
import SwapWhiteBox from "../SwapWhiteBox";
import StyledInput from "../StyledInput";
import BalanceBox from "../BalanceBox";
import IcSwitch from "../../assets/icons/common/Ic_switch.svg";
import { useState } from "react";

interface SwapAmountContainerProps {
  type?: string;
}

const SwapAmountContainer = (props: SwapAmountContainerProps) => {
  const [isSwitchSwap, setIsSwitchSwap] = useState(["BTC", "ETH"]);
  const { type } = props;

  const handleSwitchSwap = () => {
    const newSwitch = [...isSwitchSwap].reverse();
    setIsSwitchSwap(newSwitch);
  };

  return (
    <SwapWhiteBox>
      {type === "liquidity" && <LiquidityTitle>Amount</LiquidityTitle>}
      {type === "Swap" && <SwapAmountTitle>From.</SwapAmountTitle>}
      <StyledInput text={isSwitchSwap[0]} />
      <BalanceBox type={type} />
      {type === "liquidity" && <Space />}
      {type === "Swap" && (
        <SwitchWrapper>
          <SwitchBox onClick={handleSwitchSwap}>
            <img src={IcSwitch} alt="switch" style={{ position: "absolute", top: "10px", left: "8.8px" }} />
          </SwitchBox>
        </SwitchWrapper>
      )}
      {type === "Swap" && <SwapAmountTitle>To.</SwapAmountTitle>}
      <StyledInput text={isSwitchSwap[1]} />
      <BalanceBox type={type} />
    </SwapWhiteBox>
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
