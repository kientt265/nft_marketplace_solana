import { FC } from 'react';

interface NFTCardProps {
  name: string;
  image: string;
  price: number;
  creator: string;
}

export const NFTCard: FC<NFTCardProps> = ({ name, image, price, creator }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-gray-400 text-sm mb-2">Created by {creator}</p>
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">{price} SOL</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};