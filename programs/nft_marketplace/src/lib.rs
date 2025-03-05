use anchor_lang::prelude::*;

declare_id!("6DxVGqzaLMCkcM2KDApwcq1HXUopafQoBFfTuXCKMYaV");

#[program]
pub mod nft_marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
