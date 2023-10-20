import { useFollowed } from "@/hooks/useFollowed";
import Modal from "../Modal";
import MainButton from "../button/MainButton";
import { Address, WalletClient } from "viem";
import { ChangeEvent, useState } from "react";
import sendNewChat from "../push/sendNewChat";
import { toast } from "react-hot-toast";

export default function UserModal({
    logo,
    name,
    description,
    myAddress,
    walletClient,
    author,
    close,
    follow,
} : {
    logo: string,
    name: string,
    description: string,
    myAddress?: Address,
    walletClient?: WalletClient|null,
    author: Address,
    close: () => void,
    follow: (callback: () => void) => void,
}) {

    const { data: followed, isLoading, refetch} = useFollowed(author, myAddress);
    const [showInput, setShowInput] = useState(false)

    return (
        <Modal close={close}>
            <div className="flex flex-col gap-4 items-center justify-center min-w-[320px] max-w-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */} 
                <img 
                    src={logo}
                    alt="logo"
                    className="w-24 h-24 rounded-full"
                />
                <div className="font-semibold text-lg">{name}</div>
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
                {showInput && <SendMsg walletClient={walletClient} author={author} />}
                <MainButton
                    onClick={() => {
                        setShowInput(!showInput)
                    }}
                >
                    Send Message
                </MainButton>
            </div>
        </Modal>
    )
}

function SendMsg({
    walletClient,
    author,
} : {
    walletClient?: WalletClient|null,
    author: Address,
}) {

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false);
    
    const updateText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const send = async () => {
        if (!walletClient) {
            toast('Please make sure you are connected', { position: 'top-center'});
            return;
        }

        if (!text) {
            toast('Msg cannot be empty', { position: 'top-center'});
            return;
        }

        setLoading(true)
        setText('')
        const msgObj = await sendNewChat(walletClient, author, text);
        console.log('AAAA', msgObj);
        setLoading(false)
    }

    return (
        <div className="flex gap-2 w-full">
            <div className="flex-1">
                <input 
                    className="border-b border-gray-300 w-full outline-none h-12" 
                    type="text" 
                    value={text}
                    placeholder="Type your message"
                    onChange={updateText}
                />
            </div>
            <div className="flex-none w-32">
                <MainButton onClick={send} loading={loading}>
                    <div className="text-center">Send</div>
                </MainButton>
            </div>
        </div>
    )
}