import btcLogo from "../src/assets/icons/logo/btc-logo.svg";
import ethLogo from "../src/assets/icons/logo/eth-logo.svg";
import usdtLogo from "../src/assets/icons/logo/usdt-logo.svg";
import daiLogo from "../src/assets/icons/logo/dai-logo.svg";
import IcEth from "../src/assets/icons/common/Ic_eth.svg";

export const TokenLists: any[] = [
  { name: "BTC", id: 1, price: 28910, change: 0.1, volume: "20M", logo: btcLogo },
  { name: "ETH", id: 2, price: 1621, change: 0.1, volume: "20M", logo: IcEth },
  { name: "USDT", id: 3, price: 1, change: 0.1, volume: "20M", logo: usdtLogo },
  { name: "DAI", id: 4, price: 1, change: 0.1, volume: "20M", logo: daiLogo },
];
