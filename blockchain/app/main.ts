import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CertificateVault } from "./types/certificate_vault";
import { AnchorProvider, web3 } from "@project-serum/anchor";
import * as idl from "./idl/certificate_vault.json";
import { PublicKey } from "@solana/web3.js";
const certifioVaultId = new PublicKey(idl.address);
const certifioVaultInterface = JSON.parse(JSON.stringify(idl));
const provider = anchor.AnchorProvider.env();
const program = new Program(certifioVaultInterface,provider) as Program<CertificateVault>;

type PassportData = {
    passportNumber: string;
    surname: string;
    givenNames: string;
    nationality: string;
    sex: string;
    dateOfBirth: string;
    dateOfIssue: string;
    dateOfExpiry: string;
};


const app = express()

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.use(cors({origin: '*',credentials: true}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/test',(req,res)=>{
  res.send('hi')
});

app.post('/intialize-data', async (req, res) => {
  const data:PassportData= req.body as PassportData
  const user = web3.Keypair.generate();
  await program.rpc.initialize(
    data.passportNumber,
    data.surname,
    data.givenNames,
    data.nationality,
    data.sex,
    data.dateOfBirth,
    data.dateOfIssue,
    data.dateOfExpiry,{
      accounts: {
        passportData: user.publicKey,
        user:provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [user]
    }
  );
    const passportData = await program.account.passportData.fetch(user.publicKey);
    if (passportData){
      console.log(user.publicKey)
      console.log(user.publicKey.toBuffer())
      const address=new anchor.web3.PublicKey(user.publicKey)
      res.json({data:address}).status(200);
    }else{
      res.send("Error").status(400)
    }
});

app.post('/get-id', async (req, res) => {
  const address: string = req.body.address
  const passportNumber: string = req.body.passportNumber;
  await program.rpc.getId(passportNumber,{
    accounts:{
      passportData:address,
      user:provider.wallet.publicKey,
    }
  });
  const passportid = await program.account.passportData.fetch(address);
  if (passportid.passportNumber==passportNumber){ 
    res.status(200).send("passport data is correct")
  }else{
    res.status(400).send("passport data is incorrect")
  }
});

app.post('/get-all-data', async (req, res) => {
  const address: string = req.body.address
  await program.rpc.getAllData({
    accounts:{
      passportData:address,
      user:provider.wallet.publicKey,
    }
  })
  const getalldata=await program.account.passportData.fetch(address);
  console.log(1)
  if(getalldata){
    const {author, ...remaining}=getalldata
    res.status(200).json({data:remaining})
  }else{
    res.status(400).send("Error in fetching data")
  }
});