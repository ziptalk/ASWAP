import styled from "@emotion/styled";
import { TokenLists } from "../constants";

const TokenTable = () => {
  return (
    <Container>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Token</TableHeaderCell>
            <TableHeaderCell>Tvl</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Change</TableHeaderCell>
            <TableHeaderCell>Volume</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TokenLists.map((token) => {
            return (
              <TableRow>
                <TableCell>{token.name}</TableCell>
                <TableCell>{token.tvl}</TableCell>
                <TableCell>${token.price}</TableCell>
                <TableCell>{token.change}</TableCell>
                <TableCell>{token.volume}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TokenTable;

const Container = styled.div`
  width: 100%;
`;

const Table = styled.table`
  border: 1px solid #e0e0e0;
`;

const TableHeader = styled.thead``;
const TableRow = styled.tr``;
const TableHeaderCell = styled.th`
  padding: 10px 20px;
  font-size: 20px;
`;
const TableBody = styled.tbody``;
const TableCell = styled.td`
  font-size: 18px;
  padding: 10px;
`;
