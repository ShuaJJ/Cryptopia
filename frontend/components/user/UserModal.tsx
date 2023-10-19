import Modal from "../Modal";
import MainButton from "../button/MainButton";

export default function UserModal({
    logo,
    name,
    description,
    close,
    follow,
} : {
    logo: string,
    name: string,
    description: string,
    close: () => void,
    follow: () => void,
}) {

    return (
        <Modal>
            <div
                className="absolute right-1 top-0 cursor-pointer text-lg p-4 max-h-96 overflow-y-scroll"
                onClick={(e) => { 
                    e.stopPropagation();
                    close()
                 }}
            >
                X
            </div>
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
                    onClick={follow}
                >
                    Follow
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