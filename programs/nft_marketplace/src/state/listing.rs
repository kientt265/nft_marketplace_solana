
  
use anchor_lang::prelude::Pubkey;
  
pub struct Listing {
    pub seller: Pubkey,  // Địa chỉ người bán
    pub nft_mint: Pubkey, // Mint của NFT
    pub price: u64,       // Giá SOL
    pub is_active: bool,  // Trạng thái niêm yết
}