import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "./App.css";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      // if desired, manually define specific/custom wallets here (normally not required)
      // otherwise, the wallet-adapter will auto detect the wallets a user's browser has available
    ],
    [network],
  );

  return (
    <div className=""><div className="flex justify-between items-center p-4 bg-gray-800 text-white fixed top-0 left-0 w-full shadow-md ">
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>

        <h1 className="">NFT MarketPlace</h1>
        <input
  type="text"
  placeholder="Tìm kiếm NFT..."
  className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full max-w-md shadow-md"
/>

        <div className="flex gap-6">
          <div className="cursor-pointer hover:bg-sky-700 rounded-lg px-4 py-2 w-full text-center ">Sell items</div>
          <div className="cursor-pointer hover:bg-sky-700 rounded-lg px-4 py-2 w-full text-center">Collections</div>
        </div>
          <WalletMultiButton  />

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </div>
    <Main/>
    <Footer/>
    </div>
   
  );
}

export default App;