#![allow(clippy::result_large_err)]
use anchor_lang::prelude::*;

pub mod state;
pub mod errors;
pub mod events;
pub mod instructions;
use instructions::*;

use crate::instructions::{
    mint::MintNft,
    listnft::ListNFT,
    buynft::BuyNFT,
};

declare_id!("6DxVGqzaLMCkcM2KDApwcq1HXUopafQoBFfTuXCKMYaV");

#[program]
pub mod nft_marketplace {
    use super::*;
    
    pub fn create_nft(
        ctx: Context<CreateNft>,
        nft_name: String,
        nft_symbol: String,
        nft_uri: String,
    ) -> Result<()> {
        create::create_nft(ctx, nft_name, nft_symbol, nft_uri)
    }

    pub fn mint_nft(ctx: Context<MintNft>) -> Result<()> {
        mint::mint_nft(ctx)
    }

    pub fn transfer_tokens(ctx: Context<TransferTokens>) -> Result<()> {
        transfer::transfer_tokens(ctx)
    }
    pub fn list_nft(ctx: Context<ListNFT>, price: u64) -> Result<()> {
        instructions::listnft::list_nft(ctx, price)
    }

    pub fn buy_nft(ctx: Context<BuyNFT>) -> Result<()> {
        instructions::buynft::buy_nft(ctx)
    }
    
}