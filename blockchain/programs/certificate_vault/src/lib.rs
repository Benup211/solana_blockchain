use anchor_lang::prelude::*;


declare_id!("4Z4fnLEkQ1FkzGxjfGDKR5AKAQQAHqBf53BZJ1bfV2XC");

#[program]
pub mod certificate_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>,passport_number: String,surname: String,given_names: String,nationality: String,sex:String,date_of_birth: String,date_of_issue: String,date_of_expiry: String) -> Result<()> {
        let clock: Clock = Clock::get().unwrap();
        let author: &Signer = &ctx.accounts.user;
        let passwport_data = &mut ctx.accounts.passport_data;
        passwport_data.author = *author.key;
        passwport_data.passport_number=passport_number;
        passwport_data.surname=surname;
        passwport_data.given_names=given_names;
        passwport_data.nationality=nationality;
        passwport_data.sex=sex;
        passwport_data.date_of_birth=date_of_birth;
        passwport_data.date_of_issue=date_of_issue;
        passwport_data.date_of_expiry=date_of_expiry;
        passwport_data.created_at=clock.unix_timestamp;
        msg!("Sucessfully Created {:?}", passwport_data.passport_number);
        Ok(())
    }
    pub fn get_id(ctx: Context<GetId>, passport_number: String) -> Result<()> {
        let passport_data = &ctx.accounts.passport_data;
        if passport_data.passport_number != passport_number {
            msg!("Incorrect id: {:?}", passport_data.passport_number);
        }
        msg!("Passport Number: {:?}", passport_data.passport_number);
        Ok(())
    }
    pub fn get_all_data(ctx: Context<GetAllData>) -> Result<()> {
        let passport_data = &ctx.accounts.passport_data;
        let author: &Signer = &ctx.accounts.user;
        println!("Response: {} AuthorL {}", passport_data.passport_number,author.key);
        Ok(()) 
    }
        
}

#[derive(Accounts)]
pub struct GetAllData<'info> {
#[account(mut)]
    pub passport_data: Account<'info, PassportData>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetId<'info> {
    #[account(mut)]
    pub passport_data: Account<'info, PassportData>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 3000)]
    pub passport_data: Account<'info, PassportData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct PassportData {
    pub author: Pubkey,
    pub passport_number: String,
    pub surname: String,
    pub given_names: String,
    pub nationality: String,
    pub sex:String,
    pub date_of_birth: String,
    pub date_of_issue: String,
    pub date_of_expiry: String,
    pub created_at: i64,
}
#[error_code]
pub enum MyError {
    #[msg("Given Id not Found")]
    NotFound,
}