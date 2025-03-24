use anchor_lang::prelude::*;

#[account]
pub struct MarketplaceFees {
    pub authority: Pubkey,
    pub treasury: Pubkey,
    pub fee_percentage: u64, // Base points (100 = 1%)
}

impl MarketplaceFees {
    pub const SPACE: usize = 8 + 32 + 32 + 8;
    
    pub fn calculate_fee(&self, price: u64) -> u64 {
        price.checked_mul(self.fee_percentage)
            .unwrap()
            .checked_div(10000)
            .unwrap()
    }
}