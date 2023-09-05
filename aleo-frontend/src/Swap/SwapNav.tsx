import styled from "@emotion/styled";
import { css } from "@emotion/react";
import IcSwap from "../assets/icons/common/Ic_swap.svg";
import IcSwapBlack from "../assets/icons/common/Ic_swapBlack.svg";
import IcLiqudity from "../assets/icons/common/Ic_liquidity.svg";
import IcLiqudityWhite from "../assets/icons/common/Ic_liquidityWhite.svg";

interface SwapNavProps {
  option: string;
  handleSwitchOption: (option: string) => void;
}

export const SwapNav = (props: SwapNavProps) => {
  const { option, handleSwitchOption } = props;

  return (
    <SwapNavContainer>
      <SwapNavBox onClick={() => handleSwitchOption("Swap")} status={option === "Swap" ? true : false}>
        {option === "Swap" ? <img src={IcSwap} alt="swap" /> : <img src={IcSwapBlack} alt="swap" />}
        Swap
      </SwapNavBox>
      <SwapNavBox onClick={() => handleSwitchOption("Liquidity")} status={option === "Liquidity" ? true : false}>
        {option === "Liquidity" ? (
          <img src={IcLiqudityWhite} alt="liqudity" />
        ) : (
          <img src={IcLiqudity} alt="liqudity" />
        )}
        Liqudity
      </SwapNavBox>
    </SwapNavContainer>
  );
};

const SwapNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  width: 100%;
  margin-top: 41px;
`;

const SwapNavBox = styled.div<{ status: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 50%;
  padding: 9px 0;

  border-radius: 20px;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.09px;

  text-align: center;
  cursor: pointer;

  transition: all 0.3s ease-in-out;

  ${({ status }) =>
    status
      ? css`
          background-color: #33343e;
          color: #e8e8ee;
          box-shadow: 0px 0px 20px 0px rgba(9, 9, 10, 0.1);
        `
      : css`
          background-color: #f8f8fb;
          color: #333333;
        `}
`;
