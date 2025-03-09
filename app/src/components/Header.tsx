import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white fixed top-0 left-0 w-full shadow-md">
      <h1 className="text-xl font-bold">My Solana App</h1>
      <WalletMultiButton />
    </header>
  );
};
