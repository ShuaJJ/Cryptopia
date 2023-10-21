import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ApplyVerify,
  Follow,
  OwnershipTransferred,
  ResponseVerified,
  VerificationReceived,
  Verify
} from "../generated/User/User"

export function createApplyVerifyEvent(
  user: Address,
  cid: string
): ApplyVerify {
  let applyVerifyEvent = changetype<ApplyVerify>(newMockEvent())

  applyVerifyEvent.parameters = new Array()

  applyVerifyEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  applyVerifyEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromString(cid))
  )

  return applyVerifyEvent
}

export function createFollowEvent(
  follower: Address,
  follow: Address,
  cid: string
): Follow {
  let followEvent = changetype<Follow>(newMockEvent())

  followEvent.parameters = new Array()

  followEvent.parameters.push(
    new ethereum.EventParam("follower", ethereum.Value.fromAddress(follower))
  )
  followEvent.parameters.push(
    new ethereum.EventParam("follow", ethereum.Value.fromAddress(follow))
  )
  followEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromString(cid))
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

export function createResponseVerifiedEvent(
  result: ethereum.Tuple
): ResponseVerified {
  let responseVerifiedEvent = changetype<ResponseVerified>(newMockEvent())

  responseVerifiedEvent.parameters = new Array()

  responseVerifiedEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromTuple(result))
  )

  return responseVerifiedEvent
}

export function createVerificationReceivedEvent(
  sender: Address,
  sourceChain: i32
): VerificationReceived {
  let verificationReceivedEvent = changetype<VerificationReceived>(
    newMockEvent()
  )

  verificationReceivedEvent.parameters = new Array()

  verificationReceivedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  verificationReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "sourceChain",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(sourceChain))
    )
  )

  return verificationReceivedEvent
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
