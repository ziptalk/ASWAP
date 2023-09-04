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
    const myAddr = process.env.REACT_APP_ADDRESS1;
    const pk_sig= process.env.REACT_APP_PK_SIG;
    const pr_sig = process.env.REACT_APP_PR_SIG;
    const sk_prf = process.env.REACT_APP_SK_PRF;
    const chal = process.env.REACT_APP_CHALLENGE;
    const res = process.env.REACT_APP_RESPONSE;
    const nonce = process.env.REACT_APP_NONCE;
    let tokenRecord: any;
    let records: any;

    if (props.amount1 === 0) throw new Error("Invalid amount");
    if (props.amount2 === 0) throw new Error("Invalid amount");
    let amount_in = props.amount1 + "u128"
    let amount_out = props.amount2 + "u128"
    let token_in = props.token1 + "u64"
    let token_out = props.token2 + "u64"

    //pk_sig, pr_sig, sk_prf는 계정마다 항상 동일함 
    let tokenPair = `{
      amount_in: ${amount_in},
      amount_out: ${amount_out},
      token_in: ${token_in},
      token_out: ${token_out},
      maker_address: ${myAddr},
      nonce: ${nonce},
      valid_until: 600000u32
    }`;

    let tokenSignature =`{
      challenge: ${res},
      response: ${chal},
      pk_sig: ${pk_sig}, 
      pr_sig: ${pr_sig},
      sk_prf: ${sk_prf}
    }`;

    if (requestRecords) {
      records = await requestRecords(program);
      for (let i = 0; i < records.length; i++) {
        console.log(records[i]);
        let amount: number = parseFloat(records[i].data.amount.replace("u128.private", ""));
        let token_id: number = parseFloat(records[i].data.token_id.replace("u64.private", ""));
        if (token_id === props.token1 && amount >= props.amount1 && records[i].spent === false) {
          tokenRecord = records[i];
          break;
        }
      }
    }

    const inputs = [tokenRecord, tokenPair, tokenSignature];
    const fee = 5_500_000;

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
    <>
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
    </>
  );
};

export default ConfirmButton;

const StyledComfirmButton = styled.button`
  width: 100%;
  margin-top: 14px;
  padding: 17px 0;

  border: none;
  border-radius: 8px;
  background: #b7b8cd;

  color: #fff;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;
