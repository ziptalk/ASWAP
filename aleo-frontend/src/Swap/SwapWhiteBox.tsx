import styled from "@emotion/styled";

interface SwapWhiteBoxProps {
  children: React.ReactNode;
}

const SwapWhiteBox = ({ children }: SwapWhiteBoxProps) => {
  return <SwapWhiteBoxContainer>{children}</SwapWhiteBoxContainer>;
};

export default SwapWhiteBox;

const SwapWhiteBoxContainer = styled.div`
  width: 100%;
  margin-top: 14px;

  border-radius: 20px;
  padding: 30px 30px 30px 30px;
  background-color: #fff;
  text-align: left;
`;
