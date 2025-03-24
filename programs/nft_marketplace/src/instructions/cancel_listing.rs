use {
    anchor_lang::prelude::*,
    anchor_spl::token::TokenAccount,
};
use crate::state::listing::Listing;

#[derive(Accounts)]
pub struct CancelListing<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,

    #[account(
        mut,
        seeds = [b"listing", listing.nft_mint.as_ref()],
        bump,
        constraint = listing.seller == *seller.key,
        constraint = listing.is_active == true,
        close = seller
    )]
    pub listing: Account<'info, Listing>,

    #[account(
        mut,
        constraint = seller_token_account.owner == *seller.key
    )]
    pub seller_token_account: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
}

pub fn cancel_listing(ctx: Context<CancelListing>) -> Result<()> {
    msg!("Listing cancelled successfully");
    Ok(())
}