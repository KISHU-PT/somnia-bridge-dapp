const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault Bridge", function () {
  let deployer, user;
  let token, vault, wrapped;

  const INITIAL_SUPPLY = ethers.parseEther("1000");
  const BRIDGE_AMOUNT = ethers.parseEther("100");

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();

    // Deploy test ERC-20 token
    const Token = await ethers.getContractFactory("TestToken");
    token = await Token.deploy("Test Token", "TST", INITIAL_SUPPLY);
    await token.waitForDeployment();

    // Deploy Vault
    const Vault = await ethers.getContractFactory("Vault");
    vault = await Vault.deploy();
    await vault.waitForDeployment();

    // Deploy WrappedToken via Vault
    const deployTx = await vault.deployWrappedToken(await token.getAddress(), "Wrapped TST", "wTST");
    await deployTx.wait();

    // Get wrapped token address
    const wrappedAddr = await vault.wrappedTokens(await token.getAddress());
    wrapped = await ethers.getContractAt("WrappedToken", wrappedAddr);

    // Transfer tokens to user
    await token.transfer(user.address, BRIDGE_AMOUNT);
  });

  it("should lock original token and mint wrapped", async () => {
    // Approve Vault to spend user tokens
    const tokenConnected = token.connect(user);
    await tokenConnected.approve(await vault.getAddress(), BRIDGE_AMOUNT);

    // Lock
    const vaultConnected = vault.connect(user);
    await vaultConnected.lock(await token.getAddress(), BRIDGE_AMOUNT);

    // Check balances
    const locked = await token.balanceOf(await vault.getAddress());
    const wrappedBalance = await wrapped.balanceOf(user.address);

    expect(locked).to.equal(BRIDGE_AMOUNT);
    expect(wrappedBalance).to.equal(BRIDGE_AMOUNT);
  });

  it("should burn wrapped and unlock original token", async () => {
    // Approve and lock first
    await token.connect(user).approve(await vault.getAddress(), BRIDGE_AMOUNT);
    await vault.connect(user).lock(await token.getAddress(), BRIDGE_AMOUNT);

    // Unlock
    await vault.connect(user).unlock(await token.getAddress(), BRIDGE_AMOUNT);

    // Check final balances
    const vaultBalance = await token.balanceOf(await vault.getAddress());
    const wrappedBalance = await wrapped.balanceOf(user.address);
    const userBalance = await token.balanceOf(user.address);

    expect(vaultBalance).to.equal(0);
    expect(wrappedBalance).to.equal(0);
    expect(userBalance).to.equal(BRIDGE_AMOUNT);
  });
});
