import Image from "next/image";
import { ChatUIProvider, ChatViewComponent } from "@pushprotocol/uiweb";
import closeIcon from "@/public/close.png";
import { WalletClient } from "viem";
import { viemSignerType } from "@pushprotocol/restapi";

export default function ChatModal({
    chatId,
    walletClient,
    close,
} : {
    chatId: string,
    walletClient: WalletClient
    close: () => void,
}) {
    return (
        <ChatUIProvider signer={walletClient as viemSignerType}>
            <div className="fixed left-0 right-0 top-0 bottom-0 backdrop-blur-sm bg-white/60 flex items-center justify-center p-16">
                <ChatViewComponent
                    chatId={chatId}
                    limit={24}
                />
                <div 
                    className="absolute right-3 top-3 inline-block p-2 cursor-pointer"
                    onClick={close}
                >
                    <Image src={closeIcon} alt="close" width={24} height={24} />
                </div>
            </div>
        </ChatUIProvider>
    )
}