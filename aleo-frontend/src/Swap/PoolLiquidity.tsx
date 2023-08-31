import styled from "@emotion/styled";
import SwapWhiteBox from "./SwapWhiteBox";
import IcFlow from "../assets/icons/common/Ic_flow.svg";
import { css } from "@emotion/react";
import IcEth from "../assets/icons/common/Ic_eth.svg";

interface PoolLiquidityProps {
  type?: string;
}

const PoolLiquidity = (props: PoolLiquidityProps) => {
  const { type } = props;
  return (
    <SwapWhiteBox>
      <PoolLiquidityTitle>Pool Liquidity</PoolLiquidityTitle>
      <TVLBox>
        <TVLText>TVL</TVLText>
        <TVLText>$ 251.52m</TVLText>
      </TVLBox>
      <TTLBox>
        <TVLText>Total Tokens Locked</TVLText>
        <TTLBottomBox>
          <TTLInsideBox>
            <img src={IcEth} alt="eth" />
            <TVLText>ETH</TVLText>
            <TVLText>000,000K</TVLText>
          </TTLInsideBox>
          <TTLInsideBox>
            <TTLTokenimg />
            <TVLText>BTC</TVLText>
            <TVLText>000,000K</TVLText>
          </TTLInsideBox>
        </TTLBottomBox>
      </TTLBox>
      {type === "Swap" && (
        <ExchangeRateBox>
          <TVLText>Exchange Rate</TVLText>
          <TVLText bold={true}>
            1 ETH <img src={IcFlow} alt="flow" style={{ marginRight: "3px" }} />
            0.023BTC
          </TVLText>
        </ExchangeRateBox>
      )}
    </SwapWhiteBox>
  );
};

export default PoolLiquidity;

const PoolLiquidityTitle = styled.div`
  width: 100%;

  color: #33343e;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  text-align: center;
`;

const TVLBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin: 26px 0 20px 0;
`;

const TVLText = styled.span<{ bold?: boolean }>`
  color: #33343e;
  /* Body text/small 1 */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
`;

const TTLBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-bottom: 14px;
`;

const TTLBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 53px;

  width: 90%;
  margin-top: 10px;
  padding: 14px 22px;

  border-radius: 20px;
  background-color: #f8f8fb;
`;

const TTLInsideBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TTLTokenimg = styled.div`
  width: 18px;
  height: 18px;

  border-radius: 50%;
  background-color: #fff;
`;

const ExchangeRateBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 26px;
`;
