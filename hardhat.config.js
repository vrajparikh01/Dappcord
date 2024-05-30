require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("hardhat-abi-exporter");
require("hardhat-gas-reporter");
require("dotenv").config();

const defaultKey =
  "0000000000000000000000000000000000000000000000000000000000000000";

const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const GOERLI_URL = process.env.GOERLI_URL;
const OPTIMIZER_RUNS = process.env.OPTIMIZER_RUNS;
const OPTIMIZER_FLAG = process.env.OPTIMIZER_FLAG;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          evmVersion: "istanbul",
        },
      },
    ],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    hardhat: {
      chainId: 1337,
      zksync: true,
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },

  abiExporter: [
    {
      path: "./abi/json",
      runOnCompile: true,
      clear: true,
      flat: true,
      spacing: 2,
      format: "json",
    },
    {
      path: "./abi/minimal",
      runOnCompile: true,
      clear: true,
      flat: true,
      spacing: 2,
      format: "minimal",
    },
  ],
};
