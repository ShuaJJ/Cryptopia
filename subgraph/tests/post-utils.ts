import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { Comment, CreatePost } from "../generated/Post/Post"

export function createCommentEvent(user: Address, content: string): Comment {
  let commentEvent = changetype<Comment>(newMockEvent())

  commentEvent.parameters = new Array()

  commentEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  commentEvent.parameters.push(
    new ethereum.EventParam("content", ethereum.Value.fromString(content))
  )

  return commentEvent
}

export function createCreatePostEvent(
  author: Address,
  postType: i32,
  cid: string
): CreatePost {
  let createPostEvent = changetype<CreatePost>(newMockEvent())

  createPostEvent.parameters = new Array()

  createPostEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )
  createPostEvent.parameters.push(
    new ethereum.EventParam(
      "postType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(postType))
    )
  )
  createPostEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromString(cid))
  )

  return createPostEvent
}
