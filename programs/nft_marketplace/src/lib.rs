#![allow(clippy::result_large_err)]
use anchor_lang::prelude::*;

pub mod instructions;
use instructions::*;

declare_id!("6DxVGqzaLMCkcM2KDApwcq1HXUopafQoBFfTuXCKMYaV");

#[program]
pub mod nft_minter {
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

    pub fn transfer_tokens(ctx: Context<TransferTokens>, amount: u64) -> Result<()> {
        transfer::transfer_tokens(ctx, amount)
    }
}