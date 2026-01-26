import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { MyToken } from "../typechain";

describe("MyToken", function () {
  let deployer: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let myToken: MyToken;

  const TOTAL_SUPPLY = ethers.parseUnits("1000000", 18); // 1,000,000 tokens

  const deploy = async () => {
    [deployer, addr1, addr2] = await ethers.getSigners();

    // Deploy MyToken contract
    myToken = await (await ethers.getContractFactory("MyToken")).deploy();
  };

  before(async () => {
    console.log("Deploying MyToken contract...");
    await deploy();
  });

  describe("Deployment", function () {
    it("Should set the correct name", async function () {
      expect(await myToken.name()).to.equal("MyToken");
    });

    it("Should set the correct symbol", async function () {
      expect(await myToken.symbol()).to.equal("MTK");
    });

    it("Should set the correct decimals", async function () {
      expect(await myToken.decimals()).to.equal(18n);
    });

    it("Should mint total supply to deployer", async function () {
      const balance = await myToken.balanceOf(deployer.address);
      expect(balance).to.equal(TOTAL_SUPPLY);
    });

    it("Should set the correct total supply", async function () {
      const totalSupply = await myToken.totalSupply();
      expect(totalSupply).to.equal(TOTAL_SUPPLY);
    });
  });

  describe("Transfer", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseUnits("100", 18);

      // Transfer from deployer to addr1
      await myToken.transfer(addr1.address, transferAmount);
      expect(await myToken.balanceOf(addr1.address)).to.equal(transferAmount);

      // Transfer from addr1 to addr2
      await myToken.connect(addr1).transfer(addr2.address, ethers.parseUnits("50", 18));
      expect(await myToken.balanceOf(addr2.address)).to.equal(ethers.parseUnits("50", 18));
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialBalance = await myToken.balanceOf(addr1.address);
      
      // Try to transfer more than balance - should revert
      try {
        await myToken.connect(addr1).transfer(addr2.address, initialBalance + 1n);
        expect.fail("Should have reverted");
      } catch (error: any) {
        expect(error.message).to.include("ERC20InsufficientBalance");
      }
    });
  });
});
