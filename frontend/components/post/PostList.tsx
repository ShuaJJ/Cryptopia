'use client'

import { gql, useQuery } from '@apollo/client';
import getPostContent from "@/utils/getPostContent";
import { AccessTokenProps, PostContent, PostInfo, PostItem, TxProps } from "@/utils/types";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import RandomAvatar from "./RandomAvatar";
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import ImageViewer from "./ImageViewer";
import { useContract } from "@/hooks/useContract";

export default function PostList({ web3StorageAccessToken } : AccessTokenProps) {

    const { data: walletClient } = useWalletClient()
    const publicClient = usePublicClient();
    const userContract = useContract('User');
    const postContract = useContract('Post');
    const addRecentTransaction = useAddRecentTransaction();
    const { address } = useAccount();

    const GET_POSTS = gql`
        query GetPosts {
            createPosts(first: 32) {
                author,
                postType,
                cid,
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_POSTS);
    const posts = data?.createPosts ?? []

    if (loading) {
        return <Skeleton />
    }

    if (posts.length == 0) {
        return <div className='text-center mt-8'>No posts yet...</div>
    }

    return (
        <div className="flex flex-col gap-6 pb-24">
            { posts.map((post: any) => (
                <Post
                    publicClient={publicClient}
                    walletClient={walletClient}
                    contract={postContract}
                    account={address}
                    author={post.author}
                    cid={post.cid}
                    web3StorageAccessToken={web3StorageAccessToken}
                    addRecentTransaction={addRecentTransaction}
                    userContract={userContract}
                    key={post.cid}
                />
            ))}
        </div>
    )
}

function Post(props: PostItem) {
    const {cid, web3StorageAccessToken:token} = props;
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postContent, setPostContent] = useState<PostContent|null>(null);
    const postContentLimit = 200;

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await getPostContent(token, cid);
            setLoading(false);
            setPostContent(res)
        })();
    }, [cid, token])

    if (loading) {
        return <Skeleton />
    }

    if (!postContent) {
        return null;
    }

    const content = postContent.content ?? '';

    return (
        <div className="bg-white shadow rounded-lg py-6">
            <RandomAvatar { ...props } />
            <ImageViewer url={postContent.image} />
            <div className="p-6 text-gray-600">
                {content.length < postContentLimit ? <>{postContent.content}</> : (
                    <>
                        <span>{content.substring(0, postContentLimit)}</span>
                        {showMore && <span>{content.substring(postContentLimit)}</span>}
                        <span 
                            className="text-purple-dark underline cursor-pointer pl-2"
                            onClick={() => { setShowMore(!showMore) }}
                        >
                            show more
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}