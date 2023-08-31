import { Transaction, WalletAdapterNetwork, WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import styled from "@emotion/styled";

const ConfirmButton = () => {
  const { publicKey, requestTransaction, requestRecords } = useWallet();

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
    <StyledComfirmButton
      onClick={() => {
        executeSwap();
      }}
    >
      Swap
    </StyledComfirmButton>
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
