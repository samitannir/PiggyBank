# PiggyBank
A Decentralized Insurance App Built on the Ethereum Rinkeby Network
You can read the full presentation here. (https://docs.google.com/presentation/d/1GX7j-ITtn183MN-VjvUEBkm3hpNfQ0GbWEw7SXTnUIc/edit?usp=sharing)

### ABOUT PIGGYBANK:

The Insurance Industry Is More Flawed Than You Think.
Fraud: Currently takes a significant 30% cut of all insurance revenue across America.

Time: Insurance firms take forever to process your claim… and in the times you need it most you have to wait sometimes weeks on end due to long process times, on top of that you have to let a third party judge your situation and can get denied!

Expensive: The high amount you are paying today currently is a 70/30 split, 70% goes towards overhead and covering risk management and fraud costs - the other 30% goes towards your protection.

PIGGYBANK is a peer-to-peer insurance DeFi app built on the Ethereum blockchain, create an insurance pool which is governed by the members in it! 
Cheaper than regular insurance

Don’t have to pay or depend on a third party

Instant payouts when your claim is accepted

### ABOUT THE DAPP:

This app is created with Solidity and react, with truffle being used to bootstrap the project and handle deployments of the smart contract. 

The smart contract has following attributes

mapping contributors : used to keep track of contibutors
uint8 contributorsCount: used to restrict contributors to 2
struct Claim: Claim struct which represts insurance claims made by a member
Claim claim: Variable used to store refrence of active claim

And following functions

becomeMember() : a payable function responsible to handle member registrations with fixed payable amount of 1 ethereum
rePay(): this function allows users to recontribute to smart contract after initial joining
escrowBalance(): a pure funtion that returns balance of contract
createRequest(): function takes 2 parameters a claim description and value , using these values from user and validations it creates a Claim
approveClaim(): after 1 user have created a claim second user can approve claim.
rejectClaim(): after 1 user have created a claim second user can reject claim by calling this function.


On the Front end , web3js is used to interact with smart contract with help of metamask extension. 
all of the smartcontract functions are called according to user interaction with frontend and proper error messages are displayed or success messages are shown accordingly. 

### TO INSTALL AND RUN (Only on Rinkeby):
1. Install nodejs
2. run this comamnd in cmd:
	npm install -g truffle	

3. navigate to project directory and run:
	npm install truffle-hdwallet-provider
  
4. run:
	truffle migrate --network rinkeby
  
5. navigate to client folder run: 
	npm install 
  
6. stay there and run:
	npm start

7. to reset smart contract use this command:
	truffle migrate --network rinkeby --reset
	
### About Me

I am a young software developer, I am just finishing my studies now at George Brown and York University with a Business Commerce Degree and a specialized certification as a Blockchain developer, my education path accurately represents my interests as I want to pursue the business behind Blockchain in my career. I began working in the space at the beginning of this year when I got the opportunity to intern at a blockchain company named CRE8 – I worked for 3 months as a backend and blockchain developer doing Solidity, Node.Js, and EVM programming. At my latest job at Conflux which is also a blockchain company, I am a business analyst. I study and write reports on the decentralized finance space and am actively involved in providing information and news of the market to team members.
