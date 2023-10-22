import { useUserInfo } from "@/hooks/useUserInfo";
import getPostContent from "@/utils/getPostContent";
import { PostItem, UserInfo } from "@/utils/types";
import { useEffect, useState } from "react";
import UserModal from "../user/UserModal";
import { sendTx } from "@/utils/sendTx";
import { toast } from "react-hot-toast";
import Skeleton from "./Skeleton";

export default function RandomAvatar({
    author,
    account,
    publicClient,
    walletClient,
    addRecentTransaction,
    userContract,
    web3StorageAccessToken,
    shortDesc
}: PostItem) {

    const index = Math.floor(Math.random() * 6);
    const { data: cid } = useUserInfo(author);
    const [showUserModal, setShowUserModal] = useState(false);
    const [authorInfo, setAuthorInfo] = useState<UserInfo|null>(null);

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
    const close = () => {
        setShowUserModal(false);
    }

    const follow = async (callback: () => void) => {
        if (account && userContract && publicClient && walletClient) {
            await sendTx(
                'Follow',
                account,
                userContract,
                'follow',
                publicClient,
                walletClient,
                addRecentTransaction,
                [author]
            )
            callback();
        } else {
            toast('Please make sure you are connected', { position: 'top-center'})
        }

    }

    if (!authorInfo) {
        return <Skeleton />
    }

    const { description, token, chatId, website } = authorInfo;

    return (
        <>
            <div 
                className="flex gap-3 items-center px-6 mb-4"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={avatar} 
                    alt="avatar" 
                    className="rounded-full cursor-pointer flex-none block"
                    width={60} 
                    height={60} 
                    onClick={() => {
                        setShowUserModal(true)
                    }}
                />
                <div className="flex-1">
                    <div className="text-sm font-semibold">{username}</div>
                    {authorInfo?.description && (
                        <div className={"text-xs text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap " + (shortDesc ? 'w-32' : 'w-96')} >
                            {authorInfo.description}
                        </div>
                    )}
                </div>
            </div>
            {showUserModal && (
                <UserModal 
                    logo={avatar} 
                    name={username} 
                    description={description}
                    token={token} 
                    chatId={chatId}
                    website={website}
                    author={author}
                    myAddress={account}
                    walletClient={walletClient}
                    close={close}
                    follow={follow}
                />
            )}
        </>
    )
}