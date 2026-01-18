import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { MyNFT } from "../typechain";

describe("MyNFT", function () {
  let deployer: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let myNFT: MyNFT;

  const deploy = async () => {
    [deployer, addr1, addr2] = await ethers.getSigners();

    // Deploy MyNFT contract
    myNFT = await (await ethers.getContractFactory("MyNFT")).deploy();
  };

  before(async () => {
    console.log("Deploying MyNFT contract...");
    await deploy();
  });

  describe("Deployment", function () {
    it("Should set the correct name", async function () {
      expect(await myNFT.name()).to.equal("MyNFT");
    });

    it("Should set the correct symbol", async function () {
      expect(await myNFT.symbol()).to.equal("MNFT");
    });

    it("Should set nextTokenId to 0 initially", async function () {
      expect(await myNFT.nextTokenId()).to.equal(0n);
    });

    it("Should set deployer as owner", async function () {
      expect(await myNFT.owner()).to.equal(deployer.address);
    });
  });

  describe("Minting", function () {
    it("Should mint NFT to deployer", async function () {
      await myNFT.mint(deployer.address);
      
      expect(await myNFT.ownerOf(0)).to.equal(deployer.address);
      expect(await myNFT.nextTokenId()).to.equal(1n);
      expect(await myNFT.balanceOf(deployer.address)).to.equal(1n);
    });

    it("Should increment nextTokenId after minting", async function () {
      const initialTokenId = await myNFT.nextTokenId();
      
      await myNFT.mint(addr1.address);
      
      expect(await myNFT.nextTokenId()).to.equal(initialTokenId + 1n);
      expect(await myNFT.ownerOf(initialTokenId)).to.equal(addr1.address);
    });

    it("Should allow owner to mint multiple NFTs", async function () {
      await myNFT.mint(addr2.address);
      await myNFT.mint(deployer.address);
      
      const tokenId1 = await myNFT.nextTokenId() - 2n;
      const tokenId2 = await myNFT.nextTokenId() - 1n;
      
      expect(await myNFT.ownerOf(tokenId1)).to.equal(addr2.address);
      expect(await myNFT.ownerOf(tokenId2)).to.equal(deployer.address);
    });

    it("Should fail if non-owner tries to mint", async function () {
      try {
        await myNFT.connect(addr1).mint(addr1.address);
        expect.fail("Should have reverted");
      } catch (error: any) {
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      }
    });
  });

  describe("Token Ownership", function () {
    it("Should return correct owner for token", async function () {
      await myNFT.mint(addr1.address);
      const tokenId = (await myNFT.nextTokenId()) - 1n;
      
      expect(await myNFT.ownerOf(tokenId)).to.equal(addr1.address);
    });

    it("Should update balance after minting", async function () {
      const initialBalance = await myNFT.balanceOf(addr2.address);
      
      await myNFT.mint(addr2.address);
      
      expect(await myNFT.balanceOf(addr2.address)).to.equal(initialBalance + 1n);
    });
  });
});
