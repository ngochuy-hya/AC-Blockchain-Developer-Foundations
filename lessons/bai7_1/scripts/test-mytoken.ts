import { ethers } from "hardhat";
import { MyToken } from "../typechain";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Testing MyToken with account: ", deployer.address);
  console.log("");

  const myToken: MyToken = await ethers.getContract("MyToken");

  console.log("Token Information:");
  const name = await myToken.name();
  const symbol = await myToken.symbol();
  const decimals = await myToken.decimals();
  const totalSupply = await myToken.totalSupply();
  
  console.log("  Name:", name);
  console.log("  Symbol:", symbol);
  console.log("  Decimals:", decimals.toString());
  console.log("  Total Supply:", ethers.formatUnits(totalSupply, decimals), symbol);
  console.log("");

  console.log("Checking Deployer Balance...");
  const balance = await myToken.balanceOf(deployer.address);
  console.log("  Balance:", ethers.formatUnits(balance, decimals), symbol);
  console.log("");

  console.log("MyToken test completed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
