import styled from "@emotion/styled";
import Logo from "../assets/icons/logo/aleo-logo.svg";
import { useState } from "react";
import { Wallet } from "../wallet/wallet";

interface HeaderProps {
  handleMenuOption: (option: number) => void;
}

const Header = (props: HeaderProps) => {
  return (
    <Container>
      <Head>
        <LeftSide>
          <Title>
            <LogoImg src={Logo} />
            {/* <TitleText>ASAP</TitleText> */}
          </Title>
          <NavBar>
            <SwapButton
              onClick={() => {
                props.handleMenuOption(0);
              }}
            >
              Swap
            </SwapButton>
            <LiquidityButton
              onClick={() => {
                props.handleMenuOption(1);
              }}
            >
              Liquidity
            </LiquidityButton>
            <MintButton
              onClick={() => {
                props.handleMenuOption(2);
              }}
            >
              Token Faucet
            </MintButton>
            <RequestRecordButton
              onClick={() => {
                props.handleMenuOption(3);
              }}
            >
              Request Records
            </RequestRecordButton>
          </NavBar>
        </LeftSide>
        <Wallet />
      </Head>
    </Container>
  );
};

export default Header;

const LogoImg = styled.img`
  margin-right: 10px;
`;

const Container = styled.div`
  width: 100%;
  font-family: "Montserrat";
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Head = styled.div`
  width: 90%;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleText = styled.div`
  font-size: 40px;
  color: #0092ff;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SwapButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
  padding: 0 20px;

  border-radius: 10px;
  text-align: center;

  font-size: 18px;
  font-weight: 400;
  line-height: normal;

  text-align: center;
  cursor: pointer;
`;

const LiquidityButton = styled(SwapButton)``;

const MintButton = styled(SwapButton)``;

const RequestRecordButton = styled(SwapButton)``;
