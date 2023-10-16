import { Abi, Address } from "viem";
import { POST_TYPES } from "./constants";

export interface ContractInfo {
    abi: Abi;
    address: Address;
}

export type PostType = typeof POST_TYPES[number] | "post"