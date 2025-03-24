use anchor_lang::prelude::*;

#[account]
pub struct VerifiedCollection {
    pub collection_mint: Pubkey,
    pub authority: Pubkey,
    pub verified: bool,
    pub royalty_fee: u64, // Base points (100 = 1%)
}

impl VerifiedCollection {
    pub const SPACE: usize = 8 + 32 + 32 + 1 + 8;
}