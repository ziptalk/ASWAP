import styled from "@emotion/styled";
import { SwapNav } from "../Swap/SwapNav";
import { MintTokens } from "../MintToken/MintTokens";
import { RequestRecord } from "../Records/RequestRecords";
import SwapContainer from "../Swap/SwapContainer";
import Liquidity from "../Swap/Liquidity";
import TokenTable from "../Liquidity/tokenTable";

interface BodyProps {
  menuOption: number;
  option: string;
  handleSwitchOption: (option: string) => void;
}

const Body = (props: BodyProps) => {
  return (
    <Container>
      {props.menuOption === 0 ? (
        <SwapAndLiquidityContainer>
          <SwapNav option={props.option} handleSwitchOption={props.handleSwitchOption} />
          {props.option === "Swap" ? <SwapContainer /> : <Liquidity />}
        </SwapAndLiquidityContainer>
      ) : (
        <></>
      )}

      {props.menuOption === 1 ? (
        <LiquidityContainer>
          <TokenTable />
        </LiquidityContainer>
      ) : (
        <></>
      )}
      {props.menuOption === 2 ? (
        <MintTokenContainer>
          <MintTokens />
        </MintTokenContainer>
      ) : (
        <></>
      )}
      {props.menuOption === 3 ? (
        <RequestRecordContainer>
          <RequestRecord />
        </RequestRecordContainer>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Body;

const Container = styled.div`
  padding-top: 50px;
  margin-bottom: 100px;
`;

const LiquidityContainer = styled.div``;

const SwapAndLiquidityContainer = styled.div`
  width: 400px;
`;

const MintTokenContainer = styled.div``;

const RequestRecordContainer = styled.div``;
