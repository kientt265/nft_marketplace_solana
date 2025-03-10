import React from 'react'

export const Footer = () => {
  return (
    <div className=' bg-gray-800  bottom-0 left-0'>

      <div className='flex'>
        <div className='flex flex-col w-[30%] p-10'>
          <div>NFT MarketPlace</div>
          <div>
          The first marketplace on Solana to buy, trade and sell non-fungible tokens (NFTs). Chat on chain with buyers/sellers, launch a project with our launchpad or just explore.
          </div>
        </div>
        <div className='flex flex-col w-[30%] p-10'>
          <div>Explore</div>
          <div>All collections</div>
        </div>
        <div className='flex flex-col w-[30%] p-10'>
          <div>
          Partners
          </div>
          <div>
          Contact us
          </div>
          <div>
            Careers
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center p-4  text-white bottom-0 left-0   w-full shadow-md'>
        <div>All rights reserved 2021-2022 ©</div>
        <div className='flex gap-2'>
          <a href="">Terms & Conditions</a>
          <a href="">Privacy policy</a>
          <a href="">Cookie policy</a>
        </div>
      </div>
    </div>
  )
}
