let provider, signer, vault;

const VAULT_ADDRESS = "0x0CF9e30fc6908837FBBB0A1487D2daf8Af670A44";
const VAULT_ABI = [
  "function lock(address token, uint256 amount, address wrappedToken) external",
  "function unlock(address token, uint256 amount, address wrappedToken) external"
];

// Token addresses (hardcoded for tUSDC test)
const TOKEN_ADDRESS = "0x63d9e7Dfb2D2Efd259f7F6De35F2fFae2895Fed3";
const WRAPPED_ADDRESS = "0x129ADD623bbDa49b2666a6855dBcE47f0A79AE59";

window.onload = () => {
  document.getElementById("connectBtn").onclick = connectWallet;
  document.getElementById("lockBtn").onclick = lockTokens;
  document.getElementById("unlockBtn").onclick = unlockTokens;
};

async function connectWallet() {
  if (!window.ethereum) return log("MetaMask not found.");

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    const address = await signer.getAddress();
    document.getElementById("walletAddress").textContent = "Connected: " + address;

    vault = new ethers.Contract(VAULT_ADDRESS, VAULT_ABI, signer);
    log("Wallet connected: " + address);
  } catch (err) {
    log("Wallet connection failed: " + cleanError(err));
  }
}

async function lockTokens() {
  const amount = document.getElementById("lockAmount").value.trim();
  if (!amount) return log("Enter amount to lock.");

  try {
    const token = new ethers.Contract(TOKEN_ADDRESS, [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ], signer);

    const amountWei = ethers.utils.parseUnits(amount, 18);

    const tx1 = await token.approve(VAULT_ADDRESS, amountWei);
    await tx1.wait();
    log("Approved " + amount + " tokens");

    const tx2 = await vault.lock(TOKEN_ADDRESS, amountWei, WRAPPED_ADDRESS);
    await tx2.wait();
    log("Locked " + amount + " tUSDC and minted wtUSDC");
  } catch (err) {
    log("Lock error: " + cleanError(err));
  }
}

async function unlockTokens() {
  const amount = document.getElementById("unlockAmount").value.trim();
  if (!amount) return log("Enter amount to unlock.");

  try {
    const amountWei = ethers.utils.parseUnits(amount, 18);
    const tx = await vault.unlock(TOKEN_ADDRESS, amountWei, WRAPPED_ADDRESS);
    await tx.wait();
    log("Burned wtUSDC and unlocked " + amount + " tUSDC");
  } catch (err) {
    log("Unlock error: " + cleanError(err));
  }
}

function log(msg) {
  const logBox = document.getElementById("logBox");
  const time = new Date().toLocaleTimeString();
  logBox.textContent = `[${time}] ${msg}\n` + logBox.textContent;
}

function cleanError(err) {
  if (err?.data?.message) return err.data.message;
  if (err?.error?.message) return err.error.message;
  return err.message || "Unknown error";
}
