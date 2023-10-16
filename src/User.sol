// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";

contract User is Ownable {

    mapping(address user => uint256 cid) public userInfo;
    // 0 is not verified; 1 is pending; 2 is verified
    mapping(address user => uint8 isVerified) public verified;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function verify(address user) external onlyOwner {
        verified[user] = 2;
    }

    function applyVerify() external {
        require(verified[msg.sender] == 0, "Already applied");
        verified[msg.sender] = 1;
    }

    function updateUserInfo(uint256 cid) external {
        userInfo[msg.sender] = cid;
    }
}