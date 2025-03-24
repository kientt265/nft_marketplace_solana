use anchor_lang::prelude::*;

#[error_code]
pub enum MarketplaceError {
    #[msg("Invalid price")]
    InvalidPrice,
    
    #[msg("Listing not active")]
    ListingNotActive,
    
    #[msg("Invalid collection")]
    InvalidCollection,
    
    #[msg("Offer expired")]
    OfferExpired,
    
    #[msg("Insufficient funds")]
    InsufficientFunds,
    
    #[msg("Invalid fee percentage")]
    InvalidFeePercentage,
}