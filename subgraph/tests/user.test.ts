import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { Follow } from "../generated/schema"
import { Follow as FollowEvent } from "../generated/User/User"
import { handleFollow } from "../src/user"
import { createFollowEvent } from "./user-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let follower = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let follow = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newFollowEvent = createFollowEvent(follower, follow)
    handleFollow(newFollowEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Follow created and stored", () => {
    assert.entityCount("Follow", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Follow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "follower",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Follow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "follow",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
