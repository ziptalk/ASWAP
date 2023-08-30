import styled from "@emotion/styled";
import SwapAmountContainer from "../SwapContainer/SwapAmountContainer";
import PoolLiquidity from "../PoolLiquidity";
import ConfirmButton from "../ConfirmButton";
import PairBox from "./PairBox";

const Liquidity = () => {
  return (
    <LiquidityContainer>
      <PairBox />
      <SwapAmountContainer type="liquidity" />
      <PoolLiquidity />
      <ConfirmButton />
    </LiquidityContainer>
  );
};

export default Liquidity;

const LiquidityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;
