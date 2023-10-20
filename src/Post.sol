// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

struct PostItem {
    string cid;
    address author;
    uint8 postType;
    uint256 updatedAt;
}

contract Post {

    event Comment (
        address user,
        string content
    );

    event CreatePost (
        address indexed author,
        uint8 indexed postType,
        string cid
    );

    mapping(address user => PostItem[] posts) public myPosts;
    PostItem[] public allPosts;

    function createPost(string memory cid, uint8 postType) external {
        PostItem memory post = PostItem({
            cid: cid,
            author: msg.sender,
            postType: postType,
            updatedAt: block.timestamp
        });
        myPosts[msg.sender].push(post);
        allPosts.push(post);
        emit CreatePost(msg.sender, postType, cid);
    }

    function comment(string memory content) external {
        emit Comment(msg.sender, content);
    } 
}