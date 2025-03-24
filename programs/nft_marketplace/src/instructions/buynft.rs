use {
    anchor_lang::prelude::*,
    anchor_spl::{
        token::{transfer, Token, TokenAccount, Transfer},
    },
};
use crate::state::listing::Listing;  // Fix import

#[derive(Accounts)]
#[instruction(bump: u8)]  // Add bump parameter
pub struct BuyNFT<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(
        mut,
        seeds = [b"listing", listing.nft_mint.key().as_ref()],
        bump,
        constraint = listing.is_active == true
    )]
    pub listing: Account<'info, Listing>,

    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = listing.nft_mint,
        associated_token::authority = buyer,
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub escrow_wallet: SystemAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn buy_nft(ctx: Context<BuyNFT>, bump: u8) -> Result<()> {
    let listing = &mut ctx.accounts.listing;
    let price = listing.price;

    // 1️⃣ Chuyển SOL từ buyer -> seller
    **ctx.accounts.seller.to_account_info().try_borrow_mut_lamports()? += price;
    **ctx.accounts.buyer.to_account_info().try_borrow_mut_lamports()? -= price;

    // 2️⃣ Chuyển NFT từ seller -> buyer
    let cpi_accounts = Transfer {
        from: ctx.accounts.seller_token_account.to_account_info(),
        to: ctx.accounts.buyer_token_account.to_account_info(),
        authority: ctx.accounts.seller.to_account_info(),
    };
    let cpi_context = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
    transfer(cpi_context, 1)?;

    // 3️⃣ Cập nhật trạng thái listing
    listing.is_active = false;

    msg!("NFT purchased for {} SOL", price);
    Ok(())
}
