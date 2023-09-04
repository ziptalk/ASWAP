import { Transaction, WalletAdapterNetwork, WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import styled from "@emotion/styled";

interface ConfirmButtonProps {
  text: string;
  amount1: number;
  amount2: number;
  token1?: number;
  token2?: number;
}

export const ConfirmButton = (props: ConfirmButtonProps) => {
  const { publicKey, requestTransaction, requestRecords } = useWallet();

  const executeAddLiquidity = async () => {
    if (props.amount1 === 0) throw new Error("Invalid amount");
    if (!publicKey) throw new WalletNotConnectedError();

    const program: string | undefined = process.env.REACT_APP_PROGRAM_NAME;
    if (!program) {
      throw new Error("Invalid program name");
    }
    let tokenRecord: any;
    let records: any;
    if (requestRecords) {
      records = await requestRecords(program);
      for (let i = 0; i < records.length; i++) {
        console.log(records[i]);
        let amount: number = parseFloat(records[i].data.amount.replace("u128.private", ""));
        let token_id: number = parseFloat(records[i].data.token_id.replace("u64.private", ""));
        console.log("amount", amount === props.amount1);
        console.log("token_id", token_id === props.token1);
        console.log("spent", records[i].spent);
        if (token_id === props.token1 && amount >= props.amount1 && records[i].spent === false) {
          tokenRecord = records[i];
          break;
        }
      }
    }

    console.log("tokenRecord", tokenRecord);

    const inputs = [tokenRecord, publicKey, props.amount1 + "u128"];
    const fee = 5_500_000;

    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      program,
      "add_liquidity",
      inputs,
      fee
    );

    if (requestTransaction) {
      // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
      await requestTransaction(aleoTransaction);
    }
  };

  const executeSwap = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const program: string | undefined = process.env.REACT_APP_PROGRAM_NAME;
    if (!program) {
      throw new Error("Invalid program name");
    }
    let tokenRecord: any;
    let records: any;

    if (requestRecords) {
      records = await requestRecords(program);
      for (let i = 0; i < records.length; i++) {
        console.log(records[i]);
        if (records[i].spent === false) {
          tokenRecord = records[i];
          break;
        }
      }
    }
    /*
    struct Pair {
        amount_in: u128,
        amount_out: u128,
        token_in: u64,
        token_out: u64,  
        maker_address: address,      
        nonce: field,
        valid_until: u32,
    }
    */
    let amount_in = 100_000;
    let amount_out = 100_000;
    let token_in = 1;
    let token_out = 2;
    let maker_address = "aleo15hlrfuy206c0fc7zfaj7p6h2lpe655y586ys4dcasdx7yx7j2srsdvr8zv";
    let nonce = 1;
    let valid_until = 100_000;
    let tokenPair: any = [amount_in, amount_out, token_in, token_out, maker_address, nonce, valid_until];
    /*
    struct Signature {
        challenge: scalar,
        response: scalar,
        pk_sig: group,
        pr_sig: group,
        sk_prf: scalar,
    }
    */
    let tokenSignature: any;

    const inputs = [tokenRecord, tokenPair, tokenSignature];
    const fee = 50_000;

    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      program,
      "swap",
      inputs,
      fee
    );

    if (requestTransaction) {
      // Returns a transaction Id, that can be used to check the status. Note this is not the on-chain transaction id
      await requestTransaction(aleoTransaction);
    }
  };

  return (
    <Container>
      {props.text === "Swap" && (
        <StyledComfirmButton
          onClick={() => {
            executeSwap();
          }}
        >
          Swap
        </StyledComfirmButton>
      )}
      {props.text === "liquidity" && (
        <StyledComfirmButton
          onClick={() => {
            executeAddLiquidity();
          }}
        >
          Add Liquidity
        </StyledComfirmButton>
      )}
    </Container>
  );
};

export default ConfirmButton;

const Container = styled.div`
  width: 100%;
  padding: 20px 30px 30px 30px;
`;

const StyledComfirmButton = styled.button`
  width: 460px;
  margin-left: -30px;
  border: none;
  border-radius: 8px;
  background: #404144;

  padding: 10px 20px 10px 20px;

  color: #fff;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;
