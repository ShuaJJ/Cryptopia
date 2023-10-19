'use client'

import { usePost } from "@/hooks/usePost";
import getPostContent from "@/utils/getPostContent";
import { AccessTokenProps, PostContent, PostInfo } from "@/utils/types";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import RandomAvatar from "./RandomAvatar";
import ImageViewer from "./ImageViewer";

export default function PostList({ web3StorageAccessToken } : AccessTokenProps) {
    return (
        <div className="flex flex-col gap-6 pb-24">
            <Post token={web3StorageAccessToken} index={0} />
            <Post token={web3StorageAccessToken} index={2} />
            <Post token={web3StorageAccessToken} index={1} />
        </div>
    )
}

function Post({
    token,
    index,
}: {
    token: string,
    index: number,
}) {
    const { data, isLoading } = usePost(index);
    const [showMore, setShowMore] = useState(false);
    const [postContent, setPostContent] = useState<PostContent|null>(null);
    const postContentLimit = 200;

    useEffect(() => {
        if (data) {
            const cid = (data as any[])[0];
            (async () => {
                const res = await getPostContent(token, cid);
                setPostContent(res)
            })();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    if (isLoading) {
        return <Skeleton />
    }

    if (!postContent) {
        return null;
    }

    const postInfo: PostInfo = {
        ...postContent,
        author: (data as any[])[1],
        web3StorageAccessToken: token,
    }

    const content = postContent.content ?? '';

    return (
        <div className="bg-white shadow rounded-lg py-6">
            <RandomAvatar { ...postInfo } />
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