const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*"       // Any network (default: none)
    },
    kovan: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic:       {phrase: `${process.env.MNEMONIC}`},
          providerOrUrl:  `https://kovan.infura.io/v3/${process.env.INFURA_ID}`,
        }),
      network_id: '42',
    }
  },
  compilers: {
    solc: {
      version: "0.8.13"
    }
  },
  mocha: {},
};
