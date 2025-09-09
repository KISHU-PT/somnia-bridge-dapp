require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load .env for private key

module.exports = {
  solidity: "0.8.20",

  networks: {
    somnia: {
      url: "https://rpc.testnet.somnia.network", // 🚨 Replace with official RPC if different
      accounts: [process.env.PRIVATE_KEY] // Set in .env
    },
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
