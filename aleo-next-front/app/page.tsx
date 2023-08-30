import Image from "next/image";
import styles from "./page.module.css";
import { Wallet } from "../../aleo-frontend/src/wallet/wallet";

export default function Home() {
  return (
    <main className={styles.main}>
      <Wallet />
    </main>
  );
}
