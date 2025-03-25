import * as anchor from '@coral-xyz/anchor';
import { Program, BN } from '@coral-xyz/anchor';
import { PublicKey, Keypair, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import { NftMarketplace } from '../target/types/nft_marketplace';
import { expect } from 'chai';

describe('NFT Marketplace', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.NftMarketplace as Program<NftMarketplace>;
  const wallet = provider.wallet;

  let mintKeypair: Keypair;
  let sellerTokenAccount: PublicKey;
  let buyerTokenAccount: PublicKey;
  let listingAddress: PublicKey;

  before(async () => {
    mintKeypair = Keypair.generate();
    sellerTokenAccount = await getAssociatedTokenAddress(
      mintKeypair.publicKey,
      wallet.publicKey
    );
    buyerTokenAccount = await getAssociatedTokenAddress(
      mintKeypair.publicKey,
      provider.wallet.publicKey
    );
  });

  it('Can create NFT', async () => {
    const metadata = {
      name: "Test NFT",
      symbol: "TEST",
      uri: "https://test.com/metadata.json"
    };

    try {
      const tx = await program.methods
        .createNft(metadata.name, metadata.symbol, metadata.uri)
        .accounts({
          payer: wallet.publicKey,
          mintAccount: mintKeypair.publicKey,
          tokenAccount: sellerTokenAccount,
          metadata: await getMetadataAddress(mintKeypair.publicKey),
          masterEdition: await getMasterEditionAddress(mintKeypair.publicKey),
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([mintKeypair])
        .rpc();

      console.log("Create NFT transaction:", tx);
    } catch (error) {
      console.error("Error creating NFT:", error);
      throw error;
    }
  });

  it('Can list NFT', async () => {
    const price = new BN(1_000_000_000); // 1 SOL
    [listingAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("listing"), mintKeypair.publicKey.toBuffer()],
      program.programId
    );

    try {
      const tx = await program.methods
        .listNft(price)
        .accounts({
          seller: wallet.publicKey,
          mintAccount: mintKeypair.publicKey,
          sellerTokenAccount: sellerTokenAccount,
          listing: listingAddress,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      const listing = await program.account.listing.fetch(listingAddress);
      expect(listing.seller.toString()).to.equal(wallet.publicKey.toString());
      expect(listing.price.toString()).to.equal(price.toString());
      expect(listing.isActive).to.be.true;

      console.log("List NFT transaction:", tx);
    } catch (error) {
      console.error("Error listing NFT:", error);
      throw error;
    }
  });

  it('Can buy NFT', async () => {
    const buyerKeypair = Keypair.generate();
    await provider.connection.requestAirdrop(buyerKeypair.publicKey, 2_000_000_000);

    try {
      const tx = await program.methods
        .buyNft()
        .accounts({
          buyer: buyerKeypair.publicKey,
          seller: wallet.publicKey,
          listing: listingAddress,
          nftMint: mintKeypair.publicKey,
          sellerTokenAccount: sellerTokenAccount,
          buyerTokenAccount: buyerTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([buyerKeypair])
        .rpc();

      const listing = await program.account.listing.fetch(listingAddress);
      expect(listing.isActive).to.be.false;
      console.log("Buy NFT transaction:", tx);
    } catch (error) {
      console.error("Error buying NFT:", error);
      throw error;
    }
  });

  it('Can cancel listing', async () => {
    const newMint = Keypair.generate();
    const price = new BN(1_000_000_000);
    const [newListingAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("listing"), newMint.publicKey.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .listNft(price)
        .accounts({
          seller: wallet.publicKey,
          mintAccount: newMint.publicKey,
          sellerTokenAccount: await getAssociatedTokenAddress(
            newMint.publicKey,
            wallet.publicKey
          ),
          listing: newListingAddress,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      const tx = await program.methods
        .cancelListing()
        .accounts({
          seller: wallet.publicKey,
          listing: newListingAddress,
          sellerTokenAccount: await getAssociatedTokenAddress(
            newMint.publicKey,
            wallet.publicKey
          ),
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Cancel listing transaction:", tx);

      try {
        await program.account.listing.fetch(newListingAddress);
        expect.fail('Listing should be closed');
      } catch (e) {
        expect(e).to.be.an('error');
      }
    } catch (error) {
      console.error("Error in cancel listing flow:", error);
      throw error;
    }
  });

  async function getMetadataAddress(mint: PublicKey): Promise<PublicKey> {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      program.programId
    )[0];
  }

  async function getMasterEditionAddress(mint: PublicKey): Promise<PublicKey> {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
      ],
      program.programId
    )[0];
  }
});