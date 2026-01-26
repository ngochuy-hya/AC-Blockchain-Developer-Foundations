import "@nomicfoundation/hardhat-chai-matchers";
import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { MyMintableToken } from "../typechain";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import "@nomicfoundation/hardhat-chai-matchers";

describe("MyMintableToken", function () {
  let myMintableToken: MyMintableToken;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    // Lấy các signers
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy contract
    const MyMintableTokenFactory = await ethers.getContractFactory(
      "MyMintableToken"
    );
    myMintableToken = (await MyMintableTokenFactory.deploy()) as MyMintableToken;
    await myMintableToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right token name and symbol", async function () {
      expect(await myMintableToken.name()).to.equal("MyMintableToken");
      expect(await myMintableToken.symbol()).to.equal("MMT");
    });

    it("Should set the right owner", async function () {
      expect(await myMintableToken.owner()).to.equal(owner.address);
    });

    it("Should have 0 initial supply", async function () {
      expect(await myMintableToken.totalSupply()).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000");
      await myMintableToken.mint(user1.address, mintAmount);

      expect(await myMintableToken.balanceOf(user1.address)).to.equal(
        mintAmount
      );
      expect(await myMintableToken.totalSupply()).to.equal(mintAmount);
    });

    it("Should not allow non-owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("1000");

      await expect(
        myMintableToken.connect(user1).mint(user2.address, mintAmount)
      ).to.be.revertedWithCustomError(myMintableToken, "OwnableUnauthorizedAccount").withArgs(user1.address);
    });

    it("Should allow multiple mints", async function () {
      const mintAmount1 = ethers.parseEther("500");
      const mintAmount2 = ethers.parseEther("300");

      await myMintableToken.mint(user1.address, mintAmount1);
      await myMintableToken.mint(user2.address, mintAmount2);

      expect(await myMintableToken.balanceOf(user1.address)).to.equal(
        mintAmount1
      );
      expect(await myMintableToken.balanceOf(user2.address)).to.equal(
        mintAmount2
      );
      expect(await myMintableToken.totalSupply()).to.equal(
        mintAmount1 + mintAmount2
      );
    });
  });

  describe("Transfer", function () {
    beforeEach(async function () {
      // Mint 1000 tokens cho user1
      const mintAmount = ethers.parseEther("1000");
      await myMintableToken.mint(user1.address, mintAmount);
    });

    it("Should allow token transfers", async function () {
      const transferAmount = ethers.parseEther("100");

      await myMintableToken
        .connect(user1)
        .transfer(user2.address, transferAmount);

      expect(await myMintableToken.balanceOf(user1.address)).to.equal(
        ethers.parseEther("900")
      );
      expect(await myMintableToken.balanceOf(user2.address)).to.equal(
        transferAmount
      );
    });
  });
});
