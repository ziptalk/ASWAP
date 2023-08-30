import styled from "@emotion/styled";
import SwapAmountContainer from "./SwapAmountContainer";
import PoolLiquidity from "../PoolLiquidity";
import ConfirmButton from "../ConfirmButton";

const SwapContainer = () => {
  return (
    <SwapWrapper>
      <SwapAmountContainer type="Swap" />
      <PoolLiquidity type="Swap" />
      <ConfirmButton />
    </SwapWrapper>
  );
};

export default SwapContainer;

const SwapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;
