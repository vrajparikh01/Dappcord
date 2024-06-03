# Dappcord - Web3 Discord DApp

## Overview

Dappcord is basically a web3 version of discord where people can join the channles and communicate with each other. Difference is that here people have to pay some amount of eth in order to join a particular channel. For example, in this dapp, to join development channel, you have to pay 1 eth and for meme channel, you have to pay 0.5 eth. You cannot see pr send the messages unless you pay the amount and join the channel. And, I have used socket for chat communication.

## DApp Instructions

### Prerequisites

- **Metamask:** Install Metamask to access the DApp.

### Deploy Smart Contract on Ethereum Sepolia

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

### Smart contract coverage

It is a plugin to measure the test coverage in your project. Coverage of Dappcord contract is 92.86% 

   ```bash
   npx hardhat coverage
   ```

### Configuration for the DApp

1. **Copy and Paste ABI**

   - Copy the ABI (Application Binary Interface) of the dappcord contract. (You can use hardhat-abi-exporter package for that or fetch directly from artifacts)
   - Paste the ABI files into the `frontend/src/abis` folder.

2. **Update Contract Addresses**
   - Update the contract address of the dappcord contract in the `frontend/config.json` file.

### Running the DApp Locally

1. **Navigate to the Client Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   node frontend/server.js
   ```

4. **Start the Development Server**
   ```bash
   npm run start
   ```
