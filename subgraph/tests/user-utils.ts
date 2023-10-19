import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { Follow, OwnershipTransferred, Verify } from "../generated/User/User"

export function createFollowEvent(follower: Address, follow: Address): Follow {
  let followEvent = changetype<Follow>(newMockEvent())

  followEvent.parameters = new Array()

  followEvent.parameters.push(
    new ethereum.EventParam("follower", ethereum.Value.fromAddress(follower))
  )
  followEvent.parameters.push(
    new ethereum.EventParam("follow", ethereum.Value.fromAddress(follow))
  )

  return followEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createVerifyEvent(user: Address, cid: string): Verify {
  let verifyEvent = changetype<Verify>(newMockEvent())

  verifyEvent.parameters = new Array()

  verifyEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  verifyEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromString(cid))
  )

  return verifyEvent
}
