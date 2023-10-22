'use client'

import { gql, useQuery } from "@apollo/client";
import Skeleton from "../post/Skeleton";
import EmptyText from "../EmptyText";
import { AccessTokenProps } from "@/utils/types";
import { useContract } from "@/hooks/useContract";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useWalletClient, usePublicClient, useAccount, Address } from "wagmi";
import RandomAvatar from "../post/RandomAvatar";

export default function FollowList({ web3StorageAccessToken }: AccessTokenProps) {

    const { data: walletClient } = useWalletClient()
    const publicClient = usePublicClient();
    const userContract = useContract('User');
    const addRecentTransaction = useAddRecentTransaction();
    const { address } = useAccount();

    const GET_FOLLOWS = gql`
        query Follows($myAddress: String!) {
            follows(first: 32, follower: $myAddress) {
                follow,
                cid
            }
        }
    `;

    const { loading, data } = useQuery(GET_FOLLOWS, { variables: {myAddress: address}});
    const follows = (data?.follows ?? []) as { follow: Address, cid: string }[];

    if (loading) {
        return <Skeleton />
    }

    return (
        <>
            <div className="text-lg font-semibold">My Follows</div>
            <div>{follows.length == 0 && <EmptyText text="You have no follows yet" />}</div>
            {follows.map((f) => (
                <RandomAvatar 
                    key={f.cid}
                    author={f.follow}
                    account={address}
                    cid={f.cid}
                    walletClient={walletClient}
                    publicClient={publicClient}
                    addRecentTransaction={addRecentTransaction}
                    userContract={userContract}
                    web3StorageAccessToken={web3StorageAccessToken}
                />
            ))}
        </>
    )
}
