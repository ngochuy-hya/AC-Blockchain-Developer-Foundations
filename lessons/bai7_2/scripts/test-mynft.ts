import { ethers } from "hardhat";
import { MyNFT } from "../typechain";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Testing MyNFT with account: ", deployer.address);
  console.log("");

  const myNFT: MyNFT = await ethers.getContract("MyNFT");

  console.log("NFT Information:");
  const name = await myNFT.name();
  const symbol = await myNFT.symbol();
  const nextTokenId = await myNFT.nextTokenId();
  
  console.log("  Name:", name);
  console.log("  Symbol:", symbol);
  console.log("  Next Token ID:", nextTokenId.toString());
  console.log("");

  console.log("Checking Deployer NFT Balance...");
  const balance = await myNFT.balanceOf(deployer.address);
  console.log("  Balance:", balance.toString(), "NFTs");
  console.log("");

  // Mint một NFT mới cho deployer
  console.log("Minting a new NFT to deployer...");
  const mintTx = await myNFT.mint(deployer.address);
  console.log("  Transaction hash:", mintTx.hash);
  await mintTx.wait();
  console.log("  NFT minted successfully!");
  console.log("");

  // Lấy token ID mới
  const newNextTokenId = await myNFT.nextTokenId();
  const mintedTokenId = newNextTokenId - 1n;
  
  console.log("🆔 Minted Token ID:", mintedTokenId.toString());
  console.log("");

  // Lấy owner của NFT vừa mint
  const owner = await myNFT.ownerOf(mintedTokenId);
  console.log("👑 Owner of token ID", mintedTokenId.toString() + ":", owner);
  console.log("");

  // Kiểm tra balance mới
  const newBalance = await myNFT.balanceOf(deployer.address);
  console.log("💰 Deployer NFT Balance (after mint):", newBalance.toString(), "NFTs");
  console.log("");

  console.log("✅ MyNFT test completed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
