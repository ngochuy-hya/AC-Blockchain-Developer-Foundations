import { ethers } from "hardhat";

async function main() {
  // Lấy deployer account
  const [deployer] = await ethers.getSigners();

  console.log("====================");
  console.log("Testing MyMintableToken");
  console.log("Deployer:", deployer.address);
  console.log("====================");


  const contractAddress = "0x7ed22Ec4Ef18EB598Cea0612084869B6F7F7D18B";

  // Lấy contract instance
  const MyMintableToken = await ethers.getContractAt(
    "MyMintableToken",
    contractAddress
  );

  console.log("\n📋 Token Information:");
  console.log("Name:", await MyMintableToken.name());
  console.log("Symbol:", await MyMintableToken.symbol());
  console.log("Total Supply:", ethers.formatEther(await MyMintableToken.totalSupply()), "MMT");

  console.log("\n💰 Balance Information:");
  const balance = await MyMintableToken.balanceOf(deployer.address);
  console.log("Deployer Balance:", ethers.formatEther(balance), "MMT");

  // Mint thêm 500 tokens
  console.log("\n🔨 Minting 500 more tokens...");
  const mintAmount = ethers.parseEther("500");
  const mintTx = await MyMintableToken.mint(deployer.address, mintAmount);
  await mintTx.wait();
  console.log("✅ Minted successfully!");

  const newBalance = await MyMintableToken.balanceOf(deployer.address);
  console.log("New Balance:", ethers.formatEther(newBalance), "MMT");
  console.log("New Total Supply:", ethers.formatEther(await MyMintableToken.totalSupply()), "MMT");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  