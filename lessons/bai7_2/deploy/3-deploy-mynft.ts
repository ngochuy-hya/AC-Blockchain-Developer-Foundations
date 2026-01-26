import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("====================");
  console.log(hre.network.name);
  console.log("====================");

  console.log("====================");
  console.log("Deploy MyNFT Contract");
  console.log("====================");

  const myNFT = await deploy("MyNFT", {
    contract: "MyNFT",
    args: [],
    from: deployer,
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false,
  });

  console.log("====================");
  console.log("MyNFT deployed at:", myNFT.address);
  console.log("Deployer:", deployer);
  console.log("====================");

  // Mint 1 NFT cho deployer
  console.log("====================");
  console.log("Minting NFT to deployer...");
  console.log("====================");

  const myNFTContract = await ethers.getContractAt("MyNFT", myNFT.address);
  const mintTx = await myNFTContract.mint(deployer);
  await mintTx.wait();

  console.log("✅ NFT minted successfully!");

  // In ownerOf(0)
  const owner = await myNFTContract.ownerOf(0);
  console.log("====================");
  console.log("Owner of token ID 0:", owner);
  console.log("====================");
};

func.tags = ["mynft"];
export default func;
