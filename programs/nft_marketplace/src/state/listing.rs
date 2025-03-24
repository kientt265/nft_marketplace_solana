
  
use anchor_lang::prelude::*;

#[account]
pub struct Listing {
    pub seller: Pubkey,
    pub nft_mint: Pubkey,
    pub price: u64,
    pub is_active: bool,
}

impl Listing {
    pub const SPACE: usize = 8 + 32 + 32 + 8 + 1;
}