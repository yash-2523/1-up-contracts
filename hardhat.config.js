require("@nomicfoundation/hardhat-toolbox");
require('hardhat-docgen');

/** @type import('hardhat/config').HardhatUserConfig */
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const PRIVATE_KEY = "Your private key with 0x prefix";

module.exports = {
  networks: {
    arbitrum_testnet: {
      url: "Alchmey arbitrum testnet url",
      chainId: 421613,
      gasPrice: 225000000000,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    arbitrumOne: {
      url: "Alchmey arbitrum mainnet url",
      chainId: 42161,
      gasPrice: 225000000000,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    polygonMumbai: {
      url: "Alchmey polygon mainnet url",
      chainId: 80001,
      gasPrice: 225000000000,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    polygon: {
      url: "Alchmey polygon mainnet url",
      chainId: 137,
      gasPrice: 225000000000,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },
  etherscan: {
    apiKey:{
      "arb_testnet": "Arbitrum api key",
      "arbitrumOne": "Arbitrum api key",
      "polygonMumbai": "Polygon api key",
      "polygon": "Polygon api key",
    },
    customChains: [
      {
        network: "arb_testnet",
        chainId: 421613,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io/"
        }
      }
    ]
  }
};
