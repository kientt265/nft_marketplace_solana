import React from 'react'

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-300">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">NFT MarketPlace</h3>
            <p className="text-sm">
              The premier marketplace for NFTs on Solana. Trade, collect, and explore.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">All NFTs</a></li>
              <li><a href="#" className="hover:text-white">Art</a></li>
              <li><a href="#" className="hover:text-white">Collections</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Platform Status</a></li>
              <li><a href="#" className="hover:text-white">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
          <p>&copy; 2024 NFT MarketPlace. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
