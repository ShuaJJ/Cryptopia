import {
  ApplyVerify as ApplyVerifyEvent,
  Follow as FollowEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  VerificationReceived as VerificationReceivedEvent,
  Verify as VerifyEvent
} from "../generated/User/User"
import {
  ApplyVerify,
  Follow,
  OwnershipTransferred,
  VerificationReceived,
  Verify
} from "../generated/schema"

export function handleApplyVerify(event: ApplyVerifyEvent): void {
  let entity = new ApplyVerify(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.cid = event.params.cid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFollow(event: FollowEvent): void {
  let entity = new Follow(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.follower = event.params.follower
  entity.follow = event.params.follow
  entity.cid = event.params.cid

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

export function handleVerificationReceived(
  event: VerificationReceivedEvent
): void {
  let entity = new VerificationReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.sourceChain = event.params.sourceChain

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
