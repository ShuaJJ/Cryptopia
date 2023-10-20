import { IFeeds, PushAPI, viemSignerType } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";

export default function ChatList() {

    const { data: walletClient } = useWalletClient();
    const [chats, setChats] = useState<IFeeds[]>([]);

    useEffect(() => {
        async function getChats() {
            const me = await PushAPI.initialize(walletClient as viemSignerType, { env: ENV.STAGING });
            const myChats = await me.chat.list("CHATS");
            setChats(myChats);
        }
        if (walletClient) {
            getChats()
        }
    }, [walletClient])

    return (
        <div>
            {chats.map((c) => <div key={c.chatId}>{c.chatId}</div>)}
        </div>
    )

}