pragma solidity >=0.4.21 <0.7.0;

contract CommunityLoans {
  address public owner;
    mapping(address => bool) public contributors;
    uint8 contributorsCount = 0;
    struct Claim {
        string description;
        uint value;
        address payable recipient;
        bool approved;
        bool active;
        uint approvalCount;
    }
    // Claim[] public claims;
    Claim public claim;
  constructor() public {
    owner = msg.sender;
  }

   function becomeMember() public payable returns (uint256  value) {
            require(msg.value == 1 ether, "please send 1 ethereum");
            require(contributorsCount < 2, "Sorry, member space is full");
            contributors[msg.sender] = true;
            contributorsCount++;
            return msg.value;
    }
    function rePay() public payable {
        require(contributors[msg.sender], "only mebers can recontribute");
    }
        function escrowBalance() public view returns (uint) {
        return address(this).balance;
    }
    
       function createRequest(string memory description, uint256 amount) public {
           require(contributors[msg.sender], "Only contibutors can make a claim");
           require(amount !=  0 wei, "amount can't be 0");
           require(!claim.active, "there can be only one active claim");
           require(address(this).balance >= amount, "not enough balance to claim");
           Claim memory newClaim = Claim({
           description: description,
           value: amount,
           recipient: msg.sender,
           active: true,
           approved: false,
           approvalCount: 0
        });

        claim =  newClaim;
    }
    
     function approveClaim() public {
        // function approveClaim(uint index) public {
        // Claim storage claim = claims[index];
        require(contributors[msg.sender],"Only members can approve claims");
        require(claim.recipient != msg.sender,"You cannot approve your own claim");
        claim.approved = true;
        claim.active = false;
        claim.recipient.transfer(claim.value);
    }
         function rejectClaim() public {
        require(contributors[msg.sender],"Only members can reject claims");
        require(claim.recipient != msg.sender,"You cannot reject your own claim");
        claim.recipient = 0x0000000000000000000000000000000000000000;
        claim.active = false;
    }

}