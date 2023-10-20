'use client'

import { IFeeds, PushAPI, viemSignerType } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import MainButton from "../button/MainButton";
import EmptyText from "../EmptyText";
import { useUserInfo } from "@/hooks/useUserInfo";
import { AccessTokenProps, PostContent } from "@/utils/types";
import getPostContent from "@/utils/getPostContent";

export default function ChatList({web3StorageAccessToken} : AccessTokenProps) {

    const { data: walletClient } = useWalletClient();
    const [chats, setChats] = useState<IFeeds[]>([]);
    const [showChat, setShowChat] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getChats() {
            setLoading(true);
            const me = await PushAPI.initialize(walletClient as viemSignerType, { env: ENV.STAGING });
            const myChats = await me.chat.list("CHATS");
            setChats(myChats);
            setLoading(false);
        }
        if (walletClient && showChat) {
            getChats()
        }
    }, [walletClient, showChat])

    if (!loading && showChat && chats.length == 0) {
        return <EmptyText text="You have no messages yet" />
    }

    return (
        <>
            { showChat ? (
                <div>
                    {chats.map((c) => <div key={c.chatId}>{c.chatId}</div>)}
                </div>
            ) : (
                <MainButton
                    secondary
                    onClick={() => {
                        setShowChat(true)
                    }}
                >
                    Show My Chats
                </MainButton>
            )}
        </>
    )
}

function Chat({ 
    chat, 
    myAddress, 
    web3StorageAccessToken 
}: { 
    chat: any, 
    myAddress: string,
    web3StorageAccessToken: string
}) {
    const from = chat.fromDID;
    const to = chat.toDID;
    const target = (myAddress === from ? to : from).replace('eip155:', '');
    const { data: cid } = useUserInfo(target);
    const [loading, setLoading] = useState(false);
    const [authorInfo, setAuthorInfo] = useState<PostContent|null>(null);

    useEffect(() => {
        async function getUserInfo() {
            const res = await getPostContent(web3StorageAccessToken, cid as string);
            setAuthorInfo(res)
        }
        if (cid) {
            getUserInfo()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid])
}