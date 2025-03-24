use anchor_lang::prelude::*;

#[event]
pub struct NFTListed {
    pub seller: Pubkey,
    pub nft_mint: Pubkey,
    pub price: u64,
}

#[event]
pub struct NFTSold {
    pub seller: Pubkey,
    pub buyer: Pubkey,
    pub nft_mint: Pubkey,
    pub price: u64,
    pub marketplace_fee: u64,
}

#[event]
pub struct OfferCreated {
    pub bidder: Pubkey,
    pub nft_mint: Pubkey,
    pub price: u64,
    pub expires_at: i64,
}