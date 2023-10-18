import { useUserInfo } from "@/hooks/useUserInfo";
import getPostContent from "@/utils/getPostContent";
import { PostContent, PostInfo } from "@/utils/types";
import { useEffect, useState } from "react";

export default function RandomAvatar({
    image,
    author,
    web3StorageAccessToken
}: PostInfo) {

    const index = Math.floor(Math.random() * 6);
    const { data: cid } = useUserInfo(author);
    const [authorInfo, setAuthorInfo] = useState<PostContent|null>(null);

    useEffect(() => {
        if (cid) {
            (async () => {
                const res = await getPostContent(web3StorageAccessToken, cid as string);
                setAuthorInfo(res)
            })();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid])

    const username = authorInfo?.name ?? author;
    let avatar = authorInfo?.image ?? `/${index}.png`;

    return (
        <div className="flex gap-3 items-center px-6 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src={avatar} 
                alt="avatar" 
                className="rounded-full"
                width={60} 
                height={60} 
            />
            <div>
                <div className="text-sm font-semibold">{username}</div>
                {authorInfo?.description && (
                    <div className="text-xs text-gray-400">{authorInfo.description}</div>
                )}
            </div>
        </div>
    )
}