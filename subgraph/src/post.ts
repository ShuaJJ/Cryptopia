import {
  Comment as CommentEvent,
  CreatePost as CreatePostEvent
} from "../generated/Post/Post"
import { Comment, CreatePost } from "../generated/schema"

export function handleComment(event: CommentEvent): void {
  let entity = new Comment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.content = event.params.content

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreatePost(event: CreatePostEvent): void {
  let entity = new CreatePost(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.author = event.params.author
  entity.postType = event.params.postType
  entity.cid = event.params.cid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
