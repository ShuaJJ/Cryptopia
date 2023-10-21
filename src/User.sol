// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { SismoConnect } from "sismo-connect-solidity/SismoConnectLib.sol";

contract User is Ownable, SismoConnect {

    event Follow(address indexed follower, address indexed follow, string cid);
    event Verify(address user, string cid);
    event ApplyVerify(address user, string cid);
    event ResponseVerified(SismoConnectVerifiedResult result);

    mapping(address user => string cid) public userInfo;
    // 0 is not verified; 1 is pending; 2 is verified
    mapping(address user => uint8 isVerified) public verified;
    mapping(string githubId => bool verified) public githubVerified;
    mapping(address user => address[] follows) public myFollows;
    mapping(address user => mapping(address target => bool isFollowed)) public followed;

    constructor(address initialOwner) Ownable(initialOwner) 
        SismoConnect(
            buildConfig({
                appId: 0x5dc7f3d6e3a6bd3ae49fcfc876ecf217,
                isImpersonationMode: true
            })
        )
    {}

    function verifySismoConnectResponse(bytes memory response) public {
        AuthRequest[] memory auths = new AuthRequest[](1);
        auths[0] = buildAuth({authType: AuthType.GITHUB});

        ClaimRequest[] memory claims = new ClaimRequest[](1);
        // Project repo(ShuaJJ/Cryptopia) starrers
        claims[0] = buildClaim({groupId: 0xfd931046287010533fccee33b62514a4});

        // verify the response regarding our original request
        SismoConnectVerifiedResult memory result = verify({
            responseBytes: response,
            auths: auths,
            claims: claims,
            signature: buildSignature({message: "I starred the project repo"})
        });
        emit ResponseVerified(result);

        uint256 githubId = SismoConnectHelper.getUserId(result, AuthType.GITHUB);
        require(!githubVerified[githubId], "This githubId already verified");
        githubVerified[githubId] = true;

        require(bytes(userInfo[user]).length > 0, "Project info not uploaded");
        verified[user] = 2;
        emit Verify(user, userInfo[user]);
    }

    function applyVerify(string memory cid) external {
        require(verified[msg.sender] == 0, "Already applied");
        userInfo[msg.sender] = cid;
        verified[msg.sender] = 1;
        emit ApplyVerify(msg.sender, cid);
    }

    function updateUserInfo(string memory cid) external {
        userInfo[msg.sender] = cid;
    }

    function follow(address user) external {
        require(!followed[msg.sender][user], "Already followed");
        myFollows[msg.sender].push(user);
        followed[msg.sender][user] = true;
        emit Follow(msg.sender, user, userInfo[user]);
    }
}