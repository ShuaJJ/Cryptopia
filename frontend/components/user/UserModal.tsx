import { useFollowed } from "@/hooks/useFollowed";
import Modal from "../Modal";
import MainButton from "../button/MainButton";
import { Address, WalletClient } from "viem";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PushAPI, viemSignerType } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import ChatModal from "../push/ChatModal";

export default function UserModal({
    logo,
    name,
    description,
    website,
    token,
    chatId,
    myAddress,
    walletClient,
    author,
    close,
    follow,
} : {
    logo: string,
    name: string,
    description: string,
    website: string,
    token: string,
    chatId: string,
    myAddress?: Address,
    walletClient?: WalletClient|null,
    author: Address,
    close: () => void,
    follow: (callback: () => void) => void,
}) {

    const { data: followed, isLoading, refetch} = useFollowed(author, myAddress);
    const [joinLoading, setJoinLoading] = useState(false);
    const [pushClient, setPushClient] = useState<PushAPI>();
    const [entered, setEntered] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const joinGroup = async () => {

        if (entered) {
            setShowChat(true)
            return;
        }

        if (!pushClient) {
            toast.error('Cannot initialize push client, please try again later');
            return;
        }

        setJoinLoading(true)
        try {
            const joinGroup = await pushClient.chat.group.join(chatId);
            console.log('QQQQ', joinGroup)
            setEntered(true);
        } catch (e) {
            console.log('Join failed', e)
        } finally {
            setJoinLoading(false)
        }
    }

    useEffect(() => {
        async function checkGroup() {
            const me = await PushAPI.initialize(walletClient as viemSignerType, {env: ENV.STAGING}); 
            setPushClient(me);
            const groupPermissions = await me.chat.group.permissions(chatId);
            setEntered(groupPermissions.entry);
        }
        if (walletClient) {
            checkGroup()
        }
    }, [chatId, walletClient])

    return  showChat ? (
            <ChatModal chatId={chatId} walletClient={walletClient!} close={close} />
        ) : (
        <Modal close={close}>
            
                <div className="flex flex-col gap-4 items-center justify-center min-w-[320px] max-w-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */} 
                    <img 
                        src={logo}
                        alt="logo"
                        className="w-24 h-24 rounded-full"
                    />
                    <div className="font-semibold text-lg">{name}</div>
                    <a 
                        className="text-sm underline text-purple-dark"
                        target="_blank"
                        href={website}
                    >
                        {website}
                    </a>
                    <div className="text-gray-400 mb-8 text-sm">{description}</div>
                    <MainButton
                        secondary
                        loading={isLoading}
                        onClick={() => {
                            if (!followed) {
                                follow(refetch)
                            }
                        }}
                    >
                        {followed ? 'Followed' : 'Follow'}
                    </MainButton>
                    <MainButton onClick={joinGroup} loading={joinLoading}>
                        {entered ? 'Enter group chat' : `Enter ${name} Group`}
                    </MainButton>
                    <div>*Must hold {name}&apos;s tokens: ${token}</div>
                </div>
        </Modal>
            )
}

