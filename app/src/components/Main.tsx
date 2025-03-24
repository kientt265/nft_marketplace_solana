import React from 'react'
import { NFTCard } from './NFTCard';

export const Main = () => {
  const mockNFTs = [
    {
      name: "Cool NFT #1",
      image: "https://via.placeholder.com/300",
      price: 1.5,
      creator: "0x123...abc"
    },
    // Add more mock data
  ];

  return (
    <main className="w-full min-h-screen px-4 py-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Featured NFTs</h2>
          <div className="flex gap-4">
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg">
              <option>Recently Listed</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockNFTs.map((nft, index) => (
            <NFTCard key={index} {...nft} />
          ))}
        </div>
      </div>
    </main>
  );
};
