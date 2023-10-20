import { useFollowed } from "@/hooks/useFollowed";
import Modal from "../Modal";
import MainButton from "../button/MainButton";
import { Address } from "viem";

export default function UserModal({
    logo,
    name,
    description,
    myAddress,
    author,
    close,
    follow,
} : {
    logo: string,
    name: string,
    description: string,
    myAddress?: Address,
    author: Address,
    close: () => void,
    follow: (callback: () => void) => void,
}) {

    const { data: followed, isLoading, refetch} = useFollowed(author, myAddress);

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
                <MainButton
                    onClick={() => {
                        
                    }}
                >
                    Send Message
                </MainButton>
            </div>
        </Modal>
    )
}