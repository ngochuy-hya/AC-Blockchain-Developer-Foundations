import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("====================");
  console.log("Network:", hre.network.name);
  console.log("====================");

  console.log("====================");
  console.log("Deploy MyMintableToken Contract");
  console.log("====================");

  // Deploy contract
  const myMintableToken = await deploy("MyMintableToken", {
    contract: "MyMintableToken",
    args: [],
    from: deployer,
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false,
  });


  console.log("MyMintableToken deployed at:", myMintableToken.address);
  console.log("Deployer:", deployer);


  // Lấy contract instance để tương tác
  const MyMintableToken = await ethers.getContractAt(
    "MyMintableToken",
    myMintableToken.address
  );

  // Mint 1000 token cho deployer

  console.log("Minting 1000 tokens to deployer...");


  const mintAmount = ethers.parseEther("1000"); // 1000 tokens (với 18 decimals)
  const mintTx = await MyMintableToken.mint(deployer, mintAmount);
  await mintTx.wait();

  console.log("Minted 1000 tokens successfully!");

  // Kiểm tra balance của deployer
  const balance = await MyMintableToken.balanceOf(deployer);
  const formattedBalance = ethers.formatEther(balance);

  console.log("Balance Information:");
  console.log("Deployer Address:", deployer);
  console.log("Balance:", formattedBalance, "MMT");

};

func.tags = ["mintabletoken"];
export default func;
