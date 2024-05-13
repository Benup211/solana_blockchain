import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CertificateVault } from "../target/types/certificate_vault";
import { assert } from "chai";

describe("certificate_vault", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.CertificateVault as Program<CertificateVault>;

  it('should initialize passport data', async () => {
    const user = anchor.web3.Keypair.generate();
    const passportNumber = "A12345";
    const surname = "Doe";
    const givenNames = "John";
    const nationality = "US";
    const sex = "M";
    const dateOfBirth = "01-01-1990";
    const dateOfIssue = "01-01-2024";
    const dateOfExpiry = "01-01-2030";

    // Act
    await program.rpc.initialize(
      passportNumber,
      surname,
      givenNames,
      nationality,
      sex,
      dateOfBirth,
      dateOfIssue,
      dateOfExpiry,{
        accounts: {
          passportData: user.publicKey,
          user:provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [user]
      
      }
    );

    // Assert
    const passportData = await program.account.passportData.fetch(user.publicKey);
    const address=user.publicKey.toBuffer();
    console.log(address)
    const publicKeyBuffer = Buffer.from(address); // Assuming `address` is the buffer representation of the public key
    const publicKey = new anchor.web3.PublicKey(publicKeyBuffer);
    await program.rpc.getId("A12345",{
      accounts:{
        passportData:publicKey,
        user:provider.wallet.publicKey,
      }
    });
    const passportid = await program.account.passportData.fetch(publicKey);
    console.log("id",passportid);
    if (passportid.passportNumber=="A12345"){ 
      console.log("passport data is correct")
    }

    await program.rpc.getAllData({
      accounts:{
        passportData:publicKey,
        user:provider.wallet.publicKey,
      }
    })
    const getalldata=await program.account.passportData.fetch(publicKey);
    console.log(getalldata)
  });
});