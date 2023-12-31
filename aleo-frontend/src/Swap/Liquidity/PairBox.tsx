import styled from "@emotion/styled";
import SwapWhiteBox from "../SwapWhiteBox";
import IcEth from "../../assets/icons/common/Ic_eth.svg";

const PairBox = () => {
  return (
    <SwapWhiteBox>
      <PairTitleBox>Liquidity Pair</PairTitleBox>
      <PairTokenWrapper>
        <PairTokenBox>
          <PairTokenimg />
          <PairTokenText>BTC</PairTokenText>
        </PairTokenBox>
        <PairTokenBox>
          <img src={IcEth} alt="eth" />
          <PairTokenText>ETH</PairTokenText>
        </PairTokenBox>
      </PairTokenWrapper>
      <FeeBox>
        <span>Swap fee</span>
        <span>0.3%</span>
      </FeeBox>
    </SwapWhiteBox>
  );
};

export default PairBox;

const PairTitleBox = styled.div`
  width: 100%;
  margin-bottom: 16px;

  color: #33343e;

  /* Body text/Large 2 */
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  text-align: center;
`;

const PairTokenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;

  width: 100%;
`;

const PairTokenBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 9px 54px;

  width: 50%;

  border-radius: 20px;
  background: #f8f8fb;
`;

const PairTokenimg = styled.div`
  width: 22px;
  height: 22px;

  border-radius: 50%;
  background-color: #bababa;
`;

const PairTokenText = styled.span`
  color: #33343e;

  /* Body text/Large 2 */
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const FeeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 16px;

  color: #33343e;
  /* Body text/small 1 */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
`;
