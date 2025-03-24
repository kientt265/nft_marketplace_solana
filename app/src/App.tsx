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
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [], [network]);

  return (
    <div className="min-h-screen bg-gray-900">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div className="flex flex-col min-h-screen">
              <header className="flex justify-between items-center p-4 bg-gray-800 fixed top-0 w-full z-50">
                <div className="flex items-center space-x-8">
                  <h1 className="text-2xl font-bold text-white">NFT MarketPlace</h1>
                  <input
                    type="text"
                    placeholder="Search NFTs..."
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg w-64"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Create
                  </button>
                  <WalletMultiButton />
                </div>
              </header>

              <div className="flex-1 pt-16">
                <Main />
              </div>

              <Footer />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;