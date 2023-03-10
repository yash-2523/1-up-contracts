require("@nomicfoundation/hardhat-toolbox");
require('hardhat-docgen');

/** @type import('hardhat/config').HardhatUserConfig */
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const PRIVATE_KEY = "Your private key";
const API_KEY = "YOUR API KEY";

module.exports = {
  networks: {
    bscTestnet: {
      url: "https://bsctestapi.terminet.io/rpc",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    avax: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
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
    apiKey: API_KEY
  }
};
