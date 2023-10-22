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
} from "sismo-connect-solidity/src/SismoConnectLib.sol";
import { IWormholeRelayer } from "./interfaces/IWormholeRelayer.sol";
import { IWormholeReceiver } from "wormhole-solidity-sdk/interfaces/IWormholeReceiver.sol";
import { AxelarExecutable } from 'axelar-gmp-sdk-solidity/executable/AxelarExecutable.sol';
import { IAxelarGateway } from 'axelar-gmp-sdk-solidity/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from 'axelar-gmp-sdk-solidity/interfaces/IAxelarGasService.sol';

contract User is Ownable, SismoConnect, IWormholeReceiver, AxelarExecutable {

    event Follow(address indexed follower, address indexed follow, string cid);
    event Verify(address user, string cid);
    event ApplyVerify(address user, string cid);
    event ResponseVerified(SismoConnectVerifiedResult result);
    event VerificationReceived(address sender, uint16 sourceChain);

    uint256 constant GAS_LIMIT = 50_000;
    IWormholeRelayer public immutable wormholeRelayer;
    IAxelarGasService public immutable gasService;
    mapping(bytes32 hashed => bool seen) public seenDeliveryVaaHashes;

    mapping(address user => string cid) public userInfo;
    // 0 is not verified; 1 is pending; 2 is verified
    mapping(address user => uint8 isVerified) public verified;
    mapping(uint256 githubId => bool verified) public githubVerified;
    mapping(address user => address[] follows) public myFollows;
    mapping(address user => mapping(address target => bool isFollowed)) public followed;

    constructor(address initialOwner, address _wormholeRelayer, address _axelarGateway, address _axelarGasService) 
        Ownable(initialOwner) 
        AxelarExecutable(_axelarGateway)
        SismoConnect(
            buildConfig({
                appId: 0x5dc7f3d6e3a6bd3ae49fcfc876ecf217
            })
        )
    {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
        gasService = IAxelarGasService(_axelarGasService);
    }

    function setRemoteVerification(
        string memory destinationChain,
        string memory destinationAddress,
        string memory cid,
        address toVerify,
        uint256 gasFee
    ) public {
        require(gasFee > 0, "Gas payment is required");

        bytes memory payload = abi.encode(cid, toVerify);
        gasService.payNativeGasForContractCall{ value: gasFee }(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            toVerify
        );
        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    function verifySismoConnectResponse(bytes memory response, bool crosschain) public payable {
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

        string memory cid = userInfo[msg.sender];

        require(bytes(cid).length > 0, "Project info not uploaded");
        verified[msg.sender] = 2;
        emit Verify(msg.sender, cid);

        if (crosschain) {
            require(msg.value > 0, "Cross chain gas fee needed");
            if (block.chainid == 421613 || block.chainid == 80001) {
                // send verified user address to other supported chains as well
                wormholeRelayer.sendPayloadToEvm(
                    uint16(block.chainid == 421613 ? 80001 : 421613),
                    address(this),
                    abi.encode(cid, msg.sender),
                    0,
                    GAS_LIMIT
                );
            } else {
                string memory chainName = block.chainid == 5001 ? "mantle" : "scroll";
                string memory destinationAddress = string(abi.encodePacked(address(this)));
                setRemoteVerification(chainName, destinationAddress, cid, msg.sender, msg.value);
                setRemoteVerification(string("Polygon"), destinationAddress, cid, msg.sender, msg.value);
                setRemoteVerification(string("arbitrum"), destinationAddress, cid, msg.sender, msg.value);
            }
        }


    }

    function _execute(
        string calldata sourceChain_,
        string calldata sourceAddress_,
        bytes calldata payload_
    ) internal override {
        (string memory cid, address toVerify) = abi.decode(payload_, (string, address));
        userInfo[toVerify] = cid;
        verified[toVerify] = 2;
        emit Verify(toVerify, cid);
    }

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory, // additionalVaas
        bytes32 sourceAddress,
        uint16 sourceChain,
        bytes32 deliveryHash
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

    function applyVerify(string calldata cid) external {
        require(verified[msg.sender] == 0, "Already applied");
        userInfo[msg.sender] = cid;
        verified[msg.sender] = 1;
        emit ApplyVerify(msg.sender, cid);
    }

    function updateUserInfo(string calldata cid) external {
        userInfo[msg.sender] = cid;
    }

    function follow(address user) external {
        require(!followed[msg.sender][user], "Already followed");
        myFollows[msg.sender].push(user);
        followed[msg.sender][user] = true;
        emit Follow(msg.sender, user, userInfo[user]);
    }
}