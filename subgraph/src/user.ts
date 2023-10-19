import {
  Follow as FollowEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Verify as VerifyEvent
} from "../generated/User/User"
import { Follow, OwnershipTransferred, Verify } from "../generated/schema"

export function handleFollow(event: FollowEvent): void {
  let entity = new Follow(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.follower = event.params.follower
  entity.follow = event.params.follow

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVerify(event: VerifyEvent): void {
  let entity = new Verify(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.cid = event.params.cid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
