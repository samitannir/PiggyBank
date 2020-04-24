var CommunityLoans = artifacts.require("./CommunityLoans.sol");

module.exports = function(deployer,network, accounts) {
  deployer.deploy(CommunityLoans,{from: accounts[0]});
};
