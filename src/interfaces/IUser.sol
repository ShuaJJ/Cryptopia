// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IUser {
    function verify(address user) external;
    function applyVerify() external;
    function updateUserInfo(uint256 cid) external;
    function owner() external returns (address);
}