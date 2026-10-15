<div align="center">

# 🛡️ Video Integrity Verifier (dApp)

**A decentralized application for timestamping, notarizing, and verifying video authenticity on the Ethereum blockchain.**

![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-FFF100?style=for-the-badge&logo=ethereum&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MetaMask](https://img.shields.io/badge/MetaMask-E2761B?style=for-the-badge&logo=metamask&logoColor=white)

<!-- Se hai uno screenshot dell'interfaccia, caricalo nella cartella frontend/src/assets e inseriscilo qui: -->
<!-- <img src="screenshot.png" alt="dApp Interface Preview" width="700"/> -->

</div>

---

## 📌 Problem & Solution

In an era of deepfakes and media tampering, verifying that a video has not been altered is critical. 

This dApp solves this problem by using **cryptographic hashing and blockchain immutability**:
1. The video file is processed locally in the browser to compute its unique cryptographic hash (without uploading the heavy media file).
2. The hash and timestamp are permanently anchored to the blockchain via a **Solidity smart contract**.
3. Anyone can upload the clip at any future point to instantly check if the hash matches the on-chain record.

---

## ⚡ Key Features

- 🔒 **Client-Side Hashing:** Media clips are hashed locally for maximum privacy and zero bandwidth overhead.
- 📜 **Tamper-Proof Smart Contracts:** Built and tested with **Hardhat** to store hashes immutably on-chain.
- 🦊 **MetaMask Integration:** Direct Web3 wallet connection to sign and submit verification transactions.
- 🖱️ **Drag-and-Drop UI:** Minimalist interface with single-click actions (*Secure Clip* & *Verify Clip*).

---

## 🏗️ Architecture & Tech Stack

- **Smart Contracts:** Solidity, Hardhat, Hardhat Ignition
- **Frontend:** JavaScript, Vite (React / Vanilla UI), HTML5, CSS3
- **Web3 Layer:** Ethers.js / Web3.js, MetaMask Provider

---

## 🚀 Getting Started

### Prerequisites

- [Node.js (v18+)](https://nodejs.org/) & `npm`
- [MetaMask browser extension](https://metamask.io/) installed

---

### 1. Smart Contract Setup (Hardhat)

Clone the repository and install root dependencies:

```bash
git clone https://github.com/BillyErMago/<NOME-REPO>.git
cd <NOME-REPO>
npm install
```

Compile contracts and run local blockchain tests:

```bash
# Compile contracts
npx hardhat compile

# Run automated tests
npx hardhat test
```

*(Optional) Start a local Hardhat node and deploy:*
```bash
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/<YourModule>.js --network localhost
```

---

### 2. Frontend Setup

In a new terminal window, start the frontend development server:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

Open your browser at:
```text
http://localhost:5173/
```

---

## 🎮 How to Use

1. **Connect Wallet:** Click the **Connect MetaMask** button on the top right. Ensure your wallet is connected to the same network as the deployed contract (e.g., Localhost or Sepolia Testnet).
2. **Secure a Video (Notarize):**
   - Drag and drop your video file into the **"DROP YOUR CLIP HERE"** area.
   - Click **Secure Clip** and approve the MetaMask transaction to anchor the video's fingerprint to the blockchain.
3. **Verify Integrity:**
   - Drop any video into the dropzone.
   - Click **Verify Clip** to compare its hash against the contract records and confirm if the video is authentic and untampered.

---

## 👤 Author

- **BillyErMago** - [GitHub Profile](https://github.com/BillyErMago)
