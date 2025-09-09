🌉 Somnia Bridge



A fully on-chain, trustless token bridge built natively for the \*\*Somnia Network\*\*.  

No relayers. No backend. Just smart contracts.





🎬 Demo Video  

\[!\[Watch the demo](https://img.shields.io/badge/Watch%20Demo-%F0%9F%93%BA-blue)](https://youtu.be/OUIPDk2HnT8)





⚙️ Project Structure





somnia-bridge-dapp/

├── contracts/       # Solidity contracts: Vault, WrappedToken, tUSDC

├── scripts/         # Deployment \& interaction scripts

├── test/            # Smart contract test cases

├── frontend/        # DApp frontend (HTML, JS, CSS)

├── diagrams/        # Architecture \& bridge flow visuals

├── .env             # (ignored) contains private keys or RPC

├── hardhat.config.js

├── package.json







&nbsp;🚀 Local Development



&nbsp;1. Launch Frontend



bash

cd frontend

python -m http.server 8080





Visit → \[http://localhost:8080](http://localhost:8080)



2\. Connect MetaMask



\- Select \*\*Somnia Testnet\*\*

\- Connect your wallet

\- Use the DApp to Lock / Mint / Burn / Unlock tokens





🔗 Deployed Contracts (Somnia Testnet)



| Contract                  | Address                                        |

| ------------------------- | ---------------------------------------------- |

| \*\*Vault\*\*                 | `0x0CF9e30fc6908837FBBB0A1487D2daf8Af670A44` ✅ |

| \*\*tUSDC Token\*\*           | `0x63d9e7Dfb2D2Efd259f7F6De35F2fFae2895Fed3` ✅ |

| \*\*WrappedToken (wtUSDC)\*\* | `0x129ADD623bbDa49b2666a6855dBcE47f0A79AE59` ✅ |





🛠 Tech Stack



\- Solidity (v0.8.20)

\- Ethers.js

\- MetaMask

\- Somnia Testnet

\- Python HTTP Server (for frontend)





🧪 How It Works



1\. 🔐 Lock ERC20 (e.g., tUSDC) → Mint wtUSDC  

2\. 🔓 Burn wtUSDC → Unlock original tUSDC  

3\. ✅ Everything is verified on-chain via explorer





📂 Environment Variables



Create a .env` file for your private keys and RPC (ignored in Git):



env

PRIVATE\_KEY=your\_private\_key

RPC\_URL=https://your\_rpc\_url





🧠 About



Built for the \*\*Somnia DeFi Mini Hackathon\*\*, this project proves a fully decentralized bridge can work without any server, relayer, or backend logic. Powered entirely by code.





&nbsp;📩 Contact



\- 👨‍💻 Built by: \*\*Kishan Thakor\*\*

\- 📬 Telegram: \[@DocChain25](https://t.me/DocChain25)

\- 💻 GitHub: \[KISHU-PT](https://github.com/KISHU-PT)



