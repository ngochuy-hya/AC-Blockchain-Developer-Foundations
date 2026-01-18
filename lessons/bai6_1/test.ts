import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    ""
  ];
  const contractAddress = "0x802B4b488bd2716315CBB63e3f21AA5b82b2879F"; // Replace with your contract address
  const contract = new ethers.Contract(contractAddress, abi, provider);

  /**
   * Get the current balance of deployer
   */
}

main().catch(console.error);
