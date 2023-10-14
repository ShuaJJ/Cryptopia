// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";

contract User is Ownable {

    mapping(address user => uint256 cid) userInfo;
    mapping(address user => bool isVerified) verified;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function verify(address user) external onlyOwner {
        verified[user] = true;
    }

    function updateUserInfo(uint256 cid) external {
        userInfo[msg.sender] = cid;
    }
}