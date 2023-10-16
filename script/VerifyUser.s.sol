// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21 <0.9.0;

import { IUser } from "../src/interfaces/IUser.sol";
import { BaseScript } from "./Base.s.sol";
import "forge-std/console.sol";

contract VerifyUser is BaseScript {
    function run(address contractAddress, address toVerify) public broadcast returns (bool) {
        IUser user = IUser(contractAddress);
        user.verify(toVerify);
        return true;
    }
}
