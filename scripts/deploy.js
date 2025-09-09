// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contracts with:", deployer.address);

  // 1. Deploy Vault
  const Vault = await hre.ethers.getContractFactory("Vault");
  const vault = await Vault.deploy();
  await vault.waitForDeployment();
  console.log("✅ Vault deployed to:", await vault.getAddress());

  // Example token to wrap (replace with deployed ERC20 token on Somnia testnet)
  const originalToken = "0xYourTestTokenAddress"; // <- Replace with your real test token address

  // 2. Deploy WrappedToken from Vault
  const tx = await vault.deployWrappedToken(
    originalToken,
    "Wrapped USDC",
    "wUSDC"
  );
  await tx.wait();
  console.log("✅ Wrapped token deployed via Vault");

  // 3. Fetch wrapped token address
  const wrappedAddr = await vault.wrappedTokens(originalToken);
  console.log("📦 Wrapped token address:", wrappedAddr);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
