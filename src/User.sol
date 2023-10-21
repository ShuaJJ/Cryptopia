// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { 
    SismoConnect, 
    SismoConnectVerifiedResult, 
    AuthRequest,
    ClaimRequest,
    SismoConnectHelper,
    AuthType
} from "sismo-connect-solidity/SismoConnectLib.sol";
import { IWormholeRelayer } from "wormhole-relayer/interfaces/IWormholeRelayer.sol";
import { IWormholeReceiver } from "wormhole-relayer/interfaces/IWormholeReceiver.sol";

contract User is Ownable, SismoConnect, IWormholeReceiver {

    event Follow(address indexed follower, address indexed follow, string cid);
    event Verify(address user, string cid);
    event ApplyVerify(address user, string cid);
    event ResponseVerified(SismoConnectVerifiedResult result);
    event VerificationReceived(address sender, uint16 sourceChain);

    IWormholeRelayer public immutable wormholeRelayer;
    mapping(bytes32 hashed => bool seen) public seenDeliveryVaaHashes;

    mapping(address user => string cid) public userInfo;
    // 0 is not verified; 1 is pending; 2 is verified
    mapping(address user => uint8 isVerified) public verified;
    mapping(uint256 githubId => bool verified) public githubVerified;
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

        require(bytes(userInfo[msg.sender]).length > 0, "Project info not uploaded");
        verified[msg.sender] = 2;
        emit Verify(msg.sender, userInfo[msg.sender]);

        if (block.chainid == 11155111 || block.chainid == 80001) {
            // send verified user address to other supported chains as well
            wormholeRelayer.sendPayloadToEvm(
                block.chainid == 11155111 ? 80001 : 11155111, // send to another supported chain
                address(this),
                abi.encode(userInfo[msg.sender], msg.sender),
                0, // no receiver value needed
                50_000
            );
        }
    }

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory, // additionalVaas
        bytes32 sourceAddress,
        uint16 sourceChain,
        bytes32 // deliveryHash
    ) public payable override {
        require(msg.sender == address(this), "Only relayer allowed");

        // Ensure no duplicate deliveries
        require(!seenDeliveryVaaHashes[deliveryHash], "Message already processed");
        seenDeliveryVaaHashes[deliveryHash] = true;

        // Parse the payload and do the corresponding actions!

        (string memory senderInfo, address sender) = abi.decode(payload, (string, address));
        userInfo[sender] = senderInfo;
        verified[sender] = 2;
        emit Verify(sender, senderInfo);
        emit VerificationReceived(
            sender,
            sourceChain
        );
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