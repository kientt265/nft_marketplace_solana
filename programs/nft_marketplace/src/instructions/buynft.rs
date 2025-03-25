
use anchor_spl::token::Mint;
use {
    anchor_lang::prelude::*,
    anchor_spl::{
        associated_token::AssociatedToken,
        token::{transfer, Token, TokenAccount, Transfer},
    },
};
use crate::state::listing::Listing;

#[derive(Accounts)]
pub struct BuyNFT<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(mut)]
    /// CHECK: Safe because we're reading data
    pub seller: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [b"listing", nft_mint.key().as_ref()],
        bump,
        constraint = listing.is_active == true,
        close = seller
    )]
    pub listing: Account<'info, Listing>,

    pub nft_mint: Account<'info, Mint>,

    #[account(
        mut,
        associated_token::mint = nft_mint,
        associated_token::authority = seller
    )]
    pub seller_token_account: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = nft_mint,
        associated_token::authority = buyer
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn buy_nft(ctx: Context<BuyNFT>) -> Result<()> {
    let listing = &ctx.accounts.listing;
    let price = listing.price;

    // Transfer SOL from buyer to seller
    **ctx.accounts.buyer.to_account_info().try_borrow_mut_lamports()? -= price;
    **ctx.accounts.seller.to_account_info().try_borrow_mut_lamports()? += price;

    // Transfer NFT from seller to buyer
    let cpi_accounts = Transfer {
        from: ctx.accounts.seller_token_account.to_account_info(),
        to: ctx.accounts.buyer_token_account.to_account_info(),
        authority: ctx.accounts.seller.to_account_info(),
    };
    let cpi_context = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
    transfer(cpi_context, 1)?;

    msg!("NFT purchased for {} SOL", price);
    Ok(())
}
