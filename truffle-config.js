const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "citizen load bounce obscure audit noble payment obtain guard skull author theme";


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/96f9b4f3df8a4220a67f68df793d67ff");
      },
        network_id: 4,
        gas: 4500000,
        gasPrice: 10000000000,
    },
  },

};
