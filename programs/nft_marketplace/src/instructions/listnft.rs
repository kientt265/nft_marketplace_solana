use {
    anchor_lang::prelude::*,
    anchor_spl::{
        associated_token::AssociatedToken,
        token::{ Mint,  TokenAccount },
    },
};
use crate::state::listing;

#[derive(Accounts)]
#[instruction(price: u64)]
pub struct ListNFT<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,

    #[account(mut)]
    pub mint_account: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = mint_account,
        associated_token::authority = seller,
    )]
    pub seller_token_account: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = seller,
        space = 8 + 32 + 32 + 8 + 1, // Kích thước của Listing struct
        seeds = [b"listing", mint_account.key().as_ref()],
        bump
    )]
    pub listing: Account<'info, Listing>,

    pub system_program: Program<'info, System>,
}

pub fn list_nft(ctx: Context<ListNFT>, price: u64) -> Result<()> {
    let listing = &mut ctx.accounts.listing;
    listing.seller = *ctx.accounts.seller.key;
    listing.nft_mint = *ctx.accounts.mint_account.key();
    listing.price = price;
    listing.is_active = true;

    msg!("NFT listed for sale at {} SOL", price);

    Ok(())
}



