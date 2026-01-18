import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    ""
  ];
  const contractAddress = "0x5b05a6FD5F625F53Bf77f274daaBd1c224896634"; // Replace with your contract address
  const contract = new ethers.Contract(contractAddress, abi, provider);

  /**
   * Mint a NFT to deployer
   */
}

main().catch(console.error);
