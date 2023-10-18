import { Abi, Address, PublicClient, WalletClient } from "viem";
import { POST_TYPES } from "./constants";

export interface ContractInfo {
    abi: Abi;
    address: Address;
}

export type PostType = typeof POST_TYPES[number] | "post"

export interface AccessTokenProps {
    web3StorageAccessToken: string;
}

export interface TxProps extends AccessTokenProps {
    walletClient?: WalletClient | null;
    publicClient?: PublicClient;
    account?: Address;
    contract?: ContractInfo | null;
    addRecentTransaction: (tx: { hash: string, description: string}) => void,
    refetch?: () => void;
}

export interface NewPostProps extends AccessTokenProps {
    setShow: (show: boolean) => void;
}

export interface PostFormProps extends TxProps {
    type: PostType;
}

export interface Post {
    cid: string;
    author: string;
}

export interface PostContent {
    content?: string;
    type?: PostType;
    name?: string;
    description?: string;
    image: string;
}

export interface PostInfo extends PostContent, AccessTokenProps {
    author: Address;
}