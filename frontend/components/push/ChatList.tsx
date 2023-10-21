/* eslint-disable @next/next/no-img-element */
'use client'

import { IFeeds, PushAPI, viemSignerType } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import MainButton from "../button/MainButton";
import EmptyText from "../EmptyText";
import ChatModal from "./ChatModal";

export default function ChatList() {

    const { data: walletClient } = useWalletClient();
    const [chats, setChats] = useState<IFeeds[]>([]);
    const [showChat, setShowChat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chatId, setChatId] = useState('')

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

    return <>
            { showChat && !loading ? (
                <div>
                    <div className="font-semibold mb-6 ">My Messages</div>
                    {chats.map((c) => (
                        <div onClick={() => { setChatId(c.chatId ?? '') }} key={c.chatId}>
                            <Chat 
                                chat={c}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <MainButton
                    secondary
                    loading={loading}
                    onClick={() => {
                        setShowChat(true)
                    }}
                >
                    Show My Chats
                </MainButton>
            )}
            { chatId && <ChatModal chatId={chatId} close={() => { setChatId('') }} walletClient={walletClient!} />}
    </>
}

function Chat({ 
    chat, 
}: { 
    chat: any, 
}) {

    return (
        <div 
            className="flex items-center gap-3 cursor-pointer"
        >
            <img 
                src={chat.groupImage} 
                alt="logo" 
                className="block rounded-full w-12 h-12"
            />
            <div className="flex flex-col">
                <div className="text-sm font-semibold">{chat.groupName}</div>
                <div className="text-sm text-gray-600">{chat.msg.messageContent}</div>
            </div>
        </div>
    )
}