// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";

contract User is Ownable {

    event Follow(address indexed follower, address indexed follow);
    event Verify(address user, string cid);

    mapping(address user => string cid) public userInfo;
    // 0 is not verified; 1 is pending; 2 is verified
    mapping(address user => uint8 isVerified) public verified;
    mapping(address user => address[] follows) public myFollows;
    mapping(address user => mapping(address target => bool isFollowed)) public followed;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function verify(address user) external onlyOwner {
        require(bytes(userInfo[user]).length > 0, "Project info not uploaded");
        verified[user] = 2;
        emit Verify(user, userInfo[user]);
    }

    function applyVerify(string memory cid) external {
        require(verified[msg.sender] == 0, "Already applied");
        userInfo[msg.sender] = cid;
        verified[msg.sender] = 1;
    }

    function updateUserInfo(string memory cid) external {
        userInfo[msg.sender] = cid;
    }

    function follow(address user) external {
        require(!followed[msg.sender][user], "Already followed");
        myFollows[msg.sender].push(user);
        followed[msg.sender][user] = true;
        emit Follow(msg.sender, user);
    }
}